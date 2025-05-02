document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('simpleForm');
    const result = document.getElementById('formResult');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        result.innerHTML = `<p>Hola <strong>${name}</strong>, el formulario fue enviado.</p>`;
    });
});