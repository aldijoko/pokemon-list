<script>
     /** @type {import('./$types').PageData} */
     export let data;
	import { goto } from "$app/navigation";
    import { page } from "$app/stores"
	import CardPokemon from "../lib/component/CardPokemon.svelte";
    import { generations } from "../lib/store/generation";
    

    const {monster} = data

    let form = {
        searchString: ''
    }
    //for searching input
    let searchString = ''
    $: selectedMonster = monster.filter((e) => {
        return  e.name.toLowerCase().includes(searchString.toLowerCase());
    })

    //for showing search params
    $: monsterId = $page.url.searchParams.get('monsterId') || '';
    $: monsters = data.monster.find((e) => e.id === monsterId)

    $: monsterId2 = $page.url.searchParams.get('monsterId2') || '';
    $: monsters2 = data.monster.find((e) => e.id === monsterId2)
    // const monsterClick = (monster) => {
    //     monsterId = monster.id
    //     goto(`?monsterId=${monsterId}`)
    // }

    // get selected generation
    $: selectedGeneration = $page.url.searchParams.get('generation_id') || '';

    const updateSearchParams = (key, value) => {
        const searchParams = new URLSearchParams($page.url.searchParams);
        // console.log(searchParams)
        searchParams.set(key, value);
        goto(`?${searchParams.toString()}`);
    }

    const submitSearch = () => {
        searchString = form.searchString
    }
</script>


<div class="w-full px-20 py-10">
    {#if monsters}
    <div class="w-52 h-52">
        <CardPokemon monster={monsters}/>
    </div>
    {/if}
    {#if monsters2}
    <div class="w-52 h-52">
        <CardPokemon 
     monster={monsters2}/>
    </div> 
    {/if}
    
    
    <div class="w-full flex justify-center gap-5 py-5">
        <button
        class="px-5 py-1 rounded-md bg-slate-500 text-white hover:bg-slate-600"
        class:isActive={selectedGeneration === 'all'}
        on:click={() => updateSearchParams('generation_id', 'all')}>
            All
        </button>
        {#each generations as generation (generation.id)}
        <button 
            on:click={() => updateSearchParams('generation_id', generation.id.toString())}
            class="px-5 py-1 rounded-md bg-slate-500 text-white hover:bg-slate-600"
            class:isActive={selectedGeneration === generation.id.toString()}>
            <p>{generation.main_region}</p>
        </button>
        
        {/each}
    </div>
    <div class="w-full flex justify-center py-5">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <form on:submit|preventDefault={submitSearch}>
            <input class="border border-blue-200 rounded-md px-2 py-2" type="text" bind:value={form.searchString} placeholder="Pokemon Name">
            <input class="border px-4 py-2 rounded-md bg-slate-500 cursor-pointer hover:bg-slate-600 ml-2 text-white" type="submit" value="Search">
        </form>
        
    </div>
    <div class="grid grid-cols-6 w-full h-full gap-5">
        {#each selectedMonster as monster (monster.id)}
        
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="w-full h-full border rounded-md p-5 m-2  relative bg-gray-200 hover:bg-gray-400 cursor-pointer" >
            <div on:click={() => updateSearchParams('monsterId', monster.id)}>
                <div class="flex flex-col items-center">
                    <img src={monster.image} alt={monster.name}>
                    <h1>{monster.name}</h1>
                </div>
                <div class="absolute top-2 left-2 text-slate-500 text-sm">
                    {monster.id}
                </div>
            </div>
            <div on:click={()=> updateSearchParams('monsterId2', monster.id)}>
                Add Monster 2
            </div>
            
        </div>
        
        
        {/each}
    </div>
</div>




<style lang="postcss">
    .isActive {
        background-color: #2b6cb0;
    }
</style>