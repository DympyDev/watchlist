<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		{@render children()}
	</div>
</div>
