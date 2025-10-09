import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type WelcomeRouteProp = RouteProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const route = useRoute<WelcomeRouteProp>();
  const { username } = route.params || { username: "Usuario" };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.subtitle}>Nos alegra verte de nuevo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#1e293b",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  username: {
    color: "#3b82f6",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 16,
  },
});
