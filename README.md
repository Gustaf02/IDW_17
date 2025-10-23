# IDW_17

# IDW_17 - Trabajo Final Integrador (3er Entrega)

## Información del Grupo
- **Materia**: Introducción al Desarrollo Web
- **Carrera**: Tecnicatura Universitaria en Desarrollo Web
- **Institución**: Facultad de Ciencias de la Administración - UNER
- **Cuatrimestre**: 2025 - 2do Cuatrimestre
- **Grupo**: 17

## Integrantes
| Apellido y Nombre       |
|-------------------      |
| Blanc, Eugenia          |
| Ilari, Alondra Nazarena |
| Larran, Jorge Eduardo   |
| Ortiz, Carlos Gustavo   |
| Santana, Micaela        |
| Valdez, Alvaro Miguel   |

## Descripción del Proyecto
Este repositorio contiene la tercer entrega del Trabajo Final Integrador para la materia Introducción al Desarrollo Web. El proyecto consiste en el desarrollo de un sitio web con estructura básica que servirá como base para futuras implementaciones.
En esta etapa se incorporaron funcionalidades dinámicas con JavaScript para la administración del catálogo de médicos, implementando operaciones CRUD (Crear, Listar, Modificar, Eliminar y Visualizar) con persistencia de datos mediante LocalStorage.

## Nuestra página web
¡Aquí se puede ver nuestro proyecto en vivo!

[![Ver Proyecto](https://img.shields.io/badge/Ver_Clínica-007bff?style=for-the-badge&logo=heart&logoColor=fff)](https://raw.githack.com/Gustaf02/IDW_17/refs/heads/main/index.html)

## Estructura del Sitio Web
El sitio cuenta actualmente con las siguientes páginas:

### 1. Index.html (Página de Inicio)
- Funciona como página principal de bienvenida
- Contiene enlaces de navegación a todas las secciones del sitio
- Sirve como punto de entrada y presentación general

### 2. Institucional.html (Información Institucional)
- Presenta información general sobre la organización
- Incluye la visión, misión y objetivos
- Proporciona detalles sobre las instalaciones y certificaciones que la clínica posee
- Implementación de Llamadas a la Acción (CTA)
    - Botón **"Nuestros profesionales"** (Lleva al Catálogo de Médicos).
    - Botón **"Reservar turno"** (Funcionalidad de reserva no desarrollada).
    - Botón **"Conocer especialidades"** (Catálogo de especialidades no desarrollado).

### 3. Contacto.html (Página de Contacto)
- Ofrece los principales canales de comunicación
- Incluye un formulario de contacto
- Facilita la comunicación con clientes y visitantes

### 4. Catalogo.html (Catálogo de profesionales)
- Muestra la lista de profesionales médicos
- Permite a los visitantes conocer los profesionales, especialidades, obras sociales y el valor de la consulta

### 5. Login.html (Página de inicio de sesión)
- Es la interfaz de acceso al panel de administración
- Contiene un formulario para ingresar usuario y contraseña

### 6. Administracion.html (Panel de administración de médicos)
- Contiene un formulario para agregar, editar o eliminar medicos
- Muestra los profesionales actuales en una tabla HTML

### 7. Estilos.css (Hoja de Estilos)
- Centraliza estilos del sitio web
- Mantiene la coherencia visual en todas las páginas
- Facilita el mantenimiento y actualizaciones de diseño

### Scripts

### 1. App.js
- Carga dinamicamente la barra de navegacion y el pie de página en los html

### 2. Catalogo.js
- Muestra los datos de los profesionales médicos en la seccion catálogo
- Lee los datos desde LocalStorage y crea las tarjetas de los dorctores de forma dinamica

### 3. Login.js
- Controla el acceso al área de administración

### 4. Medicos.js
- Contiene la ligica del CRUD de medicos permitiendo añadir, editar o eliminar profesionales

### 5. DatosIniciales.js
- Inicializa el LocalStorage si aun no hay datos de profesionales guardados
- Contiene un array con los datos de los medicos mostrados en el catalogo

## Tecnologías Utilizadas
- HTML5
- CSS3
- Git para control de versiones
- GitHub para alojamiento del repositorio
- Bootstrap 5
- JavaScript
- API LocalStorage

## Objetivos Cumplidos
- [x] Implementar funcionalidades de administración que permitan Listar, Crear, Visualizar, Modificar y Eliminar Médicos.
- [x] Definir una constante para inicializar el LocalStorage.
- [x] Utilizar la API LocalStorage para persistir la información de los médicos.
- [x] Modificar el Catálogo de profesionales para que los datos sean consumidos desde LocalStorage.
- [x] Implementar la página de Inicio de Sesión (login.html) y la lógica de protección de acceso.

## Estructura de Archivos

IDW_17/
├── index.html
├── institucional.html
├── contacto.html
├── catalogo.html
├── login.html
├── administracion.html
├── css/
│ └── estilos.css
├── img/
├── js/
│ ├── app.js
│ ├── catalogo.js
│ ├── datosIniciales.js
│ ├── login.js
│ └── medicos.js
├── plantillas/
│ ├── footer.html
│ └── nav.html
└── README.md


## Instrucciones de Visualización
1. Clonar el repositorio: `git clone [URL-del-repositorio]`
2. Abrir el archivo `index.html` en cualquier navegador web moderno
3. Navegar entre las diferentes páginas usando el menú de navegación

## Próximos Pasos (Para futuras entregas)
- Implementar funcionalidades para especialidades y turnos

## Estado del Proyecto
✅ **Primera entrega completada** - Estructura básica del sitio web
✅ **Segunda entrega completada** - Diseño responsivo y Bootstrap 5
✅ **Tercera entrega completada** - CRUD js, DOM y LocalStorage

---

*Última actualización: [23/10/2025]*
