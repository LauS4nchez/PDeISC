import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function ListaTareas({ tareas, eliminarTarea }) {
  return (
    <div>
      <h2 className="mb-4">Lista de Tareas</h2>
      {tareas.map((tarea) => (
        <Card key={tarea.id} className="mb-3">
          <Card.Body>
            <Card.Title>{tarea.titulo}</Card.Title>
            <Card.Text>
              {tarea.descripcion} <br />
              <strong>Estado:</strong> {tarea.completa ? "✅ Completa" : "❌ Incompleta"}
            </Card.Text>
            <Link to={`/editar/${tarea.id}`}>
              <Button variant="warning" className="me-2">Editar</Button>
            </Link>
            <Button variant="danger" onClick={() => eliminarTarea(tarea.id)}>
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      ))}
      <Link to="/crear">
        <Button variant="success" className="mt-3">
          Crear Nueva Tarea
        </Button>
      </Link>
    </div>
  );
}

export default ListaTareas;
