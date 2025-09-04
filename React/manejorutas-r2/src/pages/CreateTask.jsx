import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function CreateTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false) // checkbox
  const [error, setError] = useState('')
  const [info, setInfo] = useState('') // mensaje informativo
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setInfo('')

    if (/^[^a-zA-Z]/.test(title)) {
      setError('El título debe comenzar con una letra.')
      return
    }

    if (completed) {
      setInfo('No se puede crear una tarea como completada. Si querés marcarla como completada, podés hacerlo luego en la lista de inicio.')
      return
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    localStorage.setItem('tasks', JSON.stringify([...storedTasks, newTask]))

    navigate('/')
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Crear Tarea</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {info && <div className="alert alert-info">{info}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="completedCheck"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="completedCheck">
            Completada
          </label>
        </div>

        <button type="submit" className="btn btn-success me-2">Crear Tarea</button>
        <Link to="/" className="btn btn-secondary">Volver</Link>
      </form>
    </div>
  )
}
