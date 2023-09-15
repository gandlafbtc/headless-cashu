<script lang="ts">
	import type { AmountPreference } from '@cashu/cashu-ts';
	import { getBalance, getMints } from '../../../../../dist/lib/es6';
	import { activeMint } from '../../util/mint';
	import { onMount } from 'svelte';

	export let preference: AmountPreference[];

	const mintBalance = getBalance([$activeMint.url]);
	$: available = getAvailableCoins();
	$: possible = getPossibleCoins();
	$: selectedAmount = preference.reduce((acc, curr) => acc + curr.amount * curr.count, 0);

	const getAvailableCoins = () => {
		const a: number[] = [];
		console.log;
		for (let index = 1; index <= mintBalance; index = index * 2) {
			console.log(index);
			a.push(index);
		}
		return a;
	};
	const getPossibleCoins = () => {
		const a: number[] = [];
		if (isNaN(selectedAmount)) {
			selectedAmount = 0;
		}
		for (let index = 1; index <= mintBalance - selectedAmount; index = index * 2) {
			a.push(index);
		}
		return a;
	};

	const addPreference = (amount: number) => {
		const field = preference.find((p) => p.amount === amount);
		if (field) {
			field.count++;
		} else {
			preference.push({ amount, count: 1 });
		}
		preference = preference;
        possible = getPossibleCoins()
	};

	const reset = () => {
		preference = [];
        possible = getPossibleCoins()
        

	};
</script>

<div class="flex justify-between items-center w-full flex-grow">
    <div class="gap-1">
        <p>
            Mint balance: {mintBalance}
        </p>
        <p>
            Selected total: {selectedAmount}
        </p>
    </div>
    <div class="grid grid-cols-3 gap-1">

        {#each available as denomination}
        <button
        class="btn {possible.includes(denomination) ? '' : 'btn-disabled'}"
        on:click={() => addPreference(denomination)}
        >
        {denomination}
    </button>
    {/each}
</div>
<button on:click={reset} class="btn btn-primary"> reset </button>
</div>
