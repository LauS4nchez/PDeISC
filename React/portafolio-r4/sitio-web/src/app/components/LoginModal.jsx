"use client";
import { useState, useEffect, useRef } from "react";

export default function LoginModal() {
  const [jwt, setJwt] = useState(null);
  const [error, setError] = useState("");
  const [bootstrapLoaded, setBootstrapLoaded] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const bootstrap = await import("bootstrap/dist/js/bootstrap.esm.js");
        setBootstrapLoaded(bootstrap);
      }
    })();

    const token = localStorage.getItem("jwt");
    if (token) setJwt(token);
  }, []);

  const openModal = () => {
    if (!bootstrapLoaded) return;
    const modal = new bootstrapLoaded.Modal(modalRef.current);
    modal.show();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await res.json();

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        setJwt(data.jwt);
        setError("");
        bootstrapLoaded.Modal.getInstance(modalRef.current)?.hide();
        window.location.reload(); // recarga la página para actualizar botones
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setJwt(null);
    window.location.reload(); // recarga la página al cerrar sesión
  };

  return (
    <div>
      {!jwt ? (
        <>
          <button className="btn btn-outline-light" onClick={openModal}>
            Login
          </button>

          <div
            className="modal fade"
            tabIndex="-1"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
            ref={modalRef}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ borderRadius: "12px", backgroundColor: "#1e1e1e", color: "#fff", boxShadow: "0 0 20px rgba(0,0,0,0.5)" }}>
                <div className="modal-header border-0">
                  <h5 className="modal-title" id="loginModalLabel">Iniciar sesión</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => bootstrapLoaded?.Modal.getInstance(modalRef.current)?.hide()}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" name="email" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Contraseña</label>
                      <input type="password" name="password" className="form-control" required />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100">
                      Iniciar sesión
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </div>
  );
}
