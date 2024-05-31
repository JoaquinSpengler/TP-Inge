let map;
let markers = [];

// Inicializar el mapa
function initializeMap() {
    if (map) {
        map.remove();
    }
    map = L.map('map').setView([-34.5361969734694 + 0.03, -58.7107224346939], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

// Añadir marcadores al mapa
function addMarkers(emprendimientos) {
    emprendimientos.forEach(emprendimiento => {
        if (emprendimiento.mostrarDireccion) {
            const marker = L.marker(emprendimiento.posicion_emprendimiento).addTo(map);
            markers.push({ latLng: emprendimiento.posicion_emprendimiento, marker: marker });
        }
    });
}

// Limpiar todos los marcadores del mapa
function clearMarkers() {
    markers.forEach(markerObj => map.removeLayer(markerObj.marker));
    markers = [];
}

// Centrar mapa en una ubicación específica
function setMapView(latLng) {
    map.setView(latLng, 19);
}

// Asegúrate de que el mapa se redimensione correctamente
function invalidateMapSize() {
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
}

document.addEventListener("DOMContentLoaded", initializeMap);
