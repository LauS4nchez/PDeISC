import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-root-toast";

type WelcomeRouteProp = RouteProp<RootStackParamList, "Welcome">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const route = useRoute<WelcomeRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const {
    username: initialUsername = "Usuario",
    photo: initialPhoto,
    email: initialEmail = "",
    location: initialLocation = "",
    telefono: initialTelefono = "",
    escaneo: initialEscaneo = false,
  } = route.params || {};

  const [isEditing, setIsEditing] = useState(false);

  const [username, setUsername] = useState(initialUsername);
  const [photo, setPhoto] = useState<string | null>(initialPhoto || null);
  const [email, setEmail] = useState(initialEmail);
  const [locationText, setLocationText] = useState(initialLocation);
  const [telefono, setTelefono] = useState(initialTelefono);
  const [escaneo, setEscaneo] = useState(Boolean(initialEscaneo));
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const [tempUsername, setTempUsername] = useState(username);
  const [tempPhoto, setTempPhoto] = useState(photo);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempLocationText, setTempLocationText] = useState(locationText);
  const [tempTelefono, setTempTelefono] = useState(telefono);
  const [tempEscaneo, setTempEscaneo] = useState(escaneo);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const imageStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (imageStatus.status !== "granted") {
          Alert.alert("Permiso denegado", "Se necesita permiso para acceder a la galería.");
        }
        const locationStatus = await Location.requestForegroundPermissionsAsync();
        if (locationStatus.status !== "granted") {
          Alert.alert("Permiso denegado", "Se necesita permiso para acceder a la ubicación.");
        }
      }
    })();
  }, []);

  const handleLogout = () => {
    navigation.replace("Login");
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setTempPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo seleccionar la imagen.");
    }
  };

  const removePhoto = () => {
    setTempPhoto(null);
  };

  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setTempLocationText(
        `Lat: ${location.coords.latitude.toFixed(5)}, Lon: ${location.coords.longitude.toFixed(5)}`
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la ubicación.");
    }
  };

  const clearLocation = () => {
    setCoords(null);
    setTempLocationText("");
  };

  // Validaciones
  const validarNombre = (nombre: string) => {
    // Letras (mayúsc/min), espacios y acentos (áéíóúüñÁÉÍÓÚÜÑ), max 40 chars
    const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{1,40}$/;
    return regex.test(nombre.trim());
  };

  const validarTelefono = (tel: string) => {
    // Solo números, entre 7 y 15 dígitos
    const regex = /^\d{7,15}$/;
    return regex.test(tel);
  };

  const saveChanges = () => {
    if (!validarNombre(tempUsername)) {
      // En lugar de Alert, mostramos toast
      Toast.show(
        "El nombre solo puede contener letras, espacios y acentos, con un máximo de 40 caracteres y sin números.",
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        }
      );
      return;
    }

    if (tempTelefono && !validarTelefono(tempTelefono)) {
      Alert.alert(
        "Teléfono inválido",
        "El teléfono debe contener solo números y tener entre 7 y 15 dígitos."
      );
      return;
    }

    // Guarda cambios
    setUsername(tempUsername.trim());
    setPhoto(tempPhoto);
    setEmail(tempEmail.trim());
    setLocationText(tempLocationText.trim());
    setTelefono(tempTelefono.trim());
    setEscaneo(tempEscaneo);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Descarta cambios
      setTempUsername(username);
      setTempPhoto(photo);
      setTempEmail(email);
      setTempLocationText(locationText);
      setTempTelefono(telefono);
      setTempEscaneo(escaneo);
    }
    setIsEditing(!isEditing);
  };

return (
  <View style={styles.container}>
    <Text style={styles.title}>Bienvenido</Text>

    {isEditing ? (
      tempPhoto ? (
        <>
          <Image source={{ uri: tempPhoto }} style={styles.avatar} />
          <View style={styles.photoButtonsRow}>
            <TouchableOpacity style={styles.photoButtonSmall} onPress={removePhoto}>
              <Text style={styles.photoButtonText}>Quitar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButtonSmall} onPress={pickImage}>
              <Text style={styles.photoButtonText}>Cambiar foto</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Text style={styles.photoButtonText}>Agregar foto</Text>
        </TouchableOpacity>
      )
    ) : photo ? (
      <Image source={{ uri: photo }} style={styles.avatar} />
    ) : null}

    {isEditing ? (
      <>
        <TextInput
          style={styles.input}
          value={tempUsername}
          onChangeText={setTempUsername}
          placeholder="Nombre"
          maxLength={40}
        />
        {/* Email no editable: mostrar como texto */}
        <Text style={[styles.subtitle, { marginBottom: 12 }]}>Email: {tempEmail || "-"}</Text>

        <View style={styles.locationRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={tempLocationText}
            onChangeText={setTempLocationText}
            placeholder="Ubicación"
          />
          <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
            <Text style={styles.locationButtonText}>Obtener</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationButton} onPress={clearLocation}>
            <Text style={styles.locationButtonText}>Limpiar</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          value={tempTelefono}
          onChangeText={(text) => {
            const clean = text.replace(/[^0-9]/g, "");
            setTempTelefono(clean);
          }}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          maxLength={15}
        />
        <View style={styles.escaneoRow}>
          <Text style={styles.escaneoLabel}>Escaneo de documento:</Text>
          <TouchableOpacity
            style={[
              styles.escaneoToggle,
              tempEscaneo ? styles.escaneoTrue : styles.escaneoFalse,
            ]}
            onPress={() => setTempEscaneo(!tempEscaneo)}
          >
            <Text style={styles.escaneoToggleText}>{tempEscaneo ? "Sí" : "No"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={toggleEdit}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.subtitle}>Email: {email || "-"}</Text>
        <Text style={styles.subtitle}>Ubicación: {locationText || "-"}</Text>
        <Text style={styles.subtitle}>Teléfono: {telefono || "-"}</Text>
        <Text style={styles.subtitle}>
          Escaneo de documento: {escaneo ? "Sí" : "No"}
        </Text>

        <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </>
    )}
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  photoButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  photoButtonSmall: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  photoButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#94a3b8",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  locationRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  locationButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 8,
    borderRadius: 8,
  },
  locationButtonText: {
    color: "#fff",
    fontWeight: "600",
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
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutText: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "500",
  },
  escaneoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  escaneoLabel: {
    fontSize: 16,
    color: "#475569",
    marginRight: 12,
  },
  escaneoToggle: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  escaneoTrue: {
    backgroundColor: "#16a34a",
  },
  escaneoFalse: {
    backgroundColor: "#ef4444",
  },
  escaneoToggleText: {
    color: "#fff",
    fontWeight: "600",
  },
});
