<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/navbar.svelte';
	import { pathname } from '$lib/stores';
	import { navbarVisible } from '$lib/stores.svelte';
	// import * as Sentry from '@sentry/browser';
	// import { BrowserTracing } from '@sentry/tracing';
	import { initLocalizationContext } from '$lib/i18n';
	import { browser } from '$app/environment';
	import CommandPalette from '$lib/components/commandpalette.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	// import Alert from '$lib/modals/alert.svelte';

	/*	afterNavigate(() => {
		if (browser) {
			if (latestPageVisitURl === window.location.href) {
				return;
			} else {
				latestPageVisitURl = window.location.href;
				plausible.trackPageview();
			}
			console.log('After nav');
		}
	});*/
	const plausible_data_url = import.meta.env.VITE_PLAUSIBLE_DATA_URL;

	if (browser) {
		pathname.set(window.location.pathname);
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// Whenever the user explicitly chooses light mode
		// 		localStorage.theme = 'light';
		//
		// // Whenever the user explicitly chooses dark mode
		// 		localStorage.theme = 'dark';
		//
		// // Whenever the user explicitly chooses to respect the OS preference
		// 		localStorage.removeItem('theme');
	}
	let start_language = 'en';
	if (browser) {
		start_language = localStorage.getItem('language') ?? 'en';
	}
	initLocalizationContext(start_language);
	/*
	if (import.meta.env.VITE_SENTRY !== undefined && import.meta.env.PROD) {
		Sentry.init({
			dsn: String(import.meta.env.VITE_SENTRY),
			integrations: [new BrowserTracing()],

			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production
			tracesSampleRate: 0.5
		});
	}
	 */
</script>

<svelte:head>
	{#if plausible_data_url}
		<script
			defer
			data-domain={plausible_data_url}
			src="https://plausible.nexus.mawoka.eu/js/script.file-downloads.outbound-links.pageview-props.tagged-events.js"
		></script>
		<script>
			window.plausible =
				window.plausible ||
				function () {
					(window.plausible.q = window.plausible.q || []).push(arguments);
				};
		</script>
	{/if}
</svelte:head>

<!-- {#if navbarVisible.visible = true.visible}
	<Navbar />
	<div class="pt-16 h-screen">
		<div class="z-40"></div>
		<slot />
	</div>
{:else}
	<slot />
{/if} -->
{#if navbarVisible.visible}
	<Navbar />
	<div class="pt-16">
		<div class="z-40"></div>
		<!-- extra content above slot -->
	</div>
{/if}
<slot />
<CommandPalette />

<!--{#if $alertModal.open ?? false}
	<div
		class="fixed inset-0 h-screen w-screen bg-black z-30 bg-opacity-60 items-center justify-center content-center"
		class:hidden={!$alertModal.open}
		class:flex={$alertModal.open}
		class:visible={$alertModal.open}
	>
		<Alert
			bind:title={$alertModal.title}
			bind:body={$alertModal.body}
			bind:open={$alertModal.open}
		/>
	</div>
{/if}-->

<style lang="scss">
:global(html:not(.dark)) {
    background: radial-gradient(1200px 600px at 0% 0%, #f7fafc 0%, #eef2f7 40%, #e9eef6 60%, #e7ecf5 100%),
      linear-gradient(135deg, #f9fbff, #f3f6fb);
    background-attachment: fixed;
    color: var(--text);
}

:global(html.dark) {
    background: radial-gradient(1200px 600px at 0% 0%, #0b0f14 0%, #0f141b 40%, #121922 70%, #141b25 100%),
      linear-gradient(135deg, #0b0f14, #0e141c);
    background-attachment: fixed;
    color: var(--text);

		:global(#pips-slider) {
			--pip: white;
			--pip-active: white;
		}
	}

	@keyframes background_animation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
