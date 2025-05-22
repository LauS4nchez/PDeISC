document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let numeros = [];
    let nombres = [];
    let precios = [];

    // Elementos del DOM
    const formNumeros = document.getElementById('formNumeros');
    const inputNumero = document.getElementById('inputNumero');
    const multiplicarNumeros = document.getElementById('multiplicarNumeros');
    const resultadoNumeros = document.getElementById('resultadoNumeros');

    const formNombres = document.getElementById('formNombres');
    const inputNombre = document.getElementById('inputNombre');
    const mostrarMayusculas = document.getElementById('mostrarMayusculas');
    const resultadoNombres = document.getElementById('resultadoNombres');

    const formPrecios = document.getElementById('formPrecios');
    const inputPrecio = document.getElementById('inputPrecio');
    const mostrarPreciosConIva = document.getElementById('mostrarPreciosConIva');
    const resultadoPrecios = document.getElementById('resultadoPrecios');

    // Manejar el formulario de números
    formNumeros.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numeros.push(nuevoNumero);
            inputNumero.value = '';
        }
    });

    // Multiplicar números por 3 con map()
    multiplicarNumeros.addEventListener('click', function() {
        if (numeros.length === 0) {
            resultadoNumeros.innerHTML = '<div class="alert alert-warning">No hay números para mostrar</div>';
            return;
        }

        const numerosTriplicados = numeros.map(num => num * 3);
        
        let html = '<h4>Números multiplicados por 3</h4><ul class="list-group">';
        numerosTriplicados.forEach(num => {
            html += `<li class="list-group-item">${num}</li>`;
        });
        html += '</ul>';
        
        resultadoNumeros.innerHTML = html;
    });

    // Manejar el formulario de nombres
    formNombres.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNombre = inputNombre.value.trim();
        if (nuevoNombre) {
            nombres.push(nuevoNombre);
            inputNombre.value = '';
        }
    });

    // Mostrar nombres en mayúsculas con map()
    mostrarMayusculas.addEventListener('click', function() {
        if (nombres.length === 0) {
            resultadoNombres.innerHTML = '<div class="alert alert-warning">No hay nombres para mostrar</div>';
            return;
        }

        const nombresMayusculas = nombres.map(nombre => nombre.toUpperCase());
        
        let html = '<h4>Nombres en mayúsculas</h4><ul class="list-group">';
        nombresMayusculas.forEach(nombre => {
            html += `<li class="list-group-item">${nombre}</li>`;
        });
        html += '</ul>';
        
        resultadoNombres.innerHTML = html;
    });

    // Manejar el formulario de precios
    formPrecios.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoPrecio = parseFloat(inputPrecio.value.trim());
        if (!isNaN(nuevoPrecio) && nuevoPrecio >= 0) {
            precios.push(nuevoPrecio);
            inputPrecio.value = '';
        }
    });

    // Mostrar precios con IVA usando map()
    mostrarPreciosConIva.addEventListener('click', function() {
        if (precios.length === 0) {
            resultadoPrecios.innerHTML = '<div class="alert alert-warning">No hay precios para mostrar</div>';
            return;
        }

        const preciosConIva = precios.map(precio => {
            const iva = precio * 0.21;
            return {
                original: precio,
                conIva: precio + iva,
                iva: iva
            };
        });
        
        let html = '<h4>Precios con IVA (21%)</h4><table class="table table-striped"><thead><tr><th>Original</th><th>IVA</th><th>Total</th></tr></thead><tbody>';
        preciosConIva.forEach(item => {
            html += `<tr>
                <td>$${item.original.toFixed(2)}</td>
                <td>$${item.iva.toFixed(2)}</td>
                <td>$${item.conIva.toFixed(2)}</td>
            </tr>`;
        });
        html += '</tbody></table>';
        
        resultadoPrecios.innerHTML = html;
    });
});