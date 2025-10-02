<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script lang="ts">
	export let disabled = false;
	export let flex = false;

	export let href: undefined | string = undefined;
	export let target: undefined | string = '_self';
</script>

{#if href}
	<a
		{href}
		{target}
		class="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gradient-to-r from-sky-400 to-blue-400 hover:from-sky-500 hover:to-blue-500 rounded text-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-md hover:shadow-lg"
		on:click
		class:flex
		class:block={!flex}
		class:justify-center={flex}
	>
		<slot />
	</a>
{:else}
	<button
		{disabled}
		class="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gradient-to-r from-sky-400 to-blue-400 hover:from-sky-500 hover:to-blue-500 rounded text-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-md hover:shadow-lg"
		on:click
		class:flex
		class:justify-center={flex}
	>
		<slot />
	</button>
{/if}
