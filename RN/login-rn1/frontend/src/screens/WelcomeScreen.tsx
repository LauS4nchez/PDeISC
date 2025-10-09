import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type WelcomeRouteProp = RouteProp<RootStackParamList, "Welcome">;
type NavigationProp = StackNavigationProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const route = useRoute<WelcomeRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { username } = route.params || { username: "Usuario" };

  const handleLogout = () => {
    navigation.replace("Login"); // vuelve al login y limpia el historial
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.subtitle}>Nos alegra verte de nuevo</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
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
    color: "#2563eb",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    color: "#475569",
    fontSize: 16,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  logoutText: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "500",
  },
});
