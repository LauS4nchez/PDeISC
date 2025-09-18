"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config";

export default function ProjectGrids({ project }) {
  const [jwt, setJwt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwt(token); // Esto solo se ejecuta en cliente
  }, []);

  if (!project) return null;
  const { titulo, slug, descripcion, creacion, link, finalizado, documentId } = project;

  const handleDelete = async () => {
    await fetch(`${API_URL}/trabajos/${documentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    window.location.reload();
  };

  return (
    <>
      <div className="card shadow-sm rounded-4 border border-light p-3 mb-4" style={{ maxWidth: "350px" }}>
        <div className="bg-primary bg-opacity-10 p-2 rounded-3 mb-2 text-center">
          <h5 className="card-title fw-bold mb-0">{titulo}</h5>
        </div>

        <div className="card-body d-flex flex-column">
          <p className="card-text mb-2" style={{ minHeight: "60px" }}>{descripcion}</p>
          <small className="text-muted mb-1">Creado: {creacion}</small>
          <small className={finalizado ? "text-success mb-2 text-end" : "text-danger mb-2 text-end"}>
            {finalizado ? "Finalizado" : "En desarrollo"}
          </small>

          <div className="d-flex gap-2 mt-auto">
            <Link href={`/proyectos/${slug}`} className="btn btn-primary btn-sm flex-grow-1">
              Ver detalles
            </Link>
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm flex-grow-1">
                Repositorio
              </a>
            )}

            {/* Solo renderizamos botón si jwt ya se cargó en el cliente */}
            {jwt && (
              <button onClick={() => setShowModal(true)} className="btn btn-danger btn-sm flex-grow-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-7z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1-1H2.5a1 1 0 0 1-1 1H0v1h16V3h-1.5zm-1 1H2v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

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
    </>
  );
}
