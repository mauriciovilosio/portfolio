/**
 * main.js
 * Entry point loaded on every page. Keeps small, page-agnostic behavior
 * that doesn't warrant its own file: current year in the footer, and the
 * contact form's client-side handling.
 *
 * The contact form posts to Formspree (https://formspree.io/f/xvzjldyw),
 * which forwards every submission straight to mvilosiog@gmail.com. The
 * <form> also has a plain action/method as a no-JS fallback, so this
 * handler's only job is to keep the user on the page and show an
 * in-place bilingual status message instead of a redirect.
 */
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  const MESSAGES = {
    es: {
      sending: "Enviando...",
      success: "Gracias — te voy a responder pronto.",
      error: "Algo falló al enviar. Probá de nuevo o escribime directo a mvilosiog@gmail.com.",
      submit: "Enviar Mensaje",
    },
    en: {
      sending: "Sending...",
      success: "Thanks — I'll get back to you soon.",
      error: "Something went wrong sending this. Please try again or email me directly at mvilosiog@gmail.com.",
      submit: "Send Message",
    },
  };

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const lang = localStorage.getItem("mv-lang") || "es";
      const t = MESSAGES[lang] || MESSAGES.es;
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = t.sending;
      status.textContent = "";
      status.classList.remove("success", "error");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (response.ok) {
          status.textContent = t.success;
          status.classList.add("success");
          form.reset();
        } else {
          status.textContent = t.error;
          status.classList.add("error");
        }
      } catch (err) {
        status.textContent = t.error;
        status.classList.add("error");
      }

      submitBtn.disabled = false;
      submitBtn.textContent = t.submit;
    });
  }
})();
