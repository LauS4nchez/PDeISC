// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const tasks = [
  { id: 3, title: "Hacer ejercicio", description: "Correr 30 minutos en el parque" }
];

function Task3() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Tareas</h2>
      <div className="row">
        <p><h1>Hacer Ejercicio</h1></p>
        <p></p>
      </div>
    </div>
  );
}

export default Task3;