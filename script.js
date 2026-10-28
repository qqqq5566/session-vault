/* ===== Waitlist config (FormSubmit). Swap the endpoint here only. ===== */
var WAITLIST_CONFIG = {
  endpoint: "https://formsubmit.co/ajax/sendersun912687572@gmail.com",
  subject: "New Session Vault waitlist signup"
};
/* ===================================================================== */
(function () {
  var forms = document.querySelectorAll("form[data-waitlist]");
  forms.forEach(function (form) {
    form.removeAttribute("target");
    var input = form.querySelector('input[type="email"]');
    input.name = "email";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button");
      var honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) return;
      btn.disabled = true;
      var oldText = btn.textContent;
      btn.textContent = "Sending...";
      fetch(WAITLIST_CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          email: input.value,
          _subject: WAITLIST_CONFIG.subject,
          _template: "table",
          source: location.href
        })
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
          alert("Sorry, something went wrong. Please try again in a moment.");
        });
    });
  });
})();
