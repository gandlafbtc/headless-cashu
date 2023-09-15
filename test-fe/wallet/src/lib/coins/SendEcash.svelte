<script lang="ts">
	import type { AmountPreference } from '@cashu/cashu-ts';
	import { getBalance, getMints, send } from '../../../../../dist/lib/es6';
	import { balance } from '../../util/balance';
	import { toast } from '../../util/toast';
	import PreferenceSelector from './PreferenceSelector.svelte';

	let amount;
	let isSendCustom = false;
	let preference: AmountPreference[] = [];

	let token = '';

	const sendEcash = async () => {
		const message = await send(getMints()[0].url, amount);
		toast(message);
		token = message.params?.token;
		balance.set(getBalance());
	};
	const selectCustomEcash = async () => {
		isSendCustom = true;
	};
	const sendCustomEcash = async () => {
		const message = await send(getMints()[0].url, amount,preference);
		toast(message);
		token = message.params?.token;
		balance.set(getBalance());
	};
</script>

<div class="flex flex-col gap-2">

	<div class="flex gap-2">
		
		{#if !isSendCustom}
	<input type="number" class="input input-primary" placeholder="0" bind:value={amount} />
	<button class="btn btn-primary {amount ? '' : 'btn-disabled'}" on:click={sendEcash}>send</button>
	<button class="btn btn-primary {amount ? '' : 'btn-disabled'}" on:click={selectCustomEcash}
		>select custom</button
		>
{:else}
	<div class="flex flex-col">
		<PreferenceSelector bind:preference />
		sats to send: {amount} sats
		
		<div>
			<button class="btn btn-primary" on:click={sendCustomEcash}>send custom</button>
			<button
				class="btn btn-primary"
				on:click={() => {
					isSendCustom = false;
				}}>cancel</button
			>
		</div>
	</div>
	
	{/if}
	
</div>
{#if token}
<textarea class="textarea w-full h-32" readonly bind:value={token}></textarea>
{/if}
</div>