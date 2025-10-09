import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",     // Cambiá si usás otro host
  user: "root",          // Tu usuario de MySQL
  password: "",          // Tu contraseña
  database: "usuarios",  // Nombre de tu base de datos
});

export default connection;
