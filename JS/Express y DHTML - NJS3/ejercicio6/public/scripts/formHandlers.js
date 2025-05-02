// Validación del formulario antes del envío
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', (e) => {
        // Validación de edad
        const edadInput = document.getElementById('edad');
        const edad = parseInt(edadInput.value);
        
        if (edad < 18 || edad > 100) {
            e.preventDefault();
            edadInput.focus();
            alert('La edad debe estar entre 18 y 100 años');
            return false;
        }
        
        // Validación de email
        const email = document.getElementById('email').value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            alert('Por favor ingrese un email válido');
            return false;
        }
        
        // Si todo está bien, el formulario se envía normalmente
        return true;
    });
});