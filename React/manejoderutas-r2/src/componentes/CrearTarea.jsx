import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearTarea({ tareas, setTareas }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completa, setCompleta] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaTarea = {
      id: tareas.length + 1,
      titulo,
      descripcion,
      fecha: new Date().toLocaleDateString(),
      completa,
    };

    setTareas([...tareas, nuevaTarea]); // 👈 agrega la nueva tarea
    navigate("/"); // redirige al Home
  };

  return (
    <div>
      <h2>Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={completa}
            onChange={(e) => setCompleta(e.target.checked)}
          />
          <label className="form-check-label">¿Completa?</label>
        </div>

        <button type="submit" className="btn btn-success">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CrearTarea;
