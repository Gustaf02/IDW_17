document.addEventListener("DOMContentLoaded", () => {
    const ADMIN_USERS = ['emilys', 'michaelw', 'sophiab', 'jamesd'];

    const token = sessionStorage.getItem('accessToken');
    const userDataString = sessionStorage.getItem('userData');
    let usuarioAutorizado = false;

    if (token && userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            
            if (userData && userData.username) {
                const usernameLimpio = String(userData.username).trim();
                if (ADMIN_USERS.includes(usernameLimpio)) {
                    usuarioAutorizado = true;
                }
            }

        } catch (e) {
            console.error("Error al parsear userData de sessionStorage:", e);
            usuarioAutorizado = false;
        }
    }

    if (!token || !usuarioAutorizado) {
        console.warn("GUARD (guardian.js): Acceso denegado. Redirigiendo a login.html");
        
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userData');

        window.location.href = 'login.html';
    }
});