/**
 * gallery.js
 * Lightbox for the "Galería" data-viz showcase on the homepage.
 * Click a card (any element with [data-lightbox-trigger]) to see the full
 * infographic, with its title + context pulled straight from the card
 * itself (so it always matches the active language via i18n.js).
 * A card can point to more than one image by listing comma-separated
 * paths in data-img (used for stories told across 2+ images) — they're
 * stacked in the lightbox and the whole thing scrolls if needed.
 * Close via the X button, clicking the overlay, or Escape.
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
  }

  function close() {
    lightbox.classList.remove("is-active");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => open(trigger));
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-active")) close();
  });
})();
