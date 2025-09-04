import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TaskDetail from './pages/TaskDetail.jsx'
import CreateTask from './pages/CreateTask.jsx'

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Manejo de Rutas - R2</span>
          <div className="d-flex">
            <Link to="/" className="btn btn-outline-light me-2">Inicio</Link>
            <Link to="/create" className="btn btn-outline-light">Crear Tarea</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </div>
  )
}

export default App
