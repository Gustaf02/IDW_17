const cargarHtml = async (url, contenedorId) => {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error al cargar ${url}: ${respuesta.statusText}`);
    }
    const texto = await respuesta.text();
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
      contenedor.innerHTML = texto;
      
      if (url.endsWith("nav.html")) {
          manejarNavegacionAdministracion();
      }
      
    } else {
      console.warn(`No se encontró el contenedor con id: ${contenedorId}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const manejarNavegacionAdministracion = () => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const contenedorNavAcciones = document.getElementById("nav-acciones");
    
    if (!contenedorNavAcciones) return;

    if (isLoggedIn) {
        contenedorNavAcciones.innerHTML = `
            <div class="dropdown me-2">
                <a class="btn btn-warning dropdown-toggle fw-semibold d-flex align-items-center" href="#" role="button" id="adminDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user-shield me-1"></i> Administración
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="adminDropdown">
                    <li><a class="dropdown-item" href="administracion.html"><i class="fas fa-user-md me-2"></i> Médicos</a></li>
                    <li><a class="dropdown-item" href="administracion-especialidades.html"><i class="fas fa-stethoscope me-2"></i> Especialidades</a></li>
                    <li><a class="dropdown-item" href="usuarios.html"><i class="fas fa-users me-2"></i> Usuarios</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#" id="btnLogout"><i class="fas fa-sign-out-alt me-2"></i> Cerrar Sesión</a></li>
                </ul>
            </div>
            <a class="btn btn-warning fw-semibold d-flex align-items-center" href="#">Pedir Turno</a>
        `;

        const btnLogout = document.getElementById("btnLogout");
        if (btnLogout) {
            btnLogout.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("loggedIn");
                window.location.href = 'index.html'; 
            });
        }

    } else {
        contenedorNavAcciones.innerHTML = `
            <a class="btn btn-outline-light fw-semibold d-flex align-items-center" href="login.html">
                <i class="fas fa-sign-in-alt me-1"></i> Iniciar Sesión
            </a>
            <a class="btn btn-warning fw-semibold d-flex align-items-center" href="#">Pedir Turno</a>
        `;
    }
}


document.addEventListener("DOMContentLoaded", () => {
  cargarHtml("plantillas/nav.html", "contenedor-nav");
  cargarHtml("plantillas/footer.html", "contenedor-footer");
});