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
                        <p><strong>Dirección:</strong> ${emprendimiento.direccion}</p>
                        <p><strong>Teléfono:</strong> ${emprendimiento.telefono}</p>
                        <p><strong>Rubro:</strong> ${emprendimiento.rubro}</p>
                        <p><strong>Descripción:</strong> ${emprendimiento.detalles}</p>
                    </div>
                `;
                card.addEventListener("click", function() {
                    toggleCard(this);
                });
                cardsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error al cargar los emprendimientos:", error);
        });

 
});

function toggleCard(element) {
    element.classList.toggle('expanded');
}
