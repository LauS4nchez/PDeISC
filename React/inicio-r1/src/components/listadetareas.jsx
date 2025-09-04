import { useState } from "react";

export const Lista = () => {
  const [lista, setLista] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTexto, setEditTexto] = useState("");

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

  const eliminarTarea = (index) => {
    const listaActualizada = lista.filter((_, i) => i !== index);
    setLista(listaActualizada);
  };

  const empezarEdicion = (index, texto) => {
    setEditIndex(index);
    setEditTexto(texto);
  };

  const cancelarEdicion = () => {
    setEditIndex(null);
    setEditTexto("");
  };

  const guardarEdicion = () => {
    if (editTexto.trim() === "") return;
    const listaActualizada = lista.map((t, i) =>
      i === editIndex ? { ...t, texto: editTexto } : t
    );
    setLista(listaActualizada);
    setEditIndex(null);
    setEditTexto("");
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
            {editIndex === index ? (
              <div className="flex-grow-1 me-2">
                <input
                  type="text"
                  className="form-control"
                  value={editTexto}
                  onChange={(e) => setEditTexto(e.target.value)}
                />
              </div>
            ) : (
              <span
                style={{
                  textDecoration: tarea.completada ? "line-through" : "none",
                }}
              >
                {tarea.texto}
              </span>
            )}

            <div className="btn-group btn-group-sm">
              {editIndex === index ? (
                <>
                  <button className="btn btn-success" onClick={guardarEdicion}>
                    Guardar
                  </button>
                  <button className="btn btn-secondary" onClick={cancelarEdicion}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => marcarCompletada(index)}
                  >
                    {tarea.completada ? "Desmarcar" : "Completar"}
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => empezarEdicion(index, tarea.texto)}
                  >
                    Modificar
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => eliminarTarea(index)}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
