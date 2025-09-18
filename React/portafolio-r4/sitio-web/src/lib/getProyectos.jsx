import { API_URL } from "../../config";

export async function getProyectos() {
  try {
    const res = await fetch(`${API_URL}/trabajos`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Error al obtener proyectos");
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error en getProyectos:", error);
    return [];
  }
}

export async function getProyectosMeta() {
  const res = await fetch(`${API_URL}/trabajos?pagination[pageSize]=1`, { cache: "no-store" });
  const json = await res.json();
  return json.meta.pagination.total;
}
