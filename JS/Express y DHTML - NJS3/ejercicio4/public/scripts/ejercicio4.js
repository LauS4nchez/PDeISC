document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('buttons-links-container');
    const changeLinksBtn = document.createElement('button');
    changeLinksBtn.textContent = 'Cambiar Links';
    changeLinksBtn.id = 'changeLinksBtn';
    container.parentNode.insertBefore(changeLinksBtn, container.nextSibling);
    
    // Datos de reemplazo
    const newLinks = [
        { url: 'https://www.mozilla.org', text: 'Mozilla Oficial' },
        { url: 'https://www.microsoft.com', text: 'Microsoft' },
        { url: 'https://www.google.com', text: 'Google Search' },
        { url: 'https://www.nasa.gov', text: 'NASA Oficial' },
        { url: 'https://www.argentina.gob.ar', text: 'Gobierno AR' }
    ];
    
    // Alternar entre originales y nuevos
    let originalLinks = [];
    let showingOriginal = true;
    
    // Guardar los originales
    Array.from(container.children).forEach((link, index) => {
        originalLinks.push({
            url: link.href,
            text: link.querySelector('button').textContent
        });
    });
    
    // Función para cambiar los links
    function toggleLinks() {
        const links = container.querySelectorAll('a');
        
        links.forEach((link, index) => {
            if (showingOriginal) {
                // Cambiar a nuevos links
                link.href = newLinks[index].url;
                link.querySelector('button').textContent = newLinks[index].text;
            } else {
                // Restaurar originales
                link.href = originalLinks[index].url;
                link.querySelector('button').textContent = originalLinks[index].text;
            }
        });
        
        showingOriginal = !showingOriginal;
        changeLinksBtn.textContent = showingOriginal ? 'Cambiar Links' : 'Revertir Cambios';
    }
    
    // Asignar evento
    changeLinksBtn.addEventListener('click', toggleLinks);
});