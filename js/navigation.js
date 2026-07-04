/**
 * navigation.js
 * Mobile nav toggle + smooth-scroll active-link highlighting + the
 * page-transition wipe used when navigating to a project/blog page.
 */
(function () {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => links.classList.remove("is-open"));
    });
  }

  // Highlight the nav link matching the section currently in view.
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__links a[href^='#']");

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`.nav__links a[href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.removeAttribute("data-active"));
            link.setAttribute("data-active", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  // Premium page-wipe transition when leaving the page via an internal link.
  const transitionEl = document.createElement("div");
  transitionEl.className = "page-transition";
  document.body.appendChild(transitionEl);

  document.querySelectorAll("a[data-transition]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") return;
      e.preventDefault();
      transitionEl.classList.add("is-active");
      setTimeout(() => {
        window.location.href = href;
      }, 320);
    });
  });
})();
