<script lang="ts">
	import { collections } from '$lib/stores/collections.store';
</script>

<svelte:head>
	<title>Watchlist Collections</title>
	<meta
		name="description"
		content="Track your progress through various movie and TV show collections with our interactive watchlists."
	/>
</svelte:head>

<div class="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-purple-50 to-white">
	<div
		class="absolute inset-0 opacity-[0.15]"
		style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"
	></div>
	<div class="relative flex min-h-[70vh] items-center justify-center px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h1 class="mb-8 text-4xl font-extrabold sm:text-5xl">
				<span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
					Track Your Cinematic Universe Journey
				</span>
			</h1>
			<p class="text-2xl leading-relaxed font-medium">
				<span
					class="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent"
				>
					Your personal guide through epic cinematic universes.
				</span>
			</p>
		</div>
	</div>
</div>

<div class="min-h-[70vh] bg-white">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-bold">
			<span class="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
				Available Collections
			</span>
		</h2>

		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each $collections as collection}
				<a
					href="/{collection.key}"
					class="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
				>
					<div class="relative aspect-16/9">
						<img
							src={collection.coverImage}
							alt={collection.name}
							class="absolute inset-0 h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
					</div>
					<div class="p-6">
						<h2 class="mb-2 text-2xl font-bold text-gray-900">{collection.name}</h2>
						<p class="text-gray-600">{collection.description}</p>
					</div>
					<div
						class="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<span class="rounded-full bg-yellow-600 px-6 py-2 font-medium text-white"
							>View Collection</span
						>
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
</div>

<div class="min-h-[70vh] bg-gradient-to-b from-white to-purple-50">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="mb-16 text-3xl font-bold">
				<span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
					About This Project
				</span>
			</h2>

			<div class="prose prose-lg mx-auto mb-16">
				<p class="mb-6 text-gray-600">
					Hey there! I'm Dymion Fritz, CTO and Software Engineer at <a
						href="https://softwarebastards.nl/"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-purple-600 hover:text-purple-800">Software Bastards</a
					>.
				</p>
				<p class="text-gray-600">
					As a huge fan of cinematic universes like the MCU and Star Wars, I often found myself
					wondering about the best way to watch these series in order. That's why I created this web
					app – to help fellow fans navigate through these amazing universes in the order the
					creators were trying to tell the full story.
				</p>
			</div>

			<h3 class="mb-12 text-2xl font-semibold text-gray-900">Key Features</h3>
			<div class="grid gap-12 sm:grid-cols-3">
				<div class="group space-y-4 rounded-xl p-4 transition-all hover:bg-white/50">
					<div class="text-4xl">📝</div>
					<h3 class="text-xl font-semibold text-gray-900">Progress Tracking</h3>
					<p class="text-gray-600">
						Never lose track of where you left off in your favorite universe
					</p>
				</div>
				<div class="group space-y-4 rounded-xl p-4 transition-all hover:bg-white/50">
					<div class="text-4xl">🔄</div>
					<h3 class="text-xl font-semibold text-gray-900">Sync Everywhere</h3>
					<p class="text-gray-600">
						Sign in with Google to keep your progress synced across all devices
					</p>
				</div>
				<div class="group space-y-4 rounded-xl p-4 transition-all hover:bg-white/50">
					<div class="text-4xl">🌟</div>
					<h3 class="text-xl font-semibold text-gray-900">Growing Collection</h3>
					<p class="text-gray-600">
						Explore an expanding list of carefully curated cinematic universes
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
