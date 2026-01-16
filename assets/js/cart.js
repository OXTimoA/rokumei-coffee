// Cart quantity selector functionality
document.addEventListener("DOMContentLoaded", function () {
  const quantityInputs = document.querySelectorAll(".qty-input");
  const minusButtons = document.querySelectorAll(".qty-btn.minus");
  const plusButtons = document.querySelectorAll(".qty-btn.plus");

  // Handle minus button clicks
  minusButtons.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      const input = quantityInputs[index];
      let currentValue = parseInt(input.value) || 1;
      if (currentValue > 1) {
        input.value = currentValue - 1;
        updateCartTotals();
      }
    });
  });

  // Handle plus button clicks
  plusButtons.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      const input = quantityInputs[index];
      let currentValue = parseInt(input.value) || 1;
      input.value = currentValue + 1;
      updateCartTotals();
    });
  });

  // Handle direct input changes
  quantityInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      let value = parseInt(this.value) || 1;
      if (value < 1) {
        this.value = 1;
      }
      updateCartTotals();
    });
  });

  // Handle delete button clicks
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const cartItem = this.closest(".cart-item");
      if (cartItem) {
        cartItem.remove();
        updateCartTotals();
      }
    });
  });

  // Function to update cart totals (placeholder - implement actual calculation logic)
  function updateCartTotals() {
    // This would typically recalculate:
    // - Total quantity
    // - Product total
    // - Estimated points
    // - Grand total
    // For now, this is a placeholder
    console.log("Cart totals updated");
  }
});
