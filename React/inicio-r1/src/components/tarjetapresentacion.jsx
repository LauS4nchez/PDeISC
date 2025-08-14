export const Tarjeta = ({ nombre, apellido, profesion, imagen }) => {
  return (
    <div className="col-md-6 mb-3">
      <div className="card shadow-sm">
        <img src={imagen} className="card-img-top" alt="Foto de perfil" />
        <div className="card-body text-center">
          <h5 className="card-title mb-1">{nombre} {apellido}</h5>
          <p className="card-text text-muted">{profesion}</p>
        </div>
      </div>
    </div>
  );
};
