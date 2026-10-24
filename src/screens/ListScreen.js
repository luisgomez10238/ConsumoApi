import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPokemon } from '../services/pokeApi';
import { usePokemonList } from '../hooks/usePokemonList';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';

export default function ListScreen({ onSelect }) {
  const { pokemon, loading, error, loadMore, retry } = usePokemonList();
  const [searchText, setSearchText] = useState(''); // lo que el usuario escribe
  const [query, setQuery] = useState(''); 
  const [result, setResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null); // 'NOT_FOUND' o 'ERROR'
  const [searchAttempt, setSearchAttempt] = useState(0); // para "Reintentar" en la búsqueda

  // CONCEPTO: useEffect con array de dependencias - busca solo cuando cambia `query` o `searchAttempt`
  useEffect(() => {
    // Sin texto no hay búsqueda: se vuelve a mostrar la lista normal
    if (query === '') {
      setResult(null);
      setSearchError(null);
      return;
    }

    const controller = new AbortController();

    const search = async () => {
      setSearchLoading(true);
      setSearchError(null);
      setResult(null);
      try {
        const data = await getPokemon(query, controller.signal);
        setResult(data);
      } catch (err) {
        // Si la petición fue cancelada no es un error real
        if (err.name !== 'AbortError') {
          setSearchError(err.message === 'NOT_FOUND' ? 'NOT_FOUND' : 'ERROR');
        }
      } finally {
        if (!controller.signal.aborted) setSearchLoading(false);
      }
    };

    search();
    return () => controller.abort();
  }, [query, searchAttempt]);

  // Cambiar `query` dispara el useEffect. trim y toLowerCase: ignora espacios y mayúsculas
  const handleSearch = () => {
    setQuery(searchText.trim().toLowerCase());
  };

  const renderSearch = () => {
    if (searchLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e3350d" />
          <Text style={styles.message}>Buscando...</Text>
        </View>
      );
    }
    if (searchError === 'NOT_FOUND') {
      return <Text style={styles.message}>No se encontró ningún Pokémon con "{query}" 🔍</Text>;
    }
    if (searchError === 'ERROR') {
      return (
        <View style={styles.center}>
          <Text style={styles.message}>No se pudo conectar con la API. Revisa tu internet.</Text>
          <Pressable style={styles.retryButton} onPress={() => setSearchAttempt(searchAttempt + 1)}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }
    if (result) {
      return <PokemonCard pokemon={result} onPress={onSelect} />;
    }
    return null;
  };

  // Vista de la lista normal
  const renderList = () => {
    // Primera carga: pantalla completa
    if (loading && pokemon.length === 0) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e3350d" />
          <Text style={styles.message}>Cargando Pokémon...</Text>
        </View>
      );
    }
    // Error en la primera carga
    if (error && pokemon.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={retry}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }
  
    return (
      // CONCEPTO: FlatList - lista eficiente, solo dibuja lo que se ve en pantalla
      <FlatList
        data={pokemon}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} onPress={onSelect} />}
        onEndReached={loadMore} // scroll infinito: al llegar al final pide más
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color="#e3350d" style={styles.footer} />
          ) : error ? (
            <View style={styles.center}>
              <Text style={styles.message}>{error}</Text>
              <Pressable style={styles.retryButton} onPress={retry}>
                <Text style={styles.retryText}>Reintentar</Text>
              </Pressable>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PokéDex Explorer</Text>
      <SearchBar value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />
      {query !== '' ? renderSearch() : renderList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 8 },
  center: { alignItems: 'center', marginTop: 24 },
  message: { textAlign: 'center', marginTop: 12, color: '#666', paddingHorizontal: 16 },
  retryButton: {
    backgroundColor: '#e3350d',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  retryText: { color: '#fff', fontWeight: 'bold' },
  listContent: { paddingHorizontal: 6, paddingBottom: 24 },
  footer: { marginVertical: 16 },
});