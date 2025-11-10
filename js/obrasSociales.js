document.addEventListener("DOMContentLoaded", () => {
  const KEY_OBRAS = "obras_sociales_clinica";
  const form = document.getElementById("formObraSocial");
  const tbody = document.getElementById("tablaObrasSociales");
  const btnCancelar = document.getElementById("btnCancelarObra");
  const inputId = document.getElementById("obraSocialId");

  function cargarObras() {
    let obras = JSON.parse(localStorage.getItem(KEY_OBRAS));

    if (!obras && typeof datosInicialesObrasSociales !== "undefined") {
      obras = datosInicialesObrasSociales;
      localStorage.setItem(KEY_OBRAS, JSON.stringify(obras));
    }

    return obras || [];
  }

  function guardarObras(obras) {
    localStorage.setItem(KEY_OBRAS, JSON.stringify(obras));
  }

  function limpiarFormulario() {
    form.reset();
    inputId.value = "";
    form.querySelector('button[type="submit"]').innerHTML =
      '<i class="fas fa-save me-1"></i>Guardar Obra Social';
  }

  function renderizarTabla() {
    const obras = cargarObras();
    tbody.innerHTML = "";

    if (obras.length === 0) {
      tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">No hay obras sociales cargadas</td>
                </tr>`;
      return;
    }

    obras.forEach((os) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
                <td class="text-center">${os.id}</td>
                <td class="text-center">${os.nombre}</td>
                <td class="text-center">${os.descuento}%</td>
                <td class="text-center">${os.descripcion || "—"}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm editar" data-id="${
                      os.id
                    }">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm borrar" data-id="${
                      os.id
                    }">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            `;
      tbody.appendChild(fila);
    });
  }

  function cargarParaEditar(id) {
    const obras = cargarObras();
    const os = obras.find((o) => o.id === id);

    if (os) {
      inputId.value = os.id;
      document.getElementById("nombreObra").value = os.nombre;
      document.getElementById("porcentaje").value = os.descuento;
      document.getElementById("descripcionObra").value = os.descripcion || "";
      form.querySelector('button[type="submit"]').innerHTML =
        '<i class="fas fa-edit me-1"></i>Actualizar Obra Social';
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function eliminarObra(id) {
    if (!confirm("¿Seguro que querés eliminar esta obra social?")) return;

    const obras = cargarObras().filter((o) => o.id !== id);

    guardarObras(obras);

    let medicos = JSON.parse(localStorage.getItem("medicos_clinica")) || [];

    const obraEliminada = datosInicialesObrasSociales.find(
      (o) => o.id === id
    ) || { nombre: "" };

    medicos = medicos.map((med) => ({
      ...med,
      obraSociales: med.obraSociales.filter(
        (os) => os !== obraEliminada.nombre
      ),
    }));

    localStorage.setItem("medicos_clinica", JSON.stringify(medicos));

    renderizarTabla();
    limpiarFormulario();

    alert(
      "Obra social eliminada y removida de los médicos correspondientes"
    );
  }


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = inputId.value;
    const nombre = document.getElementById("nombreObra").value.trim();
    const descuento = parseInt(document.getElementById("porcentaje").value);
    const descripcion = document.getElementById("descripcionObra").value.trim();

    if (!nombre || isNaN(descuento)) {
      alert("Completa correctamente los datos.");
      return;
    }

    let obras = cargarObras();

    const obra = {
      id: id ? parseInt(id) : Math.max(0, ...obras.map((o) => o.id)) + 1,
      nombre,
      descuento,
      descripcion,
    };

    if (id) {
      const index = obras.findIndex((o) => o.id == id);
      obras[index] = obra;
      alert("Obra social actualizada con éxito!");
    } else {
      obras.push(obra);
      alert("Obra social agregada con éxito!");
    }

    guardarObras(obras);
    renderizarTabla();
    limpiarFormulario();
  });

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = parseInt(btn.dataset.id);
    if (btn.classList.contains("editar")) cargarParaEditar(id);
    if (btn.classList.contains("borrar")) eliminarObra(id);
  });

  btnCancelar.addEventListener("click", limpiarFormulario);

  renderizarTabla();
});
