<script lang="ts">
	import { getBalance, receive } from "../../../../../dist/lib/es6";
	import { balance } from "../../util/balance";
	import { toast } from "../../util/toast";


    let receiveTokenString =''
    const receiveToken = async () => {
		const message = await receive(receiveTokenString);
		toast(message);
		balance.set(getBalance())
	};
</script>
<input
	class="input input-primary"
	type="text"
	placeholder="cashuAey..."
	bind:value={receiveTokenString}
/>
<button class="btn btn-primary" on:click={receiveToken}>receive</button>
