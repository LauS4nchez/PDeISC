import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const res = await fetch("http://localhost:3002/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  const eliminarUsuario = async (id) => {
    await fetch(`http://localhost:3002/usuarios/${id}`, { method: "DELETE" });
    fetchUsuarios();
    setConfirmDelete(null);
  };

  const startEditing = (user) => {
    setEditUserId(user.id_usuario);
    setEditForm(user);
  };

  const cancelEditing = () => {
    setEditUserId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const guardarUsuario = async () => {
    await fetch(`http://localhost:3002/usuarios/${editUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    fetchUsuarios();
    setEditUserId(null);
  };

  return (
    <div>
      <h2 className="mb-4">Lista de Usuarios</h2>

      {usuarios.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">Aún no hay usuarios para ser mostrados</p>
        </div>
      ) : (
        <div className="row">
          {usuarios.map((user) => (
            <div className="col-md-4 mb-3" key={user.id_usuario}>
              <div className="card shadow-sm">
                <div className="card-body">
                  {editUserId === user.id_usuario ? (
                    <>
                      <input
                        type="text"
                        name="nombre"
                        value={editForm.nombre}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="text"
                        name="apellido"
                        value={editForm.apellido}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />
                      <textarea
                        name="direccion"
                        value={editForm.direccion}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="text"
                        name="celular"
                        value={editForm.celular}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />

                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={guardarUsuario}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={cancelEditing}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">
                        {user.nombre} {user.apellido}
                      </h5>
                      <p className="card-text">
                        <strong>Email:</strong> {user.email} <br />
                        <strong>Dirección:</strong> {user.direccion} <br />
                        <strong>Celular:</strong> {user.celular}
                      </p>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEditing(user)}
                      >
                        Modificar
                      </button>

                      {confirmDelete === user.id_usuario ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarUsuario(user.id_usuario)}
                        >
                          ¿Seguro?
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => setConfirmDelete(user.id_usuario)}
                        >
                          Eliminar
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
