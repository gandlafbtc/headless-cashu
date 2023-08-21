<script lang="ts">
	import { getBalance, receive } from "../../../../dist/lib/es6";

    let sendableToken = ''
    let balance = getBalance()
    let receiveTokenString = ''

    const receiveToken = async () => {
        const message = await receive(receiveTokenString)
        if (message.code.startsWith('E')) {
            
        }
        balance = getBalance()
    }

    
</script>

<div class="flex flex-col gap-10">
    <div class="flex gap-2 text-center w-full items-baseline">

        <p class="font-bold text-3xl text-center">
            {balance}
        </p>
        <p> sats</p>
    
    </div>
<div class="flex gap-2">

    <input class="input input-primary" type="text" placeholder="cashuAey..." bind:value={receiveTokenString}>
    <button class="btn btn-primary" on:click={receiveToken}>receive</button>

</div>
<div class="flex gap-2">

    <input type="number" class="input input-primary" placeholder="0">
    <button class="btn btn-primary">send</button>
</div>
</div>