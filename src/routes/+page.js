/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
    const generationId = url.searchParams.get('generation_id') || '1';
    let generationMonsterList = [];

    if(generationId == 'all'){
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await res.json();
      generationMonsterList = data.results
      
      // generationMonster = data.results.map((e => {
      //   const id = e.url.split('/')[6]
      //   return {
      //     id,
      //     name: e.name,
      //     url: e.url,
      //     image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      //   }
      // }))
    } else {
      const resGeneration = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`);
      const generationJson = await resGeneration.json();
      generationMonsterList = generationJson.pokemon_species;
    // console.log(generationJson);
      // generationMonster = generationJson.pokemon_species.map((e => {
      //   const id = e.url.split('/')[6]
      //   return {
      //     id,
      //     name: e.name,
      //     url: e.url,
      //     image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      //   }
      // }))
    }

    const generationMonster = generationMonsterList.map((e) => {
      const id = e.url.split('/')[6];
      return {
        id,
        name: e.name,
        url: e.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    })

    

    
    
    return {
      monster: generationMonster,
      // generationMonster: generationMonster
    }
  }
