<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script>
	import '../app.css';
	import Navbar from '$lib/navbar.svelte';
	import { navbarVisible, pathname } from '$lib/stores';
	import * as Sentry from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing';
	import { initLocalizationContext } from '$lib/i18n';
	import { browser } from '$app/environment';
	import CommandPalette from '$lib/components/commandpalette.svelte';
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

	initLocalizationContext();

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
</script>

<svelte:head>
	{#if plausible_data_url}
		<link rel="prefetch" href="https://sugar.mawoka.eu.org/" />
		<script
			async=""
			defer=""
			data-domain={plausible_data_url}
			src="https://sugar.mawoka.eu.org/js/plausible.hash.outbound-links.js"
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

{#if $navbarVisible}
	<Navbar />
	<div class="pt-16 h-screen">
		<div class="z-40" />
		<slot />
	</div>
{:else}
	<slot />
{/if}
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
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		background-attachment: fixed;
		min-height: 100vh;
		color: #1f2937;
	}

	:global(html.dark) {
		background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
		background-attachment: fixed;
		min-height: 100vh;
		color: #f9fafb;

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
