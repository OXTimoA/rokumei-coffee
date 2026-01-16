// Category button selection functionality
document.addEventListener("DOMContentLoaded", function () {
  const sortButtons = document.querySelectorAll(".sort-btn");

  sortButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      sortButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");
    });
  });

  // Load more functionality - show toggle-group when button is clicked
  const moreBtn = document.querySelector(".more-btn");
  const toggleGroup = document.querySelector(".toggle-group");

  if (moreBtn && toggleGroup) {
    moreBtn.addEventListener("click", function () {
      // Display the toggle-group (not toggle, just show)
      toggleGroup.style.display = "grid";
    });
  }
});
