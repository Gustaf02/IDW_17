// Función para cargar contenido HTML desde un archivo en un contenedor específico
const cargarHtml = async (url, contenedorId) => {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error al cargar ${url}: ${respuesta.statusText}`);
    }
    const texto = await respuesta.text();
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
      contenedor.innerHTML = texto;
    } else {
      console.warn(`No se encontró el contenedor con id: ${contenedorId}`);
    }
  } catch (error) {
    console.error(error);
  }
};

// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  cargarHtml("plantillas/nav.html", "contenedor-nav");
  cargarHtml("plantillas/footer.html", "contenedor-footer");
});