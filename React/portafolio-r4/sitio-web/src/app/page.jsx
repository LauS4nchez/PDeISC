// /app/page.jsx
import Image from "next/image";
import ProjectGrids from "./components/ProjectGrids";
import SkeletonCard from "./components/SkeletonCard";
import AddButton from "./components/AddButton";
import LoginModal from "./components/LoginModal";
import { getProyectos } from "@/lib/getProyectos";

export default async function ProjectsPage() {
  const proyectos = await getProyectos();
  const mostrarLimitado = proyectos.length > 3 ? proyectos.slice(0, 3) : proyectos;

  return (
    <div>
      {/* Navbar sticky */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          transition: "top 0.3s",
        }}
      >
        <div className="container">
          <a className="navbar-brand" href="#">Mi Portafolio</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#sobre-mi">Sobre mí</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#trabajos">Trabajos</a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="#contacto">Contacto</a>
              </li>
              <li className="nav-item">
                <LoginModal />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="position-relative w-100" style={{ height: "500px" }}>
        <Image
          src="/hero.jpg"
          alt="Hero Image"
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="100vw"
          quality={100}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}></div>
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="display-4">Lautaro Sánchez</h1>
          <p className="lead">Desarrollador Full Stack.</p>
        </div>
      </header>

      {/* Sobre mí */}
      <section id="sobre-mi" className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 order-1 order-md-0 text-center text-md-start mb-4 mb-md-0">
            <h2 className="mb-5">Sobre mí</h2>
            <p>
              Soy Lautaro Sánchez, desarrollador full stack. Me apasiona crear proyectos
              que combinan funcionalidad y diseño limpio. Aquí encontrarás algunos de mis trabajos más recientes e interesantes.
              <br /><br />
              Tengo habilidades en varias tecnologías tales como Python, Javascript, Godot, Unity, CMSs, Bootstrap y demás.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
            <img
              src="/fotoperfil.png"
              alt="Foto de perfil"
              className="rounded-circle border border-4 shadow img-fluid d-none d-md-block"
              style={{ maxWidth: "400px", aspectRatio: "1 / 1", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="trabajos" className="py-5" style={{ backgroundColor: "#e6e3e3ff" }}>
        <div className="container">
          <h2 className="mb-5 me-5 text-end">Mis trabajos</h2>
          <div className="row g-3">
            {mostrarLimitado.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="col-md-4">
                    <SkeletonCard />
                  </div>
                ))
              : mostrarLimitado.map((p) => (
                  <div key={p.id} className="col-md-4">
                    <ProjectGrids project={p} />
                  </div>
                ))}
          </div>

          <div className="me-5">
            <AddButton />
          </div>

          {proyectos.length > 3 && (
            <div className="text-center mt-4">
              <a href="/listaproyectos" className="btn btn-outline-primary">Ver más</a>
            </div>
          )}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-light py-5">
        <div className="container">
          <h2>Contacto</h2>
          <p>Podés escribirme a mi correo: <a href="mailto:ejemplo@example.com">ejemplo@example.com</a>.</p>
          <p>O podés acceder a mi <a href="https://ar.linkedin.com/">LinkedIn</a>.</p>
          <p>También podés seguir viendo mis distintos trabajos en mi <a href="https://github.com/LauS4nchez">Github</a>.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <div className="mb-3 d-flex justify-content-center gap-3">
            <a href="https://github.com/LauS4nchez" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38v-1.35c-2.23.49-2.7-1.07-2.7-1.07-.36-.91-.88-1.15-.88-1.15-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.5v2.22c0 .21.15.45.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
            <a href="mailto:ejemplo@example.com">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 012 2h12a2 2 0 011.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.552L0 4.697zM6.761 8.83l-6.761 4.15A2 2 0 002 14h12a2 2 0 001.999-1.02l-6.761-4.15L8 9.586l-1.239-.757zM16 11.801V4.697l-5.803 3.552L16 11.8z"/>
              </svg>
            </a>
            <a href="https://ar.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.473 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.527 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.21c.837 0 1.358-.554 1.358-1.247-.015-.71-.521-1.246-1.342-1.246-.82 0-1.358.536-1.358 1.246 0 .693.521 1.247 1.327 1.247h.015zm4.908 8.21V9.359c0-.217.016-.433.08-.586.176-.433.577-.88 1.25-.88.882 0 1.234.664 1.234 1.635v3.866h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.27 0-1.845.7-2.165 1.188h.016V6.169H7.651c.03.662 0 7.225 0 7.225h2.401z"/>
              </svg>
            </a>
          </div>
          <p className="mb-0">&copy; {new Date().getFullYear()} Lautaro Sánchez. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
