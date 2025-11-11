document.addEventListener("DOMContentLoaded", function () {
  const KEY_ESPECIALIDADES = "especialidades_clinica";

  function cargarEspecialidades() {
    const datosGuardados = localStorage.getItem(KEY_ESPECIALIDADES);
    if (datosGuardados) return JSON.parse(datosGuardados);

    if (
      typeof datosInicialesEspecialidades !== "undefined" && Array.isArray(datosInicialesEspecialidades)
    ) {
      localStorage.setItem(
        KEY_ESPECIALIDADES,
        JSON.stringify(datosInicialesEspecialidades)
      );
      return datosInicialesEspecialidades;
    }

    return [];
  }

  const contenedor = document.getElementById("catalogoEspecialidades");
  if (!contenedor) return;

  function crearCard(especialidad) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${especialidad.img}" class="card-img-top" alt="${especialidad.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-primary fw-bold">${especialidad.nombre}</h5>
          <p class="card-text">${especialidad.descripcion}</p>
        </div>
      </div>
    `;
    return col;
  }

  function renderizarCatalogo() {
    const especialidades = cargarEspecialidades();
    contenedor.innerHTML = "";

    if (especialidades.length === 0) {
      contenedor.innerHTML = `<p class="text-center text-muted">No hay especialidades disponibles.</p>`;
      return;
    }

    especialidades.forEach((e) => contenedor.appendChild(crearCard(e)));
  }

  renderizarCatalogo();
});
