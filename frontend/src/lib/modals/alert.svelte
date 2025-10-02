<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<!--
By Flowbite, but changed: https://flowbite.com/docs/components/modal/#default-modal
-->
<script lang="ts">
	interface Props {
		title: string;
		body: string;
		open: boolean;
	}

	let { title, body, open = $bindable() }: Props = $props();
	console.log(open, title, body);
	open = true;
</script>

<!-- Main modal -->
{#if open}
    <div tabindex="-1" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div class="modal-panel w-5/6 lg:w-2/6">
            <!-- Modal content -->
            <div class="relative rounded-2xl">
				<!-- Modal header -->
				<div
                    class="flex justify-between items-start p-4 rounded-t border-b border-black/5 dark:border-white/10"
				>
                    <h3 class="text-xl font-semibold">
						{title}
					</h3>
					<button
						type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600"
						onclick={() => {
							open = false;
						}}
					>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
				<!-- Modal body -->
                <div class="p-6 space-y-4">
                    <p class="text-base leading-relaxed text-[color:var(--text-muted)]">
						{body}
					</p>
				</div>
				<!-- Modal footer -->
				<div
                    class="flex items-center p-6 space-x-2 rounded-b border-t border-black/5 dark:border-white/10"
				>
					<button
						data-modal-toggle="defaultModal"
						type="button"
						onclick={() => {
							open = false;
						}}
                        class="brand-button brand-button-hover text-sm px-5 py-2.5"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
