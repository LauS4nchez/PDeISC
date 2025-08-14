import { useState } from "react";

export const Lista = () => {
  const [lista, setLista] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;

    const tarea = { texto: nuevaTarea, completada: false };
    setLista([...lista, tarea]);
    setNuevaTarea("");
  };

  const marcarCompletada = (index) => {
    const listaActualizada = lista.map((t, i) =>
      i === index ? { ...t, completada: !t.completada } : t
    );
    setLista(listaActualizada);
  };

  return (
    <div className="container my-4">
      <h2>Lista de Tareas</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Escribe una tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button className="btn btn-primary" onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      <ul className="list-group">
        {lista.map((tarea, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              tarea.completada ? "list-group-item-success" : ""
            }`}
          >
            <span
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
              }}
            >
              {tarea.texto}
            </span>
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => marcarCompletada(index)}
            >
              {tarea.completada ? "Desmarcar" : "Completar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
