<script lang="ts">
	import { getBalance, getTopupInvoiceForAmount, topup } from "../../../../../dist/lib/es6";
	import { balance } from "../../util/balance";
	import { activeMint } from "../../util/mint";
	import { toast } from "../../util/toast";

	let amount: number;
	let invoice: string
	let hash: string
	let mint: string = $activeMint.url


	const getInvoice = async () => {
		mint = $activeMint.url
		let message = await getTopupInvoiceForAmount(mint, amount)
		if (message.params) {
			const {invoice :pr, hash: h} = message.params
			invoice=pr
			hash=h
		}
		checkPayment()
	}

	const checkPayment = async () => {
		const message = await topup(mint, amount, hash)
		if (message.code.includes('E')){
			setTimeout(checkPayment, 5000)
		}
		else {
			balance.set(getBalance())
			invoice=''
			toast(message)
		}
	}

</script>

{#if invoice}
<a href="lightning:{invoice}">
	{invoice}
</a>
{:else}
<input class="input input-primary" type="number" placeholder="0" bind:value={amount} />
<button class="btn btn-primary" on:click={getInvoice}>receive</button>
{/if}
