document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let frutas = [];
    let amigos = [];
    let numeros = [];

    // Elementos del DOM
    const formFrutas = document.getElementById('formFrutas');
    const inputFruta = document.getElementById('inputFruta');

    const formAmigos = document.getElementById('formAmigos');
    const inputAmigo = document.getElementById('inputAmigo');
    
    const formNumeros = document.getElementById('formNumeros');
    const inputNumeros = document.getElementById('inputNumero');

    const divFrutas = document.getElementById('frutas');
    const divAmigos = document.getElementById('amigos');
    const divNumeros = document.getElementById('numeros');

    const buttonFrutas = document.getElementById('desplegarFrutas');
    const buttonAmigos = document.getElementById('desplegarAmigos');
    const buttonNumeros = document.getElementById('desplegarNumeros');

    // Manejar el formulario de frutas
    formFrutas.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevaFruta = inputFruta.value.trim();
        if (nuevaFruta) {
            frutas.push(nuevaFruta);
            inputFruta.value = ''; // Limpiar el input
        }
    });

    // Manejar el formulario de amigos
    formAmigos.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoAmigo = inputAmigo.value.trim();
        if (nuevoAmigo) {
            amigos.push(nuevoAmigo);
            inputAmigo.value = ''; // Limpiar el input
        }
    });

    // Manejar el formulario de numeros
    formNumeros.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputNumero.value.trim()); // Convertir a número
        
        if (!isNaN(nuevoNumero)) { // Verificar que sea un número válido
            if (numeros.length === 0 || nuevoNumero > numeros[numeros.length - 1]) {
                numeros.push(nuevoNumero);
                inputNumero.value = ''; // Limpiar el input
            } else {
                alert('El número que ingresó no es mayor al último ingresado');
            }
        } else {
            alert('Por favor ingrese un número válido');
        }
    });

    // Mostrar frutas
    buttonFrutas.addEventListener('click', function() {
        if (frutas.length === 0) {
            divFrutas.innerHTML = '<div class="alert alert-warning">No hay frutas registradas</div>';
            return;
        }

        let html = '<h4>Lista de Frutas</h4><ul class="list-group">';
        frutas.forEach(fruta => {
            html += `<li class="list-group-item">${fruta}</li>`;
        });
        html += '</ul>';
        divFrutas.innerHTML = html;
    });

    // Mostrar amigos
    buttonAmigos.addEventListener('click', function() {
        if (amigos.length === 0) {
            divAmigos.innerHTML = '<div class="alert alert-warning">No hay amigos registrados</div>';
            return;
        }

        let html = '<h4>Lista de Amigos</h4><ul class="list-group">';
        amigos.forEach(amigo => {
            html += `<li class="list-group-item">${amigo}</li>`;
        });
        html += '</ul>';
        divAmigos.innerHTML = html;
    });

    // Mostrar amigos
    buttonNumeros.addEventListener('click', function() {
        if (numeros.length === 0) {
            divNumeros.innerHTML = '<div class="alert alert-warning">No hay números registrados</div>';
            return;
        }
    
        let html = '<h4>Lista de Números</h4><ul class="list-group">';
        numeros.forEach(numero => {
            html += `<li class="list-group-item">${numero}</li>`;
        });
        html += '</ul>';
        divNumeros.innerHTML = html;
    }); 
});