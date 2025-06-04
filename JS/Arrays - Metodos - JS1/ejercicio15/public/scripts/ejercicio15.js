document.addEventListener('DOMContentLoaded', function() {
    const formSecreto = document.getElementById('formSecreto');
    const inputMensaje = document.getElementById('inputMensaje');
    const resultado = document.getElementById('resultado');

    formSecreto.addEventListener('submit', function(e) {
        e.preventDefault();
        const mensajeCodificado = inputMensaje.value.trim();
        
        if (!mensajeCodificado) {
            resultado.innerHTML = '<div class="alert alert-warning">Por favor ingrese un mensaje a decodificar</div>';
            return;
        }

        // Decodificar el mensaje
        const mensajeDecodificado = decodificarMensaje(mensajeCodificado);
        
        // Mostrar resultados
        resultado.innerHTML = `
            <div class="card mt-3">
                <div class="card-header bg-primary text-white">
                    <h4>Resultado de decodificación</h4>
                </div>
                <div class="card-body">
                    <h5>Mensaje original:</h5>
                    <p class="text-muted">${mensajeCodificado}</p>
                    <hr>
                    <h5>Mensaje decodificado:</h5>
                    <p class="alert alert-success">${mensajeDecodificado}</p>
                </div>
            </div>
        `;
    });

    // Función para decodificar el mensaje
    function decodificarMensaje(mensaje) {
        let resultado = '';
        let i = 0;
        const stack = [];
        
        while (i < mensaje.length) {
            if (mensaje[i] === '(') {
                // Empieza un segmento a invertir
                stack.push(resultado.length);
                i++;
            } else if (mensaje[i] === ')') {
                // Termina un segmento a invertir
                if (stack.length > 0) {
                    const start = stack.pop();
                    const segmento = resultado.slice(start);
                    resultado = resultado.substring(0, start) + segmento.split('').reverse().join('');
                }
                i++;
            } else {
                // Caracter normal, lo agregamos al resultado
                resultado += mensaje[i];
                i++;
            }
        }
        
        return resultado;
    }
});