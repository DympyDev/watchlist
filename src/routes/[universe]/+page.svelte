<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		user,
		saveWatchedItems,
		loadWatchedItems
	} from '$lib/stores/auth.store';

	export let data: PageData;

	// Create a store for watched items with localStorage persistence
	const STORAGE_KEY = `${data.key}-watched-items`;
	const isLoading = writable(true);
	const isSyncing = writable(false);
	const hasConflicts = writable(false);
	const conflictItems = writable<string[]>([]);
	const lastKnownUserId = writable<string | null>(null);
	const lastKnownUniverse = writable<string | null>(null);

	function loadLocalWatchedItems(): Set<string> {
		if (typeof window === 'undefined') return new Set();
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? new Set(JSON.parse(stored)) : new Set();
	}

	const watchedItems = writable<Set<string>>(new Set());
	const showBackToTop = writable(false);

	async function handleInitialSync() {
		if (!$user?.uid) return;

		try {
			isSyncing.set(true);
			const localItems = Array.from($watchedItems);
			const cloudItems = await loadWatchedItems($user.uid, data.key);

			// Check for conflicts (items in local but not in cloud)
			const itemsOnlyInLocal = localItems.filter((item) => !cloudItems.includes(item));

			// Verify that local items actually belong to this universe
			const validLocalItems = localItems.filter(itemId => 
				data.sections.some(section => 
					section.media.some(item => item.id === itemId)
				)
			);

			if (itemsOnlyInLocal.length > 0) {
				// Only show conflicts for valid items from this universe
				const validConflicts = itemsOnlyInLocal.filter(itemId =>
					data.sections.some(section =>
						section.media.some(item => item.id === itemId)
					)
				);
				
				if (validConflicts.length > 0) {
					conflictItems.set(validConflicts);
					hasConflicts.set(true);
				} else {
					// No valid conflicts, just use cloud items
					watchedItems.set(new Set(cloudItems));
				}
			} else {
				// No conflicts, but still ensure we only include valid items
				const validCloudItems = cloudItems.filter(itemId =>
					data.sections.some(section =>
						section.media.some(item => item.id === itemId)
					)
				);
				watchedItems.set(new Set(validCloudItems));
			}
			
			// Update both user and universe tracking
			lastKnownUserId.set($user.uid);
			lastKnownUniverse.set(data.key);
		} catch (error) {
			console.error('Error during initial sync:', error);
		} finally {
			isSyncing.set(false);
		}
	}

	// Watch for user changes or universe changes
	$: if ($user?.uid !== $lastKnownUserId || data.key !== $lastKnownUniverse) {
		handleInitialSync();
	}

	async function resolveConflicts(useLocal: boolean) {
		if (!$user?.uid) return;

		try {
			isSyncing.set(true);
			const localItems = Array.from($watchedItems);
			const cloudItems = await loadWatchedItems($user.uid, data.key);

			// Filter items to only include those from this universe
			const validLocalItems = localItems.filter(itemId =>
				data.sections.some(section =>
					section.media.some(item => item.id === itemId)
				)
			);
			
			const validCloudItems = cloudItems.filter(itemId =>
				data.sections.some(section =>
					section.media.some(item => item.id === itemId)
				)
			);

			let finalItems;
			if (useLocal) {
				finalItems = new Set(validLocalItems);
			} else {
				finalItems = new Set(validCloudItems);
			}

			watchedItems.set(finalItems);
			await saveWatchedItems($user.uid, data.key, Array.from(finalItems));
			hasConflicts.set(false);
			conflictItems.set([]);
		} catch (error) {
			console.error('Error resolving conflicts:', error);
		} finally {
			isSyncing.set(false);
		}
	}

	onMount(() => {
		watchedItems.set(loadLocalWatchedItems());

		// Subscribe to changes and update localStorage and cloud
		const unsubscribeWatchedItems = watchedItems.subscribe(async (items) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, JSON.stringify([...items]));

				// Only sync with cloud if there are no pending conflicts
				if ($user?.uid && !$hasConflicts) {
					try {
						await saveWatchedItems($user.uid, data.key, Array.from(items));
					} catch (error) {
						console.error('Error syncing with cloud:', error);
					}
				}
			}
		});

		// Add scroll listener for back to top button
		const handleScroll = () => {
			showBackToTop.set(window.scrollY > 500);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		// Initial cloud sync after a small delay to ensure smooth loading
		setTimeout(async () => {
			if ($user?.uid) {
				await handleInitialSync();
			}
			isLoading.set(false);
		}, 500);

		return () => {
			unsubscribeWatchedItems();
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function getRandomRotation() {
		return Math.floor(Math.random() * 41) - 20;
	}

	function isWatched(item: any) {
		return $watchedItems.has(item.id);
	}

	function toggleWatched(item: any) {
		watchedItems.update((items) => {
			const newSet = new Set(items);
			if (newSet.has(item.id)) {
				newSet.delete(item.id);
			} else {
				newSet.add(item.id);
			}
			return newSet;
		});
	}

	function resetProgress() {
		if (confirm('Are you sure you want to reset all watch progress? This cannot be undone.')) {
			watchedItems.set(new Set());
			if ($user?.uid) {
				// Explicitly save empty array to cloud
				saveWatchedItems($user.uid, data.key, []).catch(error => {
					console.error('Error clearing cloud progress:', error);
				});
			}
		}
	}

	function scrollToNextUnwatched() {
		const unwatchedItem = document.querySelector('[data-unwatched="true"]');
		if (unwatchedItem) {
			unwatchedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>{data.name} Watchlist</title>
	<meta
		name="description"
		content="Track your progress through the {data.name} with this interactive watchlist."
	/>
</svelte:head>

{#if $isLoading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
		<div class="rounded-lg bg-white p-8 shadow-xl">
			<div class="flex items-center space-x-4">
				<div
					class="h-8 w-8 animate-spin rounded-full border-4 border-yellow-600 border-t-transparent"
				></div>
				<p class="text-lg font-medium text-gray-900">Loading {data.name} watchlist...</p>
			</div>
		</div>
	</div>
{/if}

{#if $hasConflicts}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
		<div class="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
			<h3 class="mb-4 text-xl font-bold">Sync Conflict Detected</h3>
			<p class="mb-4 text-gray-600">
				There are {$conflictItems.length} items in your local storage that are not in the cloud storage.
				How would you like to proceed?
			</p>
			<div class="mb-4 space-y-2">
				<p class="font-medium">Conflicting items:</p>
				<ul class="list-disc pl-5 text-sm text-gray-600">
					{#each $conflictItems as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
			<div class="flex justify-end space-x-4">
				<button
					on:click={() => resolveConflicts(false)}
					class="px-4 py-2 text-gray-600 hover:text-gray-800"
				>
					Use Cloud Version
				</button>
				<button
					on:click={() => resolveConflicts(true)}
					class="rounded-lg bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
				>
					Keep Local Changes
				</button>
			</div>
		</div>
	</div>
{/if}

<div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 to-white">
	<div
		class="absolute inset-0 opacity-[0.15]"
		style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"
	></div>
	<div class="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="text-center">
				<h1
					class="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent"
				>
					{data.name} Watchlist
				</h1>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					{data.description}
				</p>
				{#if data.sources && data.sources.length > 0}
					<div class="mx-auto mt-4 max-w-2xl">
						<p class="text-sm font-medium text-gray-700">Sources:</p>
						<div class="mt-1 flex flex-wrap justify-center gap-3">
							{#each data.sources as source}
								<a
									href={source.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-sm text-gray-800 shadow-sm hover:bg-white hover:shadow-md transition-all"
								>
									{source.name}
									<svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
										<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
										<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
									</svg>
								</a>
							{/each}
						</div>
					</div>
				{/if}
				<div class="mt-8 space-x-4">
					<button
						on:click={scrollToNextUnwatched}
						class="cursor-pointer rounded-lg bg-yellow-600 px-4 py-2 font-medium text-white transition-colors hover:bg-yellow-700"
					>
						<span>Next Unwatched</span>
					</button>
					<button
						on:click={resetProgress}
						class="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
					>
						Reset Progress
					</button>
				</div>
			</div>

			{#each data.sections as section}
				<div class="space-y-4">
					<div class="p-4 text-center">
						<h2
							class="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent"
						>
							{section.name}
						</h2>
					</div>

					<div
						class="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow-lg md:grid-cols-6 md:p-12"
					>
						{#each section.media as item}
							<div
								data-unwatched={!isWatched(item)}
								class={`relative h-[50vh] cursor-pointer overflow-hidden rounded border border-black transition-opacity hover:opacity-90
								${item.comicSize === 'full' ? 'md:col-span-6' : ''}
								${item.comicSize === 'two-thirds' ? 'md:col-span-4' : ''}
								${item.comicSize === 'half' ? 'md:col-span-3' : ''}
								${item.comicSize === 'third' ? 'md:col-span-2' : ''}`}
								on:click={() => toggleWatched(item)}
							>
								<div
									class="bg-opacity-70 absolute top-0 right-0 z-10 rounded-bl border-b border-l border-yellow-800 bg-yellow-100 p-2"
								>
									<h3 class="text-right text-sm font-medium text-yellow-800">
										{item.name}
										{#if item.subLine}
											<br />
											<span class="text-xs text-yellow-700">{item.subLine}</span>
										{/if}
									</h3>
								</div>
								<div class="relative h-full w-full">
									<img
										src={item.image}
										alt={item.name}
										class={`h-full w-full object-cover ${isWatched(item) ? 'blur-sm' : ''}`}
									/>
									{#if isWatched(item)}
										<div class="absolute inset-0 flex items-center justify-center">
											<div
												class={`transform text-4xl font-black text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
												${item.comicSize === 'half' ? 'md:text-5xl' : ''}
												${item.comicSize === 'two-thirds' ? 'md:text-6xl' : ''}
												${!item.comicSize || item.comicSize === 'full' ? 'md:text-8xl' : ''}`}
												style="transform: rotate({getRandomRotation()}deg)"
											>
												WATCHED!
											</div>
										</div>
									{/if}
									<div class="absolute right-2 bottom-2 z-10">
										{#if isWatched(item)}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-8 w-8 text-yellow-500 drop-shadow-md"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										{/if}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

{#if $showBackToTop}
	<button
		on:click={scrollToTop}
		class="fixed right-8 bottom-8 z-50 transform cursor-pointer rounded-full bg-gray-800 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-gray-700"
		aria-label="Scroll to top"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 10l7-7m0 0l7 7m-7-7v18"
			/>
		</svg>
	</button>
{/if}
