document.addEventListener("DOMContentLoaded", function () {
  
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }

  const KEY_MEDICOS = "medicos_clinica";
  const PLACEHOLDER_FOTO = "img/user_placeholder.jpg";
  const form = document.getElementById("formMedico");
  const tbody = document.getElementById("tablaMedicos");
  const btnCancelar = document.getElementById("btnCancelar");
  const inputFoto = document.getElementById("foto");

  function convertirFotoABase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  function cargarMedicos() {
    const datosGuardados = localStorage.getItem(KEY_MEDICOS);
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  }

  function guardarMedicos(medicos) {
    localStorage.setItem(KEY_MEDICOS, JSON.stringify(medicos));
  }

  function limpiarFormulario() {
    form.reset();
    document.getElementById("medicoId").value = "";
    form.querySelector('button[type="submit"]').innerHTML =
      '<i class="fas fa-save me-1"></i>Guardar Médico';
  }

  function renderizarTabla() {
    const medicos = cargarMedicos();
    tbody.innerHTML = "";

    if (medicos.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center text-muted">
            No hay médicos registrados
          </td>
        </tr>`;
      return;
    }

    medicos.forEach((medico) => {
      const fotoSrc = medico.foto || PLACEHOLDER_FOTO;
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${medico.id}</td>
        <td><img src="${fotoSrc}" class="admin-table-img" alt="${medico.nombre}"></td>
        <td>${medico.nombre}</td>
        <td>${medico.apellido}</td>
        <td>${medico.especialidad}</td>
        <td>${medico.matricula}</td>
        <td>$${medico.valorConsulta.toFixed(2)}</td>
        <td>
          <button class="btn btn-warning btn-sm editar" data-id="${medico.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm borrar" data-id="${medico.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  function cargarMedicoParaEditar(id) {
    const medicos = cargarMedicos();
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

      document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = medico.obraSociales.includes(cb.nextElementSibling.textContent);
      });

      form.querySelector('button[type="submit"]').innerHTML =
        '<i class="fas fa-edit me-1"></i>Actualizar Médico';
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function eliminarMedico(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este médico?")) {
      let medicos = cargarMedicos().filter((m) => m.id !== id);
      guardarMedicos(medicos);
      renderizarTabla();
      limpiarFormulario();
    }
  }

  form.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const id = document.getElementById("medicoId").value;
    const matricula = document.getElementById("matricula").value;
    const email = document.getElementById("email").value;

    if (isNaN(matricula) || matricula.trim() === "") {
      alert("Por favor, ingrese un número de matrícula válido.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingrese un formato de email válido.");
      return;
    }

    const obrasSociales = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map((cb) => cb.nextElementSibling.textContent);

    let medicos = cargarMedicos();

    const file = inputFoto.files[0];
    let fotoBase64 = "";

    if (file) {
      try {
        fotoBase64 = await convertirFotoABase64(file);
      } catch {
        alert("Error al procesar la imagen.");
      }
    }

    const medico = {
      id: id ? parseInt(id) : Math.max(0, ...medicos.map((m) => m.id || 0)) + 1,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      matricula: matricula,
      especialidad: document.getElementById("especialidad").value,
      valorConsulta: parseFloat(document.getElementById("valorConsulta").value),
      email: email,
      telefono: document.getElementById("telefono").value,
      descripcion: document.getElementById("descripcion").value,
      obraSociales: obrasSociales,
      foto: fotoBase64 || PLACEHOLDER_FOTO,
    };

    if (id) {
      const idx = medicos.findIndex((m) => m.id == id);
      medico.foto = fotoBase64 || medicos[idx].foto;
      medicos[idx] = medico;
      alert("Médico actualizado con éxito!");
    } else {
      medicos.push(medico);
      alert("Médico guardado con éxito!");
    }

    guardarMedicos(medicos);
    renderizarTabla();
    limpiarFormulario();
  });

  tbody.addEventListener("click", function (evento) {
    if (evento.target.closest(".editar")) {
      const id = parseInt(evento.target.closest(".editar").dataset.id);
      cargarMedicoParaEditar(id);
    }
    if (evento.target.closest(".borrar")) {
      const id = parseInt(evento.target.closest(".borrar").dataset.id);
      eliminarMedico(id);
    }
  });

  btnCancelar.addEventListener("click", limpiarFormulario);

  renderizarTabla();
});