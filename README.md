# IDW_17

# IDW_17 - Trabajo Final Integrador (4ta Entrega)

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
Este repositorio contiene la cuarta y última entrega del Trabajo Final Integrador de la materia Introducción al Desarrollo Web.
En esta etapa, el proyecto evoluciona desde una estructura local con persistencia en LocalStorage hacia un sistema más completo que integra autenticación de usuarios mediante API Rest, control de acceso al panel de administración y un CRUD integral para todas las entidades del sitio: Médicos, Turnos, Obras Sociales y Especialidades Médicas.

Además, se incorporaron nuevas páginas informativas para ofrecer una experiencia de navegación más completa y profesional.

## Nuestra página web
¡Aquí se puede ver nuestro proyecto en vivo!

[![Ver Proyecto](https://img.shields.io/badge/Ver_Clínica-007bff?style=for-the-badge&logo=heart&logoColor=fff)](https://gustaf02.github.io/IDW_17/)

## Estructura del Sitio Web
El sitio cuenta actualmente con las siguientes páginas:

### 1. Index.html (Página de Inicio)
- Funciona como página principal de bienvenida
- Contiene enlaces de navegación a todas las secciones del sitio
- Sirve como punto de entrada y presentación general

### 2. Institucional.html (Información Institucional)
- Presenta información general sobre la organización
- Incluye la visión, misión y objetivos
- Presenta un catálogo resumido de profesionales
- Proporciona detalles sobre las instalaciones y certificaciones que la clínica posee
- Implementación de Llamadas a la Acción
    - Botón "Nuestros profesionales" (Lleva al Catálogo de Médicos)
    - Botón "Reservar turno" (Funcionalidad de reserva no desarrollada)
    - Botón "Conocer especialidades" (Catálogo de especialidades no desarrollado)

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
- Integración con la API Rest pública DummyJSON

### 6. Administracion.html (Panel de administración de médicos)
- Contiene un formulario para agregar, editar o eliminar médicos
- Muestra los profesionales actuales en una tabla HTML

### 7. Administracion-especialidades.html (Panel de administración de especialidades)
- Contiene un formulario para agregar, editar o eliminar especialidades médicas
- Muestra las especialidades actuales en una tabla HTML

### 8. Administracion-turnos.html (Panel de administración de turnos)
- Contiene un formulario para generar nuevas fechas de turnos, modificarlas y eliminarlas.
- Muestra los turnos creados y su estado en una tabla HTML

### 9. Obras-sociales.html (Panel de administracion de obras sociales)
- Contiene un formulario para agregar, modificar o eliminar obras sociales
- Muestra las obras sociales actuales en una tabla HTML

### 10. Usuarios.html (Panel de administración de usuarios)
- Muestra un listado de los usuarios obtenidos de la API Rest pública DummyJSON

### 11. Reserva.html (Página de reserva de turnos)
- Contiene un formulario para la reserva de los turnos

### 12. Especialidades.html (Página informativa)
- Contiene un listado de las especialidades medicas ofrecidas en la clínica

### 13. Estilos.css (Hoja de Estilos)
- Centraliza estilos del sitio web
- Mantiene la coherencia visual en todas las páginas
- Facilita el mantenimiento y actualizaciones de diseño

## Secciones añadidas

### Politica-privacidad.html (Página informativa)
- Detalla la politica de privacidad de la clínica, la recopilacion de datos de pacientes y como se protege la información

### Preguntas-frecuentes.html (Página informativa)
- Contiene un listado de preguntas frecuentes sobre el uso de las funciones del sitio y los servicios disponibles para los pacientes

### Scripts

### 1. App.js
- Carga dinamicamente la barra de navegacion y el pie de página en los html

### 2. Catalogo.js
- Muestra los datos de los profesionales médicos en la seccion catálogo
- Lee los datos desde LocalStorage y crea las tarjetas de los dorctores de forma dinamica

### 3. Login.js
- Controla el acceso al área de administración
- Valida las credenciales utilizando un servicio de autenticación externo

### 4. Medicos.js
- Contiene la lógica del CRUD de médicos permitiendo añadir, editar o eliminar profesionales

### 5. DatosIniciales.js
- Inicializa el LocalStorage si aun no hay datos de profesionales guardados
- Contiene un array con los datos de los médicos mostrados en el catalogo

### 6. CatalogoEspecialidades.js
- Muestra las especialidades disponibles en la clínica
- Gestiona la carga de la información de las especialidades

### 7. especialidades.js
- Contiene la lógica del CRUD de especialidades médicas, permitiendo añadir, editar o eliminar especialidades

### 8. Guardian.js
- Implementa la restricción de acceso a las páginas de administración.
- Verifica si un usuario es administrador o no

### 9. ObrasSociales.js
- Contiene la lógica del CRUD de obras sociales permitiendo añadir, editar o eliminar las mismas
- Implementa la eliminación en cascada, removiendo la obra social eliminada del listado de servicios de los médicos

### 10. Reserva.js
- Continene la lógica para la reserva de turnos
- Calcula el precio final de la consulta aplicando descuentos por obras sociales
- Muestra en pantalla el resumen detallado de la reserva del turno

### 11. Turnos.js
- Contiene la lógica del CRUD para la gestión de turnos médicos permitiendo añadir, editar o eliminar los mismos
- Indica visualmente el estado de cada turno

### 12. Usuarios.js
- Implementa la funcionalidad de listado de usuarios del panel de administración
- Se conecta a la API Rest pública DummyJSON para obtener la lista de todos los usuarios registrados

## Tecnologías Utilizadas
- HTML5
- CSS3
- Git para control de versiones
- GitHub para alojamiento del repositorio
- Bootstrap 5
- JavaScript
- API LocalStorage
- API SessionStorage
- API Rest pública DummyJSON

## Objetivos Cumplidos
- [x] Implementar la funcionalidad de inicio de sesión de usuario utilizando la API Rest pública auth/login provista por DummyJSON.
- [x] Se deberá guardar el accessToken en sessionStorage.
- [x] Agregar una nueva página al panel de administración donde se muestren todos los usuarios registrados.
- [x] Cumplimentar las funcionalidades de Listado, Creación, Modificación y Eliminación de todas las entidades.

## Instrucciones de Visualización
1. Clonar el repositorio: `git clone [URL-del-repositorio]`
2. Abrir el archivo `index.html` en cualquier navegador web moderno
3. Navegar entre las diferentes páginas usando el menú de navegación

## Estado del Proyecto
✅ **Primera entrega completada** - Estructura básica del sitio web
✅ **Segunda entrega completada** - Diseño responsivo y Bootstrap 5
✅ **Tercera entrega completada** - CRUD con JavaScript, DOM y LocalStorage
✅ **Cuarta entrega completada** - Fetch, Async/Await y Promesas (Integración con API Rest)

### Datos para el inicio de sesion (usuarios administradores)
**Usuario:** emilys
**Contraseña:** emilyspass

**Usuario:** michaelw
**Contraseña:** michaelwpass

**Usuario:** sophiab
**Contraseña:** sophiabpass

**Usuario:** jamesd
**Contraseña:** jamesdpass

---

*Última actualización: [12/11/2025]*
