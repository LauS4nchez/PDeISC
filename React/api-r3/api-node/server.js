import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 3002;

app.use(cors()); // habilita CORS
app.use(express.json());

// Rutas
app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const { nombre, apellido, email, direccion, celular } = req.body;
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, apellido, email, direccion, celular) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, email, direccion, celular]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, direccion, celular } = req.body;
    await db.query(
      "UPDATE usuarios SET nombre=?, apellido=?, email=?, direccion=?, celular=? WHERE id_usuario=?",
      [nombre, apellido, email, direccion, celular, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM usuarios WHERE id_usuario=?", [id]);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
