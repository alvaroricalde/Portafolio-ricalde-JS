// ============================================================
//  index.js  →  Servidor (mismo estilo que la clase 13/14)
//  Se enciende con:  npm start   (en la terminal de VS Code)
//  Luego abre:       http://localhost:3000
// ============================================================
const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

// ---------- Conexión a MySQL (la de XAMPP / phpMyAdmin) ----------
// Estos son los datos por defecto de XAMPP. Si tu MySQL es distinto, cámbialos aquí.
const conexion = mysql.createPool({
  host: "localhost",
  database: "portafolio_alvaro",
  user: "root",
  password: "",
});

// Al encender el servidor, avisa en la terminal si la conexión funciona
conexion.query("SELECT 1", function (error) {
  if (error) console.log("❌ No se pudo conectar a MySQL:", error.code);
  else console.log("✅ Conectado a MySQL (portafolio_alvaro)");
});

// ---------- Carpetas públicas (igual que en clase) ----------
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/img", express.static(path.join(__dirname, "img")));

// Para leer el JSON que manda el formulario
app.use(express.json({ limit: "10kb" }));

// ---------- Página principal ----------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ---------- Formulario de contacto ----------
// Reglas de validación (las mismas están en js/formulario.js)
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_CELULAR = /^[+()\d\s-]{6,20}$/;

app.post("/api/contacto", (req, res) => {
  const d = req.body || {};
  const texto = (v) => (typeof v === "string" ? v.trim() : "");

  const nombres = texto(d.nombres);
  const apellidos = texto(d.apellidos);
  const correo = texto(d.correo);
  const celular = texto(d.celular);
  const asunto = texto(d.asunto);
  const mensaje = texto(d.mensaje);

  // Validación en el servidor (nunca confíes solo en el navegador)
  const campos = {};
  if (nombres.length < 2 || nombres.length > 100) campos.nombres = "Escribe tus nombres (2 a 100 caracteres).";
  if (apellidos.length < 2 || apellidos.length > 100) campos.apellidos = "Escribe tus apellidos (2 a 100 caracteres).";
  if (!REGEX_CORREO.test(correo) || correo.length > 150) campos.correo = "Escribe un correo válido (ej: nombre@correo.com).";
  if (celular && !REGEX_CELULAR.test(celular)) campos.celular = "El celular solo puede tener números, espacios, + y guiones.";
  if (asunto.length < 3 || asunto.length > 150) campos.asunto = "Escribe un asunto (3 a 150 caracteres).";
  if (mensaje.length < 10 || mensaje.length > 2000) campos.mensaje = "El mensaje debe tener entre 10 y 2000 caracteres.";

  if (Object.keys(campos).length > 0) {
    return res.status(400).json({ ok: false, error: "Revisa los campos marcados.", campos });
  }

  // Los "?" se reemplazan de forma segura por los valores del arreglo
  // (así nadie puede inyectar SQL, a diferencia de pegar texto con +).
  const registrar =
    "INSERT INTO mensajes_contacto (nombres, apellidos, correo, celular, asunto, mensaje) VALUES (?, ?, ?, ?, ?, ?)";

  conexion.query(registrar, [nombres, apellidos, correo, celular || null, asunto, mensaje], function (error) {
    if (error) {
      // El error técnico se ve solo en la terminal, no en la página
      console.log("❌ Error al guardar:", error.code, error.sqlMessage || "");
      return res.status(500).json({ ok: false, error: "No pude guardar tu mensaje en este momento. Inténtalo más tarde." });
    }
    console.log("✅ Mensaje guardado de:", nombres, apellidos);
    res.status(201).json({ ok: true, mensaje: "¡Mensaje enviado! Gracias por escribirme." });
  });
});

// Si el JSON viene mal formado
app.use((err, req, res, next) => {
  res.status(400).json({ ok: false, error: "Solicitud no válida." });
});

app.listen(3000, () => {
  console.log("Servidor creado en http://localhost:3000");
});
