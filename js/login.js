document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    // Credenciales
    const USERNAME_VALIDO = "admin";
    const PASSWORD_VALIDO = "1234";

    if (usuario === USERNAME_VALIDO && password === PASSWORD_VALIDO) {
      localStorage.setItem("loggedIn", "true");

      window.location.href = "administracion.html";
    } else {
      alert("Error: Usuario o contraseña incorrectos.");
      document.getElementById("password").value = "";
    }
  });
});
