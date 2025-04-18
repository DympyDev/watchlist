<script lang="ts">
	import { MCU_PHASES } from '$lib/constants/mcu.constants';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	// Create a store for watched items with localStorage persistence
	const STORAGE_KEY = 'mcu-watched-items';

	function loadWatchedItems(): Set<string> {
		if (typeof window === 'undefined') return new Set();
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? new Set(JSON.parse(stored)) : new Set();
	}

	const watchedItems = writable<Set<string>>(new Set());
	const showBackToTop = writable(false);

	onMount(() => {
		watchedItems.set(loadWatchedItems());

		// Subscribe to changes and update localStorage
		const unsubscribe = watchedItems.subscribe((items) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, JSON.stringify([...items]));
			}
		});

		// Add scroll listener for back to top button
		const handleScroll = () => {
			showBackToTop.set(window.scrollY > 500);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			unsubscribe();
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function getRandomRotation() {
		// Generate a random angle between -20 and 20 degrees
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
	<title>MCU Watchlist</title>
	<meta name="description" content="Track your progress through the Marvel Cinematic Universe with this interactive watchlist." />
</svelte:head>

<div class="space-y-12">
	<div class="text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Marvel Cinematic Universe Watchlist</h1>
		<p class="mx-auto max-w-2xl text-lg text-gray-600">
			Track your progress through the Marvel Cinematic Universe with this interactive watchlist.
			Check off items as you watch them!
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

	{#each MCU_PHASES as phase}
		<div class="space-y-4">
			<div class="p-4 text-center">
				<h2 class="text-2xl font-bold">{phase.name}</h2>
			</div>

			<div class="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow-lg md:grid-cols-6 md:p-12">
				{#each phase.media as item}
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

<footer class="mt-12 border-t border-gray-200 py-8 text-center text-sm text-gray-600">
	<p class="mx-auto max-w-3xl px-4">
		This is a fan-made website for personal use only. All Marvel-related content, including images and names, 
		are property of Marvel Entertainment, LLC and The Walt Disney Company. This site is not affiliated with, 
		endorsed, sponsored, or specifically approved by Marvel or Disney.
	</p>
</footer>

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
