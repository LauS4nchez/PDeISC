import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import AgregarUsuario from "./pages/AgregarUsuario";

function Header() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">Gestión de Usuarios</Link>
        <div>
          {location.pathname === "/" ? (
            <Link to="/agregar" className="btn btn-success">Agregar Usuario</Link>
          ) : (
            <Link to="/" className="btn btn-primary">Volver al inicio</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Usuarios />} />
          <Route path="/agregar" element={<AgregarUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}
