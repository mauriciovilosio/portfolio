/**
 * counters.js
 * Animates the KPI numbers in the Dashboard section (e.g. "3+", "25+")
 * counting up from 0 once the dashboard scrolls into view, and fills the
 * matching progress bar. Values/targets are read straight from the markup
 * via data-target, so editing a KPI only requires touching index.html.
 */
(function () {
  const kpis = document.querySelectorAll(".kpi-card__value[data-target]");
  if (!kpis.length) return;

  function animateValue(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out-cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(tick);

    const bar = el.closest(".kpi-card").querySelector(".kpi-card__bar span");
    if (bar) {
      requestAnimationFrame(() => {
        bar.style.width = "100%";
      });
    }
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  kpis.forEach((el) => observer.observe(el));
})();
