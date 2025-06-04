document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let letras = [ "A", "B", "C", "D", "E", "F" ];
    let nombres = ["Juan", "Pedro", "Mateo"];
    let elementos = ["Hola", "Hello", "Bonjour", "Ciao", "Olá", "Privet"]

    // Elementos del DOM
    const divLetras = document.getElementById('letras');
    const mostrarLetras = document.getElementById('desplegarLetras');
    const elimLet = document.getElementById('eliminadaLetra');

    const formNombres = document.getElementById('formNombres');
    const inputNombre = document.getElementById('inputNombre');
    const divNombres = document.getElementById('nombres');
    const mostrarNombres = document.getElementById('desplegarNombres');
    const subidoNom = document.getElementById('subidoNombre');

    const formElem = document.getElementById('formElem');
    const inputIndex = document.getElementById('inputIndex');
    const inputElem1 = document.getElementById('inputElem1');
    const inputElem2 = document.getElementById('inputElem2');
    const divElem = document.getElementById('elementos');
    const subidoElem = document.getElementById('subidoElem');
    const mostrarElem = document.getElementById('desplegarElem')

    // Mostrar y eliminar primer numero
    mostrarLetras.addEventListener('click', function() {
        const Eliminado1 = letras [1];    
        const Eliminado2 = letras [2];

        letras.splice(1, 2);

        if (letras.length === 1) {
            divLetras.innerHTML = '<div class="alert alert-warning">Se han eliminado todas las letras posibles</div>';
            elimLet.innerHTML = '';
            return;
        }

        elimLet.innerHTML = `<div class="alert alert-secondary">Se ha eliminado la letra: ${Eliminado1} y también la letra: ${Eliminado2}</div>`;

        let html = '<h4>Lista de Letras</h4><ul class="list-group">';
        letras.forEach(letra => {
            html += `<li class="list-group-item">${letra}</li>`;
        });
        html += '</ul>';
        divLetras.innerHTML = html;
    });


    // Manejar formulario de nombres
    formNombres.addEventListener('submit', function(event) {
        event.preventDefault();

        const nuevoNombre = inputNombre.value.trim();
        if (nuevoNombre) {
            nombres.splice(1, 0, nuevoNombre);
            inputNombre.value = '';
            subidoNom.innerHTML = `<div class="alert alert-secondary">Subido!</div>`;
        }
    });

    // Mostrar nombres
    mostrarNombres.addEventListener('click', function() {
        subidoNom.innerHTML = '';

        let html = '<h4>Lista de Nombres</h4><ul class="list-group">';
        nombres.forEach(nom => {
            html += `<li class="list-group-item">${nom}</li>`;
        });
        html += '</ul>';
        divNombres.innerHTML = html;
    });


    // Manejar formulario de Elementos
    formElem.addEventListener('submit', function(event) {
        event.preventDefault();

        const nuevoElem1 = inputElem1.value.trim();
        const nuevoElem2 = inputElem2.value.trim();
        const index = inputIndex.value.trim();


        if (index >= elementos.length-1 || index >= elementos.length) {
            subidoElem.innerHTML = `<div class="alert alert-secondary">Subiste un número que excede el index posible, ingresá uno entre 0 y 4</div>`;

            inputElem1.value = '';
            inputElem2.value = '';
            inputIndex.value = '';
            return
        }

        if (nuevoElem1 && nuevoElem2 && index) {
            elementos.splice(index, 2, nuevoElem1, nuevoElem2);

            inputElem1.value = '';
            inputElem2.value = '';
            inputIndex.value = '';
            subidoElem.innerHTML = `<div class="alert alert-secondary">Subido!</div>`;
        }
    });

    // Mostrar elementos
    mostrarElem.addEventListener('click', function() {
        subidoElem.innerHTML = '';

        let html = '<h4>Lista de Elementos</h4><ul class="list-group">';
        elementos.forEach(elem => {
            html += `<li class="list-group-item">${elem}</li>`;
        });
        html += '</ul>';
        divElem.innerHTML = html;
    });
});