/**
 * main.js
 * Entry point loaded on every page. Keeps small, page-agnostic behavior
 * that doesn't warrant its own file: current year in the footer, and the
 * contact form's client-side handling (this is a static site — swap the
 * fetch() call for your endpoint of choice, e.g. Formspree, Resend, or a
 * serverless function, when ready).
 */
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      status.textContent = "";
      status.classList.remove("success");

      // TODO: replace with a real endpoint (Formspree / Resend / serverless).
      // Simulated success so the interaction is demoable without a backend.
      await new Promise((resolve) => setTimeout(resolve, 900));

      status.textContent = "Thanks — I'll get back to you soon.";
      status.classList.add("success");
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      form.reset();
    });
  }
})();
