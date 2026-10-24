import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

// CONCEPTO: props - el texto y las funciones vienen de la pantalla (ListScreen),
// este componente solo dibuja el buscador
export default function SearchBar({ value, onChangeText, onSearch }) {
  return (
    <View style={styles.row}>
      {/* CONCEPTO: TextInput controlado - su valor viene de un useState */}
      <TextInput
        style={styles.input}
        placeholder="Busca por nombre o número..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch} // tecla "Enter" del teclado
        returnKeyType="search"
        autoCapitalize="none" 
        autoCorrect={false} 
      />
      <Pressable
        onPress={onSearch}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

// CONCEPTO: StyleSheet
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    padding: 12,
    gap: 8,
  },
  input: {
    flex: 1, 
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  button: {
    backgroundColor: '#e3350d',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});