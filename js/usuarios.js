document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarios();
});

/**
 * Función para generar el HTML de una tarjeta de usuario.
 * @param {Object} user
 * @returns {string}
 */
function crearTarjetaUsuario(user) {
  const { id, firstName, lastName, username, email, gender, age, image } = user;

  return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card h-100 shadow-sm user-card">
                <div class="card-body d-flex flex-column text-center">
                    
                    <div class="user-avatar-container mb-3">
                        <img src="${image}" alt="Avatar de ${firstName}" class="user-avatar" style="background-color: transparent;">
                    </div>
                    
                    <h5 class="card-title fw-bold">${firstName} ${lastName}</h5>
                    
                    <div class="text-start mt-2 p-3 bg-light rounded flex-grow-1">
                        <p class="card-text mb-1 small">
                            <strong>Username:</strong> ${username}
                        </p>
                        <p class="card-text mb-1 small">
                            <strong>Email:</strong> ${email}
                        </p>
                        <p class="card-text mb-1 small">
                            <strong>Edad:</strong> ${age || "N/A"}
                        </p>
                        <p class="card-text mb-1 small">
                            <strong>Género:</strong> ${gender}
                        </p>
                    </div>

                    <div class="mt-3">
                        <span class="badge bg-secondary">ID: ${id}</span>
                    </div>

                </div>
            </div>
        </div>
    `;
}

/**
 * Función para cargar y mostrar los usuarios de dummyjson.com.
 */
async function cargarUsuarios() {
  const contenedor = document.getElementById("contenedorTarjetasUsuarios");

  contenedor.innerHTML =
    '<div class="col-12 text-center text-info">Obteniendo datos de la API...</div>';

  try {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    const usuarios = data.users;

    if (usuarios.length === 0) {
      contenedor.innerHTML =
        '<div class="col-12 text-center text-muted">No se encontraron usuarios.</div>';
      return;
    }

    contenedor.innerHTML = "";

    usuarios.forEach((user) => {
      contenedor.innerHTML += crearTarjetaUsuario(user);
    });
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    contenedor.innerHTML = `<div class="col-12 text-center text-danger">
                                    <i class="fas fa-exclamation-triangle me-2"></i>
                                    Error al cargar los usuarios: ${error.message}
                               </div>`;
  }
}
