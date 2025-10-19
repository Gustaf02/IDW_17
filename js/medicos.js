// js/medicos.js
// Lógica de administración (CRUD)

document.addEventListener("DOMContentLoaded", function () {
    // Protección de Acceso (se mantuvo de la versión de su compañero)
    if (localStorage.getItem("loggedIn") !== "true") {
        // window.location.href = "login.html"; // Comentado para que la app se ejecute en el Canvas
    }

    const KEY = "medicos_clinica"; // CLAVE CONSISTENTE
    const PLACEHOLDER_FOTO = "img/default_doctor.png"; // Usamos el mismo placeholder que el catálogo

    const form = document.getElementById("formMedico");
    const tbody = document.getElementById("tablaMedicos");
    const btnCancelar = document.getElementById("btnCancelar");
    const submitButton = form.querySelector('button[type="submit"]');
    const cardHeaderTitle = document.querySelector(".card-header h5");

    const campos = {
        id: document.getElementById("medicoId"), // Este campo ahora guarda el índice del array
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

    // --- Funciones de Persistencia ---

    function cargar() {
        const data = localStorage.getItem(KEY);
        let medicos = [];

        if (data) {
            try { 
                medicos = JSON.parse(data); 
            } catch (e) { 
                console.error("Error al parsear LocalStorage:", e);
                // Si falla el parseo, se intentará inicializar
            }
        }
        
        // CORRECCIÓN CLAVE: Inicialización si no hay datos o los datos son inválidos/vacíos
        // Esto asegura que la primera carga SIEMPRE tenga el catálogo inicial si no hay persistencia válida.
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
        // Opcional: Disparar evento de storage manualmente para actualizar otras pestañas (como el catálogo)
        window.dispatchEvent(new StorageEvent('storage', {
            key: KEY,
            newValue: JSON.stringify(medicos),
            oldValue: JSON.stringify(cargar()) 
        }));
    }

    // --- Funciones de UI ---

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
            // Se usa data-index para la edición/borrado, consistente con la lógica de su compañero
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

        campos.id.value = i; // Guarda el índice del array para saber qué actualizar
        campos.nombre.value = m.nombre;
        campos.apellido.value = m.apellido;
        campos.matricula.value = m.matricula;
        campos.especialidad.value = m.especialidad;
        campos.valorConsulta.value = m.valorConsulta;
        campos.email.value = m.email;
        campos.telefono.value = m.telefono;
        campos.descripcion.value = m.descripcion;
        
        // Marcar Obras Sociales
        document.querySelectorAll("input[type=checkbox]").forEach(c => {
            const label = c.nextElementSibling.textContent.trim();
            c.checked = m.obraSociales?.includes(label);
        });

        submitButton.innerHTML = '<i class="fas fa-edit me-1"></i>Actualizar Médico';
        cardHeaderTitle.innerHTML = `<i class="fas fa-edit me-2"></i>Editar Médico (Index: ${i})`;
        
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function eliminarMedico(i) {
        // En una aplicación real, se usaría un modal personalizado en lugar de confirm()
        if (confirm("¿Estás seguro de que quieres eliminar este médico?")) {
            const medicos = cargar();
            medicos.splice(i, 1);
            guardar(medicos);
            renderTabla();
            limpiarFormulario();
        }
    }
    
    // --- Manejo del Formulario ---

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const medicos = cargar();
        const idx = campos.id.value; // Índice si estamos editando (string de índice)

        const obras = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(
            (c) => c.nextElementSibling.textContent.trim()
        );

        const isEditing = !!idx;

        const nuevo = {
            // Si edita, usa el ID existente; si crea, calcula un nuevo ID único
            id: isEditing ? medicos[idx].id : (Math.max(0, ...medicos.map(m => m.id || 0)) + 1),
            nombre: campos.nombre.value.trim(),
            apellido: campos.apellido.value.trim(),
            matricula: campos.matricula.value.trim(),
            especialidad: campos.especialidad.value.trim(),
            // Asegura que el valor de consulta se guarde como número
            valorConsulta: parseFloat(campos.valorConsulta.value) || 0,
            email: campos.email.value.trim(),
            telefono: campos.telefono.value.trim(),
            obraSociales: obras,
            descripcion: campos.descripcion.value.trim(),
            foto: isEditing ? (medicos[idx]?.foto || "") : "" // Mantiene la foto si no se sube una nueva
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
        if (idx) medicos[idx] = nuevo; // Edición
        else medicos.push(nuevo); // Creación

        guardar(medicos);
        renderTabla();
        limpiarFormulario();
    }

    // --- Manejo de Eventos en Tabla ---

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

    // Inicializar la tabla al cargar la página
    renderTabla();
});
