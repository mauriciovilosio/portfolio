/**
 * scrollReveal.js
 * Lightweight scroll-triggered reveal using IntersectionObserver.
 * Any element with class="reveal" fades/slides into view once when it
 * enters the viewport. Add [data-stagger="2"] to offset a group of
 * siblings so they cascade in rather than popping simultaneously.
 */
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((item, i) => {
    if (!item.hasAttribute("data-stagger")) {
      item.style.setProperty("--stagger", i % 6);
    }
    observer.observe(item);
  });

  // Nav background swap + active timeline dot as the user scrolls.
  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    });
  }
})();
