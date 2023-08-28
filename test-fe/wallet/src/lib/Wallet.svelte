<script lang="ts">
	import Coins from "./coins/Coins.svelte";
import Mints from "./Mints.svelte";
</script>

<div class="grid grid-cols-3 gap-5 pt-10 w-full border-base-content border p-2 h-screen">
	<div class="flex flex-col w-full">
		<h2 class="font-bold text-lg">
			Mints
		</h2>
	
		<Mints></Mints>
	</div>
	<div class="flex flex-col w-full">
		<h2 class="font-bold text-lg">
			Coins
		</h2>
	
		<Coins></Coins>
	</div>

</div>