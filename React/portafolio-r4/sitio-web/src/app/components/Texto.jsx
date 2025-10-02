// src/components/Texto.jsx
"use client";

import { useEffect, useState } from "react";
import { getTextoById } from "@/lib/getTextos";
import { API_URL } from "../../../config";

export default function Texto({ textoID }) {
  const [contenido, setContenido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwt(token);

    const fetchTexto = async () => {
      setLoading(true);
      const data = await getTextoById(textoID);
      setContenido(data);
      setEditValue(data || "");
      setLoading(false);
    };

    fetchTexto();
  }, [textoID]);

  const handleCancel = () => {
    setEditValue(contenido);
    setEditing(false);
  };

  const handleSave = async () => {
    if (!jwt) return;
    setSaving(true);
    try {
        // Obtener el texto en Strapi
        const resFetch = await fetch(
        `${API_URL}/textos?filters[textoID][$eq]=${textoID}`,
        {
            headers: { Authorization: `Bearer ${jwt}` },
            cache: "no-store",
        }
        );
        const dataFetch = await resFetch.json();
        const textObj = dataFetch.data?.[0];
        if (!textObj) throw new Error("No se encontró el texto en Strapi");

        // Hacer PUT al endpoint correcto
        const res = await fetch(`${API_URL}/textos/${textObj.documentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: { contenido: editValue } }),
        });

        if (!res.ok) throw new Error("Error al guardar en Strapi");

        setContenido(editValue);
        setEditing(false);
    } catch (err) {
        console.error("Error al guardar:", err);
        alert("Hubo un error al guardar el texto.");
    } finally {
        setSaving(false);
    }};


  if (loading)
    return (
      <div>
        <p className="placeholder-glow">
          <span className="placeholder col-12"></span>
        </p>
        <p className="placeholder-glow">
          <span className="placeholder col-10"></span>
        </p>
        <p className="placeholder-glow">
          <span className="placeholder col-8"></span>
        </p>
      </div>
    );

  if (!contenido) return <p>No se encontró el texto.</p>;

  return (
    <div className="mb-3 position-relative" style={{ paddingRight: "2rem" }}>
      {editing ? (
        <>
          <textarea
            className="form-control mb-2"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            rows={Math.max(editValue.split("\n").length, 3)}
            disabled={saving}
          />
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-success btn-sm"
              onClick={handleSave}
              disabled={saving}
              title="Guardar"
            >
              {/* SVG check */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check-lg"
                viewBox="0 0 16 16"
              >
                <path d="M13.485 1.929a.75.75 0 0 1 0 1.06l-7.07 7.071-3.536-3.536a.75.75 0 1 1 1.06-1.06l2.506 2.506 6.505-6.506a.75.75 0 0 1 1.06 0z"/>
              </svg>
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleCancel}
              disabled={saving}
              title="Cancelar"
            >
              {/* SVG X */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.146a.5.5 0 1 1 .708.708L3.707 3.5l3.536 3.536-3.536 3.536a.5.5 0 1 1-.708.708l3.536-3.536L2.146 2.854a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: contenido.replace(/\n/g, "<br/>") }} />
          {jwt && (
            <button
                type="button"
                className="btn btn-link p-1 position-absolute"
                style={{ fontSize: "1.2rem", top: "0.2rem", right: "0.2rem" }}
                onClick={() => setEditing(true)}
                title="Editar"
            >
              {/* SVG lápiz */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2L2 11.207V13h1.793L14 3.793 11.207 2z"/>
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
}
