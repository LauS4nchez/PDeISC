import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function EditarTarea({ tareas, actualizarTarea }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const tarea = tareas.find((t) => t.id === parseInt(id));
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completa, setCompleta] = useState(false);

  useEffect(() => {
    if (tarea) {
      setTitulo(tarea.titulo);
      setDescripcion(tarea.descripcion);
      setCompleta(tarea.completa);
    }
  }, [tarea]);

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarTarea(tarea.id, { titulo, descripcion, completa });
    navigate("/");
  };

  if (!tarea) return <p>Tarea no encontrada</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Completada"
          checked={completa}
          onChange={(e) => setCompleta(e.target.checked)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Guardar Cambios
      </Button>
    </Form>
  );
}

export default EditarTarea;
