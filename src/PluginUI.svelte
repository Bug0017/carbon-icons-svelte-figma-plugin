<script>

	import {onMount} from "svelte";
	import * as Icons from "@carbon/icons"
	import { getAttributes, toSVG } from '@carbon/icon-helpers';
	
	let svgs;

	onMount(()=>{
		Object.values(Icons).map(icon => {
			const iconNode = toSVG({
					...icon,
					attrs: getAttributes(icon.attrs),
			});
			svgs.append(iconNode)


			iconNode.addEventListener('click', (e)=> {

				console.log(e.target)
					parent.postMessage({ pluginMessage: { 
						'type': 'import-icon', 
						iconSVG:icon
					} }, '*');
			})
		})
	})

</script>


<div class="wrapper p-xxsmall">
	<div bind:this={svgs} class="svgs"></div>
</div>


<style>
.svgs{
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}

:global(.svgs svg){
	margin-bottom: 2rem;
}

:global(.svgs svg:hover){
	color: blueviolet;
}
</style>