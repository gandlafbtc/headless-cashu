<script lang="ts">
	import { onMount } from 'svelte';
	import Toastify from 'toastify-js';
	import 'toastify-js/src/toastify.css';
	import { addMint, getMints, removeMint, type Mint } from '../../../../dist/lib/es6';
	let mintUrl = '';
	let mints: Array<Mint> = [];
	onMount(() => {
		mints = getMints();
	});
	const addMintViaUrl = async () => {
		if (mints.filter((m) => m.url === mintUrl).length) {
			return;
		}
		const message = await addMint(mintUrl);
		if (message.code.startsWith('E')) {
			Toastify({
				text: `${message.code}: ${message.message}. ${message.detail}`,
				duration: 3000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top', // `top` or `bottom`
				position: 'left', // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: 'linear-gradient(to right, hsl(var(--er)), #ff0038)'
				},
				onClick: function () {} // Callback after click
			}).showToast();
			console.log('error:', message);
			return;
		}
		mints = getMints();
	};
    const deleteMint = (url: string) => {
        removeMint(url)
		mints =  getMints()
    }
</script>

<div>
	<input class="input input-primary" type="text" bind:value={mintUrl} placeholder="https://minturl.com"/>
	<button class="btn btn-primary" on:click={addMintViaUrl}>add</button>

	<p />

    <h3 class="pt-5 font-bold">added Mints:</h3>
    {#each mints as mint}
    
    <div class="flex gap-2 items-center pt-2">

        <p>

            {mint.url} 
        </p>
        <button class="btn btn-circle btn-error btn-sm " on:click={()=> deleteMint(mint.url)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              
        </button>
    </div>
	{/each}
</div>
