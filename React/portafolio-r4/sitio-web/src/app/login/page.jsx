"use client";
import { useState } from "react";
import { API_URL } from "../../../config";

export default function LoginButton() {
  const [jwt, setJwt] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${API_URL}/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await res.json();

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        setJwt(data.jwt);
        setError("");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div>
      {!jwt ? (
        <form onSubmit={handleLogin} className="d-flex gap-2">
          <input type="email" name="email" placeholder="Email" required className="form-control" />
          <input type="password" name="password" placeholder="Contraseña" required className="form-control" />
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          {error && <p className="text-danger">{error}</p>}
        </form>
      ) : (
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("jwt");
            setJwt(null);
          }}
        >
          Cerrar sesión
        </button>
      )}
    </div>
  );
}
