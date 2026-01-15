document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", function () {
        // Toggle active state for clicked item
        item.classList.toggle("active");

        // Optional: Close other items when opening one (accordion behavior)
        // Uncomment below if you want only one item open at a time
        // faqItems.forEach((otherItem) => {
        //   if (otherItem !== item) {
        //     otherItem.classList.remove("active");
        //   }
        // });
      });
    }
  });
});
