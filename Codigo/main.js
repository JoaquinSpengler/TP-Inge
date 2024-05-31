document.addEventListener("DOMContentLoaded", function() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const cardsContainer = document.querySelector(".cards-container");

            data.forEach(emprendimiento => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <h2>${emprendimiento.nombre}</h2>
                    <p class="summary">${emprendimiento.descripcion}</p>
                    <div class="extra-info">
                        ${emprendimiento.mostrarDireccion ? `<p><strong>Dirección:</strong> ${emprendimiento.direccion_emprendimiento}</p>` : ''}
                        <p><strong>Teléfono:</strong> ${emprendimiento.telefono}</p>
                        <p><strong>Rubro:</strong> ${emprendimiento.rubro}</p>
                    </div>

                    ${emprendimiento.mostrarDireccion ? `<div class="location-icon"><img src="../Images/map.png" alt="Ubicación"></div>` : ''}
                     `;
                card.addEventListener("click", function() {
                    toggleCard(this, emprendimiento);
                });
                cardsContainer.appendChild(card);
            });

            // Añadir todos los marcadores inicialmente
            addMarkers(data);
            // Invalidar el tamaño del mapa después de agregar los marcadores
            invalidateMapSize();
        })
        .catch(error => {
            console.error("Error al cargar los emprendimientos:", error);
        });
});

function toggleCard(element, emprendimiento) {
    const wasExpanded = element.classList.contains('expanded');
    element.classList.toggle('expanded');
    if (emprendimiento.mostrarDireccion) {
        const latLng = emprendimiento.posicion_emprendimiento;
        setMapView(latLng);
        invalidateMapSize();
    }
}
