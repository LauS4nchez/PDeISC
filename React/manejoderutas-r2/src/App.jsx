import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaTareas from "./pages/Home";
import CrearTarea from "./pages/CrearTarea";
import EditarTarea from "./pages/EditarTarea";
import tareasData from "./datos/tareas";

function App() {
  const [tareas, setTareas] = useState(tareasData);

  // Eliminar tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // Modificar tarea
  const actualizarTarea = (id, nuevaTarea) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, ...nuevaTarea } : t))
    );
  };

  // Crear nueva tarea
  const agregarTarea = (tarea) => {
    setTareas([...tareas, { ...tarea, id: Date.now() }]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ListaTareas tareas={tareas} eliminarTarea={eliminarTarea} />}
        />
        <Route path="/crear" element={<CrearTarea agregarTarea={agregarTarea} />} />
        <Route
          path="/editar/:id"
          element={<EditarTarea tareas={tareas} actualizarTarea={actualizarTarea} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
