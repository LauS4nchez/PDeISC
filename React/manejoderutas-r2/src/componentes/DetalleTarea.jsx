import { useParams, Link } from "react-router-dom";

const tareasEjemplo = [
  { id: 1, titulo: "Comprar materiales", descripcion: "Ir a la ferretería y comprar tornillos.", fecha: "2025-08-21", completa: false },
  { id: 2, titulo: "Estudiar React", descripcion: "Repasar hooks y enrutamiento con React Router.", fecha: "2025-08-20", completa: true },
  { id: 3, titulo: "Hacer ejercicio", descripcion: "Salir a correr al menos 30 minutos.", fecha: "2025-08-19", completa: false },
];

const DetalleTarea = () => {
  const { id } = useParams();
  const tarea = tareasEjemplo.find((t) => t.id === Number(id));

  if (!tarea) {
    return (
      <div className="container mt-4">
        <h4>Tarea no encontrada</h4>
        <Link to="/" className="btn btn-secondary mt-3">
          Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">{tarea.titulo}</h2>
          <p className="card-text">{tarea.descripcion}</p>
          <p><strong>Fecha de creación:</strong> {tarea.fecha}</p>
          <p>
            <strong>Estado:</strong>{" "}
            {tarea.completa ? "Completada ✅" : "Incompleta ❌"}
          </p>
          <Link to="/" className="btn btn-secondary mt-3">
            Volver a la lista
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetalleTarea;
