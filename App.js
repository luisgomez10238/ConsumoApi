import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailScreen';

export default function App() {
  // CONCEPTO: useState - guarda qué Pokémon se tocó; null significa "mostrar la lista"
  const [selected, setSelected] = useState(null);

  return (
    <>
      {/* La lista no se desmonta: así conserva el scroll y los Pokémon ya cargados al volver */}
      <View style={[styles.screen, selected && styles.hidden]}>
        <ListScreen onSelect={setSelected} />
      </View>

      {selected && <DetailScreen pokemon={selected} onBack={() => setSelected(null)} />}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hidden: { display: 'none' },
});