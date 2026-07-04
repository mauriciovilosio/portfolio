/**
 * cursor.js
 * Custom cursor: a small dot that tracks the mouse exactly, plus a larger
 * ring that lags slightly behind for a premium, "product" feel.
 * The ring grows and highlights whenever the pointer is over an
 * interactive element (data-cursor="hover" or default a/button/[role=button]).
 * Disabled automatically on touch devices via CSS (see components.css).
 */
(function () {
  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (isTouch) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Smoothly interpolate the ring toward the pointer for a trailing effect.
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverSelector = 'a, button, [role="button"], input, textarea, .project-card, .skill-card, [data-cursor="hover"]';

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverSelector)) {
      ring.classList.add("is-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverSelector)) {
      ring.classList.remove("is-hover");
    }
  });

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
})();
