<script lang="ts">
	import { collections } from '$lib/stores/collections.store';
</script>

<svelte:head>
	<title>Watchlist Collections</title>
	<meta name="description" content="Track your progress through various movie and TV show collections with our interactive watchlists." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Track Your Favorite Series</h1>
		<p class="mx-auto max-w-2xl text-lg text-gray-600">
			Keep track of your watching progress through various cinematic universes and TV show collections.
			Mark episodes as watched and never lose track of where you left off.
		</p>
	</div>

	<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each $collections as collection}
			<a
				href="/{collection.key}"
				class="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
			>
				<div class="aspect-w-16 aspect-h-9 relative">
					<img
						src={collection.coverImage}
						alt={collection.name}
						class="absolute inset-0 h-full w-full object-cover"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
				</div>
				<div class="p-6">
					<h2 class="mb-2 text-2xl font-bold text-gray-900">{collection.name}</h2>
					<p class="text-gray-600">{collection.description}</p>
				</div>
				<div
					class="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<span class="rounded-full bg-yellow-600 px-6 py-2 font-medium text-white">View Collection</span>
				</div>
			</a>
		{/each}
	</div>

	{#if $collections.length === 0}
		<div class="text-center">
			<p class="text-lg text-gray-600">No collections available yet. Check back soon!</p>
		</div>
	{/if}
</div>

<style>
	/* Add support for aspect ratio if not supported by browser */
	.aspect-w-16 {
		position: relative;
		padding-bottom: 56.25%; /* 16:9 */
	}

	.aspect-h-9 {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style> 