<script lang="ts">
	import { getBalance } from '../../../../../dist/lib/es6';
	import { balance, mintBalance } from '../../util/balance';
	import ReceiveEcash from './ReceiveEcash.svelte';
	import ReceiveLightning from './ReceiveLightning.svelte';
	import SendEcash from './SendEcash.svelte';

	let receiveEcash = true;
	let sendEcash = true;

</script>

<div class="flex flex-col gap-10">
	<div class="flex flex-col gap-2 text-center w-full items-center justify-">
		<div class="flex gap-1 items-baseline">

			<p class="font-bold text-3xl text-center">
				{$mintBalance}
			</p>
			<p>sats</p>
		</div>
		<div class="flex gap-1 items-baseline">
		(Total: 
		<p class="font-bold text-center">
			{$balance}
		</p>
		<p>sats</p>
		)
		</div>
	</div>

	<div class="flex flex-col gap-2 bg-base-300 p-2">
		<div class="divider font-bold">receive</div>
		<div class="tabs tabs-boxed flex justify-around">
			<button
				class="tab {receiveEcash ? 'bg-accent' : ''} flex-grow"
				on:click={() => {
					receiveEcash = true;
				}}>ecash</button
			>
			<button
				class="tab {receiveEcash ? '' : 'bg-accent'} flex-grow"
				on:click={() => {
					receiveEcash = false;
				}}>lightning</button
			>
		</div>
		<div class="flex gap-2">
			{#if receiveEcash}
				<ReceiveEcash></ReceiveEcash>
			{:else}
				<ReceiveLightning></ReceiveLightning>
			{/if}
		</div>
	</div>

	<div class="flex flex-col gap-2 bg-base-300 p-2">
		<div class="divider font-bold">send</div>
		<div class="tabs tabs-boxed flex justify-around">
			<button
				class="tab {sendEcash ? 'bg-accent' : ''} flex-grow"
				on:click={() => {
					sendEcash = true;
				}}>ecash</button
			>
			<button
				class="tab {sendEcash ? '' : 'bg-accent'} flex-grow"
				on:click={() => {
					sendEcash = false;
				}}>lightning</button
			>
		</div>
		<div class="flex gap-2">
			{#if sendEcash}
				<SendEcash></SendEcash>
			{:else}
				<input type="text" class="input input-primary" placeholder="lnbc....." />
				<button class="btn btn-primary">send</button>
			{/if}
		</div>
	</div>
</div>
