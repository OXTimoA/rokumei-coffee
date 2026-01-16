// Category tab switching functionality
document.addEventListener("DOMContentLoaded", function () {
  const categoryTabs = document.querySelectorAll(".category-tab");
  const drinkMenu = document.getElementById("drink-menu");
  const foodMenu = document.getElementById("food-menu");

  categoryTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Remove active class from all tabs
      categoryTabs.forEach(function (t) {
        t.classList.remove("active");
      });

      // Add active class to clicked tab
      this.classList.add("active");

      // Show/hide menu lists
      if (category === "drink") {
        if (drinkMenu) drinkMenu.style.display = "block";
        if (foodMenu) foodMenu.style.display = "none";
      } else if (category === "food") {
        if (drinkMenu) drinkMenu.style.display = "none";
        if (foodMenu) foodMenu.style.display = "block";
      }
    });
  });
});
