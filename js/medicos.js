document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("loggedIn") !== "true") {
    }

    const KEY = "medicos_clinica";
    const PLACEHOLDER_FOTO = "img/default_doctor.png";

    const form = document.getElementById("formMedico");
    const tbody = document.getElementById("tablaMedicos");
    const btnCancelar = document.getElementById("btnCancelar");
    const submitButton = form.querySelector('button[type="submit"]');
    const cardHeaderTitle = document.querySelector(".card-header h5");

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
        let medicos = [];

        if (data) {
            try { 
                medicos = JSON.parse(data); 
            } catch (e) { 
                console.error("Error al parsear LocalStorage:", e);
            }
        }
        
        if (!Array.isArray(medicos) || medicos.length === 0) {
            if (Array.isArray(window.catalogoInicial) && window.catalogoInicial.length > 0) {
                medicos = window.catalogoInicial.slice();
                localStorage.setItem(KEY, JSON.stringify(medicos));
                console.log("LocalStorage inicializado desde catalogoInicial.");
            }
        }
        return medicos;
    }

    function guardar(medicos) {
        localStorage.setItem(KEY, JSON.stringify(medicos));
        window.dispatchEvent(new StorageEvent('storage', {
            key: KEY,
            newValue: JSON.stringify(medicos),
            oldValue: JSON.stringify(cargar()) 
        }));
    }

    function limpiarFormulario() {
        form.reset();
        campos.id.value = "";
        submitButton.innerHTML = '<i class="fas fa-save me-1"></i>Guardar Médico';
        cardHeaderTitle.innerHTML = '<i class="fas fa-user-plus me-2"></i>Agregar/Editar Médico';
    }

    function renderTabla() {
        const medicos = cargar();
        tbody.innerHTML = "";
        if (!medicos.length) {
            tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">No hay médicos registrados</td></tr>`;
            return;
        }

        medicos.forEach((m, i) => {
            const fotoSrc = m.foto && m.foto.startsWith("data:image") ? m.foto : (m.foto || PLACEHOLDER_FOTO);

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${m.id || 'N/A'}</td> 
                <td><img src="${fotoSrc}" alt="${m.nombre}" style="width:60px;height:60px;object-fit:cover;border-radius:8px"></td>
                <td>${m.nombre}</td>
                <td>${m.apellido}</td>
                <td>${m.especialidad}</td>
                <td>${m.matricula}</td>
                <td>$${(m.valorConsulta || 0).toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-1 editar" data-index="${i}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm borrar" data-index="${i}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    }

    function cargarParaEditar(i) {
        const m = cargar()[i];
        if (!m) return;

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

        submitButton.innerHTML = '<i class="fas fa-edit me-1"></i>Actualizar Médico';
        cardHeaderTitle.innerHTML = `<i class="fas fa-edit me-2"></i>Editar Médico (Index: ${i})`;
        
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function eliminarMedico(i) {
        if (confirm("¿Estás seguro de que quieres eliminar este médico?")) {
            const medicos = cargar();
            medicos.splice(i, 1);
            guardar(medicos);
            renderTabla();
            limpiarFormulario();
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const medicos = cargar();
        const idx = campos.id.value;

        const obras = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(
            (c) => c.nextElementSibling.textContent.trim()
        );

        const isEditing = !!idx;

        const nuevo = {
            id: isEditing ? medicos[idx].id : (Math.max(0, ...medicos.map(m => m.id || 0)) + 1),
            nombre: campos.nombre.value.trim(),
            apellido: campos.apellido.value.trim(),
            matricula: campos.matricula.value.trim(),
            especialidad: campos.especialidad.value.trim(),
            valorConsulta: parseFloat(campos.valorConsulta.value) || 0,
            email: campos.email.value.trim(),
            telefono: campos.telefono.value.trim(),
            obraSociales: obras,
            descripcion: campos.descripcion.value.trim(),
            foto: isEditing ? (medicos[idx]?.foto || "") : ""
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
        limpiarFormulario();
    }


    tbody.addEventListener("click", e => {
        const btnEditar = e.target.closest(".editar");
        const btnBorrar = e.target.closest(".borrar");

        if (btnEditar) {
            const i = parseInt(btnEditar.dataset.index);
            cargarParaEditar(i);
        } else if (btnBorrar) {
            const i = parseInt(btnBorrar.dataset.index);
            eliminarMedico(i);
        }
    });

    btnCancelar.addEventListener("click", limpiarFormulario);

    renderTabla();
});
