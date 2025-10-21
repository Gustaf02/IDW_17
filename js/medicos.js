// Espera a que el DOM esté completamente cargado para ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
  // Simulación de protección de ruta: si no está logueado, redirige al login.
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }

  // --- CONSTANTES Y REFERENCIAS DEL DOM ---
  const KEY_MEDICOS = "medicos_clinica";
  const PLACEHOLDER_FOTO = "img/user_placeholder.jpg";
  const form = document.getElementById("formMedico");
  const tbody = document.getElementById("tablaMedicos");
  const btnCancelar = document.getElementById("btnCancelar");

  // --- FUNCIONES PRINCIPALES ---

  // Carga los médicos desde LocalStorage. Si no hay, los inicializa.
  function cargarMedicos() {
    let medicos = [];
    const datosGuardados = localStorage.getItem(KEY_MEDICOS);

    if (datosGuardados) {
      medicos = JSON.parse(datosGuardados);
    } else {
      // Si no hay nada en LocalStorage, usamos los datos iniciales
      medicos = datosInicialesMedicos;
      guardarMedicos(medicos);
    }
    return medicos;
  }

  // Guarda el arreglo de médicos en LocalStorage
  function guardarMedicos(medicos) {
    localStorage.setItem(KEY_MEDICOS, JSON.stringify(medicos));
  }

  // Limpia el formulario y lo resetea a su estado inicial
  function limpiarFormulario() {
    form.reset();
    document.getElementById("medicoId").value = ""; // Campo oculto para el ID
    form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save me-1"></i>Guardar Médico';
  }

  // Renderiza (dibuja) la tabla de médicos en el HTML
  function renderizarTabla() {
    const medicos = cargarMedicos();
    tbody.innerHTML = ""; // Limpiamos la tabla antes de dibujarla

    if (medicos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">No hay médicos registrados</td></tr>`;
      return;
    }

    medicos.forEach((medico) => {
      const fotoSrc = medico.foto || PLACEHOLDER_FOTO;
      const fila = document.createElement("tr");
      // Usamos la clase .admin-table-img en lugar de estilos en línea
      fila.innerHTML = `
        <td>${medico.id}</td>
        <td><img src="${fotoSrc}" class="admin-table-img" alt="${medico.nombre}"></td>
        <td>${medico.nombre}</td>
        <td>${medico.apellido}</td>
        <td>${medico.especialidad}</td>
        <td>${medico.matricula}</td>
        <td>$${medico.valorConsulta.toFixed(2)}</td>
        <td>
          <button class="btn btn-warning btn-sm editar" data-id="${medico.id}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm borrar" data-id="${medico.id}"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  // Carga los datos de un médico en el formulario para su edición
  function cargarMedicoParaEditar(id) {
    const medicos = cargarMedicos();
    const medico = medicos.find(m => m.id === id);

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

      // Marcar los checkboxes de obras sociales
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = medico.obraSociales.includes(checkbox.nextElementSibling.textContent);
      });

      form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-edit me-1"></i>Actualizar Médico';
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Elimina un médico del arreglo y actualiza la tabla
  function eliminarMedico(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este médico?")) {
      let medicos = cargarMedicos();
      medicos = medicos.filter(m => m.id !== id);
      guardarMedicos(medicos);
      renderizarTabla();
      limpiarFormulario();
    }
  }

  // --- MANEJO DE EVENTOS ---

  // Evento de envío del formulario (para crear o actualizar)
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // --- Validaciones ---
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

    // --- Lógica de guardado ---
    const id = document.getElementById("medicoId").value;
    const obrasSociales = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.nextElementSibling.textContent);

    let medicos = cargarMedicos();

    const medico = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      matricula: matricula,
      especialidad: document.getElementById("especialidad").value,
      valorConsulta: parseFloat(document.getElementById("valorConsulta").value),
      email: email,
      telefono: document.getElementById("telefono").value,
      descripcion: document.getElementById("descripcion").value,
      obraSociales: obrasSociales,
      foto: "" // Dejamos la foto vacía por ahora
    };

    if (id) { // Si hay un ID, estamos editando
      const indice = medicos.findIndex(m => m.id == id);
      medico.id = parseInt(id);
      medico.foto = medicos[indice].foto; // Mantenemos la foto anterior
      medicos[indice] = medico;
      alert("Médico actualizado con éxito!");
    } else { // Si no hay ID, estamos creando uno nuevo
      const nuevoId = Math.max(0, ...medicos.map(m => m.id || 0)) + 1;
      medico.id = nuevoId;
      medicos.push(medico);
      alert("Médico guardado con éxito!");
    }

    guardarMedicos(medicos);
    renderizarTabla();
    limpiarFormulario();
  });

  // Eventos para los botones de la tabla (usando delegación de eventos)
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

  // Evento para el botón de cancelar
  btnCancelar.addEventListener("click", limpiarFormulario);

  // --- INICIALIZACIÓN ---
  renderizarTabla();
});