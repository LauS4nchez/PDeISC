import { ThemedText } from '@/components/themed-text';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Bienvenido</ThemedText> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // centra verticalmente
    alignItems: 'center',     // centra horizontalmente
    backgroundColor: '#f2f2f2', // un gris claro de fondo
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333', // color oscuro para el texto
    textAlign: 'center',
  },
});
