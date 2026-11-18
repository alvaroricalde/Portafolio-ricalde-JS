# Portafolio de Álvaro Ricalde

Landing page con 5 secciones (Inicio, Sobre mí, Galería, Testimonios, Contacto) y un formulario que guarda los mensajes en MySQL.
**Stack:** HTML5 · CSS3 · JavaScript · Node.js · Express · MySQL (igual que las clases 13/14).

## Estructura

```
portafolio-alvaro/
├── index.js        ← servidor Express + formulario → MySQL (todo el backend)
├── index.html      ← la página
├── package.json
├── sql/portafolio_alvaro.sql   ← crea la base y la tabla
├── css/   style, menu, galeria, testimonios, contactos, footer, subir
├── js/
│   ├── data.js        ← ✏️ AQUÍ agregas proyectos y testimonios
│   ├── script.js      ← menú, animaciones, genera galería/testimonios
│   └── formulario.js  ← validación y envío del formulario
└── img/            ← avatar.svg (provisional) y tus imágenes
```

## Ejecutar en tu PC (XAMPP)

1. En XAMPP, **Start** en **MySQL** (Apache solo si quieres abrir phpMyAdmin).
2. En phpMyAdmin → pestaña **Importar** → elige `sql/portafolio_alvaro.sql` → Continuar.
   (Crea la base `portafolio_alvaro` y la tabla `mensajes_contacto`.)
3. En la terminal de VS Code, dentro de la carpeta:
   ```bash
   npm install
   npm start
   ```
   Debe decir `✅ Conectado a MySQL` y `Servidor creado en http://localhost:3000`.
4. Abre http://localhost:3000, envía un mensaje y míralo en phpMyAdmin → base `portafolio_alvaro` → tabla `mensajes_contacto` → **Examinar**.

Si MySQL tiene otro usuario/contraseña, cámbialos en `index.js` (bloque `mysql.createPool`).

## Qué personalizar

- `img/avatar.png`: tu avatar de GitHub (se usa solo; mientras tanto se ve `avatar.svg`).
- `img/tecsup-logo.png`: logo oficial de Tecsup (opcional).
- `js/data.js`: proyectos y 2–3 testimonios **reales**.
- `index.html`: frase del Inicio y textos si quieres ajustarlos.

## Publicación

- **InfinityFree gratuito no ejecuta Node.js.** Para publicar este proyecto tal cual se necesita un hosting con Node (Render, Railway…) y una base MySQL en la nube; en `index.js` cambiarías `host`, `user`, `password` y `database`. Si tu profesor exige InfinityFree, habría que reescribir solo el backend en PHP.
- Si subes a GitHub un `index.js` con contraseñas reales, quedarían públicas: para publicar usa variables de entorno en vez de escribirlas en el código.

## GitHub

```bash
git init
git add .
git commit -m "Portafolio inicial"
git branch -M main
git remote add origin https://github.com/alvaroricalde/portafolio-alvaro.git
git push -u origin main
```
