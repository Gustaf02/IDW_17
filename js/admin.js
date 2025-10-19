
// Lógica de Protección de Acceso
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

const PLACEHOLDER_FOTO = "img/user_placeholder.jpg";
const MEDICO_API_URL = "http://127.0.0.1:5000/medicos";

document.addEventListener("DOMContentLoaded", () => {
  const formMedico = document.getElementById("formMedico");
  const tablaMedicos = document.getElementById("tablaMedicos");
  const btnCancelar = document.getElementById("btnCancelar");

  obtenerMedicos();

  formMedico.addEventListener("submit", function (event) {
    event.preventDefault();

    const medicoId = document.getElementById("medicoId").value;
    const fotoFile = document.getElementById("foto").files[0];

    if (fotoFile) {
      convertirFotoABase64(fotoFile)
        .then((fotoBase64) => {
          guardarMedico(medicoId, fotoBase64);
        })
        .catch((error) => {
          console.error(error);
          alert("Ocurrió un error al procesar la imagen.");
        });
    } else {
      let fotoBase64 = "";
      guardarMedico(medicoId, fotoBase64);
    }
  });

  btnCancelar.addEventListener("click", limpiarFormulario);

  tablaMedicos.addEventListener("click", function (event) {
    const target = event.target;
    const btnEditar = target.closest(".btn-editar");
    const btnEliminar = target.closest(".btn-eliminar");

    if (btnEditar) {
      const id = btnEditar.dataset.id;
      cargarMedicoParaEdicion(id);
    } else if (btnEliminar) {
      const id = btnEliminar.dataset.id;
      eliminarMedico(id);
    }
  });
});

function convertirFotoABase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function crearObjetoMedico(fotoBase64) {
  const obrasSociales = Array.from(
    document.querySelectorAll('#formMedico input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.nextElementSibling.textContent);

  const valorConsultaStr = parseFloat(
    document.getElementById("valorConsulta").value
  ).toFixed(2);

  return {
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    matricula: document.getElementById("matricula").value.trim(),
    especialidad: document.getElementById("especialidad").value.trim(),
    valorConsulta: parseFloat(valorConsultaStr),
    email: document.getElementById("email").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    obrasSociales: obrasSociales,
    descripcion: document.getElementById("descripcion").value.trim(),
    foto: fotoBase64 || "",
    id:
      document.getElementById("medicoId").value ||
      new Date().getTime().toString(),
  };
}

function limpiarFormulario() {
  document.getElementById("formMedico").reset();
  document.getElementById("medicoId").value = "";
  document.querySelector('button[type="submit"]').innerHTML =
    '<i class="fas fa-save me-1"></i>Guardar Médico';
  document.querySelector(".card-header h5").innerHTML =
    '<i class="fas fa-user-plus me-2"></i>Agregar/Editar Médico';
}

function obtenerMedicosDesdeLocalStorage() {
  const medicosJSON = localStorage.getItem("medicos");
  return medicosJSON ? JSON.parse(medicosJSON) : [];
}

function obtenerMedicos() {
  const medicos = obtenerMedicosDesdeLocalStorage();
  mostrarMedicosEnTabla(medicos);
}

function guardarMedico(medicoId, fotoBase64) {
  const nuevoMedico = crearObjetoMedico(fotoBase64);

  let medicos = obtenerMedicosDesdeLocalStorage();

  if (medicoId) {
    const index = medicos.findIndex((m) => m.id === medicoId);
    if (index !== -1) {
      nuevoMedico.foto = fotoBase64 || medicos[index].foto;
      medicos[index] = nuevoMedico;
      alert("Médico actualizado con éxito!");
    }
  } else {
    medicos.push(nuevoMedico);
    alert("Médico guardado con éxito!");
  }

  localStorage.setItem("medicos", JSON.stringify(medicos));
  limpiarFormulario();
  obtenerMedicos();
}

function cargarMedicoParaEdicion(id) {
  const medicos = obtenerMedicosDesdeLocalStorage();
  const medico = medicos.find((m) => m.id === id);

  if (medico) {
    document.getElementById("medicoId").value = medico.id;
    document.getElementById("nombre").value = medico.nombre;
    document.getElementById("apellido").value = medico.apellido;
    document.getElementById("matricula").value = medico.matricula;
    document.getElementById("especialidad").value = medico.especialidad;
    document.getElementById("valorConsulta").value = medico.valorConsulta;
    document.getElementById("email").value = medico.email;
    document.getElementById("telefono").value = medico.telefono;
    document.getElementById("descripcion").value = medico.descripcion;

    document
      .querySelectorAll('#formMedico input[type="checkbox"]')
      .forEach((checkbox) => {
        const label = checkbox.nextElementSibling.textContent;
        checkbox.checked = medico.obrasSociales.includes(label);
      });

    document.querySelector('button[type="submit"]').innerHTML =
      '<i class="fas fa-edit me-1"></i>Actualizar Médico';
    document.querySelector(
      ".card-header h5"
    ).innerHTML = `<i class="fas fa-edit me-2"></i>Editar Médico (ID: ${medico.id})`;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function eliminarMedico(id) {
  if (confirm("¿Estás seguro de que quieres eliminar este médico?")) {
    let medicos = obtenerMedicosDesdeLocalStorage();
    medicos = medicos.filter((m) => m.id !== id);
    localStorage.setItem("medicos", JSON.stringify(medicos));
    alert("Médico eliminado con éxito.");
    limpiarFormulario();
    obtenerMedicos();
  }
}

function mostrarMedicosEnTabla(medicos) {
  const tablaMedicos = document.getElementById("tablaMedicos");
  tablaMedicos.innerHTML = "";

  if (medicos.length === 0) {
    tablaMedicos.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-muted py-4">
                    No hay médicos registrados
                </td>
            </tr>
        `;
    return;
  }

  medicos.forEach((medico) => {
    const row = document.createElement("tr");
    const fotoSrc =
      medico.foto && medico.foto.startsWith("data:image")
        ? medico.foto
        : PLACEHOLDER_FOTO;

    row.innerHTML = `
            <td>${medico.id}</td>
            <td>
                <img src="${fotoSrc}" alt="${medico.nombre} ${medico.apellido}" 
                     style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
            </td>
            <td>${medico.nombre}</td>
            <td>${medico.apellido}</td>
            <td>${medico.especialidad}</td>
            <td>${medico.matricula}</td>
            <td>$${medico.valorConsulta.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-warning btn-editar" data-id="${medico.id
      }">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${medico.id
      }">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    tablaMedicos.appendChild(row);
  });
}
