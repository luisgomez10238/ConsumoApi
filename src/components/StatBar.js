import { View, Text, StyleSheet } from 'react-native';
import { STAT_LABELS } from '../constants/pokemonTypes';

const MAX_STAT = 255; // valor máximo posible de una estadística base

export default function StatBar({ name, value }) {
  const label = STAT_LABELS[name] ?? name;
  
  const width = `${Math.min(value / MAX_STAT, 1) * 100}%`;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  label: { width: 100, fontSize: 14, color: '#444' },
  value: { width: 36, fontSize: 14, fontWeight: 'bold', textAlign: 'right' },
  track: {
    flex: 1,
    height: 10,
    marginLeft: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: '#e3350d', borderRadius: 5 },
});