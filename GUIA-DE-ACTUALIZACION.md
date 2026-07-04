# Guía para actualizar el portfolio

Este documento es para vos (Mauricio), no para el navegador. Explica en lenguaje simple qué archivo corresponde a cada sección visible, para que cuando quieras cambiar algo sepas qué pedirme o, si querés animarte, qué tocar vos mismo.

## Cómo funciona el proceso, en la práctica

1. Vos me contás qué querés cambiar (ej: "cambiá la descripción de Mi Tenis", "sumá un proyecto nuevo llamado X", "actualizá mi bio").
2. Yo edito los archivos correspondientes en tu carpeta `mauricio-vilosio-portfolio`.
3. Vos abrís **GitHub Desktop**, ves los cambios listados, escribís una frase corta (ej: "Actualizo proyecto Mi Tenis") y apretás **Commit** y después **Push origin**.
4. En 1-2 minutos el cambio ya está en `vilomauricio.github.io/portfolio`.

No hace falta que edites HTML/CSS a mano. Ese es justamente el problema que resuelve pedírmelo a mí — vos describís el cambio en español normal, yo me ocupo de la parte técnica.

## Dónde vive cada sección (por si querés mirar)

| Sección visible | Archivo |
|---|---|
| Foto, nombre, frase principal (Hero) | `index.html` — buscar `id="hero"` |
| "Sobre mí" (historia) | `index.html` — buscar `id="about"` |
| Línea de tiempo (Trayectoria) | `index.html` — buscar `id="timeline"` |
| Tarjetas de proyectos en la home | `index.html` — buscar `id="projects"` |
| Página completa de cada proyecto | `projects/nombre-del-proyecto.html` |
| Números del Dashboard (3+, 25+, etc.) | `index.html` — buscar `id="dashboard"` |
| Habilidades (Power BI, SQL, etc.) | `index.html` — buscar `id="skills"` |
| Mi Visión | `index.html` — buscar `id="vision"` |
| Cómo trabajo (Recolectar/Limpiar/...) | `index.html` — buscar `id="process"` |
| Blog (listado y artículos) | `blog/index.html` y `blog/*.html` |
| Formulario de contacto y redes | `index.html` — buscar `id="contact"` |
| Colores, tipografía, espaciados | `css/variables.css` |

## Un detalle técnico que conviene que sepas

El sitio tiene selector de idioma (ES/EN). Cada texto en español que se ve en la página tiene, escondido más abajo en el mismo archivo, su traducción al inglés (dentro de un bloque `PAGE_I18N`). Cuando pidas un cambio de contenido, yo actualizo **los dos lados** (el texto visible en español y su traducción en inglés) para que no queden desincronizados. Si vos llegás a editar un texto a mano sin avisarme, avisame igual así reviso que el inglés siga siendo correcto.

## Cosas que podés pedirme en cualquier momento

- "Agregá un proyecto nuevo" → te pido nombre, descripción corta, problema/solución/resultado, y lo agrego como tarjeta + página propia.
- "Cambiá la bio / la sección Sobre mí" → me pasás el texto nuevo y lo actualizo en los dos idiomas.
- "Publicá un artículo de blog" → me pasás el tema o el texto y armo la página siguiendo el mismo estilo que las otras.
- "Actualizá los números del dashboard" (años de experiencia, dashboards hechos, etc.) → me pasás los números nuevos.
- "Subí mi foto real" → me pasás la imagen y reemplazo el placeholder.
