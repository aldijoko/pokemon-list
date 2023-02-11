/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await res.json();

    
    const pokemon = data.results.map((e => {
      const id = e.url.split('/')[6]
      return {
        id,
        name: e.name,
        url: e.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      }
    }))
    
    return {
      monster: pokemon
    }
  }