import { useState } from "react";

export const Contador = () => {
  const [contador, setContador] = useState(0);

  return (
    <div className="col-md-6 mb-3 text-center">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">El contador está en:</h2>
        <h1 className="display-4">{contador}</h1>
        <div className="mt-4">
          <button className="btn btn-primary mx-2" onClick={() => setContador(contador + 1)}>
            Aumentar
          </button>
          <button className="btn btn-danger mx-2" onClick={() => setContador(contador - 1)}>
            Decrementar
          </button>
        </div>
      </div>
    </div>
  );
};
