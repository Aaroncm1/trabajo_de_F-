// team-pilots-script.js
document.addEventListener('DOMContentLoaded', () => {
    // Función compartida para obtener datos de clasificación
    function getClassificationData(year) {
        const data = window.f1Data ? window.f1Data[String(year)] : [];
        if (!data) return [];
        return [...data].sort((a, b) => b.puntos - a.puntos);
    }
    
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const availableYears = Object.keys(window.f1Data).map(Number).sort((a, b) => b - a);
    const END_YEAR = availableYears[0];
    
    const selectorDiv = document.getElementById('secondary-selector');
    const currentSeasonDisplay = document.getElementById('current-season');
    const teamPilotsBody = document.getElementById('team-pilots-body');

    /**
     * Muestra los pilotos por equipo para un año específico.
     */
    function loadTeamsByYear(year) {
        const data = getClassificationData(year).filter(p => p.equipo);
        currentSeasonDisplay.textContent = year;
        
        // Activa el botón de año del selector secundario
        document.querySelectorAll('#secondary-selector a').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`#secondary-selector a[data-year="${year}"]`)?.classList.add('active');

        // Agrupar pilotos por equipo
        const teamsMap = new Map();
        data.forEach(pilot => {
            if (!teamsMap.has(pilot.equipo)) {
                teamsMap.set(pilot.equipo, []);
            }
            teamsMap.get(pilot.equipo).push(pilot.piloto);
        });

        teamPilotsBody.innerHTML = '';
        
        // Construir la tabla
        if (teamsMap.size === 0) {
            teamPilotsBody.innerHTML = `<tr><td colspan="4">No hay datos de equipos disponibles para la temporada ${year}.</td></tr>`;
            return;
        }

        teamsMap.forEach((pilots, teamName) => {
            const row = document.createElement('tr');
            
            const [p1 = 'N/A', p2 = 'N/A', ...extras] = pilots;

            row.innerHTML = `
                <td>${teamName}</td>
                <td>${p1}</td>
                <td>${p2}</td>
                <td>${extras.join(', ') || '-'}</td>
            `;
            teamPilotsBody.appendChild(row);
        });
    }
    
    /**
     * Crea los botones de año para la vista de equipos.
     */
    function createYearSelectorButtons() {
        availableYears.forEach(year => {
            const link = document.createElement('a');
            link.className = 'season-btn'; 
            link.textContent = year;
            link.dataset.year = year;
            link.href = `team-pilots.html?year=${year}`; 
            
            selectorDiv.appendChild(link);
        });
    }


    /**
     * Inicializa la aplicación.
     */
    function init() {
        createYearSelectorButtons();
        
        const yearFromUrl = getUrlParameter('year');
        const yearToLoad = yearFromUrl ? parseInt(yearFromUrl) : END_YEAR;
        
        if (availableYears.includes(yearToLoad)) {
            loadTeamsByYear(yearToLoad);
        } else {
             loadTeamsByYear(END_YEAR);
        }
    }

    init();
});