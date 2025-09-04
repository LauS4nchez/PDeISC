// db.js
import mysql from "mysql2/promise";

// Configuración de conexión a MySQL con XAMPP
const db = mysql.createPool({
  host: "localhost",   // o 127.0.0.1
  user: "root",        // usuario por defecto de XAMPP
  password: "",        // XAMPP no suele poner contraseña a root
  database: "usuarios", // poné el nombre de tu base
  port: 3306           // puerto default de MySQL
});

// Probar conexión
try {
  const connection = await db.getConnection();
  console.log("Conectado a MySQL con éxito");
  connection.release();
} catch (error) {
  console.error("Error al conectar con MySQL", error);
}

export default db;
