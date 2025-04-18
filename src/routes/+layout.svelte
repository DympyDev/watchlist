<script lang="ts">
	import '../app.css';

	let { children } = $props();

	import { collections } from '$lib/stores/collections.store';
	import { user, isAuthenticated, signInWithGoogle, signOutUser } from '$lib/stores/auth.store';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let isDropdownOpen = false;
	let headerElement: HTMLElement;

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (headerElement && !headerElement.contains(event.target as Node)) {
			isDropdownOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<header bind:this={headerElement} class="relative z-50 bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-8">
					<a href="/" class="text-2xl font-bold tracking-tight text-gray-900 hover:text-yellow-600">
						Watchlist Collections
					</a>
					<div class="relative">
						<button
							on:click={() => (isDropdownOpen = !isDropdownOpen)}
							class="inline-flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100"
						>
							<span class="text-sm font-medium">Collections</span>
							<svg
								class={`h-5 w-5 transform transition-transform ${
									isDropdownOpen ? 'rotate-180' : ''
								}`}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>

						{#if isDropdownOpen}
							<div
								class="ring-opacity-5 absolute left-0 mt-2 w-64 origin-top-left rounded-lg bg-white p-2 shadow-lg ring-1 ring-black"
							>
								{#each $collections as collection}
									<a
										href="/{collection.key}"
										class="group flex items-center space-x-3 rounded-md p-2 transition-colors hover:bg-gray-100"
										class:bg-gray-100={$page.url.pathname === `/${collection.key}`}
									>
										<div class="h-8 w-8 flex-shrink-0 overflow-hidden rounded">
											<img src={collection.coverImage} alt="" class="h-full w-full object-cover" />
										</div>
										<div class="flex-1 truncate">
											<p
												class="truncate text-sm font-medium text-gray-900 group-hover:text-yellow-600"
											>
												{collection.name}
											</p>
										</div>
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<button
						on:click={signInWithGoogle}
						class="inline-flex items-center space-x-2 rounded-lg bg-yellow-600 px-4 py-2 font-medium text-white transition-colors hover:bg-yellow-700"
					>
						{#if $isAuthenticated}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Sign Out</span>
						{:else}
							<svg class="h-5 w-5" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span>Sign in with Google</span>
						{/if}
					</button>
					{#if $user}
						<div class="text-sm text-gray-600">
							{$user.email}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="mt-auto border-t border-gray-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<p class="text-center text-sm text-gray-600">
				This is a fan-made website for personal use only. All content, including images and names,
				are property of their respective owners.
			</p>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		min-height: 100vh;
	}
</style>
