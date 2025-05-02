document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnClick').addEventListener('click', () => {
        document.getElementById('resultado').textContent = 'Click detectado!';
    });
});