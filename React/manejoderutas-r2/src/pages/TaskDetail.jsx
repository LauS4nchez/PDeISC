import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const foundTask = storedTasks.find(t => t.id === parseInt(id))
    if (foundTask) {
      setTask(foundTask)
      setTitle(foundTask.title)
      setDescription(foundTask.description)
      setCompleted(foundTask.completed)
    }
  }, [id])

  if (!task) return (
    <div className="container mt-5">
      <p>Tarea no encontrada</p>
      <Link to="/" className="btn btn-primary">Volver</Link>
    </div>
  )

  const handleDelete = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const filteredTasks = storedTasks.filter(t => t.id !== task.id)
    localStorage.setItem('tasks', JSON.stringify(filteredTasks))
    navigate('/')
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const updatedTasks = storedTasks.map(t => 
      t.id === task.id ? { ...t, title, description, completed } : t
    )
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTask({ ...task, title, description, completed })
    setIsEditing(false)
  }

  return (
    <div className="container mt-5">
      {!isEditing ? (
        <>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p><strong>Fecha:</strong> {new Date(task.createdAt).toLocaleString()}</p>
          <p><strong>Estado:</strong> {task.completed ? 'Completa' : 'Incompleta'}</p>

          <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>Editar</button>
          <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
          <Link to="/" className="btn btn-primary ms-2">Volver</Link>
        </>
      ) : (
        <form onSubmit={handleEditSubmit}>
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
            <label className="form-check-label" htmlFor="completedCheck">Completada</label>
          </div>
          <button type="submit" className="btn btn-success me-2">Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      )}
    </div>
  )
}
