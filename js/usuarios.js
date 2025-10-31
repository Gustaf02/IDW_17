// js/usuarios.js

document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarios();
});

/**
 * Función para cargar y mostrar los usuarios de dummyjson.com.
 */
async function cargarUsuarios() {
  const tablaBody = document.getElementById("tablaUsuarios");

  tablaBody.innerHTML =
    '<tr><td colspan="6" class="text-center text-info">Obteniendo datos de la API...</td></tr>';

  try {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    const usuarios = data.users;

    if (usuarios.length === 0) {
      tablaBody.innerHTML =
        '<tr><td colspan="6" class="text-center text-muted">No se encontraron usuarios.</td></tr>';
      return;
    }

    tablaBody.innerHTML = "";

    usuarios.forEach((user) => {
      const { id, firstName, lastName, username, email, gender, image } = user;

      const fila = `
                <tr>
                    <td>${id}</td>
                    <td>
                        <img src="${image}" alt="Avatar de ${firstName}" class="admin-table-img" />
                    </td>
                    <td>${firstName} ${lastName}</td>
                    <td>${username}</td>
                    <td>${email}</td>
                    <td>${gender}</td>
                </tr>
            `;
      tablaBody.innerHTML += fila;
    });
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    tablaBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">
                                    <i class="fas fa-exclamation-triangle me-2"></i>
                                    Error al cargar los usuarios: ${error.message}
                               </td></tr>`;
  }
}
