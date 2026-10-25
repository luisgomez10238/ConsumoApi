import { useState, useEffect } from 'react';
import { getPokemon } from '../services/pokeApi';

export function usePokemonDetail(id) {
  // CONCEPTO: useState - datos y estados de la interfaz (éxito, cargando, error)
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0); // sube 1 cada vez que se pulsa "Reintentar"

  // CONCEPTO: useEffect con array de dependencias - la petición se repite
  // solo cuando cambia `id` o `attempt`, nunca en cada render
  useEffect(() => {
    const controller = new AbortController();

    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemon(id, controller.signal);
        setPokemon(data);
      } catch (err) {
        // Si la petición fue cancelada no es un error real
        if (err.name !== 'AbortError') {
          setError('No se pudo cargar la ficha. Revisa tu internet.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadDetail();
    // Si el usuario vuelve a la lista antes de que termine, se cancela la petición
    return () => controller.abort();
  }, [id, attempt]);

  const retry = () => setAttempt(attempt + 1);

  return { pokemon, loading, error, retry };
}