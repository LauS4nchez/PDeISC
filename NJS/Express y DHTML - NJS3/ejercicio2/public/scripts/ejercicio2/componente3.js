document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('textInput');
    const count = document.getElementById('keyCount');
    let counter = 0;
    
    input.addEventListener('keypress', () => {
        counter++;
        count.textContent = counter;
    });
});