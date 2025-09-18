"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../config";

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwt(token);

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
    };
    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jwt) return;
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
    router.push(`/proyectos/${slug}`); // 🔙 vuelve al detalle del proyecto
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
            className="form-control"
            value={form.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Consigna / Contexto</label>
          <textarea
            name="consigna"
            className="form-control"
            rows="3"
            value={form.consigna}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Link</label>
          <input
            type="url"
            name="link"
            className="form-control"
            value={form.link}
            onChange={handleChange}
          />
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
