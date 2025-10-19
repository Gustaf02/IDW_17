document.addEventListener("DOMContentLoaded", function () {
  const KEY = "medicos_clinica";

  const form = document.getElementById("formMedico");
  const tbody = document.getElementById("tablaMedicos");
  const btnCancelar = document.getElementById("btnCancelar");

  const campos = {
    id: document.getElementById("medicoId"),
    nombre: document.getElementById("nombre"),
    apellido: document.getElementById("apellido"),
    matricula: document.getElementById("matricula"),
    especialidad: document.getElementById("especialidad"),
    valorConsulta: document.getElementById("valorConsulta"),
    email: document.getElementById("email"),
    telefono: document.getElementById("telefono"),
    descripcion: document.getElementById("descripcion"),
    foto: document.getElementById("foto"),
  };

  function cargar() {
    const data = localStorage.getItem(KEY);
    if (data) {
      try { return JSON.parse(data); } catch { return []; }
    }
    if (Array.isArray(window.catalogoInicial)) {
      localStorage.setItem(KEY, JSON.stringify(window.catalogoInicial));
      return window.catalogoInicial.slice();
    }
    return [];
  }

  function guardar(medicos) {
    localStorage.setItem(KEY, JSON.stringify(medicos));
  }

  function renderTabla() {
    const medicos = cargar();
    tbody.innerHTML = "";
    if (!medicos.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">Sin registros</td></tr>`;
      return;
    }

    medicos.forEach((m, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${m.id ?? i + 1}</td>
        <td><img src="${m.foto || "img/default_doctor.png"}" alt="${m.nombre}" style="width:60px;height:60px;object-fit:cover;border-radius:8px"></td>
        <td>${m.nombre}</td>
        <td>${m.apellido}</td>
        <td>${m.especialidad}</td>
        <td>${m.matricula}</td>
        <td>$${m.valorConsulta}</td>
        <td>
          <button class="btn btn-warning btn-sm me-1 editar" data-index="${i}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm borrar" data-index="${i}"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const medicos = cargar();
    const idx = campos.id.value;

    const obras = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(
      (c) => c.nextElementSibling.textContent.trim()
    );

    const nuevo = {
      id: idx ? medicos[idx].id : (Math.max(0, ...medicos.map(m => m.id || 0)) + 1),
      nombre: campos.nombre.value.trim(),
      apellido: campos.apellido.value.trim(),
      matricula: campos.matricula.value.trim(),
      especialidad: campos.especialidad.value.trim(),
      valorConsulta: parseFloat(campos.valorConsulta.value) || 0,
      email: campos.email.value.trim(),
      telefono: campos.telefono.value.trim(),
      obraSociales: obras,
      descripcion: campos.descripcion.value.trim(),
      foto: medicos[idx]?.foto || ""
    };

    const archivo = campos.foto.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = e => {
        nuevo.foto = e.target.result;
        guardarMedico(nuevo, medicos, idx);
      };
      lector.readAsDataURL(archivo);
    } else {
      guardarMedico(nuevo, medicos, idx);
    }
  });

  function guardarMedico(nuevo, medicos, idx) {
    if (idx) medicos[idx] = nuevo;
    else medicos.push(nuevo);

    guardar(medicos);
    renderTabla();
    form.reset();
    campos.id.value = "";
  }

  tbody.addEventListener("click", e => {
    if (e.target.closest(".editar")) {
      const i = e.target.closest("button").dataset.index;
      const m = cargar()[i];
      campos.id.value = i;
      campos.nombre.value = m.nombre;
      campos.apellido.value = m.apellido;
      campos.matricula.value = m.matricula;
      campos.especialidad.value = m.especialidad;
      campos.valorConsulta.value = m.valorConsulta;
      campos.email.value = m.email;
      campos.telefono.value = m.telefono;
      campos.descripcion.value = m.descripcion;
      document.querySelectorAll("input[type=checkbox]").forEach(c => {
        const label = c.nextElementSibling.textContent.trim();
        c.checked = m.obraSociales?.includes(label);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  tbody.addEventListener("click", e => {
    if (e.target.closest(".borrar")) {
      const i = e.target.closest("button").dataset.index;
      if (confirm("¿Eliminar este médico?")) {
        const medicos = cargar();
        medicos.splice(i, 1);
        guardar(medicos);
        renderTabla();
      }
    }
  });

  btnCancelar.addEventListener("click", () => {
    form.reset();
    campos.id.value = "";
  });

  renderTabla();
});