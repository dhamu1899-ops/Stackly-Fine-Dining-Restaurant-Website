/* Generic "validate then redirect to 404" wiring for forms that have no
   real backend to receive them (newsletter, contact, reservation, admin
   add-item). Relies on native HTML5 required-field validation so every
   field must be filled before the form will proceed. */

function wireFormRedirect(formId, targetUrl) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    window.location.href = targetUrl;
  });
}

// Browsers restore field values when a page is reached via the back button
// (bfcache), which would resurrect a submission the user already sent.
// Clear every form whenever the page is shown again.
window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  document.querySelectorAll('form').forEach((form) => form.reset());
});
