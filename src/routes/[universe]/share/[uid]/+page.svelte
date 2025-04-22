<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const watchedItems = new Set(data.watchedItems);

	function getRandomRotation() {
		return Math.floor(Math.random() * 41) - 20;
	}

	function isWatched(item: any) {
		return watchedItems.has(item.id);
	}
</script>

<svelte:head>
	<title>{data.name} Watchlist - Shared Progress</title>
	<meta
		name="description"
		content="View shared progress through the {data.name} watchlist."
	/>
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 to-white">
	<div
		class="absolute inset-0 opacity-[0.15]"
		style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"
	></div>
	<div class="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="text-center">
				<div class="mb-6 inline-block rounded-lg bg-yellow-100 px-4 py-2 text-yellow-800">
					<p class="text-sm">
						You are viewing a shared watchlist. This is a read-only view.
					</p>
				</div>
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
								class={`relative h-[50vh] overflow-hidden rounded border border-black
								${item.comicSize === 'full' ? 'md:col-span-6' : ''}
								${item.comicSize === 'two-thirds' ? 'md:col-span-4' : ''}
								${item.comicSize === 'half' ? 'md:col-span-3' : ''}
								${item.comicSize === 'third' ? 'md:col-span-2' : ''}`}
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