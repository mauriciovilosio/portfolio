/**
 * gallery.js
 * Lightbox for the "Galería" data-viz showcase on the homepage.
 * Click a card (any element with [data-lightbox-trigger]) to see the full
 * infographic, with its title + context pulled straight from the card
 * itself (so it always matches the active language via i18n.js).
 * A card can point to more than one image by listing comma-separated
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
    "<div>",
    '<h3 class="lightbox__title"></h3>',
    '<p class="lightbox__caption"></p>',
    "</div>",
    "</div>",
  ].join("");
  document.body.appendChild(lightbox);

  const mediaEl = lightbox.querySelector(".lightbox__media");
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
    const title = trigger.querySelector(".showcase-card__title")?.textContent.trim() || "";
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
