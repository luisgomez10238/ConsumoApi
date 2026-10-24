// src/hooks/usePokemonList.js
import { useState, useEffect } from 'react';
import { getPokemonList } from '../services/pokeApi';

const PAGE_SIZE = 20;

export function usePokemonList() {
  // CONCEPTO: useState - datos y estados de la interfaz
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0); // página que se pide (0, 1, 2...)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [attempt, setAttempt] = useState(0); // sube 1 cada vez que se pulsa "Reintentar"

  // CONCEPTO: useEffect con array de dependencias - la petición se repite
  // solo cuando cambia `page` o `attempt`
  useEffect(() => {
    const controller = new AbortController();

    const loadPage = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonList(PAGE_SIZE, page * PAGE_SIZE, controller.signal);
        
        setPokemon((previous) => [...previous, ...data.results]);
        setHasMore(data.hasMore);
      } catch (err) {
        // Si la petición fue cancelada no es un error real
        if (err.name !== 'AbortError') {
          setError('No se pudo conectar con la API. Revisa tu internet.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadPage();
    // Al salir de la pantalla o cambiar de página se cancela la petición en curso
    return () => controller.abort();
  }, [page, attempt]);

  const loadMore = () => {
    if (!loading && hasMore && !error) {
      setPage(page + 1);
    }
  };

  // Cambiar `attempt` hace que el useEffect pida otra vez la misma página
  const retry = () => {
    setAttempt(attempt + 1);
  };

  return { pokemon, loading, error, loadMore, retry };
}