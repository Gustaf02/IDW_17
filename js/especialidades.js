const KEY_ESPECIALIDADES = "especialidades_clinica";

const form = document.getElementById("formEspecialidad");
const tbody = document.getElementById("tablaEspecialidades");
const btnCancelar = document.getElementById("btnCancelar");

function obtenerDatosIniciales() {

  if (typeof datosInicialesEspecialidades !== 'undefined' && Array.isArray(datosInicialesEspecialidades)) {
    return datosInicialesEspecialidades;
  }
  return [];
}

function cargarEspecialidades() {
  const datosGuardados = localStorage.getItem(KEY_ESPECIALIDADES);

  if (datosGuardados) {
    return JSON.parse(datosGuardados);
  } else {
    const iniciales = obtenerDatosIniciales();
    guardarEspecialidades(iniciales);
    return iniciales;
  }
}

function guardarEspecialidades(especialidades) {
  localStorage.setItem(KEY_ESPECIALIDADES, JSON.stringify(especialidades));
}

function limpiarFormulario() {
  form.reset();
  document.getElementById("especialidadId").value = "";
  form.querySelector('button[type="submit"]').innerHTML =
    '<i class="fas fa-save me-1"></i>Guardar Especialidad';
}

function renderizarTabla() {
  const especialidades = cargarEspecialidades();
  tbody.innerHTML = "";

  if (especialidades.length === 0) {
    tbody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center text-muted">
            No hay especialidades registradas
          </td>
        </tr>`;
    return;
  }

  especialidades.forEach((especialidad) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${especialidad.id}</td>
        <td>${especialidad.nombre}</td>
        <td>
          <button class="btn btn-warning btn-sm editar" data-id="${especialidad.id}">
            <i class="fas fa-edit me-1"></i>Editar
          </button>
          <button class="btn btn-danger btn-sm borrar" data-id="${especialidad.id}">
            <i class="fas fa-trash me-1"></i>Eliminar
          </button>
        </td>
      `;
    tbody.appendChild(fila);
  });
}

function cargarEspecialidadParaEditar(id) {
  const especialidades = cargarEspecialidades();
  const especialidad = especialidades.find((e) => e.id === id);

  if (especialidad) {
    document.getElementById("especialidadId").value = especialidad.id;
    document.getElementById("nombre").value = especialidad.nombre;

    form.querySelector('button[type="submit"]').innerHTML =
      '<i class="fas fa-edit me-1"></i>Actualizar Especialidad';
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function eliminarEspecialidad(id) {
  if (confirm("¿Estás seguro de que quieres eliminar esta especialidad?")) {
    let especialidades = cargarEspecialidades().filter((e) => e.id !== id);
    guardarEspecialidades(especialidades);
    renderizarTabla();
    limpiarFormulario();
    alert("Especialidad eliminada con éxito.");
  }
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const id = document.getElementById("especialidadId").value;
  const nombre = document.getElementById("nombre").value.trim();

  if (nombre === "") {
    alert("El nombre de la especialidad es obligatorio.");
    return;
  }

  let especialidades = cargarEspecialidades();

  const nuevoId = Math.max(0, ...especialidades.map((e) => e.id || 0)) + 1;

  const especialidad = {
    id: id ? parseInt(id) : nuevoId,
    nombre: nombre,
  };

  if (id) {
    const idx = especialidades.findIndex((e) => e.id == id);
    especialidades[idx] = especialidad;
    alert("Especialidad actualizada con éxito!");
  } else {
    const nombreExiste = especialidades.some(e => e.nombre.toLowerCase() === nombre.toLowerCase());
    if (nombreExiste) {
      alert("Ya existe una especialidad con ese nombre.");
      return;
    }
    especialidades.push(especialidad);
    alert("Especialidad guardada con éxito!");
  }

  guardarEspecialidades(especialidades);
  renderizarTabla();
  limpiarFormulario();
});

tbody.addEventListener("click", function (evento) {
  const target = evento.target.closest("button");
  if (!target) return;

  const id = parseInt(target.dataset.id);

  if (target.classList.contains("editar")) {
    cargarEspecialidadParaEditar(id);
  } else if (target.classList.contains("borrar")) {
    eliminarEspecialidad(id);
  }
});

btnCancelar.addEventListener("click", limpiarFormulario);

renderizarTabla();