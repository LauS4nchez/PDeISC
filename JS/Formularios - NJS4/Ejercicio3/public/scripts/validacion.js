document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioPersona');
    
    formulario.addEventListener('submit', function(event) {
        // Validar antes de enviar
        if (!validarFormulario()) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        formulario.classList.add('was-validated');
    });
    
    function validarFormulario() {
        let valido = true;
        
        // Validar campos requeridos
        const camposRequeridos = formulario.querySelectorAll('[required]');
        camposRequeridos.forEach(campo => {
            if (!campo.value.trim()) {
                campo.classList.add('is-invalid');
                valido = false;
            } else {
                campo.classList.remove('is-invalid');
            }
        });
        
        // Validar email
        const email = document.getElementById('email');
        if (email.value && !validarEmail(email.value)) {
            email.classList.add('is-invalid');
            valido = false;
        } else if (email.value) {
            email.classList.remove('is-invalid');
        }
        
        // Validar edad
        const edad = document.getElementById('edad');
        if (edad.value && (edad.value < 1 || edad.value > 120)) {
            edad.classList.add('is-invalid');
            valido = false;
        } else if (edad.value) {
            edad.classList.remove('is-invalid');
        }
        
        return valido;
    }
    
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validación en tiempo real
    formulario.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
            }
        });
    });
});