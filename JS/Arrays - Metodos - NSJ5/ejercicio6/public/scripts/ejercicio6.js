document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let numeros = [];
    let peliculas = [
        "Nueve Reinas", 
        "Esperando la Carroza", 
        "El secreto de Sus Ojos",
        "Donde Acecha la Maldad",
        "Argentina, 1985"
    ];
    let elementos = [];

    // Elementos del DOM
    const formNumeros = document.getElementById('formNumeros');
    const inputNumero = document.getElementById('inputNumero');
    const copiarTres = document.getElementById('copiarTres');
    const resultadoNumeros = document.getElementById('resultadoNumeros');

    const copiarPeliculas = document.getElementById('copiarPeliculas');
    const resultadoPeliculas = document.getElementById('resultadoPeliculas');

    const formElementos = document.getElementById('formElementos');
    const inputElemento = document.getElementById('inputElemento');
    const copiarUltimos = document.getElementById('copiarUltimos');
    const resultadoElementos = document.getElementById('resultadoElementos');

    // Manejar el formulario de números
    formNumeros.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numeros.push(nuevoNumero);
            inputNumero.value = '';
        } else {
            resultadoNumeros.innerHTML = '<div class="alert alert-danger">Por favor ingrese un número válido</div>';
        }
    });

    // Copiar primeros 3 números
    copiarTres.addEventListener('click', function() {
        if (numeros.length < 3) {
            resultadoNumeros.innerHTML = '<div class="alert alert-warning">Necesita al menos 3 números en el array</div>';
            return;
        }

        const primerosTres = numeros.slice(0, 3);
        
        let html = '<h4>Primeros 3 números</h4><ul class="list-group">';
        primerosTres.forEach(num => {
            html += `<li class="list-group-item">${num}</li>`;
        });
        html += '</ul>';
        
        resultadoNumeros.innerHTML = html;
    });

    // Copiar películas posiciones 2 a 4
    copiarPeliculas.addEventListener('click', function() {
        const peliculasCopia = peliculas.slice(2, 4); // slice() toma hasta el índice anterior al final
        
        let html = '<h4>Películas (posición 2 a 4)</h4><ul class="list-group">';
        peliculasCopia.forEach(peli => {
            html += `<li class="list-group-item">${peli}</li>`;
        });
        html += '</ul>';
        
        resultadoPeliculas.innerHTML = html;
    });

    // Manejar el formulario de elementos
    formElementos.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoElemento = inputElemento.value.trim();
        if (nuevoElemento) {
            elementos.push(nuevoElemento);
            inputElemento.value = '';
        }
    });

    // Copiar últimos 3 elementos
    copiarUltimos.addEventListener('click', function() {
        if (elementos.length < 3) {
            resultadoElementos.innerHTML = '<div class="alert alert-warning">Necesita al menos 3 elementos en el array</div>';
            return;
        }

        const ultimosTres = elementos.slice(-3); // Forma sencilla de obtener los últimos 3
        
        let html = '<h4>Últimos 3 elementos</h4><ul class="list-group">';
        ultimosTres.forEach(elem => {
            html += `<li class="list-group-item">${elem}</li>`;
        });
        html += '</ul>';
        
        resultadoElementos.innerHTML = html;
    });
});