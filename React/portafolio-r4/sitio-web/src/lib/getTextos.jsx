// src/lib/getTextos.jsx
import { API_URL } from "../../config";

export async function getTextoById(textoID) {
  try {
    const res = await fetch(
      `${API_URL}/textos?filters[textoID][$eq]=${textoID}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Error al obtener texto:", res.status);
      return null;
    }

    const data = await res.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].contenido;
    }

    return null;
  } catch (err) {
    console.error("Error al buscar texto:", err);
    return null;
  }
}
