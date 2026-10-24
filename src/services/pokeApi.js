const BASE_URL = 'https://pokeapi.co/api/v2';
const IMAGE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

// CONCEPTO: el signal permite cancelar la petición si la pantalla cambia o se cierra
export async function getPokemonList(limit, offset, signal) {
  // CONCEPTO: async/await con fetch
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, { signal });

  // CONCEPTO: response.ok - se revisa antes de llamar a response.json()
  if (!response.ok) {
    throw new Error('REQUEST_FAILED');
  }

  const data = await response.json();

  return {
    hasMore: data.next !== null,
    results: data.results.map((item) => {
      const id = getIdFromUrl(item.url);
      return { id, name: item.name, image: `${IMAGE_URL}/${id}.png` };
    }),
  };
}

export async function getPokemon(nameOrId, signal) {
  
  const query = String(nameOrId).trim().toLowerCase();
  const response = await fetch(`${BASE_URL}/pokemon/${query}`, { signal });

  // Si el Pokémon no existe, la API responde 404 con texto plano, no con JSON
  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }
  if (!response.ok) {
    throw new Error('REQUEST_FAILED');
  }

  const data = await response.json();

  // Devolvemos solo los campos que usa la app
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map((t) => t.type.name),
    stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    height: data.height / 10, 
    weight: data.weight / 10, 
  };
}