<script>

	//import Global CSS from the svelte boilerplate
	//contains Figma color vars, spacing vars, utility classes and more
	import {onMount} from "svelte";
	import * as Icons from "@carbon/icons"
	import { getAttributes, toSVG } from '@carbon/icon-helpers';
	//import some Svelte Figma UI components
	import { Button } from 'figma-plugin-ds-svelte';
	import * as _ from "lodash"

	let selectedIcon = true;	
	let iconSVG = 'icon node';
	let icons=[];
	let svgs;
	//this is a reactive variable that will return false when a value is selected from
	//the select menu, its value is bound to the primary buttons disabled prop
	$: disabled = selectedIcon === null;
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