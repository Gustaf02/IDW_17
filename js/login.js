document.addEventListener('DOMContentLoaded', function () {

    const formLogin = document.getElementById('formLogin');
    const inputUsuario = document.getElementById('usuario');
    const inputPassword = document.getElementById('password');

    if (!formLogin) {
        console.error('No se encontró el formulario de login');
        return;
    }

    formLogin.addEventListener('submit', async function (evento) {
        evento.preventDefault();

        const username = inputUsuario.value.trim();
        const password = inputPassword.value.trim();

        if (!username || !password) {
            alert('Por favor, complete ambos campos.');
            return;
        }

        console.log("Enviando credenciales:", { username, password });

        try {
            const respuesta = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    expiresInMins: 30 
                })
            });

            console.log("Status de respuesta:", respuesta.status);
            const data = await respuesta.json();
            console.log("Cuerpo de respuesta:", data);

            if (respuesta.ok && (data.accessToken || data.token)) {
                const token = data.accessToken || data.token;
                sessionStorage.setItem('accessToken', token);
                sessionStorage.setItem('userData', JSON.stringify(data));

                console.log("Login exitoso. Token guardado:", token);
                console.log("Login exitoso. Redirigiendo en 100ms...");
                setTimeout(() => {
                    window.location.href = 'administracion.html';
                }, 100);
            } else {
                console.error("Respuesta de error de la API:", { status: respuesta.status, body: data });
                alert(`Error: ${data.message || 'Respuesta inesperada.'}. Verifique sus credenciales.`);
            }
        } catch (error) {
            console.error("Error de Red:", error);
            alert('No se pudo conectar con el servidor de autenticación. Revise la consola (F12).');
        }
    });
});