   // Inicializar el mapa
   const map = L.map('map').setView([-34.5361969734694,-58.7107224346939], 13);
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 19,
       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   }).addTo(map);

