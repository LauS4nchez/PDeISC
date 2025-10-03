import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Button,
  FlatList,
  SectionList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  Switch,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const flatData = [
    { id: "1", title: "Elemento A" },
    { id: "2", title: "Elemento B" },
  ];

  const sectionData = [
    { title: "Grupo 1", data: ["Item 1", "Item 2"] },
    { title: "Grupo 2", data: ["Item 3", "Item 4"] },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#2f3542" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* View */}
          <View style={styles.block}>
            <Text style={styles.title}>📦 View</Text>
            <Text>Es un contenedor para otros elementos.</Text>
          </View>

          {/* Text */}
          <View style={styles.block}>
            <Text style={styles.title}>📝 Text</Text>
            <Text>Se usa para mostrar texto en pantalla.</Text>
          </View>

          {/* Image */}
          <View style={styles.block}>
            <Text style={styles.title}>🖼 Image</Text>
            <Image
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              style={{ width: 50, height: 50 }}
            />
          </View>

          {/* TextInput */}
          <View style={styles.block}>
            <Text style={styles.title}>⌨️ TextInput</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe aquí..."
              value={inputText}
              onChangeText={setInputText}
            />
            <Text>Valor actual: {inputText}</Text>
          </View>

          {/* ScrollView */}
          <View style={styles.block}>
            <Text style={styles.title}>📜 ScrollView</Text>
            <Text>Permite desplazar el contenido con scroll.</Text>
          </View>

          {/* FlatList */}
          <View style={styles.block}>
            <Text style={styles.title}>📋 FlatList</Text>
            <FlatList
              data={flatData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Text>- {item.title}</Text>}
            />
          </View>

          {/* SectionList */}
          <View style={styles.block}>
            <Text style={styles.title}>📚 SectionList</Text>
            <SectionList
              sections={sectionData}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <Text>• {item}</Text>}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: "bold" }}>{title}</Text>
              )}
            />
          </View>

          {/* Button */}
          <View style={styles.block}>
            <Text style={styles.title}>🔘 Button</Text>
            <Button title="Presioname" onPress={() => Alert.alert("Botón")} />
          </View>

          {/* Pressable */}
          <View style={styles.block}>
            <Text style={styles.title}>👉 Pressable</Text>
            <Pressable
              onPress={() => Alert.alert("Pressable presionado")}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? "#74b9ff" : "#0984e3" },
              ]}
            >
              <Text style={{ color: "white" }}>Soy un Pressable</Text>
            </Pressable>
          </View>

          {/* TouchableOpacity */}
          <View style={styles.block}>
            <Text style={styles.title}>👆 TouchableOpacity</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert("TouchableOpacity")}
            >
              <Text style={{ color: "white" }}>Soy un botón Opacity</Text>
            </TouchableOpacity>
          </View>

          {/* TouchableHighlight */}
          <View style={styles.block}>
            <Text style={styles.title}>✨ TouchableHighlight</Text>
            <TouchableHighlight
              style={styles.button}
              underlayColor="#74b9ff"
              onPress={() => Alert.alert("Highlight!")}
            >
              <Text style={{ color: "white" }}>Soy un Highlight</Text>
            </TouchableHighlight>
          </View>

          {/* TouchableWithoutFeedback */}
          <View style={styles.block}>
            <Text style={styles.title}>🙈 TouchableWithoutFeedback</Text>
            <TouchableWithoutFeedback
              onPress={() => Alert.alert("Sin feedback visual")}
            >
              <View style={styles.button}>
                <Text style={{ color: "white" }}>Soy invisible al tacto</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Switch */}
          <View style={styles.block}>
            <Text style={styles.title}>🎚 Switch</Text>
            <Switch value={isSwitchOn} onValueChange={setIsSwitchOn} />
            <Text>{isSwitchOn ? "Encendido" : "Apagado"}</Text>
          </View>

          {/* ActivityIndicator */}
          <View style={styles.block}>
            <Text style={styles.title}>⏳ ActivityIndicator</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#0984e3" />
            ) : (
              <Button title="Cargar" onPress={() => setLoading(true)} />
            )}
          </View>

          {/* Modal */}
          <View style={styles.block}>
            <Text style={styles.title}>📢 Modal</Text>
            <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />
            <Modal
              transparent={true}
              visible={modalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                  <Text>Este es un Modal</Text>
                  <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f2f6", padding: 16 },
  block: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#0984e3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 250,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
  },
});
