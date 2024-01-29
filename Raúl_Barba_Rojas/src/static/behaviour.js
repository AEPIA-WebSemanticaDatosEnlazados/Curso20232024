var map;
var mapMarkers = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeMap();

    // Load data when the page is loaded
    fetchData();

    // Add click event listener to the button
    document.getElementById('load-data-btn').addEventListener('click', function() {
        fetchData();
    });
});

function fetchData() {
    const selectedType = document.getElementById('center-type-select').value;
    const url = `http://localhost:8000/centers?center_type=${selectedType}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
}

function initializeMap() {
    map = L.map('map').setView([28.291565, -16.629130], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

function clearMarkers() {
    for (var i = 0; i < mapMarkers.length; i++) {
        map.removeLayer(mapMarkers[i]);
    }
    mapMarkers = []; // Clear the corrected array
}

function plotPoints(bluePoints, purplePoints) {
    if (!map) {
        initializeMap();
    }

    clearMarkers();

    var blueIcon = L.AwesomeMarkers.icon({
        icon: 'circle',
        markerColor: 'blue'
    });

    var purpleIcon = L.AwesomeMarkers.icon({
        icon: 'circle',
        markerColor: 'purple'
    });

    bluePoints.forEach(function(point) {
        var marker = L.marker([point.latitude, point.longitude], {icon: blueIcon})
            .addTo(map)
            .bindPopup(point.name);
        mapMarkers.push(marker);
    });

    purplePoints.forEach(function(point) {
        var marker = L.marker([point.latitude, point.longitude], {icon: purpleIcon})
            .addTo(map)
            .bindPopup(point.name);
        mapMarkers.push(marker);
    });
}


function displayData(data) {
    const elementsList = document.querySelector('.center-list');
    elementsList.innerHTML = '';

    let culturalCenters = [];
    let sportCenters = [];

    data.forEach(item => {
        // Adjust the optional data for the item
        if(item.street_address == null){
            item.postal_code = 'Dirección desconocida'
        }

        if(item.postal_code == null){
            item.postal_code = 'Código postal desconocido'
        }

        if(item.telephone == null){
            item.telephone = 'Teléfono desconocido'
        }

        if(item.fax == null){
            item.fax = 'Fax desconocido'
        }

        if(item.email == null){
            item.email = 'Correo electrónico desconocido'
        }

        if(item.web == null){
            item.web = 'Web desconocida'
        }

        if(item.creation_date == null){
            item.web = 'Fecha de creación desconocida'
        }

        if(item.update_date == null){
            item.web = 'Fecha de actualización desconocida'
        }


        // Container for the item and its description
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        // The item
        const centerDiv = document.createElement('div');
        centerDiv.classList.add('center');
        centerDiv.innerHTML = `
            <span class="name">${item.name}</span>
            <span class="activity">${item.activity}</span>
        `;

        // Description block for the item
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description');
        descriptionDiv.style.display = 'none'; // Initially hidden
        descriptionDiv.innerHTML = `
        <p class="center-item-detail-headers">➤ Dirección: <span class="center-item-detail-responses">${item.street_address}</span></p>
            <p class="center-item-detail-headers">➤ Código Postal: <span class="center-item-detail-responses">${item.postal_code}</span></p>
            <p class="center-item-detail-headers">➤ Web: <span class="center-item-detail-responses">${item.web}</span></p>
            <p class="center-item-detail-headers">➤ Email: <span class="center-item-detail-responses">${item.email}</span></p>
            <p class="center-item-detail-headers">➤ Teléfono: <span class="center-item-detail-responses">${item.telephone}</span></p>
            <p class="center-item-detail-headers">➤ Fax: <span class="center-item-detail-responses">${item.fax}</span></p>
            <p class="center-item-detail-headers">➤ Municipio: <span class="center-item-detail-responses">${item.city_name} (<a href="${item.city_linked_uri}">more</a>)</span></p>
            <hr>
            <p class="center-item-detail-headers">➤ Fecha de creación: <span class="center-item-detail-responses">${new Date(item.creation_date).toISOString().split('T')[0]}</span></p>
            <p class="center-item-detail-headers">➤ Última actualización: <span class="center-item-detail-responses">${new Date(item.update_date).toISOString().split('T')[0]}</span></p>
        `;

        itemContainer.appendChild(centerDiv);
        itemContainer.appendChild(descriptionDiv);

        // Toggle visibility of the description on click
        centerDiv.addEventListener('click', function() {
            const isVisible = descriptionDiv.style.display === 'block';
            if (isVisible) {
                descriptionDiv.style.display = 'none';
                descriptionDiv.classList.remove('description-visible');
            } else {
                descriptionDiv.style.display = 'block';
                descriptionDiv.classList.add('description-visible');
            }
        });

        elementsList.appendChild(itemContainer);

        // Adding item to map centers lists
        if(item.center_type == 'ocio_deporte'){
            sportCenters.push(item);
        }else{
            culturalCenters.push(item);
        }
    });

    plotPoints(sportCenters, culturalCenters);
}
