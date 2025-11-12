document.addEventListener("DOMContentLoaded", () => {

    const KEY_MEDICOS = "medicos_clinica";
    const KEY_TURNOS = "turnos_clinica";
    const KEY_RESERVAS = "reservas_clinica";

    const formTurno = document.getElementById("formTurno");
    const selectMedico = document.getElementById("medicoId");
    const inputFechaHora = document.getElementById("fechaHora");
    const inputTurnoId = document.getElementById("turnoId");
    const tbody = document.getElementById("tablaTurnos");
    const btnCancelar = document.getElementById("btnCancelar");

    const medicos = JSON.parse(localStorage.getItem(KEY_MEDICOS)) || [];

    function poblarSelectMedicos() {
        selectMedico.innerHTML = `<option value="">Seleccionar médico</option>`;
        if (medicos.length === 0) {
            selectMedico.innerHTML = `<option value="">No hay médicos cargados</option>`;
            return;
        }

        medicos.forEach(medico => {
            selectMedico.innerHTML += `
                <option value="${medico.id}">
                    Dr. ${medico.nombre} ${medico.apellido} - ${medico.especialidad}
                </option>
            `;
        });
    }

    function renderizarTablaTurnos() {
    let turnos = JSON.parse(localStorage.getItem(KEY_TURNOS));
    let reservas = JSON.parse(localStorage.getItem(KEY_RESERVAS));

    if (!turnos && typeof datosInicialesTurnos !== 'undefined') {
        turnos = datosInicialesTurnos;
        localStorage.setItem(KEY_TURNOS, JSON.stringify(turnos));
    } else if (!turnos) {
        turnos = [];
    }

    if (!reservas && typeof datosInicialesReservas !== 'undefined') {
        reservas = datosInicialesReservas;
        localStorage.setItem(KEY_RESERVAS, JSON.stringify(reservas));
    } else if (!reservas) {
        reservas = [];
    }

    tbody.innerHTML = "";

    if (turnos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No hay turnos registrados.</td></tr>`;
        return;
    }

    turnos.forEach(turno => {
        const medico = medicos.find(m => m.id === turno.id_medico);
        const nombreMedico = medico ? `${medico.nombre} ${medico.apellido}` : "Médico no encontrado";

        const fecha = new Date(turno.fechaHora);
        const fechaFormateada = fecha.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }) + ' hs.';

        let estado, paciente;
        if (turno.disponible) {
            estado = `<span class="badge bg-success">Disponible</span>`;
            paciente = "-";
        } else {
            const reserva = reservas.find(r => r.id_turno === turno.id);
            estado = `<span class="badge bg-warning">Ocupado</span>`;
            paciente = reserva ? reserva.nombre_paciente : "No disponible";
        }
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${turno.id}</td>
            <td>${nombreMedico}</td>
            <td>${fechaFormateada}</td>
            <td>${paciente}</td>
            <td>${estado}</td>
            <td>
                <button class="btn btn-warning btn-sm editar" data-id="${turno.id}">
                    <i class="fas fa-edit me-1"></i>Editar
                </button>
                <button class="btn btn-danger btn-sm borrar" data-id="${turno.id}">
                    <i class="fas fa-trash me-1"></i>Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

    function limpiarFormulario() {
        formTurno.reset();
        inputTurnoId.value = "";
        formTurno.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save me-1"></i>Guardar Turno';
    }

    formTurno.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = inputTurnoId.value;
        const id_medico = parseInt(selectMedico.value);
        const fechaHora = inputFechaHora.value;

        if (!id_medico || !fechaHora) {
            alert("Debe seleccionar un médico y una fecha.");
            return;
        }

        const turnos = JSON.parse(localStorage.getItem(KEY_TURNOS)) || [];

        if (id) {
            const index = turnos.findIndex(t => t.id == id);
            if (index !== -1) {
                turnos[index].id_medico = id_medico;
                turnos[index].fechaHora = fechaHora;
            }
            alert("Turno actualizado con éxito.");
        } else {
            const nuevoTurno = {
                id: (turnos.length > 0) ? Math.max(...turnos.map(t => t.id)) + 1 : 1,
                id_medico: id_medico,
                fechaHora: fechaHora,
                disponible: true
            };
            turnos.push(nuevoTurno);
            alert("Turno creado con éxito.");
        }

        localStorage.setItem(KEY_TURNOS, JSON.stringify(turnos));
        renderizarTablaTurnos();
        limpiarFormulario();
    });

    function cargarTurnoParaEditar(id) {
        const turnos = JSON.parse(localStorage.getItem(KEY_TURNOS)) || [];
        const turno = turnos.find(t => t.id === id);

        if (turno) {
            inputTurnoId.value = turno.id;
            selectMedico.value = turno.id_medico;
            inputFechaHora.value = turno.fechaHora;

            formTurno.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-edit me-1"></i>Actualizar Turno';
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function eliminarTurno(id) {
        const turnos = JSON.parse(localStorage.getItem(KEY_TURNOS)) || [];
        const turno = turnos.find(t => t.id === id);

        if (confirm("¿Está seguro de que desea eliminar este turno?")) {
            const turnosActualizados = turnos.filter(t => t.id !== id);
            localStorage.setItem(KEY_TURNOS, JSON.stringify(turnosActualizados));
            renderizarTablaTurnos();
            limpiarFormulario();
        }
    }

    tbody.addEventListener("click", (e) => {
        const target = e.target.closest("button");
        if (!target) return;

        const id = parseInt(target.dataset.id);

        if (target.classList.contains("editar")) {
            cargarTurnoParaEditar(id);
        } else if (target.classList.contains("borrar")) {
            eliminarTurno(id);
        }
    });

    btnCancelar.addEventListener("click", limpiarFormulario);

    poblarSelectMedicos();
    renderizarTablaTurnos();
});