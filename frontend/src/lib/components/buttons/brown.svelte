<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();



	interface Props {
		disabled?: boolean;
		flex?: boolean;
		href?: undefined | string;
		target?: undefined | string;
		type?: undefined | string;
		children?: import('svelte').Snippet;
	}

	let {
		disabled = false,
		flex = false,
		href = undefined,
		target = '_self',
		type = 'button',
		children
	}: Props = $props();
</script>

{#if href}
	<a
		{href}
		{target}
		{disabled}
		class:opacity-50={disabled}
		class:cursor-not-allowed={disabled}
		class:pointer-events-none={disabled}
        class="brand-button brand-button-hover w-full outline-hidden"
		onclick={bubble('click')}
		class:flex
		class:justify-center={flex}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		{disabled}
		{type}
        class="brand-button brand-button-hover w-full focus:outline-hidden disabled:cursor-not-allowed outline-hidden"
		onclick={bubble('click')}
		class:flex
		class:justify-center={flex}
	>
		{@render children?.()}
	</button>
{/if}
