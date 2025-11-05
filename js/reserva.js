document.addEventListener("DOMContentLoaded", () => {

    const KEY_MEDICOS = "medicos_clinica";
    const KEY_TURNOS = "turnos_clinica";
    const KEY_RESERVAS = "reservas_clinica";
    const KEY_OBRAS_SOCIALES = "obras_sociales_clinica";
    const infoMedicoCont = document.getElementById("infoMedico");
    const calculoPrecioCont = document.getElementById("calculo-precio");
    const selectTurno = document.getElementById("turno");
    const selectObraSocial = document.getElementById("obraSocial");
    const formReserva = document.getElementById("formReserva");

    const urlParams = new URLSearchParams(window.location.search);
    const medicoId = parseInt(urlParams.get('medicoId'));

    if (!medicoId) {
        infoMedicoCont.innerHTML = `<p class="text-danger text-center">Error: No se especificó un médico.</p>`;
        return;
    }

    const medicos = JSON.parse(localStorage.getItem(KEY_MEDICOS)) || [];
    let turnos = JSON.parse(localStorage.getItem(KEY_TURNOS));
    if (!turnos && typeof datosInicialesTurnos !== 'undefined') {
        turnos = datosInicialesTurnos;
        localStorage.setItem(KEY_TURNOS, JSON.stringify(turnos));
    } else if (!turnos) {
        turnos = [];
    }

    let reservas = JSON.parse(localStorage.getItem(KEY_RESERVAS));
    if (!reservas && typeof datosInicialesReservas !== 'undefined') {
        reservas = datosInicialesReservas;
        localStorage.setItem(KEY_RESERVAS, JSON.stringify(reservas));
    } else if (!reservas) {
        reservas = [];
    }

    let obrasSociales = JSON.parse(localStorage.getItem(KEY_OBRAS_SOCIALES));
    if (!obrasSociales && typeof datosInicialesObrasSociales !== 'undefined') {
        obrasSociales = datosInicialesObrasSociales;
        localStorage.setItem(KEY_OBRAS_SOCIALES, JSON.stringify(obrasSociales));
    } else if (!obrasSociales) {
        obrasSociales = [];
    }

    const medico = medicos.find(m => m.id === medicoId);

    if (!medico) {
        infoMedicoCont.innerHTML = `<p class="text-danger text-center">Error: Médico no encontrado.</p>`;
        return;
    }

    function renderizarInfoMedico() {
       infoMedicoCont.innerHTML = `
    <div class="text-center">
        <img src="${medico.foto || "img/default_doctor.png"}" class="img-fluid rounded-circle mb-3" alt="${medico.nombre}" style="width: 150px; height: 150px; object-fit: cover;">
        <h4 class="card-title mb-1">${medico.nombre} ${medico.apellido}</h4>
        <h6 class="card-subtitle mb-2 text-primary">${medico.especialidad}</h6>
        <p class="text-muted">Matrícula: ${medico.matricula}</p>
    </div>
    <div id="calculo-precio" class="mt-4 text-start"></div>
`;

        document.getElementById("medicoId").value = medico.id;
        document.getElementById("especialidad").value = medico.especialidad;
        document.getElementById("valorConsulta").value = medico.valorConsulta;

        actualizarCalculoPrecio(0);
    }

   function cargarObrasSocialesSelect() {
     selectObraSocial.innerHTML = "";

     const obrasDelMedico = obrasSociales.filter((os) =>
       medico.obraSociales.includes(os.nombre)
     );

     const particular = obrasSociales.find((os) => os.nombre === "Particular");
     if (
       particular &&
       !obrasDelMedico.some((os) => os.nombre === "Particular")
     ) {
       obrasDelMedico.push(particular);
     }

     obrasDelMedico.forEach((os) => {
       selectObraSocial.innerHTML += `
            <option value="${os.id}" data-descuento="${os.descuento}">
                ${os.nombre} ${os.descuento ? `(${os.descuento}%)` : ""}
            </option>`;
     });

     if (particular) {
       selectObraSocial.value = particular.id;
     }
   }


    function cargarTurnosDisponibles() {
        const turnosDisponibles = turnos.filter(t => t.id_medico === medicoId && t.disponible === true);

        selectTurno.innerHTML = "";
        if (turnosDisponibles.length === 0) {
            selectTurno.innerHTML = `<option value="">Este médico no tiene turnos disponibles.</option>`;
            selectTurno.disabled = true;
            formReserva.querySelector('button[type="submit"]').disabled = true;
            return;
        }

        selectTurno.innerHTML = `<option value="">Seleccione un horario</option>`;
        turnosDisponibles.forEach(turno => {
            const fecha = new Date(turno.fechaHora);
            const fechaFormateada = fecha.toLocaleString('es-AR', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }) + ' hs.';

            selectTurno.innerHTML += `<option value="${turno.id}">${fechaFormateada}</option>`;
        });
    }

    function actualizarCalculoPrecio(porcentajeDescuento) {
        const valorBase = medico.valorConsulta;
        const descuento = valorBase * (porcentajeDescuento / 100);
        const valorFinal = valorBase - descuento;

        calculoPrecioCont.innerHTML = `
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between">
                    <span>Valor Consulta:</span>
                    <strong>$${valorBase.toFixed(2)}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between text-danger">
                    <span>Descuento (${porcentajeDescuento}%):</span>
                    <strong>-$${descuento.toFixed(2)}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between fs-5 fw-bold text-success">
                    <span>Total a Pagar:</span>
                    <strong>$${valorFinal.toFixed(2)}</strong>
                </li>
            </ul>
        `;
    }
    selectObraSocial.addEventListener("change", (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const descuento = parseFloat(selectedOption.dataset.descuento) || 0;
        actualizarCalculoPrecio(descuento);
    });
    formReserva.addEventListener("submit", (e) => {
        e.preventDefault();

        const turnoId = parseInt(selectTurno.value);
        if (!turnoId) {
            alert("Por favor, seleccione un turno válido.");
            return;
        }

        const selectedOS = selectObraSocial.options[selectObraSocial.selectedIndex];
        const osNombre = selectedOS.text.split('(')[0].trim();
        const osDescuento = parseFloat(selectedOS.dataset.descuento) || 0;

        const valorBase = medico.valorConsulta;
        const valorFinal = valorBase - (valorBase * (osDescuento / 100));

        const reservas = JSON.parse(localStorage.getItem(KEY_RESERVAS)) || [];
        const nuevaReserva = {
            id: (reservas.length > 0) ? Math.max(...reservas.map(r => r.id)) + 1 : 1,
            id_turno: turnoId,
            id_medico: medicoId,
            especialidad: medico.especialidad,
            valor_total: valorFinal,
            nombre_paciente: document.getElementById("nombrePaciente").value,
            documento: document.getElementById("documento").value,
            obra_social: osNombre,
        };
        reservas.push(nuevaReserva);
        localStorage.setItem(KEY_RESERVAS, JSON.stringify(reservas));

        const turnosActualizados = turnos.map(turno => {
            if (turno.id === turnoId) {
                turno.disponible = false;
            }
            return turno;
        });
        localStorage.setItem(KEY_TURNOS, JSON.stringify(turnosActualizados));

        const descuentoAplicado = valorBase * (osDescuento / 100);

        alert(`¡Reserva confirmada con éxito!
        \nPaciente: ${nuevaReserva.nombre_paciente}
        \nObra Social: ${nuevaReserva.obra_social}
        \nValor de la consulta: $${valorBase.toFixed(2)}
        \nDescuento aplicado: $${descuentoAplicado.toFixed(2)}
        \nTotal Pagado: $${nuevaReserva.valor_total.toFixed(2)}
        \nSerá redirigido a la página principal.`);

        window.location.href = "index.html";
    });

    renderizarInfoMedico();
    cargarObrasSocialesSelect();
    cargarTurnosDisponibles();
});