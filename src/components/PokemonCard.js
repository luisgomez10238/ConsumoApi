import { Pressable, Text, Image, StyleSheet } from 'react-native';

// CONCEPTO: props - la tarjeta recibe los datos y la función desde afuera,
// no hace ninguna petición a la API
export default function PokemonCard({ pokemon, onPress }) {
  // Número con 3 dígitos: 25 -> "#025"
  const number = '#' + String(pokemon.id).padStart(3, '0');

  // Nombre con la primera letra en mayúscula: "pikachu" -> "Pikachu"
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Pressable
      onPress={() => onPress(pokemon)}
      // El estilo cambia mientras el usuario mantiene presionado
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {/* CONCEPTO: Image con URL remota - necesita width y height explícitos o no se ve */}
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, 
    margin: 6,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  image: {
    width: 110,
    height: 110,
  },
  number: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});