// Mostrar resultados después del envío (simulado para el ejemplo)
document.addEventListener('DOMContentLoaded', () => {
    // Esta función simularía recibir los datos del servidor
    function displayFormData(formData) {
        const resultsContainer = document.getElementById('resultsContainer');
        const resultsGrid = document.querySelector('.results-grid');
        
        // Limpiar resultados anteriores
        resultsGrid.innerHTML = '';
        
        // Mapeo de valores para mostrar
        const paises = {
            'ar': 'Argentina', 'br': 'Brasil', 'cl': 'Chile',
            'co': 'Colombia', 'mx': 'México', 'es': 'España'
        };
        
        const interesesMap = {
            'tecnologia': 'Tecnología', 'deportes': 'Deportes',
            'musica': 'Música', 'viajes': 'Viajes'
        };
        
        // Crear elementos de resultado
        const fields = [
            { label: 'Nombre', value: formData.nombre },
            { label: 'Email', value: formData.email },
            { label: 'Edad', value: formData.edad },
            { label: 'Género', value: formData.genero },
            { label: 'País', value: paises[formData.pais] || formData.pais },
            { 
                label: 'Intereses', 
                value: Array.isArray(formData.intereses) ? 
                    formData.intereses.map(i => interesesMap[i] || i).join(', ') : 
                    (formData.intereses ? [interesesMap[formData.intereses] || formData.intereses].join(', ') : 'Ninguno')
            }
        ];
        
        // Agregar campos al grid
        fields.forEach(field => {
            if (field.value) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'result-item';
                itemDiv.innerHTML = `
                    <span class="result-label">${field.label}:</span>
                    <span class="result-value">${field.value}</span>
                `;
                resultsGrid.appendChild(itemDiv);
            }
        });
        
        // Mostrar comentarios si existen
        if (formData.comentarios) {
            const comentariosDiv = document.createElement('div');
            comentariosDiv.className = 'result-item';
            comentariosDiv.innerHTML = `
                <span class="result-label">Comentarios:</span>
                <span class="result-value">${formData.comentarios}</span>
            `;
            resultsGrid.appendChild(comentariosDiv);
        }
        
        // Mostrar el contenedor
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Simulación: Esto sería reemplazado por la recepción real de datos del servidor
    // En un caso real, los datos vendrían del backend a través de EJS
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('submitted')) {
        // Simulamos datos recibidos (en producción vendrían del servidor)
        const mockData = {
            nombre: "Juan Pérez",
            email: "juan@example.com",
            edad: "30",
            genero: "masculino",
            pais: "ar",
            intereses: ["tecnologia", "musica"],
            comentarios: "Este es un comentario de prueba"
        };
        displayFormData(mockData);
    }
});