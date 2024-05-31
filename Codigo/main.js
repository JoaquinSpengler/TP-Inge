document.addEventListener("DOMContentLoaded", function() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const cardsContainer = document.querySelector(".cards-container");
            const searchBtn = document.getElementById("search-btn");
            const searchInput = document.getElementById("search-input");
            
            
            function renderCards(filteredData) {
                cardsContainer.innerHTML = "";
                
                if (filteredData.length === 0) {
                    const noResultsCard = document.createElement("div");
                    noResultsCard.classList.add("no-results");
                    noResultsCard.textContent = "No se ha encontrado ningún emprendimiento";
                    cardsContainer.appendChild(noResultsCard);
                } else {
                    
                    filteredData.forEach(emprendimiento => {
                        
                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.innerHTML = `
                            <h2>${emprendimiento.nombre}</h2>
                            <p class="summary">${emprendimiento.descripcion}</p>
                            <div class="extra-info">
                                ${emprendimiento.mostrarDireccion ? `<p><strong>Dirección:</strong> ${emprendimiento.direccion_emprendimiento}</p>` : ''}
                                <p><strong>Teléfono:</strong> ${emprendimiento.telefono}</p>
                                <p><strong>Rubro:</strong> ${emprendimiento.rubro}</p>
                                <p><strong>Horario de atención:</strong> ${emprendimiento.horario_de_atencion}</p>
                            </div>
                            ${emprendimiento.mostrarDireccion ? `<div class="location-icon"><img src="../Images/map.png" alt="Ubicación"></div>` : ''}
                        `;
                        card.addEventListener("click", function() {
                            toggleCard(this, emprendimiento);
                        });
                        cardsContainer.appendChild(card);
                        addMarkers(filteredData);
                    });
                }
            }

            renderCards(data);

            searchBtn.addEventListener("click", function() {
                const searchTerm = searchInput.value.toLowerCase();
                const searchType = document.querySelector('input[name="search-type"]:checked').value;
                const filteredData = data.filter(emprendimiento => emprendimiento[searchType].toLowerCase().includes(searchTerm));
                clearMarkers();
                renderCards(filteredData);
                invalidateMapSize();
                
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
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
});
