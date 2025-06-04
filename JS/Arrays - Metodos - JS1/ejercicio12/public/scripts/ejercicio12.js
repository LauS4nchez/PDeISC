document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let numerosSuma = [];
    let numerosMulti = [];
    let precios = [];

    // Elementos del DOM
    const formSuma = document.getElementById('formSuma');
    const inputSumaNumero = document.getElementById('inputSumaNumero');
    const calcularSuma = document.getElementById('calcularSuma');
    const resultadoSuma = document.getElementById('resultadoSuma');

    const formMultiplicacion = document.getElementById('formMultiplicacion');
    const inputMultiNumero = document.getElementById('inputMultiNumero');
    const calcularMultiplicacion = document.getElementById('calcularMultiplicacion');
    const resultadoMultiplicacion = document.getElementById('resultadoMultiplicacion');

    const formPrecios = document.getElementById('formPrecios');
    const inputPrecio = document.getElementById('inputPrecio');
    const calcularTotalPrecios = document.getElementById('calcularTotalPrecios');
    const resultadoPrecios = document.getElementById('resultadoPrecios');

    // Manejar el formulario de suma
    formSuma.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputSumaNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numerosSuma.push(nuevoNumero);
            inputSumaNumero.value = '';
        }
    });

    // Calcular suma con reduce()
    calcularSuma.addEventListener('click', function() {
        if (numerosSuma.length === 0) {
            resultadoSuma.innerHTML = '<div class="alert alert-warning">No hay números para sumar</div>';
            return;
        }

        const sumaTotal = numerosSuma.reduce((acumulador, numero) => acumulador + numero, 0);
        
        resultadoSuma.innerHTML = `
            <div class="alert alert-success">
                <h4>Suma total</h4>
                <p>${numerosSuma.join(' + ')} = <strong>${sumaTotal}</strong></p>
            </div>
        `;
    });

    // Manejar el formulario de multiplicación
    formMultiplicacion.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputMultiNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numerosMulti.push(nuevoNumero);
            inputMultiNumero.value = '';
        }
    });

    // Calcular multiplicación con reduce()
    calcularMultiplicacion.addEventListener('click', function() {
        if (numerosMulti.length === 0) {
            resultadoMultiplicacion.innerHTML = '<div class="alert alert-warning">No hay números para multiplicar</div>';
            return;
        }

        const productoTotal = numerosMulti.reduce((acumulador, numero) => acumulador * numero, 1);
        
        resultadoMultiplicacion.innerHTML = `
            <div class="alert alert-success">
                <h4>Producto total</h4>
                <p>${numerosMulti.join(' × ')} = <strong>${productoTotal}</strong></p>
            </div>
        `;
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

    // Calcular total de precios con reduce()
    calcularTotalPrecios.addEventListener('click', function() {
        if (precios.length === 0) {
            resultadoPrecios.innerHTML = '<div class="alert alert-warning">No hay precios para sumar</div>';
            return;
        }

        const total = precios.reduce((acumulador, precio) => acumulador + precio, 0);
        
        resultadoPrecios.innerHTML = `
            <div class="alert alert-success">
                <h4>Total de precios</h4>
                <p>$${precios.join(' + $')} = <strong>$${total.toFixed(2)}</strong></p>
            </div>
        `;
    });
});