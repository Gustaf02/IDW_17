// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos la referencia al formulario de login
    const formLogin = document.getElementById('formLogin');

    // Agregamos un evento para escuchar cuando el formulario intente enviarse
    formLogin.addEventListener('submit', function (evento) {
        // ¡Paso clave! Prevenimos el comportamiento por defecto del formulario (recargar la página)
        evento.preventDefault();

        // Obtenemos los valores de los campos de usuario y contraseña
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        // Verificamos si las credenciales son las correctas
        if (usuario === 'admin' && password === 'admin') {
            // Si son correctas, guardamos el estado de "logueado" en LocalStorage
            localStorage.setItem('loggedIn', 'true');
            // Y redirigimos al panel de administración
            window.location.href = 'administracion.html';
        } else {
            // Si son incorrectas, mostramos una alerta al usuario
            alert('Usuario o contraseña incorrectos.');
        }
    });
});