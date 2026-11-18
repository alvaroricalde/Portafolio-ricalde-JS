// ============================================================
//  js/formulario.js  →  Formulario de contacto
//  1) Valida en el navegador  2) Envía a /api/contacto  3) Muestra el resultado
//  (El servidor vuelve a validar: nunca confíes solo en el navegador.)
// ============================================================
const form = document.getElementById("form-contacto");
const botonEnviar = document.getElementById("btn-enviar");
const estado = document.getElementById("estado-form");
const textoMensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

// Mismas reglas que en routes/contacto.js
const REGLAS = {
  nombres:   { min: 2,  max: 100,  etiqueta: "Los nombres" },
  apellidos: { min: 2,  max: 100,  etiqueta: "Los apellidos" },
  asunto:    { min: 3,  max: 150,  etiqueta: "El asunto" },
  mensaje:   { min: 10, max: 2000, etiqueta: "El mensaje" },
};
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_CELULAR = /^[+()\d\s-]{6,20}$/;

let enviando = false; // candado: evita enviar dos veces seguidas

function validar(d) {
  const errores = {};
  for (const [campo, r] of Object.entries(REGLAS)) {
    const v = d[campo];
    if (!v) errores[campo] = `${r.etiqueta} es obligatorio.`;
    else if (v.length < r.min) errores[campo] = `${r.etiqueta} es muy corto (mínimo ${r.min} caracteres).`;
    else if (v.length > r.max) errores[campo] = `${r.etiqueta} es muy largo (máximo ${r.max} caracteres).`;
  }
  if (!d.correo) errores.correo = "El correo es obligatorio.";
  else if (!REGEX_CORREO.test(d.correo)) errores.correo = "Escribe un correo válido (ej: nombre@correo.com).";
  if (d.celular && !REGEX_CELULAR.test(d.celular))
    errores.celular = "El celular solo puede tener números, espacios, + y guiones.";
  return errores;
}

function mostrarErrores(errores) {
  form.querySelectorAll("[data-error-de]").forEach((el) => {
    const campo = el.dataset.errorDe;
    const msg = errores[campo] || "";
    el.textContent = msg;
    const input = form.elements[campo];
    if (input) input.classList.toggle("invalido", Boolean(msg));
  });
}

function mostrarEstado(texto, tipo) {
  estado.textContent = texto;
  estado.className = "formulario__estado " + (tipo ? "formulario__estado--" + tipo : "");
}

function ponerCargando(si) {
  enviando = si;
  botonEnviar.disabled = si;
  botonEnviar.classList.toggle("cargando", si);
  botonEnviar.querySelector(".btn__texto").textContent = si ? "Enviando..." : "Enviar mensaje";
}

// Contador de caracteres del mensaje
textoMensaje.addEventListener("input", () => (contador.textContent = textoMensaje.value.length));

// Quita el error de un campo apenas la persona vuelve a escribir en él
form.addEventListener("input", (e) => {
  const aviso = form.querySelector(`[data-error-de="${e.target.name}"]`);
  if (aviso) { aviso.textContent = ""; e.target.classList.remove("invalido"); }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (enviando) return; // si ya se está enviando, ignora el clic

  // Recoger y limpiar datos
  const datos = {};
  new FormData(form).forEach((valor, clave) => (datos[clave] = String(valor).trim()));

  const errores = validar(datos);
  mostrarErrores(errores);
  if (Object.keys(errores).length > 0) {
    mostrarEstado("Revisa los campos marcados en rojo.", "error");
    const primero = form.querySelector(".invalido");
    if (primero) primero.focus();
    return;
  }

  mostrarEstado("", "");
  ponerCargando(true);

  try {
    const respuesta = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const json = await respuesta.json().catch(() => null);

    if (respuesta.ok && json && json.ok) {
      // Éxito REAL: el servidor confirmó que se guardó en MySQL
      form.reset();
      contador.textContent = "0";
      mostrarErrores({});
      mostrarEstado(json.mensaje || "¡Mensaje enviado! Gracias por escribirme.", "exito");
      // Pequeña pausa antes de permitir otro envío
      setTimeout(() => ponerCargando(false), 3000);
      return;
    }

    // El servidor respondió con error: se muestra su mensaje claro
    if (json && json.campos) mostrarErrores(json.campos);
    mostrarEstado((json && json.error) || "No se pudo enviar el mensaje. Inténtalo de nuevo.", "error");
  } catch (error) {
    // Sin internet o servidor apagado
    mostrarEstado("No pude conectarme con el servidor. Revisa tu conexión e inténtalo de nuevo.", "error");
  }
  ponerCargando(false);
});
