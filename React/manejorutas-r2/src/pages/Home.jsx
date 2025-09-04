import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Home() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    setTasks(storedTasks)
  }, [])

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Tareas</h1>

      {tasks.length === 0 ? (
        <div className="card text-center p-4">
          <div className="card-body">
            <h5 className="card-title">No hay tareas creadas</h5>
            <p className="card-text">Puedes crear una nueva tarea haciendo clic en el botón "Crear Tarea".</p>
            <Link to="/create" className="btn btn-success">Crear Tarea</Link>
          </div>
        </div>
      ) : (
        <ul className="list-group">
          {tasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <Link
                  to={`/task/${task.id}`}
                  className={`text-decoration-none ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
                >
                  <strong>{task.title}</strong> <br />
                  <small className="text-muted">{task.description}</small>
                </Link>
              </div>
              <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
                {task.completed ? 'Completa' : 'Incompleta'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
