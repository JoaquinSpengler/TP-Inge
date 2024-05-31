let isUserAddressValid = false;
let isBusinessAddressValid = false;

document.getElementById('business-has-address').addEventListener('change', function() {
    const addressContainer = document.getElementById('business-address-container');
    if (this.checked) {
        addressContainer.style.display = 'block';
    } else {
        addressContainer.style.display = 'none';
        isBusinessAddressValid = true; // No necesita validación si no tiene dirección
    }
});

function validateAddress(address, resultContainer, isBusiness) {
    return new Promise((resolve, reject) => {
        resultContainer.textContent = "Validando...";
        if (address) {
            const url = `https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${encodeURIComponent(address)}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.direccionesNormalizadas.length > 1) {
                        resultContainer.textContent = "Se encontró más de una dirección. Intente nuevamente.";
                        resolve(false);
                    } else {
                        const direccion = data.direccionesNormalizadas[0];
                        switch (direccion.tipo) {
                            case "calle_altura":
                                resultContainer.textContent = "Dirección válida: " + direccion.direccion;
                                resolve(true);
                                break;
                            case "calle_y_calle":
                                resultContainer.textContent = "Error al validar la dirección. La dirección es un cruce. Intente nuevamente.";
                                resolve(false);
                                break;
                            case "calle":
                                resultContainer.textContent = "Error al validar la dirección. La dirección no tiene altura. Intente nuevamente.";
                                resolve(false);
                                break;
                            default:
                                resultContainer.textContent = "Error al encontrar la dirección. Intente nuevamente.";
                                resolve(false);
                        }
                    }
                })
                .catch(error => {
                    resultContainer.textContent = "Error al validar la dirección. La dirección no existe. Intente nuevamente.";
                    console.error("Error al normalizar la dirección:", error);
                    resolve(false);
                });
        } else {
            resultContainer.textContent = "Por favor, ingrese una dirección para validar.";
            resolve(false);
        }
    });
}

async function validateForms(event) {
    event.preventDefault();
    
    const userPassword = document.getElementById('password').value; // Obtener el valor del campo de contraseña
    const userAddress = document.getElementById('address').value;
    const userResultContainer = document.getElementById('user-address-validation-result');
    isUserAddressValid = await validateAddress(userAddress, userResultContainer, false);

    const businessAddressCheckbox = document.getElementById('business-has-address');
    if (businessAddressCheckbox.checked) {
        const businessAddress = document.getElementById('business-address').value;
        const businessResultContainer = document.getElementById('business-address-validation-result');
        isBusinessAddressValid = await validateAddress(businessAddress, businessResultContainer, true);
    } else {
        isBusinessAddressValid = true; // Si no tiene dirección, se considera válida
    }

    // Validar que la contraseña esté ingresada
    if (!userPassword) {
        displayErrorMessage("Por favor, ingrese una contraseña.");
        return;
    }

    // Validar direcciones de usuario y emprendimiento
    if (!isUserAddressValid) {
        displayErrorMessage("La dirección de usuario no es válida.");
        return;
    }

    if (!isBusinessAddressValid) {
        displayErrorMessage("La dirección de emprendimiento no es válida.");
        return;
    }

    // Limpiar los campos si el registro es exitoso
    document.getElementById('password').value = ''; // Limpiar contraseña
    document.getElementById('address').value = ''; // Limpiar dirección de usuario
    document.getElementById('business-address').value = ''; // Limpiar dirección de emprendimiento
    

    // Mostrar mensaje de éxito
    displaySuccessMessage("¡Registro exitoso!");
}

// Función para mostrar un mensaje de error
function displayErrorMessage(message) {
    
    const errorContainer = document.getElementById('error-message');
    const messageContainer = document.getElementById('message-container');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block'; // Mostrar el contenedor de mensajes de error
    errorContainer.style.color = 'black';
    errorContainer.style.backgroundColor = '#F56364';
}


// Función para mostrar un mensaje de éxito y ocultar el formulario
function displaySuccessMessage(message) {

    const errorContainer = document.getElementById('error-message');
    errorContainer.style.display = 'none'; // Mostrar el contenedor de mensajes de error
    const successContainer = document.getElementById('success-message');
    successContainer.textContent = message;
    successContainer.style.display = 'block'; // Mostrar el contenedor de mensajes de éxito

    // Ocultar los títulos de registro
    document.getElementById('nombre_usuario').style.display = 'none';
    document.getElementById('titulo_emprendimiento').style.display = 'none';
    
    // Ocultar el formulario y el botón de enviar
    document.getElementById('user-form').style.display = 'none';
    document.getElementById('business-form').style.display = 'none';
    document.querySelector('.submit-btn').style.display = 'none';
}



document.getElementById('business-form').addEventListener('submit', validateForms);
document.getElementById('user-form').addEventListener('submit', validateForms);
