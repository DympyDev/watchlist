<script lang="ts">
	import '../app.css';

	let { children } = $props();

	import { collections } from '$lib/stores/collections.store';
	import { user, isAuthenticated, signInWithGoogle, signOutUser } from '$lib/stores/auth.store';
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/actions/click-outside';
	
	let isDropdownOpen = $state(false);
	let isMobileMenuOpen = $state(false);

	function handleClickOutside() {
		isDropdownOpen = false;
	}

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		// Prevent scrolling when menu is open
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<header class="relative z-50 bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex flex-col space-y-0 sm:flex-row sm:items-center sm:justify-between md:space-y-0">
				<!-- Mobile header with menu button -->
				<div class="flex items-center justify-between">
					<a href="/" class="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 hover:text-yellow-600">
						Watchlists
					</a>
					<button
						onclick={toggleMobileMenu}
						class="sm:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
						aria-label="Toggle menu"
					>
						<svg 
							xmlns="http://www.w3.org/2000/svg" 
							class="h-6 w-6" 
							fill="none" 
							viewBox="0 0 24 24" 
							stroke="currentColor"
						>
							{#if isMobileMenuOpen}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							{:else}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							{/if}
						</svg>
					</button>
				</div>

				<!-- Desktop navigation -->
				<div class="hidden sm:flex items-center justify-between flex-1 ml-8">
					<div class="relative" use:clickOutside onclick_outside={handleClickOutside}>
						<button
							onclick={toggleDropdown}
							class="inline-flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 cursor-pointer"
							aria-expanded={isDropdownOpen}
							aria-haspopup="true"
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
								class="absolute left-0 mt-2 w-64 origin-top-left rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5"
								role="menu"
							>
								{#each $collections as collection}
									<a
										href="/{collection.key}"
										onclick={() => (isDropdownOpen = false)}
										class="group flex items-center space-x-3 rounded-md p-2 transition-colors hover:bg-gray-100"
										class:bg-gray-100={$page.url.pathname === `/${collection.key}`}
										role="menuitem"
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

					{#if $isAuthenticated}
						<div class="flex flex-col items-end">
							<span class="text-sm font-medium text-gray-900">{$user?.email}</span>
							<button
								onclick={signOutUser}
								class="text-sm text-gray-600 hover:text-yellow-600 hover:underline cursor-pointer"
							>
								Sign out
							</button>
						</div>
					{:else}
						<button
							onclick={signInWithGoogle}
							class="inline-flex items-center space-x-2 rounded-lg bg-white px-4 py-2 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 cursor-pointer"
						>
							<svg class="h-5 w-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span>Sign in with Google</span>
						</button>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<!-- Mobile menu overlay -->
	{#if isMobileMenuOpen}
		<div class="fixed inset-0 z-50 bg-white">
			<div class="flex h-full flex-col">
				<!-- Header -->
				<div class="flex items-center justify-between border-b border-gray-200 px-4 py-4">
					<span class="text-xl font-bold text-gray-900">Collections</span>
					<button
						onclick={toggleMobileMenu}
						class="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
						aria-label="Close menu"
					>
						<svg 
							xmlns="http://www.w3.org/2000/svg" 
							class="h-6 w-6" 
							fill="none" 
							viewBox="0 0 24 24" 
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Collections list -->
				<div class="flex-1 overflow-y-auto px-4 py-6">
					<div class="space-y-4">
						{#each $collections as collection}
							<a
								href="/{collection.key}"
								onclick={toggleMobileMenu}
								class="flex items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-100"
								class:bg-gray-100={$page.url.pathname === `/${collection.key}`}
							>
								<div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
									<img src={collection.coverImage} alt="" class="h-full w-full object-cover" />
								</div>
								<div class="flex-1">
									<p class="text-base font-medium text-gray-900">
										{collection.name}
									</p>
								</div>
							</a>
						{/each}
					</div>
				</div>

				<!-- User section -->
				<div class="border-t border-gray-200 px-4 py-6">
					{#if $isAuthenticated}
						<div class="space-y-2">
							<p class="text-sm font-medium text-gray-900">{$user?.email}</p>
							<button
								onclick={() => {
									signOutUser();
									toggleMobileMenu();
								}}
								class="text-sm text-gray-600 hover:text-yellow-600 hover:underline"
							>
								Sign out
							</button>
						</div>
					{:else}
						<button
							onclick={() => {
								signInWithGoogle();
								toggleMobileMenu();
							}}
							class="flex w-full items-center justify-center space-x-2 rounded-lg bg-white px-4 py-3 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50"
						>
							<svg class="h-5 w-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span>Sign in with Google</span>
						</button>
					{/if}
				</div>
			</div>
		</div>
	{/if}

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
