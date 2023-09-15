<script lang="ts">
	import { getMints, parseInvoice, pay, send } from "../../../../../dist/lib/es6";
	import { activeMint } from "../../util/mint";
	import { toast } from "../../util/toast";

    let invoice = '' 
    let amount = 0
    let fee = 0
    const sendLightning = async ()=> {
        const {fee: invoiceFee, amount: invoiceAmount} = await parseInvoice($activeMint.url,invoice)
        fee = invoiceFee
        amount = invoiceAmount
    }
    const doSendLightning = async ()=> {
        const message = await pay($activeMint.url,invoice,amount,fee)
        toast(message)
    }
</script>

<div class="flex flex-col ">
    
    {#if amount}
    <div>
        <div>

            <p>
                amount 
            </p>
            <p>{amount}</p>
        </div>
        <div>

            <p>
                fees
            </p>
            <p>
                {fee}
            </p>
        </div>
    </div>
    <button class="btn btn-primary" on:click={doSendLightning}>send</button>
    {:else}
    <div>

        <input type="text" class="input input-primary" placeholder="lnbc..." bind:value={invoice}/>
        <button class="btn btn-primary" on:click={sendLightning}>parse</button>
        
    </div>
    {/if}
</div>