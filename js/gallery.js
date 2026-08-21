/**
 * gallery.js
 * Lightbox for image click-to-enlarge across the site: the "Galería"
 * data-viz showcase on the homepage, and the simple photo grids on
 * project pages (any [data-lightbox-trigger] element opens it).
 *
 * Two flavors of trigger are supported, auto-detected per element:
 *  - Showcase cards (.showcase-card): title + caption come from the
 *    card's .showcase-card__title / .showcase-card__desc, so they match
 *    the active language via i18n.js.
 *  - Plain gallery items (.gallery-grid__item wrapping an <img>): no
 *    title/caption markup, so the lightbox just shows the image full
 *    size (falling back to the img's alt text as the title) and hides
 *    the empty title/caption area.
 * A trigger can point to more than one image by listing comma-separated
 * paths in data-img (used for stories told across 2+ images) — they're
 * stacked in the lightbox and the whole thing scrolls if needed.
 * Close via the X button, clicking the overlay, Escape, or the device's
 * back gesture/button — opening pushes a dummy history entry so "back"
 * closes the lightbox instead of leaving the page (mobile browsers treat
 * the back gesture as browser-back by default, which would otherwise
 * exit the whole site from inside the lightbox).
 */
(function () {
  const triggers = document.querySelectorAll("[data-lightbox-trigger]");
  if (!triggers.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = [
    '<button type="button" class="lightbox__close" aria-label="Cerrar">',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    "</button>",
    '<div class="lightbox__inner">',
    '<div class="lightbox__media"></div>',
    '<div class="lightbox__meta">',
    '<h3 class="lightbox__title"></h3>',
    '<p class="lightbox__caption"></p>',
    "</div>",
    "</div>",
  ].join("");
  document.body.appendChild(lightbox);

  const mediaEl = lightbox.querySelector(".lightbox__media");
  const metaEl = lightbox.querySelector(".lightbox__meta");
  const titleEl = lightbox.querySelector(".lightbox__title");
  const captionEl = lightbox.querySelector(".lightbox__caption");
  const closeBtn = lightbox.querySelector(".lightbox__close");
  let lastFocused = null;
  let historyPushed = false;

  function open(trigger) {
    const paths = (trigger.getAttribute("data-img") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const title =
      trigger.querySelector(".showcase-card__title")?.textContent.trim() ||
      trigger.querySelector("img")?.alt.trim() ||
      "";
    const descHTML = trigger.querySelector(".showcase-card__desc")?.innerHTML.trim() || "";

    mediaEl.innerHTML = "";
    paths.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      mediaEl.appendChild(img);
    });
    titleEl.textContent = title;
    captionEl.innerHTML = descHTML;
    metaEl.classList.toggle("is-empty", !title && !descHTML);

    lastFocused = document.activeElement;
    lightbox.classList.add("is-active");
    document.body.style.overflow = "hidden";
    closeBtn.focus();

    // Push a dummy history entry so the back button/gesture closes the
    // lightbox instead of navigating away from the page.
    if (!historyPushed) {
      history.pushState({ mvLightbox: true }, "", window.location.href);
      historyPushed = true;
    }
  }

  function close(fromPopstate) {
    if (!lightbox.classList.contains("is-active")) return;
    lightbox.classList.remove("is-active");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();

    if (historyPushed) {
      historyPushed = false;
      // Only go back ourselves if the close wasn't already triggered by
      // the back button/gesture (that already popped the history entry).
      if (!fromPopstate) history.back();
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => open(trigger));
  });

  closeBtn.addEventListener("click", () => close(false));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-active")) close(false);
  });
  window.addEventListener("popstate", () => {
    if (lightbox.classList.contains("is-active")) close(true);
  });
})();
