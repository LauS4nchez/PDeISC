"use client";

import { API_URL } from "../../../config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProyectos } from "@/lib/getProyectos";

export default function AgregarProyecto() {
  const [jwt, setJwt] = useState(null);
  const router = useRouter();
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    consigna: "",
    link: "",
    finalizado: false,
    creacion: "",
  });
  const [errors, setErrors] = useState({});
  const [existingProjects, setExistingProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwt(token);

    // Cargar proyectos existentes para validaciones
    const fetchProjects = async () => {
      const data = await getProyectos();
      setExistingProjects(data || []);
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Limpiar error al escribir
  };

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    // Título
    if (!form.titulo.trim()) newErrors.titulo = "El título es obligatorio.";
    else if (!/^[\w\s-]+$/.test(form.titulo)) newErrors.titulo = "Solo se permiten letras, números, espacios y guiones.";
    else if (existingProjects.some(p => p.titulo.toLowerCase() === form.titulo.toLowerCase()))
      newErrors.titulo = "Ya existe un proyecto con este título.";

    // Link
    if (!form.link.trim()) newErrors.link = "El link es obligatorio.";
    if (form.link && existingProjects.some(p => p.link === form.link))
      newErrors.link = "Ya existe un proyecto con este link.";

    // Descripción y consigna
    if (!form.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria.";
    if (!form.consigna.trim()) newErrors.consigna = "La consigna es obligatoria.";

    // Fecha
    if (!form.creacion) newErrors.creacion = "La fecha es obligatoria.";
    else if (new Date(form.creacion) > new Date()) newErrors.creacion = "La fecha no puede ser futura.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // No enviar si hay errores

    const slug = form.titulo.toLowerCase().replace(/\s+/g, "-");

    try {
      const payload = {
        data: {
          ...form,
          slug,
        },
      };

      const res = await fetch(`${API_URL}/trabajos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error creando proyecto:", errorData);
        return;
      }

      setForm({ titulo: "", descripcion: "", consigna: "", link: "", finalizado: false, creacion: "" });
      router.push("/"); // Redirigir al inicio o lista
    } catch (err) {
      console.error("Error creando proyecto:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Agregar Proyecto</h1>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={form.titulo}
                onChange={handleChange}
                className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
              />
              {errors.titulo && <small className="text-danger">{errors.titulo}</small>}
            </div>

            <div className="col-12">
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
                className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
              />
              {errors.descripcion && <small className="text-danger">{errors.descripcion}</small>}
            </div>

            <div className="col-12">
              <textarea
                name="consigna"
                placeholder="Consigna"
                value={form.consigna}
                onChange={handleChange}
                className={`form-control ${errors.consigna ? "is-invalid" : ""}`}
                rows="3"
              />
              {errors.consigna && <small className="text-danger">{errors.consigna}</small>}
            </div>

            <div className="col-md-6">
              <input
                type="url"
                name="link"
                placeholder="Link del proyecto"
                value={form.link}
                onChange={handleChange}
                className={`form-control ${errors.link ? "is-invalid" : ""}`}
              />
              {errors.link && <small className="text-danger">{errors.link}</small>}
            </div>

            <div className="col-md-6">
              <input
                type="date"
                name="creacion"
                value={form.creacion}
                onChange={handleChange}
                className={`form-control ${errors.creacion ? "is-invalid" : ""}`}
              />
              {errors.creacion && <small className="text-danger">{errors.creacion}</small>}
            </div>

            <div className="col-12 form-check">
              <input
                type="checkbox"
                name="finalizado"
                checked={form.finalizado}
                onChange={handleChange}
                className="form-check-input"
                id="finalizado"
              />
              <label className="form-check-label" htmlFor="finalizado">
                Finalizado
              </label>
            </div>

            <div className="col-12 d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => router.push("/")}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Crear Proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
