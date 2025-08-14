import { HolaMundo } from "./components/holamundo";
import { Tarjeta } from "./components/tarjetapresentacion";
import { Contador } from "./components/contador";
import { Lista } from "./components/listadetareas";
import { FormularioBienvenida } from "./components/bienvenida";
import './App.css';

function App() {
  return (
    <div className="container my-4">
      <HolaMundo />

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <Tarjeta
            nombre="Juan"
            apellido="Vergara"
            profesion="Carnicero"
            imagen="https://imgs.search.brave.com/3GAHj3WctSPIVc7GU8I7Z_dAXgEm5mbDuo52P5Mv22w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODI2/NTcwNjIvZXMvZm90/by9idXRjaGVyLWZl/ZWxpbmctc2hhcnBu/ZXNzLW9mLWtuaWZl/LXdpdGgtdGh1bWIu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUlTTDJrRlN2dlRJ/VkxycERwNGUwUjhh/SmhTekxVelIwNVlx/bTB5WlZwWk09"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Contador />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <Lista />
        </div>
        <div className="col-md-6 mb-3">
          <FormularioBienvenida />
        </div>
      </div>
    </div>
  );
}

export default App;
