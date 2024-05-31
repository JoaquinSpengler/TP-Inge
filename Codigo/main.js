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
                        <p><strong>Dirección:</strong> ${emprendimiento.direccion_emprendimiento}</p>
                        <p><strong>Teléfono:</strong> ${emprendimiento.telefono}</p>
                        <p><strong>Rubro:</strong> ${emprendimiento.rubro}</p>
                    </div>
                `;
                card.addEventListener("click", function() {
                    toggleCard(this, emprendimiento);
                });
                cardsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error al cargar los emprendimientos:", error);
        });
});

function toggleCard(element, emprendimiento) {
    element.classList.toggle('expanded');
    if (emprendimiento.mostrarDireccion) {
        const latLng = emprendimiento.posicion_emprendimiento;
        setMapView(latLng);
    }
}
