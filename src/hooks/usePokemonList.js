// src/hooks/usePokemonList.js
import { useState, useEffect } from 'react';
import { getPokemonList } from '../services/pokeApi';

const PAGE_SIZE = 20;

export function usePokemonList() {
  // CONCEPTO: useState 
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [attempt, setAttempt] = useState(0); 
  // CONCEPTO: useEffect con array de dependencias - la petición se repite
  // solo cuando cambia `page` o `attempt`, no en cada render
  useEffect(() => {
    async function loadPage() {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonList(PAGE_SIZE, page * PAGE_SIZE);
        // Agregamos la nueva página al final de la lista que ya teníamos
        setPokemon((previous) => [...previous, ...data.results]);
        setHasMore(data.hasMore);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }
    loadPage();
  }, [page, attempt]);

  // Se llama al llegar al final de la lista (onEndReached)
  function loadMore() {
    // Solo pedimos más si no hay una petición en curso, hay más datos y no hubo error
    if (!loading && hasMore && !error) {
      setPage(page + 1);
    }
  }

  // "Reintentar": cambia `attempt` para que el useEffect vuelva a pedir la misma página
  function retry() {
    setAttempt(attempt + 1);
  }

  return { pokemon, loading, error, loadMore, retry };
}