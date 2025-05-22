document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let animales = ["Chancho", "Vaca", "Pollo", "Oveja", "Caballo"];
    let productos = ["Fideos", "Leche", "Arroz", "Café", "Té"];
    let numeros = [1, 2, 3, 4, 5];

    // Elementos del DOM
    const divAnimales = document.getElementById('animales');
    const eliminarUltAnimal = document.getElementById('eliminarUltimo');

    const divProductos = document.getElementById('productos');
    const eliminarUltProd = document.getElementById('eliminarUltimoProd');
    const displayEliminado = document.getElementById('eliminado');

    const eliminarTodo = document.getElementById('eliminarTodo');
    const divNumeros = document.getElementById('numeros');
    const mostrarNumeros = document.getElementById('mostrarNumeros');

    // Eliminar el último elemento del array animales
    eliminarUltAnimal.addEventListener('click', function() {
        animales.pop();

        if (animales.length === 0) {
            divAnimales.innerHTML = '<div class="alert alert-warning">No hay más animales registrados</div>';
            return;
        }

        let html = '<h4>Lista de Animales</h4><ul class="list-group">';
        animales.forEach(animal => {
            html += `<li class="list-group-item">${animal}</li>`;
        });
        html += '</ul>';
        divAnimales.innerHTML = html;
    });

    // Eliminar el último elemento del array
    eliminarUltProd.addEventListener('click', function() {
        if (productos.length === 0) {
            divProductos.innerHTML = '<div class="alert alert-warning">No hay más productos registrados</div>';
            return;
        }
        else {
            displayEliminado.innerHTML = `<div class="alert alert-warning">Se eliminó: ${productos[productos.length-1]} de la lista de compras</div>`;
        }

        productos.pop();

        let html = '<h4>Lista de Productos</h4><ul class="list-group">';
        productos.forEach(producto => {
            html += `<li class="list-group-item">${producto}</li>`;
        });
        html += '</ul>';
        divProductos.innerHTML = html;
    });

    eliminarTodo.addEventListener('click', function() {
        let i = 0;
        let longitudArray = numeros.length
        
        while (i <= longitudArray) {
            numeros.pop(i);
            i++;
        }
    });

    mostrarNumeros.addEventListener('click', function() {
        if (numeros.length === 0) {
            divNumeros.innerHTML = '<div class="alert alert-warning">Se borraron todos los números</div>';
            return;
        }

        let html = '<h4>Lista de Numeros</h4><ul class="list-group">';
        numeros.forEach(numero => {
            html += `<li class="list-group-item">${numero}</li>`;
        });
        html += '</ul>';
        divNumeros.innerHTML = html;
    });
});