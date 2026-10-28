/* ===== Waitlist config (FormSubmit). Swap the endpoint here only. ===== */
var WAITLIST_CONFIG = {
  endpoint: "https://formsubmit.co/ajax/689af622845dd2a52a8c609f142a7073",
  subject: "New Session Vault waitlist signup",
  // Email-removal form on privacy.html (form[data-removal]), same endpoint.
  removalSubject: "Session Vault: email removal request",
  removalRequest: "Please delete this email from the waitlist"
};
/* ===================================================================== */
(function () {
  var MSG_INVALID = "Please enter a valid email address, like you@example.com.";
  var MSG_FAILED = "Sorry, something went wrong and your signup wasn't sent. Please try again in a moment.";
  var MSG_FAILED_REMOVAL = "Sorry, something went wrong and your request wasn't sent. Please try again in a moment, or reply to any email I've sent you.";

  var forms = document.querySelectorAll("form[data-waitlist], form[data-removal]");
  forms.forEach(function (form) {
    var isRemoval = form.hasAttribute("data-removal");
    form.removeAttribute("target");
    form.noValidate = true; // validate ourselves so errors appear inline
    var input = form.querySelector('input[type="email"]');
    var errorEl = form.querySelector(".form-error");
    input.name = "email";

    function showError(text) {
      errorEl.textContent = text;
      input.setAttribute("aria-invalid", "true");
    }
    function clearError() {
      errorEl.textContent = "";
      input.removeAttribute("aria-invalid");
    }
    input.addEventListener("input", function () { if (errorEl.textContent) clearError(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) return;
      input.value = input.value.trim();
      if (!input.value || !input.checkValidity()) {
        showError(MSG_INVALID);
        input.focus();
        return;
      }
      clearError();
      btn.disabled = true;
      var oldText = btn.textContent;
      btn.textContent = "Sending...";
      var payload = isRemoval ? {
        email: input.value,
        _subject: WAITLIST_CONFIG.removalSubject,
        _template: "table",
        request: WAITLIST_CONFIG.removalRequest,
        source: location.href
      } : {
        email: input.value,
        _subject: WAITLIST_CONFIG.subject,
        _template: "table",
        source: location.href
      };
      fetch(WAITLIST_CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || String(res.j.success) === "false") throw new Error(res.j.message || "failed");
          form.classList.add("is-done");
          var msg = form.querySelector(".form-success");
          msg.hidden = false;
          msg.focus();
          input.value = "";
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = oldText;
          showError(isRemoval ? MSG_FAILED_REMOVAL : MSG_FAILED);
        });
    });
  });
})();
