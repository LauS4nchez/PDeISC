import { CZooAnimal } from "./animal.js";

const zooAnimals = [];

const tipoTexto = (tipoId) => {
    const tipos = {
        1: "Felino",
        2: "Ave",
        3: "Reptil",
        4: "Mamífero",
        5: "Acuático"
    };
    return tipos[tipoId] || "Desconocido";
};

document.addEventListener("DOMContentLoaded", () => {
    const formAnimales = document.getElementById("formAnimal");
    const inputId = document.getElementById("idAnimal");
    const inputNombre = document.getElementById("nombre");
    const inputJaula = document.getElementById("jaulaNumero");
    const inputTipo = document.getElementById("idTypeAnimal");
    const inputPeso = document.getElementById("peso");

    const displayAnimal = document.getElementById("divAnimal");
    const displayResultados = document.getElementById("resultados");

    // Crear tabla oculta inicialmente
    displayAnimal.innerHTML = `
        <div id="tablaContainer" class="container mt-4 d-none">
            <table class="table table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Jaula</th>
                        <th>Tipo</th>
                        <th>Peso</th>
                    </tr>
                </thead>
                <tbody id="animalBody"></tbody>
            </table>
        </div>
    `;
    const cuerpoTabla = document.getElementById("animalBody");
    const tablaContainer = document.getElementById("tablaContainer");

    formAnimales.addEventListener("submit", (event) => {
        event.preventDefault();

        const animal = new CZooAnimal(
            parseInt(inputId.value),
            inputNombre.value,
            parseInt(inputJaula.value),
            parseInt(inputTipo.value),
            parseFloat(inputPeso.value)
        );

        zooAnimals.push(animal);

        // Mostrar tabla si aún está oculta
        if (tablaContainer.classList.contains("d-none")) {
            tablaContainer.classList.remove("d-none");
        }

        // Agregar fila
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${animal.idAnimal}</td>
            <td>${animal.nombre}</td>
            <td>${animal.jaulaNumero}</td>
            <td>${tipoTexto(animal.idTypeAnimal)}</td>
            <td>${animal.peso}</td>
        `;
        cuerpoTabla.appendChild(fila);

        // Actualizar estadísticas
        actualizarResultados();

        formAnimales.reset();
    });

    function actualizarResultados() {
        const b = zooAnimals.filter(a => a.jaulaNumero === 5 && a.peso < 3).length;
        const c = zooAnimals.filter(a => a.idTypeAnimal === 1 && a.jaulaNumero >= 2 && a.jaulaNumero <= 5).length;
        const dAnimal = zooAnimals.find(a => a.jaulaNumero === 4 && a.peso < 120);
        const d = dAnimal ? dAnimal.nombre : "No encontrado";

        displayResultados.innerHTML = `
            <div class="container mt-4">
                <h3>Estadísticas</h3>
                <ul class="list-group">
                    <li class="list-group-item"><strong>B:</strong> Animales en Jaula 5 con peso < 3kg: ${b}</li>
                    <li class="list-group-item"><strong>C:</strong> Felinos entre Jaulas 2 a 5: ${c}</li>
                    <li class="list-group-item"><strong>D:</strong> Animal en Jaula 4 con peso < 120kg: ${d}</li>
                </ul>
            </div>
        `;
    }
});
