document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let animales = [];
    let numeros = [];
    let ciudades = [];

    // Elementos del DOM
    const formAnimales = document.getElementById('formAnimales');
    const inputAnimal = document.getElementById('inputAnimal');
    const buscarPerro = document.getElementById('buscarPerro');
    const resultadoAnimales = document.getElementById('resultadoAnimales');

    const formBuscarNumero = document.getElementById('formBuscarNumero');
    const inputBuscarNumero = document.getElementById('inputBuscarNumero');
    const buscarCincuenta = document.getElementById('buscarCincuenta');
    const resultadoNumeros = document.getElementById('resultadoNumeros');

    const formCiudades = document.getElementById('formCiudades');
    const inputCiudad = document.getElementById('inputCiudad');
    const buscarMadrid = document.getElementById('buscarMadrid');
    const resultadoCiudades = document.getElementById('resultadoCiudades');

    // Manejar el formulario de animales
    formAnimales.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoAnimal = inputAnimal.value.trim().toLowerCase();
        if (nuevoAnimal) {
            animales.push(nuevoAnimal);
            inputAnimal.value = '';
        }
    });

    // Buscar posición de "perro"
    buscarPerro.addEventListener('click', function() {
        const posicion = animales.indexOf('perro');
        
        if (posicion === -1) {
            resultadoAnimales.innerHTML = '<div class="alert alert-warning">No se encontró "perro" en el array</div>';
        } else {
            resultadoAnimales.innerHTML = `<div class="alert alert-success">"perro" encontrado en la posición ${posicion}</div>`;
        }
    });

    // Manejar el formulario de números
    formBuscarNumero.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputBuscarNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numeros.push(nuevoNumero);
            inputBuscarNumero.value = '';
        }
    });

    // Buscar número 50
    buscarCincuenta.addEventListener('click', function() {
        const posicion = numeros.indexOf(50);
        
        if (posicion === -1) {
            resultadoNumeros.innerHTML = '<div class="alert alert-warning">El número 50 no está en el array</div>';
        } else {
            resultadoNumeros.innerHTML = `<div class="alert alert-success">50 encontrado en la posición ${posicion}</div>`;
        }
    });

    // Manejar el formulario de ciudades
    formCiudades.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevaCiudad = inputCiudad.value.trim();
        if (nuevaCiudad) {
            ciudades.push(nuevaCiudad);
            inputCiudad.value = '';
        }
    });

    // Buscar Madrid
    buscarMadrid.addEventListener('click', function() {
        const posicion = ciudades.indexOf('Madrid');
        
        if (posicion === -1) {
            resultadoCiudades.innerHTML = '<div class="alert alert-warning">Madrid no está en la lista de ciudades</div>';
        } else {
            resultadoCiudades.innerHTML = `<div class="alert alert-success">Madrid encontrado en la posición ${posicion}</div>`;
        }
    });
});