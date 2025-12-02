// wdc-pilots-script.js
document.addEventListener('DOMContentLoaded', () => {
    const wdcPilots = window.historicalData.wdcPilots;
    const pilotsBody = document.getElementById('wdc-pilots-body');

    if (!wdcPilots || wdcPilots.length === 0) {
        pilotsBody.innerHTML = `<tr><td colspan="4">No hay datos históricos de pilotos con WDC.</td></tr>`;
        return;
    }

    wdcPilots.forEach((data, index) => {
        const row = document.createElement('tr');
        if (index === 0) row.classList.add('champion'); 
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.titles}</td>
            <td>${data.info}</td>
        `;
        pilotsBody.appendChild(row);
    });
});