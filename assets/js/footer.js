// Newsletter form submission handler
document.addEventListener("DOMContentLoaded", function () {
  // Find all newsletter forms
  const newsletterForms = document.querySelectorAll(".newsletter-form");

  newsletterForms.forEach(function (form) {
    const submitButton = form.querySelector(".newsletter-submit");

    if (submitButton) {
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        // Change button text
        submitButton.textContent = "登録が完了しました！";

        // Optional: Disable the button after submission
        submitButton.disabled = true;
      });
    }
  });
});
