-- ============================================================
--  Base de datos del portafolio de Álvaro Ricalde
--  Ejecuta este script en tu MySQL (phpMyAdmin, Workbench, etc.)
-- ============================================================

-- NOTA: Algunos hostings en la nube ya te entregan la base creada
-- (a veces con un prefijo, ej: "u123_portafolio_alvaro").
-- En ese caso BORRA/comenta estas dos líneas y selecciona tu base
-- manualmente antes de ejecutar la tabla. Pon el nombre real en DB_NAME (.env).
CREATE DATABASE IF NOT EXISTS portafolio_alvaro
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portafolio_alvaro;

-- Tabla donde se guardan los mensajes del formulario de contacto
CREATE TABLE IF NOT EXISTS mensajes_contacto (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombres     VARCHAR(100) NOT NULL,
  apellidos   VARCHAR(100) NOT NULL,
  correo      VARCHAR(150) NOT NULL,
  celular     VARCHAR(20)  NULL,                       -- opcional
  asunto      VARCHAR(150) NOT NULL,
  mensaje     TEXT         NOT NULL,
  fecha_envio TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP  -- se llena sola
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Para ver tus mensajes:
-- SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC;
