"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_URL, URL } from "../../../../config";
import ReactMarkdown from "react-markdown";

export default function ProjectDetail({ slug }) {
  const [project, setProject] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwt(token);

    const fetchData = async () => {
      const res = await fetch(`${API_URL}/trabajos?filters[slug][$eq]=${slug}&populate=*`, { cache: "no-store" });
      const data = await res.json();
      setProject(data.data?.[0] || null);
    };
    fetchData();
  }, [slug]);

  if (!project) return <div className="container my-5">Cargando...</div>;

  const { titulo, descripcion, consigna, link, capturas, creacion, finalizado, documentId } = project;

  const handleDelete = async () => {
    await fetch(`${API_URL}/trabajos/${documentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    window.location.href = "/";
  };

  return (
    <div className="container my-5">
      <Link href="/" className="btn btn-secondary mb-4">← Volver</Link>
      <h1 className="fw-bold">{titulo}</h1>
      <h5>Creado en: {creacion}</h5>
      <p className={`fw-bold ${finalizado ? "text-success" : "text-danger"}`}>Estado: {finalizado ? "Finalizado" : "En desarrollo"}</p>

      <div className="my-4">
        <h6>Descripción:</h6>
        <ReactMarkdown>{descripcion}</ReactMarkdown>
        <h6 className="mt-3">Consigna / Contexto:</h6>
        <div className="fst-italic text-muted"><ReactMarkdown>{consigna}</ReactMarkdown></div>
      </div>

      {capturas?.length > 0 && (
        <div className="mb-4">
          {capturas.length === 1 ? (
            <Image src={`${URL}${capturas[0].url}`} alt={`${titulo} imagen`} width={800} height={500} className="img-fluid rounded shadow" />
          ) : (
            <div id="projectCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {capturas.map((img, idx) => (
                  <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                    <Image src={`${URL}${img.url}`} alt={`${titulo} imagen ${idx + 1}`} width={800} height={500} className="d-block w-100 rounded shadow" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="d-flex align-items-center justify-content-between">
        {/* Botón GitHub (izquierda) */}
        {link && (
          <Link
            href={link}
            target="_blank"
            className="btn btn-dark"
          >
            GitHub
          </Link>
        )}

        {/* Botones protegidos (derecha) */}
        {jwt && (
          <div className="d-flex align-items-center ms-auto gap-2">
            <Link
              href={`/editar/${project.slug}`}
              className="btn btn-outline-warning"
            >
              Editar
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-outline-danger"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-7z" />
                <path fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1-1H2.5a1 1 0 0 1-1 1H0v1h16V3h-1.5zm-1 1H2v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4z" />
              </svg>
            </button>
          </div>
        )}
      </div>



      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Seguro que quieres eliminar este proyecto?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
