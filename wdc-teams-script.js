// wdc-teams-script.js
document.addEventListener('DOMContentLoaded', () => {
    const wdcTeams = window.historicalData.wdcTeams;
    const teamsBody = document.getElementById('wdc-teams-body');

    if (!wdcTeams || wdcTeams.length === 0) {
        teamsBody.innerHTML = `<tr><td colspan="4">No hay datos históricos de equipos con WCC.</td></tr>`;
        return;
    }

    wdcTeams.forEach((data, index) => {
        const row = document.createElement('tr');
        if (index === 0) row.classList.add('champion'); 
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.titles}</td>
            <td>${data.info}</td>
        `;
        teamsBody.appendChild(row);
    });
});