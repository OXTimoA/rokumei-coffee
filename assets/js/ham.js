document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const hamContent = document.querySelector(".ham-content");
  const hamOverlay = document.createElement("div");
  hamOverlay.className = "ham-overlay";
  document.body.appendChild(hamOverlay);

  // Open hamburger menu
  if (hamburger && hamContent) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      hamContent.classList.toggle("active");
      hamOverlay.classList.toggle("active");
    });
  }

  // Close hamburger menu
  function closeHamMenu() {
    if (hamContent) {
      hamburger.classList.remove("active");
      hamContent.classList.remove("active");
      hamOverlay.classList.remove("active");
    }
  }

  // Close when clicking overlay
  hamOverlay.addEventListener("click", closeHamMenu);

  // Toggle product list - handle multiple accordions
  const topLists = document.querySelectorAll(".top-list");
  topLists.forEach(function (topList) {
    const productToggle = topList.querySelector(".product-toggle");
    if (productToggle) {
      productToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        topList.classList.toggle("active");
      });
    }
  });

  // Close menu when clicking outside or on hamburger again
  document.addEventListener("click", function (e) {
    if (
      hamContent &&
      hamContent.classList.contains("active") &&
      !hamContent.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeHamMenu();
    }
  });

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && hamContent.classList.contains("active")) {
      closeHamMenu();
    }
  });
});
