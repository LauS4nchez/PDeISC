import SkeletonCard from "./SkeletonCard";
import { getProyectosMeta } from "../../lib/getProyectos";

export default async function Loading() {
  const total = await getProyectosMeta(); // cantidad real de proyectos
  return (
    <section className="py-5" style={{ backgroundColor: "#e6e3e3ff" }}>
      <div className="container">
        <h2 className="mb-5 me-5 text-end">Mis trabajos</h2>
        <div className="row g-3">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="col-md-4">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
