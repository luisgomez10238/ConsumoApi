import { View, Text, Image, ScrollView, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';

// CONCEPTO: props - recibe el Pokémon tocado en la lista y la función para volver
export default function DetailScreen({ pokemon: selected, onBack }) {
  const { pokemon, loading, error, retry } = usePokemonDetail(selected.id);

  const renderContent = () => {
    // Estado: cargando
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e3350d" />
          <Text style={styles.message}>Cargando ficha...</Text>
        </View>
      );
    }

    // Estado: error
    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
          <Pressable style={styles.button} onPress={retry}>
            <Text style={styles.buttonText}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }

    // Estado: éxito
    const number = '#' + String(pokemon.id).padStart(3, '0');
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return (
      <ScrollView contentContainerStyle={styles.content}>
        {/* CONCEPTO: Image con URL remota - necesita width y height explícitos */}
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.typesRow}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.measures}>
          <View style={styles.measure}>
            <Text style={styles.measureValue}>{pokemon.height} m</Text>
            <Text style={styles.measureLabel}>Altura</Text>
          </View>
          <View style={styles.measure}>
            <Text style={styles.measureValue}>{pokemon.weight} kg</Text>
            <Text style={styles.measureLabel}>Peso</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Estadísticas base</Text>
        <View style={styles.stats}>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} name={stat.name} value={stat.value} />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
      {/* El botón se muestra siempre para poder salir aunque haya error o carga */}
      <Pressable
        onPress={onBack}
        style={({ pressed }) => [styles.button, styles.backButton, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>Volver a la lista</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  message: { textAlign: 'center', marginTop: 12, color: '#666', paddingHorizontal: 16 },
  content: { alignItems: 'center', padding: 16 },
  image: { width: 240, height: 240 },
  number: { fontSize: 14, color: '#666', marginTop: 4 },
  name: { fontSize: 30, fontWeight: 'bold' },
  typesRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  measures: { flexDirection: 'row', gap: 16, marginTop: 20 },
  measure: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  measureValue: { fontSize: 18, fontWeight: 'bold' },
  measureLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  sectionTitle: { alignSelf: 'flex-start', fontSize: 18, fontWeight: 'bold', marginTop: 24 },
  stats: { alignSelf: 'stretch', marginTop: 8 },
  button: {
    backgroundColor: '#e3350d',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    alignItems: 'center',
  },
  backButton: { margin: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  pressed: { opacity: 0.6 },
});