document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let colores = [ ];
    let tareas = ["Lavar los platos", "Baldear", "Estudiar", "Planchar la ropa"];
    let usuarios = ["A1", "B2", "C3"];

    // Elementos del DOM
    const divColores = document.getElementById('colores');
    const mostrarColores = document.getElementById('desplegarColores');
    const formColores = document.getElementById('formColor');
    const inputColor = document.getElementById('inputColor');

    const divTareas = document.getElementById('tareas');
    const mostrarTareas = document.getElementById('desplegarTareas');
    const formTareas = document.getElementById('formTareas');
    const inputTarea = document.getElementById('inputTarea');

    const divUsuarios = document.getElementById('usuarios');
    const mostrarUsuarios = document.getElementById('desplegarUsuarios');
    const formUsuarios = document.getElementById('formUsuarios');
    const inputUsuario = document.getElementById('inputUsuario');

    // Manejar el formulario de colores
    formColores.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoColor = inputColor.value.trim();
        if (nuevoColor) {
            colores.unshift(nuevoColor);
            inputColor.value = ''; // Limpiar el input
        }
    });

    // Mostrar colores
    mostrarColores.addEventListener('click', function() {
        if (colores.length === 0) {
            divColores.innerHTML = '<div class="alert alert-warning">Aún no se han resgistrado colores</div>';
            return;
        }

        let html = '<h4>Lista de Colores</h4><ul class="list-group">';
        colores.forEach(color => {
            html += `<li class="list-group-item">${color}</li>`;
        });
        html += '</ul>';
        divColores.innerHTML = html;
    });


    // Manejar el formulario de tareas
    formTareas.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevaTarea = inputTarea.value.trim();
        if (nuevaTarea) {
            tareas.unshift(nuevaTarea);
            inputTarea.value = ''; // Limpiar el input
        }
    });

    // Mostrar tareas
    mostrarTareas.addEventListener('click', function() {
        let html = '<h4>Lista de Tareas</h4><ul class="list-group">';
        tareas.forEach(tarea => {
            html += `<li class="list-group-item">${tarea}</li>`;
        });
        html += '</ul>';
        divTareas.innerHTML = html;
    });


    // Manejar el formulario de usuarios
    formUsuarios.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoUsuario = inputUsuario.value.trim();
        if (nuevoUsuario) {
            usuarios.unshift(nuevoUsuario);
            inputUsuario.value = ''; // Limpiar el input
        }
    });

    // Mostrar tareas
    mostrarUsuarios.addEventListener('click', function() {
        let html = '<h4>Lista de Usuarios</h4><ul class="list-group">';
        usuarios.forEach(usuario => {
            html += `<li class="list-group-item">${usuario}</li>`;
        });
        html += '</ul>';
        divUsuarios.innerHTML = html;
    });
});