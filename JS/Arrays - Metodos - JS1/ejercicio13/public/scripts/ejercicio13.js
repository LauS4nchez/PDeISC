document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let numeros = [];
    let palabras = [];
    let personas = [];

    // Elementos del DOM
    const formNumeros = document.getElementById('formNumeros');
    const inputNumero = document.getElementById('inputNumero');
    const ordenarNumeros = document.getElementById('ordenarNumeros');
    const resultadoNumeros = document.getElementById('resultadoNumeros');

    const formPalabras = document.getElementById('formPalabras');
    const inputPalabra = document.getElementById('inputPalabra');
    const ordenarPalabras = document.getElementById('ordenarPalabras');
    const resultadoPalabras = document.getElementById('resultadoPalabras');

    const formPersonas = document.getElementById('formPersonas');
    const inputPersonaNombre = document.getElementById('inputPersonaNombre');
    const inputPersonaEdad = document.getElementById('inputPersonaEdad');
    const ordenarPersonas = document.getElementById('ordenarPersonas');
    const resultadoPersonas = document.getElementById('resultadoPersonas');

    // Manejar el formulario de números
    formNumeros.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numeros.push(nuevoNumero);
            inputNumero.value = '';
        }
    });

    // Ordenar números con sort()
    ordenarNumeros.addEventListener('click', function() {
        if (numeros.length === 0) {
            resultadoNumeros.innerHTML = '<div class="alert alert-warning">No hay números para ordenar</div>';
            return;
        }

        const numerosOrdenados = [...numeros].sort((a, b) => a - b);
        
        let html = '<h4>Números ordenados</h4><ul class="list-group">';
        html += `<li class="list-group-item"><strong>Original:</strong> [${numeros.join(', ')}]</li>`;
        html += `<li class="list-group-item"><strong>Ordenado:</strong> [${numerosOrdenados.join(', ')}]</li>`;
        html += '</ul>';
        
        resultadoNumeros.innerHTML = html;
    });

    // Manejar el formulario de palabras
    formPalabras.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevaPalabra = inputPalabra.value.trim();
        if (nuevaPalabra) {
            palabras.push(nuevaPalabra);
            inputPalabra.value = '';
        }
    });

    // Ordenar palabras alfabéticamente con sort()
    ordenarPalabras.addEventListener('click', function() {
        if (palabras.length === 0) {
            resultadoPalabras.innerHTML = '<div class="alert alert-warning">No hay palabras para ordenar</div>';
            return;
        }

        const palabrasOrdenadas = [...palabras].sort();
        
        let html = '<h4>Palabras ordenadas</h4><ul class="list-group">';
        html += `<li class="list-group-item"><strong>Original:</strong> [${palabras.join(', ')}]</li>`;
        html += `<li class="list-group-item"><strong>Ordenado:</strong> [${palabrasOrdenadas.join(', ')}]</li>`;
        html += '</ul>';
        
        resultadoPalabras.innerHTML = html;
    });

    // Manejar el formulario de personas
    formPersonas.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = inputPersonaNombre.value.trim();
        const edad = parseInt(inputPersonaEdad.value.trim());
        
        if (nombre && !isNaN(edad)) {
            personas.push({ nombre, edad });
            inputPersonaNombre.value = '';
            inputPersonaEdad.value = '';
        }
    });

    // Ordenar personas por edad con sort()
    ordenarPersonas.addEventListener('click', function() {
        if (personas.length === 0) {
            resultadoPersonas.innerHTML = '<div class="alert alert-warning">No hay personas para ordenar</div>';
            return;
        }

        const personasOrdenadas = [...personas].sort((a, b) => a.edad - b.edad);
        
        let html = '<h4>Personas ordenadas por edad</h4><table class="table table-striped"><thead><tr><th>Nombre</th><th>Edad</th></tr></thead><tbody>';
        
        // Mostrar original
        html += `<tr><td colspan="2"><strong>Original:</strong></td></tr>`;
        personas.forEach(persona => {
            html += `<tr><td>${persona.nombre}</td><td>${persona.edad}</td></tr>`;
        });
        
        // Mostrar ordenado
        html += `<tr><td colspan="2"><strong>Ordenado por edad:</strong></td></tr>`;
        personasOrdenadas.forEach(persona => {
            html += `<tr><td>${persona.nombre}</td><td>${persona.edad}</td></tr>`;
        });
        
        html += '</tbody></table>';
        
        resultadoPersonas.innerHTML = html;
    });
});