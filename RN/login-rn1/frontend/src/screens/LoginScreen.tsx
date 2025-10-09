import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Audio } from "expo-av";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // función para reproducir sonido
  const playSuccessSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/success.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Error al reproducir el sonido:", error);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        text2: "Por favor, completá todos los campos.",
      });
      return;
    }

    try {
      const response = await fetch("http://10.0.3.17:3000/usuarios");
      const usuarios = await response.json();

      const user = usuarios.find(
        (u: any) => u.username === username && u.password === password
      );

      if (user) {
        Toast.show({
          type: "success",
          text1: "Inicio de sesión correcto",
          text2: `Bienvenido ${user.username}`,
        });

        await playSuccessSound();

        setTimeout(() => {
          navigation.replace("Welcome", { username: user.username });
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Usuario o contraseña incorrectos",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error de conexión",
        text2: "No se pudo conectar con el servidor.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Accedé con tus credenciales</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    color: "#1e293b",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
