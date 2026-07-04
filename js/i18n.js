/**
 * i18n.js
 * Minimal language-switch engine for the whole site (Spanish / English).
 * Spanish is the default language on first visit; the choice is then
 * remembered in localStorage so it persists across pages.
 *
 * How a page opts in:
 *   1. Include a "lang-switch" control in the nav (see index.html for markup).
 *   2. Tag any translatable element with one of:
 *        data-i18n="key"          -> sets el.textContent
 *        data-i18n-html="key"     -> sets el.innerHTML (for copy with <br>, <strong>, lists...)
 *        data-i18n-placeholder="key" -> sets the placeholder attribute
 *        data-i18n-aria="key"        -> sets aria-label
 *        data-i18n-copy="key"         -> like data-i18n, but replaces the token
 *                                        "{year}" with the current year (footer)
 *   3. Optionally define window.PAGE_I18N = { es: {...}, en: {...} } with
 *      page-specific keys before this script runs. Shared keys (nav, footer,
 *      buttons repeated on every page) already live in COMMON below, so most
 *      pages only need a handful of page-specific entries.
 *
 * Nothing here depends on a framework or build step — it's plain DOM work.
 */
(function () {
  const STORAGE_KEY = "mv-lang";
  const DEFAULT_LANG = "es";

  // Strings shared by every page: nav, footer, and recurring UI labels.
  // Page-specific dictionaries (window.PAGE_I18N) are merged on top of this.
  const COMMON = {
    es: {
      "nav.about": "Sobre mí",
      "nav.journey": "Trayectoria",
      "nav.projects": "Proyectos",
      "nav.dashboard": "Dashboard",
      "nav.skills": "Habilidades",
      "nav.blog": "Blog",
      "nav.contact": "Contacto",
      "nav.cta": "Hablemos",
      "footer.copy": "© {year} Mauricio Vilosio. Construido con datos, tenis y HTML.",
      "back.projects": "← Volver a proyectos",
      "back.blog": "← Volver al blog",
      "meta.role": "Rol",
      "meta.timeline": "Cronograma",
      "meta.tools": "Herramientas",
      "meta.status": "Estado",
      "h.description": "Descripción",
      "h.problem": "Problema",
      "h.solution": "Solución",
      "h.process": "Proceso",
      "h.technologies": "Tecnologías",
      "h.results": "Resultados",
      "h.gallery": "Galería",
      "h.learnings": "Aprendizajes",
      "sidebar.stack": "Stack",
      "sidebar.allProjects": "← Todos los proyectos",
      "sidebar.discuss": "Hablar de este proyecto",
      "blog.comingSoon": "Próximamente",
    },
    en: {
      "nav.about": "About",
      "nav.journey": "Journey",
      "nav.projects": "Projects",
      "nav.dashboard": "Dashboard",
      "nav.skills": "Skills",
      "nav.blog": "Blog",
      "nav.contact": "Contact",
      "nav.cta": "Let's talk",
      "footer.copy": "© {year} Mauricio Vilosio. Built with data, tennis and HTML.",
      "back.projects": "← Back to projects",
      "back.blog": "← Back to blog",
      "meta.role": "Role",
      "meta.timeline": "Timeline",
      "meta.tools": "Tools",
      "meta.status": "Status",
      "h.description": "Description",
      "h.problem": "Problem",
      "h.solution": "Solution",
      "h.process": "Process",
      "h.technologies": "Technologies",
      "h.results": "Results",
      "h.gallery": "Gallery",
      "h.learnings": "Learnings",
      "sidebar.stack": "Stack",
      "sidebar.allProjects": "← All projects",
      "sidebar.discuss": "Discuss this project",
      "blog.comingSoon": "Coming soon",
    },
  };

  function getDict(lang) {
    const page = (window.PAGE_I18N && window.PAGE_I18N[lang]) || {};
    return Object.assign({}, COMMON[lang] || COMMON[DEFAULT_LANG], page);
  }

  function applyLang(lang) {
    const dict = getDict(lang);
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll("[data-i18n-copy]").forEach((el) => {
      const key = el.getAttribute("data-i18n-copy");
      if (dict[key] != null) {
        el.textContent = dict[key].replace("{year}", new Date().getFullYear());
      }
    });

    if (dict["meta.title"]) document.title = dict["meta.title"];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict["meta.description"]) metaDesc.setAttribute("content", dict["meta.description"]);

    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    applyLang(saved);

    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  });

  // Exposed in case a page needs to trigger a re-apply manually.
  window.MV_I18N = { setLang, applyLang };
})();
