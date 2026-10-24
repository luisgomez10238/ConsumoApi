import { StatusBar } from 'expo-status-bar';
import ListScreen from './src/screens/ListScreen';

export default function App() {
  return (
    <>
      <ListScreen onSelect={(p) => console.log('Seleccionado:', p.name)} />
      <StatusBar style="auto" />
    </>
  );
}