<script lang="ts">
	import { initStorage } from "../../../dist/lib/es6";
	import Wallet from "./lib/Wallet.svelte";
	initStorage()
</script>

<div>

	<p class="text-3xl font-bold text-center">
		headless-cashu
	</p>
	<Wallet>
		
	</Wallet>
</div>