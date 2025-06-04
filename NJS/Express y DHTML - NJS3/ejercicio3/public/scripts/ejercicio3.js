document.addEventListener('DOMContentLoaded', () => {
    const countButton = document.getElementById('countChildren');
    const resultDiv = document.getElementById('child-count-result');
    
    countButton.addEventListener('click', () => {
        // Seleccionamos el contenedor específico
        const componentesContainer = document.getElementById('componentes-container');
        
        if (!componentesContainer) {
            resultDiv.innerHTML = '<p class="error">No se encontró el contenedor de componentes</p>';
            return;
        }
        
        // Contamos los elementos <a> dentro del contenedor
        const componentes = componentesContainer.querySelectorAll('a');
        
        if (componentes.length === 0) {
            resultDiv.innerHTML = '<p class="error">No se encontraron componentes</p>';
            return;
        }
        
        // Mostramos el resultado
        resultDiv.innerHTML = `
            <h3>Resultado del conteo:</h3>
            <p>Total de componentes encontrados: <strong>${componentes.length}</strong></p>
            <ul class="component-list">
                ${Array.from(componentes).map((componente, index) => `
                    <li>
                        <span class="component-number">${index + 1}.</span>
                        <span class="component-name">${componente.textContent.trim()}</span>
                        <span class="component-link">(${componente.href.split('/').pop()})</span>
                    </li>
                `).join('')}
            </ul>
        `;
    });
});