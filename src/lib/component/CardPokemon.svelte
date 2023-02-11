<script>
    export let monster = []

    // export let onClick = 
</script>

<div class="w-full h-full border rounded-md p-5 m-2  relative bg-gray-200 hover:bg-gray-400 cursor-pointer" >
    <div class="p-2">
        <div class="flex flex-col items-center">
            <img src={monster.image} alt={monster.name}>
            <h1>{monster.name}</h1>
        </div>
        <div class="absolute top-2 left-2 text-slate-500 text-sm">
            {monster.id}
        </div>
    </div>
    <!-- <div on:click={()=> updateSearchParams('monsterId2', monster.id)}>
        Add Monster 2
    </div> -->
    
</div>

<style lang="postcss">

</style>