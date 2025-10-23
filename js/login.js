document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('formLogin');

    formLogin.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        if (usuario === 'admin' && password === 'admin') {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'administracion.html';
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });
});