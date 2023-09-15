<script lang="ts">
	import { onMount } from 'svelte';

	import { addMint, getMints, removeMint, type Mint, getBalance } from '../../../../dist/lib/es6';
	import { toast } from '../util/toast';
	import { set } from '../../../../dist/lib/es6/storage/storage';
	import { activeMint } from '../util/mint';
	
	let mintUrl = '';
	let mints: Array<Mint> = [];
	onMount(() => {
		mints = getMints();
	});
	const addMintViaUrl = async () => {
		if (mints.filter((m) => m.url === mintUrl).length) {
			toast({ code: 'E111', message: 'mint already added', detail: mintUrl });
			return;
		}
		const message = await addMint(mintUrl);
		toast(message);
		mints = getMints();
		return;
	};
	const deleteMint = (url: string) => {
		removeMint(url);
		mints = getMints();
	};
	const makeDefault = (i) => {
		const mintsOrdered = [...mints]
		const newDefault = {...mints[i]}
		mintsOrdered.splice(i)
		mintsOrdered.unshift(newDefault)
		set('cashu-mints', mintsOrdered)
		mints = getMints()
		activeMint.set(mints[0])
	}
</script>

<div>
	<input
		class="input input-primary"
		type="text"
		bind:value={mintUrl}
		placeholder="https://minturl.com"
	/>
	<button class="btn btn-primary" on:click={addMintViaUrl}>add</button>

	<p />

	<h3 class="pt-5 font-bold">added Mints:</h3>
	{#each mints as mint, i}
		<div class="flex gap-2 items-center p-2 {i===0? 'bg-blue-950':''}">
			<button
				class="btn btn-circle {i === 0 ? 'btn-success' : ''} btn-sm"
				on:click={() => makeDefault(i)}
			>
				{#if i === 0}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
				{/if}
			</button>
			<button class="btn btn-circle btn-error btn-sm" on:click={() => deleteMint(mint.url)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</button>
			<div class="flex gap-1 items-center justify-between w-full">
				<p class="w-full">
					{mint.url}
				</p>
				<p>
					{getBalance([mint.url])} sats
				</p>
			</div>
		</div>
	{/each}
</div>
