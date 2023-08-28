<script lang="ts">
	import { send } from "../../../../../dist/lib/es6";
	import { toast } from "../../util/toast";

    const sendEcash = async ()=> {
        // const message = await send(mint);
		// toast(message);
		// balance = getBalance();
    }
</script>


<input type="number" class="input input-primary" placeholder="0" />
<button class="btn btn-primary" on:click={sendEcash}>send</button>