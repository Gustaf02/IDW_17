document.addEventListener("DOMContentLoaded", function () {
  const KEY_MEDICOS = "medicos_clinica";
  let medicos = [];

  // Lógica de carga inicial, consistente con medicos.js
  const datosGuardados = localStorage.getItem(KEY_MEDICOS);
  if (datosGuardados) {
    medicos = JSON.parse(datosGuardados);
  } else {
    medicos = datosInicialesMedicos; // Usa la constante del otro archivo
    localStorage.setItem(KEY_MEDICOS, JSON.stringify(medicos));
  }

  const contenedor = document.getElementById("catalogo");
  if (!contenedor) {
    console.error("No se encontró el contenedor del catálogo.");
    return;
  }

  function crearCard(medico) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    // Uso de la clase .doctor-card-img en lugar del atributo style
    col.innerHTML = `
      <div class="card doctor-card h-100">
        <img src="${medico.foto || 'img/default_doctor.png'}" class="doctor-card-img img-fluid rounded-top" alt="${medico.nombre} ${medico.apellido}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${medico.nombre} ${medico.apellido}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Mat: ${medico.matricula || "-"}</h6>
          <ul class="mb-2">
            <li><strong>Especialidad:</strong> ${medico.especialidad}</li>
            <li><strong>Obras sociales:</strong> ${medico.obraSociales.join(", ")}</li>
            <li><strong>Valor consulta:</strong> $${medico.valorConsulta.toFixed(2)}</li>
          </ul>
          <p class="card-text flex-grow-1">${medico.descripcion || ""}</p>
          <a href="#" class="btn btn-primary btn-sm mt-auto">Agendar turno</a>
        </div>
      </div>
    `;
    return col;
  }

  function renderizarCatalogo() {
    contenedor.innerHTML = "";
    if (medicos.length === 0) {
      contenedor.innerHTML = `<p class="text-center text-muted">No hay médicos disponibles.</p>`;
      return;
    }
    medicos.forEach(medico => contenedor.appendChild(crearCard(medico)));
  }

  renderizarCatalogo();
});