document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let numeros = [];
    let palabras = [];
    let usuarios = [];

    // Elementos del DOM
    const formNumeros = document.getElementById('formNumeros');
    const inputNumero = document.getElementById('inputNumero');
    const filtrarNumeros = document.getElementById('filtrarNumeros');
    const resultadoNumeros = document.getElementById('resultadoNumeros');

    const formPalabras = document.getElementById('formPalabras');
    const inputPalabra = document.getElementById('inputPalabra');
    const filtrarPalabras = document.getElementById('filtrarPalabras');
    const resultadoPalabras = document.getElementById('resultadoPalabras');

    const formUsuarios = document.getElementById('formUsuarios');
    const inputUsuarioNombre = document.getElementById('inputUsuarioNombre');
    const inputUsuarioEstado = document.getElementById('inputUsuarioEstado');
    const filtrarUsuarios = document.getElementById('filtrarUsuarios');
    const resultadoUsuarios = document.getElementById('resultadoUsuarios');

    // Manejar el formulario de números
    formNumeros.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numeros.push(nuevoNumero);
            inputNumero.value = '';
        }
    });

    // Filtrar números mayores a 10 con filter()
    filtrarNumeros.addEventListener('click', function() {
        if (numeros.length === 0) {
            resultadoNumeros.innerHTML = '<div class="alert alert-warning">No hay números para filtrar</div>';
            return;
        }

        const numerosFiltrados = numeros.filter(num => num > 10);
        
        if (numerosFiltrados.length === 0) {
            resultadoNumeros.innerHTML = '<div class="alert alert-warning">No hay números mayores a 10</div>';
            return;
        }

        let html = '<h4>Números mayores a 10</h4><ul class="list-group">';
        numerosFiltrados.forEach(num => {
            html += `<li class="list-group-item">${num}</li>`;
        });
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

    // Filtrar palabras con más de 5 letras
    filtrarPalabras.addEventListener('click', function() {
        if (palabras.length === 0) {
            resultadoPalabras.innerHTML = '<div class="alert alert-warning">No hay palabras para filtrar</div>';
            return;
        }

        const palabrasFiltradas = palabras.filter(palabra => palabra.length > 5);
        
        if (palabrasFiltradas.length === 0) {
            resultadoPalabras.innerHTML = '<div class="alert alert-warning">No hay palabras con más de 5 letras</div>';
            return;
        }

        let html = '<h4>Palabras con más de 5 letras</h4><ul class="list-group">';
        palabrasFiltradas.forEach(palabra => {
            html += `<li class="list-group-item">${palabra} (${palabra.length} letras)</li>`;
        });
        html += '</ul>';
        
        resultadoPalabras.innerHTML = html;
    });

    // Manejar el formulario de usuarios
    formUsuarios.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = inputUsuarioNombre.value.trim();
        const activo = inputUsuarioEstado.value === 'true';
        
        if (nombre && inputUsuarioEstado.value !== '') {
            usuarios.push({ nombre, activo });
            inputUsuarioNombre.value = '';
            inputUsuarioEstado.value = '';
        }
    });

    // Filtrar usuarios activos
    filtrarUsuarios.addEventListener('click', function() {
        if (usuarios.length === 0) {
            resultadoUsuarios.innerHTML = '<div class="alert alert-warning">No hay usuarios para filtrar</div>';
            return;
        }

        const usuariosActivos = usuarios.filter(usuario => usuario.activo);
        
        if (usuariosActivos.length === 0) {
            resultadoUsuarios.innerHTML = '<div class="alert alert-warning">No hay usuarios activos</div>';
            return;
        }

        let html = '<h4>Usuarios activos</h4><ul class="list-group">';
        usuariosActivos.forEach(usuario => {
            html += `<li class="list-group-item">${usuario.nombre} (${usuario.activo ? 'Activo' : 'Inactivo'})</li>`;
        });
        html += '</ul>';
        
        resultadoUsuarios.innerHTML = html;
    });
});