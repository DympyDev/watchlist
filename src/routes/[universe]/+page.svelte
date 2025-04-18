<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { user, isAuthenticated, signInWithGoogle, signOutUser, saveWatchedItems, loadWatchedItems } from '$lib/stores/auth.store';

	export let data: PageData;

	// Create a store for watched items with localStorage persistence
	const STORAGE_KEY = `${data.key}-watched-items`;
	const isLoading = writable(true);
	const isSyncing = writable(false);

	function loadLocalWatchedItems(): Set<string> {
		if (typeof window === 'undefined') return new Set();
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? new Set(JSON.parse(stored)) : new Set();
	}

	const watchedItems = writable<Set<string>>(new Set());
	const showBackToTop = writable(false);

	// Handle cloud sync
	async function syncWithCloud() {
		if (!$user) return;
		
		try {
			isSyncing.set(true);
			const cloudItems = await loadWatchedItems($user.uid, data.key);
			
			// Merge local and cloud items
			const mergedItems = new Set([...Array.from($watchedItems), ...cloudItems]);
			watchedItems.set(mergedItems);
			
			// Save merged items back to cloud
			await saveWatchedItems($user.uid, data.key, Array.from(mergedItems));
		} catch (error) {
			console.error('Error syncing with cloud:', error);
		} finally {
			isSyncing.set(false);
		}
	}

	// Handle authentication
	async function handleAuth() {
		try {
			if ($isAuthenticated) {
				await signOutUser();
			} else {
				await signInWithGoogle();
			}
		} catch (error) {
			console.error('Auth error:', error);
		}
	}

	onMount(() => {
		watchedItems.set(loadLocalWatchedItems());

		// Subscribe to changes and update localStorage and cloud
		const unsubscribe = watchedItems.subscribe(async (items) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, JSON.stringify([...items]));
				
				// Sync with cloud if authenticated
				if ($user) {
					await saveWatchedItems($user.uid, data.key, Array.from(items));
				}
			}
		});

		// Add scroll listener for back to top button
		const handleScroll = () => {
			showBackToTop.set(window.scrollY > 500);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		// Set loading to false after a small delay to ensure smooth transition
		setTimeout(() => {
			isLoading.set(false);
		}, 500);

		return () => {
			unsubscribe();
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
	<meta name="description" content="Track your progress through the {data.name} with this interactive watchlist." />
</svelte:head>

{#if $isLoading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
		<div class="rounded-lg bg-white p-8 shadow-xl">
			<div class="flex items-center space-x-4">
				<div class="h-8 w-8 animate-spin rounded-full border-4 border-yellow-600 border-t-transparent"></div>
				<p class="text-lg font-medium text-gray-900">Loading {data.name} watchlist...</p>
			</div>
		</div>
	</div>
{/if}

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="space-y-12">
		<div class="text-center">
			<h1 class="mb-4 text-4xl font-bold text-gray-900">{data.name} Watchlist</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				{data.description}
			</p>
			<div class="mt-4 space-x-4">
				<button
					on:click={scrollToNextUnwatched}
					class="rounded-lg bg-yellow-600 px-4 py-2 font-medium text-white transition-colors hover:bg-yellow-700 cursor-pointer"
				>
					<span>Next Unwatched</span>
				</button>
				<button
					on:click={resetProgress}
					class="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 cursor-pointer"
				>
					Reset Progress
				</button>
			</div>
		</div>

		{#each data.sections as section}
			<div class="space-y-4">
				<div class="p-4 text-center">
					<h2 class="text-2xl font-bold">{section.name}</h2>
				</div>

				<div class="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow-lg md:grid-cols-6 md:p-12">
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
											class={`transform font-black text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
											${item.comicSize === 'third' ? 'text-4xl' : ''}
											${item.comicSize === 'half' ? 'text-5xl' : ''}
											${item.comicSize === 'two-thirds' ? 'text-6xl' : ''}
											${!item.comicSize || item.comicSize === 'full' ? 'text-8xl' : ''}`}
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

{#if $showBackToTop}
	<button
		on:click={scrollToTop}
		class="fixed right-8 bottom-8 z-50 transform rounded-full bg-gray-800 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-gray-700 cursor-pointer"
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