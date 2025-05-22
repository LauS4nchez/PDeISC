document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let nombres = [];
    let numeros = [];
    let personas = [];

    // Elementos del DOM
    const formNombres = document.getElementById('formNombres');
    const inputNombre = document.getElementById('inputNombre');
    const saludarNombres = document.getElementById('saludarNombres');
    const resultadoNombres = document.getElementById('resultadoNombres');

    const formNumeros = document.getElementById('formNumeros');
    const inputNumero = document.getElementById('inputNumero');
    const mostrarDobles = document.getElementById('mostrarDobles');
    const resultadoNumeros = document.getElementById('resultadoNumeros');

    const formPersonas = document.getElementById('formPersonas');
    const inputPersonaNombre = document.getElementById('inputPersonaNombre');
    const inputPersonaEdad = document.getElementById('inputPersonaEdad');
    const mostrarPersonas = document.getElementById('mostrarPersonas');
    const resultadoPersonas = document.getElementById('resultadoPersonas');

    // Manejar el formulario de nombres
    formNombres.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNombre = inputNombre.value.trim();
        if (nuevoNombre) {
            nombres.push(nuevoNombre);
            inputNombre.value = '';
        }
    });

    // Saludar nombres con forEach()
    saludarNombres.addEventListener('click', function() {
        if (nombres.length === 0) {
            resultadoNombres.innerHTML = '<div class="alert alert-warning">No hay nombres para saludar</div>';
            return;
        }

        let html = '<h4>Saludos</h4><ul class="list-group">';
        nombres.forEach(nombre => {
            html += `<li class="list-group-item">¡Hola ${nombre}!</li>`;
        });
        html += '</ul>';
        
        resultadoNombres.innerHTML = html;
    });

    // Manejar el formulario de números
    formNumeros.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numeros.push(nuevoNumero);
            inputNumero.value = '';
        }
    });

    // Mostrar doble de números con forEach()
    mostrarDobles.addEventListener('click', function() {
        if (numeros.length === 0) {
            resultadoNumeros.innerHTML = '<div class="alert alert-warning">No hay números para mostrar</div>';
            return;
        }

        let html = '<h4>Doble de los números</h4><ul class="list-group">';
        numeros.forEach(numero => {
            html += `<li class="list-group-item">${numero} * 2 = ${numero * 2}</li>`;
        });
        html += '</ul>';
        
        resultadoNumeros.innerHTML = html;
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

    // Mostrar personas con forEach()
    mostrarPersonas.addEventListener('click', function() {
        if (personas.length === 0) {
            resultadoPersonas.innerHTML = '<div class="alert alert-warning">No hay personas para mostrar</div>';
            return;
        }

        let html = '<h4>Lista de personas</h4><ul class="list-group">';
        personas.forEach(persona => {
            html += `<li class="list-group-item">Nombre: ${persona.nombre}, Edad: ${persona.edad}</li>`;
        });
        html += '</ul>';
        
        resultadoPersonas.innerHTML = html;
    });
});