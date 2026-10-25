import { View, Text, StyleSheet } from 'react-native';
import { TYPE_INFO } from '../constants/pokemonTypes';

// CONCEPTO: props - el distintivo solo recibe el nombre del tipo y se dibuja
export default function TypeBadge({ type }) {
  // Si aparece un tipo nuevo que no está en la paleta, se muestra en gris
  const info = TYPE_INFO[type] ?? { label: type, color: '#999' };

  return (
    <View style={[styles.badge, { backgroundColor: info.color }]}>
      <Text style={styles.text}>{info.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});