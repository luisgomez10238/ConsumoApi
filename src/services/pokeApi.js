// src/services/pokeApi.js
const BASE_URL = 'https://pokeapi.co/api/v2';
const IMAGE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

// La lista solo trae nombre y url, por eso el id se saca del final de la url
function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export async function getPokemonList(limit = 20, offset = 0) {
  // CONCEPTO: async/await con fetch - esperamos la respuesta antes de convertirla
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  // CONCEPTO: response.ok - siempre se revisa antes de llamar a response.json()
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

export async function getPokemon(nameOrId) {
  
  const query = String(nameOrId).trim().toLowerCase();
  const response = await fetch(`${BASE_URL}/pokemon/${query}`);

  // Si el Pokémon no existe, la API responde 404 con texto plano, no con JSON
  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }
  if (!response.ok) {
    throw new Error('REQUEST_FAILED');
  }

  const data = await response.json();

  
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