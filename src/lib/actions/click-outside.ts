export function clickOutside(node: HTMLElement) {
	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('click_outside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

// Add type support for the custom event
export {};
declare module '@sveltejs/kit' {
	interface HTMLAttributes {
		'on:click_outside'?: (event: CustomEvent<void>) => void;
	}
} 