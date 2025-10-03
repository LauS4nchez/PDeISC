import { View, Text, StyleSheet } from 'react-native';

export default function HolaMundoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.hola}>¡Hola Mundo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // centra vertical
    alignItems: 'center', // centra horizontal
    backgroundColor: '#f1f2f6',
  },
  hola: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#2f3542',
  },
});
