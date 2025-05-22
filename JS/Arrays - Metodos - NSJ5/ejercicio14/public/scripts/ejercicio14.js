document.addEventListener('DOMContentLoaded', function() {
    // Arrays para almacenar los datos
    let letras = [];
    let numeros = [];
    let textos = [];

    // Elementos del DOM
    const formLetras = document.getElementById('formLetras');
    const inputLetra = document.getElementById('inputLetra');
    const invertirLetras = document.getElementById('invertirLetras');
    const resultadoLetras = document.getElementById('resultadoLetras');

    const formNumeros = document.getElementById('formNumeros');
    const inputNumero = document.getElementById('inputNumero');
    const invertirNumeros = document.getElementById('invertirNumeros');
    const resultadoNumeros = document.getElementById('resultadoNumeros');

    const formTexto = document.getElementById('formTexto');
    const inputTexto = document.getElementById('inputTexto');
    const invertirTexto = document.getElementById('invertirTexto');
    const resultadoTexto = document.getElementById('resultadoTexto');

    // Manejar el formulario de letras
    formLetras.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevaLetra = inputLetra.value.trim();
        if (nuevaLetra.length === 1) {
            letras.push(nuevaLetra);
            inputLetra.value = '';
        }
    });

    // Invertir orden de letras con reverse()
    invertirLetras.addEventListener('click', function() {
        if (letras.length === 0) {
            resultadoLetras.innerHTML = '<div class="alert alert-warning">No hay letras para invertir</div>';
            return;
        }

        const letrasInvertidas = [...letras].reverse();
        
        let html = '<h4>Letras invertidas</h4><ul class="list-group">';
        html += `<li class="list-group-item"><strong>Original:</strong> [${letras.join(', ')}]</li>`;
        html += `<li class="list-group-item"><strong>Invertido:</strong> [${letrasInvertidas.join(', ')}]</li>`;
        html += '</ul>';
        
        resultadoLetras.innerHTML = html;
    });

    // Manejar el formulario de números
    formNumeros.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoNumero = parseFloat(inputNumero.value.trim());
        if (!isNaN(nuevoNumero)) {
            numeros.push(nuevoNumero);
            inputNumero.value = '';
        }
    });

    // Invertir orden de números con reverse()
    invertirNumeros.addEventListener('click', function() {
        if (numeros.length === 0) {
            resultadoNumeros.innerHTML = '<div class="alert alert-warning">No hay números para invertir</div>';
            return;
        }

        const numerosInvertidos = [...numeros].reverse();
        
        let html = '<h4>Números invertidos</h4><ul class="list-group">';
        html += `<li class="list-group-item"><strong>Original:</strong> [${numeros.join(', ')}]</li>`;
        html += `<li class="list-group-item"><strong>Invertido:</strong> [${numerosInvertidos.join(', ')}]</li>`;
        html += '</ul>';
        
        resultadoNumeros.innerHTML = html;
    });

    // Manejar el formulario de texto
    formTexto.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoTexto = inputTexto.value.trim();
        if (nuevoTexto) {
            textos.push(nuevoTexto);
            inputTexto.value = '';
        }
    });

    // Invertir texto convirtiendo a array y usando reverse()
    invertirTexto.addEventListener('click', function() {
        if (textos.length === 0) {
            resultadoTexto.innerHTML = '<div class="alert alert-warning">No hay texto para invertir</div>';
            return;
        }

        const textoOriginal = textos[0];
        const textoInvertido = textoOriginal.split('').reverse().join('');
        
        resultadoTexto.innerHTML = `
            <div class="alert alert-success">
                <h4>Texto invertido</h4>
                <p><strong>Original:</strong> ${textoOriginal}</p>
                <p><strong>Invertido:</strong> ${textoInvertido}</p>
            </div>
        `;
    });
});