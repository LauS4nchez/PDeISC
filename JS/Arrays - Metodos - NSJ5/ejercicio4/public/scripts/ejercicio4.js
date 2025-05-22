document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let numeros = [ 1, 2, 3, 4, 5 ];
    let mensajes = [
        "Hola",
        "Buen día",
        "Saludos"
    ];
    let fila = [ 
        "Juansito",
        "Juansito2",
        "Juansito3",
        "Juansito4"
    ]

    // Elementos del DOM
    const divNumeros = document.getElementById('numeros');
    const mostrarNumeros = document.getElementById('desplegarNumeros');
    const elimNum = document.getElementById('eliminadoNum');

    const divMensajes = document.getElementById('mensajes');
    const mostrarMensajes = document.getElementById('desplegarMensajes');
    const elimMsg = document.getElementById('eliminadoMsg');

    const divFila = document.getElementById('fila');
    const mostrarFila = document.getElementById('desplegarFila');
    const elimFila = document.getElementById('eliminadoFila');

    // Mostrar y eliminar primer numero
    mostrarNumeros.addEventListener('click', function() {
        const Eliminado = numeros [0];    

        numeros.shift()

        if (numeros.length === 0) {
            divNumeros.innerHTML = '<div class="alert alert-warning">Se han eliminado todos los numeros</div>';
            elimNum.innerHTML = '';
            return;
        }

        elimNum.innerHTML = `<div class="alert alert-secondary">Se ha eliminado el numero: ${Eliminado}</div>`;

        let html = '<h4>Lista de Numeros</h4><ul class="list-group">';
        numeros.forEach(num => {
            html += `<li class="list-group-item">${num}</li>`;
        });
        html += '</ul>';
        divNumeros.innerHTML = html;
    });


    // Mostrar y eliminar primer mensaje
    mostrarMensajes.addEventListener('click', function() {
        const Eliminado = mensajes [0];

        mensajes.shift()

        if (mensajes.length === 0) {
            divMensajes.innerHTML = '<div class="alert alert-warning">Se han eliminado todos los mensajes</div>';
            elimMsg.innerHTML = '';
            return;
        }

        elimMsg.innerHTML = `<div class="alert alert-secondary">Se ha eliminado el mensaje: ${Eliminado}</div>`;

        let html = '<h4>Lista de Mensajes</h4><ul class="list-group">';
        mensajes.forEach(msg => {
            html += `<li class="list-group-item">${msg}</li>`;
        });
        html += '</ul>';
        divMensajes.innerHTML = html;

    });


    // Mostrar y eliminar primer cliente
    mostrarFila.addEventListener('click', function() {
        const Eliminado = fila [0];    

        fila.shift()

        if (fila.length === 0) {
            divFila.innerHTML = '<div class="alert alert-warning">Es su turno de ser atendido</div>';
            elimFila.innerHTML = '';
            return;
        }

        elimFila.innerHTML = `<div class="alert alert-secondary">El cliente: ${Eliminado} ha sido atendido</div>`;

        let html = '<h4>Fila</h4><ul class="list-group">';
        fila.forEach(cli => {
            html += `<li class="list-group-item">${cli}</li>`;
        });
        html += '</ul>';
        divFila.innerHTML = html;
    });    
});