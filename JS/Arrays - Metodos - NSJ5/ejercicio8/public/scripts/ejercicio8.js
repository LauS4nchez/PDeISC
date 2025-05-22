document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let usuarios = [];
    let colores = [];
    let numeros = [];

    // Elementos del DOM
    const formUsuarios = document.getElementById('formUsuarios');
    const inputUsuario = document.getElementById('inputUsuario');
    const verificarAdmin = document.getElementById('verificarAdmin');
    const resultadoUsuarios = document.getElementById('resultadoUsuarios');

    const formColores = document.getElementById('formColores');
    const inputColor = document.getElementById('inputColor');
    const verificarVerde = document.getElementById('verificarVerde');
    const resultadoColores = document.getElementById('resultadoColores');

    const formVerificarNumero = document.getElementById('formVerificarNumero');
    const inputVerificarNumero = document.getElementById('inputVerificarNumero');
    const mostrarNumeros = document.getElementById('mostrarNumeros');
    const resultadoVerificarNumeros = document.getElementById('resultadoVerificarNumeros');

    // Manejar el formulario de usuarios
    formUsuarios.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoUsuario = inputUsuario.value.trim().toLowerCase();
        if (nuevoUsuario) {
            usuarios.push(nuevoUsuario);
            inputUsuario.value = '';
        }
    });

    // Verificar si existe "admin"
    verificarAdmin.addEventListener('click', function() {
        const existeAdmin = usuarios.includes('admin');
        
        if (existeAdmin) {
            resultadoUsuarios.innerHTML = '<div class="alert alert-success">El usuario "admin" existe</div>';
        } else {
            resultadoUsuarios.innerHTML = '<div class="alert alert-warning">El usuario "admin" no existe</div>';
        }
    });

    // Manejar el formulario de colores
    formColores.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoColor = inputColor.value.trim().toLowerCase();
        if (nuevoColor) {
            colores.push(nuevoColor);
            inputColor.value = '';
        }
    });

    // Verificar si existe "verde"
    verificarVerde.addEventListener('click', function() {
        const existeVerde = colores.includes('verde');
        
        if (existeVerde) {
            resultadoColores.innerHTML = '<div class="alert alert-success">El color "verde" existe</div>';
        } else {
            resultadoColores.innerHTML = '<div class="alert alert-warning">El color "verde" no existe</div>';
        }
    });

    // Manejar el formulario de números con verificación
    formVerificarNumero.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputVerificarNumero.value.trim());
        
        if (isNaN(nuevoNumero)) {
            resultadoVerificarNumeros.innerHTML = '<div class="alert alert-danger">Ingrese un número válido</div>';
            return;
        }

        if (numeros.includes(nuevoNumero)) {
            resultadoVerificarNumeros.innerHTML = '<div class="alert alert-warning">El número ya existe en el array</div>';
        } else {
            numeros.push(nuevoNumero);
            resultadoVerificarNumeros.innerHTML = '<div class="alert alert-success">Número agregado correctamente</div>';
            inputVerificarNumero.value = '';
        }
    });

    // Mostrar números
    mostrarNumeros.addEventListener('click', function() {
        if (numeros.length === 0) {
            resultadoVerificarNumeros.innerHTML = '<div class="alert alert-warning">No hay números en el array</div>';
            return;
        }

        let html = '<h4>Números almacenados</h4><ul class="list-group">';
        numeros.forEach(num => {
            html += `<li class="list-group-item">${num}</li>`;
        });
        html += '</ul>';
        
        resultadoVerificarNumeros.innerHTML = html;
    });
});