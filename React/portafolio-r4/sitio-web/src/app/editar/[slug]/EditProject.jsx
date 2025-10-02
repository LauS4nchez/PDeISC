"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../config";
import { getProyectos } from "@/lib/getProyectos";

export default function EditProject({ slug }) {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    consigna: "",
    link: "",
    finalizado: false,
  });
  const [errors, setErrors] = useState({});
  const [existingProjects, setExistingProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwt(token);

    // Cargar proyecto actual + todos los demás para validaciones
    const fetchData = async () => {
      const res = await fetch(
        `${API_URL}/trabajos?filters[slug][$eq]=${slug}&populate=*`,
        { cache: "no-store" }
      );
      const data = await res.json();
      const proj = data.data?.[0] || null;
      setProject(proj);

      if (proj) {
        setForm({
          titulo: proj.titulo || "",
          descripcion: proj.descripcion || "",
          consigna: proj.consigna || "",
          link: proj.link || "",
          finalizado: proj.finalizado || false,
        });
      }

      // Traer todos los proyectos para validar duplicados
      const all = await getProyectos();
      setExistingProjects(all || []);
    };
    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // limpiar error al escribir
  };

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    // Título
    if (!form.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio.";
    } else if (!/^[\w\s-]+$/.test(form.titulo)) {
      newErrors.titulo = "Solo se permiten letras, números, espacios y guiones.";
    } else if (
      existingProjects.some(
        (p) =>
          p.titulo.toLowerCase() === form.titulo.toLowerCase() &&
          p.documentId !== project.documentId
      )
    ) {
      newErrors.titulo = "Ya existe un proyecto con este título.";
    }

    // Link
    if (!form.link.trim()) {
      newErrors.link = "El link es obligatorio.";
    } else if (
      existingProjects.some(
        (p) => p.link === form.link && p.documentId !== project.documentId
      )
    ) {
      newErrors.link = "Ya existe un proyecto con este link.";
    }

    // Descripción y consigna
    if (!form.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria.";
    if (!form.consigna.trim()) newErrors.consigna = "La consigna es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jwt) return;
    if (!validateForm()) return;

    const res = await fetch(`${API_URL}/trabajos/${project.documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: form }),
    });

    if (res.ok) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push(`/proyectos/${slug}`);
      }, 2000);
    }
  };

  const handleCancel = () => {
    router.push(`/proyectos/${slug}`);
  };

  if (!project) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container my-5">
      <h1>Editar Proyecto</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="titulo"
            className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
            value={form.titulo}
            onChange={handleChange}
          />
          {errors.titulo && <small className="text-danger">{errors.titulo}</small>}
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
            rows="3"
            value={form.descripcion}
            onChange={handleChange}
          />
          {errors.descripcion && <small className="text-danger">{errors.descripcion}</small>}
        </div>
        <div className="mb-3">
          <label className="form-label">Consigna / Contexto</label>
          <textarea
            name="consigna"
            className={`form-control ${errors.consigna ? "is-invalid" : ""}`}
            rows="3"
            value={form.consigna}
            onChange={handleChange}
          />
          {errors.consigna && <small className="text-danger">{errors.consigna}</small>}
        </div>
        <div className="mb-3">
          <label className="form-label">Link</label>
          <input
            type="url"
            name="link"
            className={`form-control ${errors.link ? "is-invalid" : ""}`}
            value={form.link}
            onChange={handleChange}
          />
          {errors.link && <small className="text-danger">{errors.link}</small>}
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="finalizado"
            className="form-check-input"
            checked={form.finalizado}
            onChange={handleChange}
          />
          <label className="form-check-label">Finalizado</label>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Éxito</h5>
              </div>
              <div className="modal-body">
                <p>El proyecto se actualizó correctamente.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
