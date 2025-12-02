// index-script.js
document.addEventListener('DOMContentLoaded', () => {
    // Función compartida para obtener datos de clasificación
    function getClassificationData(year) {
        const data = window.f1Data ? window.f1Data[String(year)] : [];
        if (!data) return [];
        
        const sortedData = [...data].sort((a, b) => b.puntos - a.puntos);
        
        let position = 1;
        
        const classifiedData = sortedData.map((pilot, index) => {
            if (index > 0 && pilot.puntos < sortedData[index - 1].puntos) {
                 position = index + 1;
            }
            const formattedPuntos = pilot.puntos.toString().replace('.', ','); 
            
            return { pos: position, ...pilot, puntos: formattedPuntos };
        });

        return classifiedData;
    }

    const availableYears = Object.keys(window.f1Data).map(Number).sort((a, b) => b - a);
    const END_YEAR = availableYears[0];
    
    const seasonButtonsContainer = document.getElementById('season-buttons-container');
    const currentSeasonDisplay = document.getElementById('current-season');
    const pilotsClassificationBody = document.getElementById('pilots-classification-body');

    /**
     * Obtiene el parámetro 'year' de la URL.
     */
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    /**
     * Carga la clasificación de pilotos por año.
     */
    function loadClassification(year) {
        const classification = getClassificationData(year);
        currentSeasonDisplay.textContent = year;
        pilotsClassificationBody.innerHTML = '';

        if (classification.length === 0) {
            pilotsClassificationBody.innerHTML = `<tr><td colspan="4">No hay datos disponibles para la temporada ${year}.</td></tr>`;
            return;
        }

        classification.forEach((pilot) => {
            const row = document.createElement('tr');
            if (pilot.pos === 1) row.classList.add('champion');
            row.innerHTML = `
                <td>${pilot.pos}</td>
                <td>${pilot.piloto}</td>
                <td>${pilot.equipo}</td>
                <td>${pilot.puntos}</td>
            `;
            pilotsClassificationBody.appendChild(row);
        });
        
        // Activa el botón de la temporada
        document.querySelectorAll('.season-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.season-btn[data-year="${year}"]`)?.classList.add('active');
    }
    
    /**
     * Crea los botones de temporadas, enlazando a la propia página con un parámetro.
     */
    function createSeasonButtons() {
        availableYears.forEach(year => {
            const link = document.createElement('a'); // Usamos 'a' para enlaces de página
            link.className = 'season-btn';
            link.textContent = year;
            link.dataset.year = year;
            link.href = `index.html?year=${year}`;

            seasonButtonsContainer.appendChild(link);
        });
    }

    /**
     * Inicializa la aplicación.
     */
    function init() {
        createSeasonButtons();
        const yearFromUrl = getUrlParameter('year');
        const yearToLoad = yearFromUrl ? parseInt(yearFromUrl) : END_YEAR;
        
        if (availableYears.includes(yearToLoad)) {
            loadClassification(yearToLoad);
        } else {
             loadClassification(END_YEAR);
        }
    }

    init();
});