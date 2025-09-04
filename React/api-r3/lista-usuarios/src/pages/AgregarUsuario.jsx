import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarUsuario() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    celular: "",
  });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validar = () => {
    let newErrors = {};

    // Nombre y apellido: solo letras y espacios
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regexNombre.test(form.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras y espacios";
    }
    if (!regexNombre.test(form.apellido)) {
      newErrors.apellido = "El apellido solo puede contener letras y espacios";
    }

    // Dirección: mínimo 3 letras, empezar con letras, y contener al menos 1 número
    const regexDireccion = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}.*\d+/;
    if (!regexDireccion.test(form.direccion)) {
      newErrors.direccion =
        "La dirección debe empezar con letras, tener al menos 3 letras y contener un número";
    }

    // Celular: exactamente 10 dígitos
    const regexCelular = /^\d{10}$/;
    if (!regexCelular.test(form.celular)) {
      newErrors.celular = "El celular debe tener exactamente 10 números";
    }

    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    await fetch("http://localhost:3002/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/");
  };

  return (
    <div className="card p-4 shadow">
      <h3>Agregar Usuario</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="form-control mb-2"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        {errores.nombre && <p className="text-danger">{errores.nombre}</p>}

        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className="form-control mb-2"
          value={form.apellido}
          onChange={handleChange}
          required
        />
        {errores.apellido && <p className="text-danger">{errores.apellido}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          className="form-control mb-2"
          value={form.direccion}
          onChange={handleChange}
          required
        />
        {errores.direccion && <p className="text-danger">{errores.direccion}</p>}

        <input
          type="text"
          name="celular"
          placeholder="Celular (10 dígitos)"
          className="form-control mb-2"
          value={form.celular}
          onChange={handleChange}
          required
        />
        {errores.celular && <p className="text-danger">{errores.celular}</p>}

        <button type="submit" className="btn btn-success w-100">
          Crear Usuario
        </button>
      </form>
    </div>
  );
}
