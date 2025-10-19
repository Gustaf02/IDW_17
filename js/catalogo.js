document.addEventListener("DOMContentLoaded", function () {
  const KEY = "medicos_clinica";
  let medicos = [];

  const almacenados = localStorage.getItem(KEY);
  if (almacenados) {
    try {
      medicos = JSON.parse(almacenados);
    } catch (e) {
      console.error("Error al leer catálogo del almacenamiento local:", e);
      medicos = Array.isArray(window.catalogoInicial) ? window.catalogoInicial.slice() : [];
      localStorage.setItem(KEY, JSON.stringify(medicos));
    }
  } else {
    medicos = Array.isArray(window.catalogoInicial) ? window.catalogoInicial.slice() : [];
    localStorage.setItem(KEY, JSON.stringify(medicos));
  }

  const contenedor = document.getElementById("catalogo");
  if (!contenedor) {
    console.error("No se encontró el contenedor con id='catalogo' en el HTML.");
    return;
  }

  function crearCard(m) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card doctor-card h-100">
        <img src="${m.foto || "img/default_doctor.png"}"
             class="img-fluid rounded-top"
             alt="${m.nombre} ${m.apellido}"
             style="height: 220px; object-fit: cover; width: 100%;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${m.nombre} ${m.apellido}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Mat: ${m.matricula || "-"}</h6>
          <ul class="mb-2">
            <li><strong>Especialidad:</strong> ${m.especialidad}</li>
            <li><strong>Obras sociales:</strong> ${Array.isArray(m.obraSociales) ? m.obraSociales.join(", ") : m.obraSociales}</li>
            <li><strong>Valor consulta:</strong> $${m.valorConsulta}</li>
          </ul>
          <p class="card-text flex-grow-1">${m.descripcion || ""}</p>
          <a href="#" class="btn btn-primary btn-sm mt-auto">Agendar turno</a>
        </div>
      </div>
    `;
    return col;
  }

  function renderizar() {
    contenedor.innerHTML = "";
    if (!Array.isArray(medicos) || medicos.length === 0) {
      contenedor.innerHTML = `<p class="text-center text-muted">No hay médicos disponibles.</p>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    medicos.forEach((m) => fragment.appendChild(crearCard(m)));
    contenedor.appendChild(fragment);
  }

  renderizar();

  window.addEventListener("storage", function (e) {
    if (e.key === KEY) {
      medicos = JSON.parse(e.newValue || "[]");
      renderizar();
    }
  });
});