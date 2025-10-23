document.addEventListener("DOMContentLoaded", function () {

  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }

  const KEY_MEDICOS = "medicos_clinica";
  const PLACEHOLDER_FOTO = "img/user_placeholder.jpg";
  const form = document.getElementById("formMedico");
  const tbody = document.getElementById("tablaMedicos");
  const btnCancelar = document.getElementById("btnCancelar");

  renderizarTabla();
  btnCancelar.addEventListener("click", limpiarFormulario);

  function cargarMedicos() {
    let medicos = [];
    const datosGuardados = localStorage.getItem(KEY_MEDICOS);

    if (datosGuardados) {
      medicos = JSON.parse(datosGuardados);
    } else {

      medicos = datosInicialesMedicos;
      guardarMedicos(medicos);
    }
    return medicos;
  }

  function guardarMedicos(medicos) {
    localStorage.setItem(KEY_MEDICOS, JSON.stringify(medicos));
  }

  function convertirFotoABase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  
  function crearObjetoMedico(id, fotoBase64, medicosExistentes) {
    const obrasSociales = Array.from(
      document.querySelectorAll('#formMedico input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.nextElementSibling.textContent);
    
    let fotoFinal = fotoBase64;
    if (!fotoBase64 && id) {
        const medicoExistente = medicosExistentes.find(m => m.id == id);
        if (medicoExistente) {
            fotoFinal = medicoExistente.foto;
        }
    }

    return {
      id: id || Math.max(0, ...medicosExistentes.map(m => m.id || 0)) + 1,
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      matricula: document.getElementById("matricula").value.trim(),
      especialidad: document.getElementById("especialidad").value.trim(),
      valorConsulta: parseFloat(document.getElementById("valorConsulta").value),
      email: document.getElementById("email").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      obraSociales: obrasSociales, 
      descripcion: document.getElementById("descripcion").value.trim(),
      foto: fotoFinal || "",
    };
  }

  form.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const id = document.getElementById("medicoId").value;
    const fotoFile = document.getElementById("foto").files[0];
    let fotoBase64 = "";

    try {

        if (fotoFile) {
            fotoBase64 = await convertirFotoABase64(fotoFile);
        }
    } catch (error) {
        console.error("Error al procesar la imagen:", error);
        alert("Ocurrió un error al procesar la imagen. Se guardará sin foto.");
    }
    
    let medicos = cargarMedicos();
    const medico = crearObjetoMedico(id, fotoBase64, medicos);

    if (id) {
        const indice = medicos.findIndex(m => m.id == id);
        if (indice !== -1) {
            medicos[indice] = medico;
            alert("Médico actualizado con éxito!");
        }
    } else {
        medicos.push(medico);
        alert("Médico guardado con éxito!");
    }

    guardarMedicos(medicos);
    renderizarTabla();
    limpiarFormulario();
  });

  tbody.addEventListener("click", function (evento) {
    const target = evento.target.closest(".editar") || evento.target.closest(".borrar");
    if (!target) return;

    const id = parseInt(target.dataset.id);

    if (target.classList.contains("editar")) {
      cargarMedicoParaEditar(id);
    } else if (target.classList.contains("borrar")) {
      eliminarMedico(id);
    }
  });

  function limpiarFormulario() {
    form.reset();
    document.getElementById("medicoId").value = "";
    form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save me-1"></i>Guardar Médico';
    document.querySelector(".card-header h5").innerHTML = '<i class="fas fa-user-plus me-2"></i>Agregar/Editar Médico';
  }

  function renderizarTabla() {
    const medicos = cargarMedicos();
    tbody.innerHTML = "";

    if (medicos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted py-4">No hay médicos registrados</td></tr>`;
      return;
    }

    medicos.forEach((medico) => {

      const fotoSrc = medico.foto && medico.foto.startsWith("data:image") 
        ? medico.foto 
        : (medico.foto || PLACEHOLDER_FOTO); 
      
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${medico.id}</td>
        <td>
            <img src="${fotoSrc}" alt="${medico.nombre}" 
                style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
        </td>
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

      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });
      
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {

        const obrasSociales = medico.obraSociales || [];
        if (obrasSociales.includes(checkbox.nextElementSibling.textContent)) {
            checkbox.checked = true;
        }
      });

      form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-edit me-1"></i>Actualizar Médico';
      document.querySelector(".card-header h5").innerHTML = `<i class="fas fa-edit me-2"></i>Editar Médico (ID: ${medico.id})`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  
  function eliminarMedico(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este médico?")) {
      let medicos = cargarMedicos();
      medicos = medicos.filter(m => m.id !== id);
      guardarMedicos(medicos);
      renderizarTabla();
      limpiarFormulario();
      alert("Médico eliminado con éxito.");
    }
  }
});