import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2f3542', // color activo
        tabBarInactiveTintColor: '#a4b0be', // color inactivo
        tabBarStyle: {
          backgroundColor: '#f1f2f6',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: '#2f3542',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="holamundo" 
        options={{ 
          title: 'Hola Mundo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="planet" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
