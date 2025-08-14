import { useState } from "react";

export const FormularioBienvenida = () => {
  const [nombre, setNombre] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") return;
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setNombre("");
  };

  return (
    <div className="container my-4">
      <h2>Formulario de Bienvenida</h2>

      <form onSubmit={manejarEnvio} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Escribe tu nombre..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </form>

      {mostrarModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¡Bienvenido!</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>Hola <strong>{nombre}</strong>, bienvenido!</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
