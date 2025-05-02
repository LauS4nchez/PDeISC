document.addEventListener('DOMContentLoaded', () => {
    const dragItem = document.getElementById('dragItem');
    const dropArea = document.getElementById('dropArea');
    const status = document.getElementById('dropStatus');
    
    dragItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'dragItem');
    });
    
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        status.textContent = '¡Elemento soltado con éxito!';
        dropArea.style.border = '2px solid green';
    });
});