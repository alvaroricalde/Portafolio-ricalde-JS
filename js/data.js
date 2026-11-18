// ============================================================
//  js/data.js  →  AQUÍ EDITAS TUS PROYECTOS Y TESTIMONIOS
//  No necesitas tocar el HTML: las tarjetas se generan solas.
// ============================================================

// ---------- GALERÍA: proyectos ----------
// Para agregar un proyecto, quita los "//" del ejemplo, copia el bloque
// y pon tus datos reales. Todos los campos son opcionales excepto "nombre".
// Si "repo" o "demo" están vacíos, el botón no aparece (no hay botones falsos).
const PROYECTOS = [
  // {
  //   nombre: "Nombre del proyecto",
  //   descripcion: "Qué hace y qué aprendiste con él.",
  //   imagen: "img/mi-proyecto.png",          // guarda la imagen en la carpeta img/
  //   tecnologias: ["Java", "MySQL"],
  //   repo: "https://github.com/alvaroricalde/mi-proyecto",
  //   demo: ""                                 // enlace a la demo, si existe
  // },
];

// ---------- TESTIMONIOS ----------
// SOLO testimonios reales, con permiso de la persona. Quita los "//" y rellena.
// Si hay menos de 3, los espacios que faltan se muestran como "próximamente".
const TESTIMONIOS = [
  // {
  //   nombre: "Nombre de la persona",
  //   relacion: "Compañero de clase",          // o "Docente", etc.
  //   texto: "Lo que esta persona dijo de mí, tal cual lo escribió.",
  //   foto: ""                                  // opcional: "img/persona.jpg"
  // },
];

// Cantidad mínima de tarjetas que se muestran en Testimonios (rellena con espacios vacíos)
const TESTIMONIOS_MINIMO = 3;
// Cantidad mínima de tarjetas en la galería (rellena con espacios "próximo proyecto")
const GALERIA_MINIMO = 3;
