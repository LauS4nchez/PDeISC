"use client";
import { useState, useEffect } from "react";

export default function LoginModal() {
  const [jwt, setJwt] = useState(null);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) setJwt(token);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setError("");
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
        closeModal();
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

          {isOpen && (
            <div className="custom-modal-overlay" onClick={closeModal}>
              <div
                className="custom-modal"
                onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
              >
                <div className="custom-modal-header">
                  <h5>Iniciar sesión</h5>
                  <button className="close-btn" onClick={closeModal}>
                    ✕
                  </button>
                </div>
                <div className="custom-modal-body">
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                      />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn-primary w-100">
                      Iniciar sesión
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </div>
  );
}
