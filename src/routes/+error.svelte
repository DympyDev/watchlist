<script lang="ts">
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>{$page.status} - {$page.error?.message || 'Error'}</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="mx-auto max-w-max">
        <main class="sm:flex">
            <p class="text-4xl font-bold tracking-tight text-yellow-600 sm:text-5xl">{$page.status}</p>
            <div class="sm:ml-6">
                <div class="sm:border-l sm:border-gray-200 sm:pl-6">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {#if $page.status === 404}
                            Page not found
                        {:else}
                            An error occurred
                        {/if}
                    </h1>
                    <p class="mt-1 text-base text-gray-500">{$page.error?.message || 'Please check the URL and try again.'}</p>
                </div>
                <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                    <a
                        href="/mcu"
                        class="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                        Go to MCU Watchlist
                    </a>
                    <a
                        href="/"
                        class="inline-flex items-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                        Go home
                    </a>
                </div>
            </div>
        </main>
    </div>
</div> 