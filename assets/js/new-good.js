document.addEventListener("DOMContentLoaded", function () {
  // Recently Viewed Slider
  const sliderContainer = document.querySelector(
    ".new-sp-list .slider-container"
  );
  if (sliderContainer) {
    const sliderTrack = sliderContainer.querySelector(".slider-track");
    const sliderWrapper = sliderContainer.querySelector(".slider-wrapper");
    const prevBtn = sliderContainer.querySelector(".slider-arrow-prev");
    const nextBtn = sliderContainer.querySelector(".slider-arrow-next");
    const items = sliderTrack.querySelectorAll(".goods-item");

    if (items.length > 0) {
      let currentIndex = 0;
      const itemsPerView = 2;
      const totalItems = items.length;
      const maxIndex = Math.max(0, totalItems - itemsPerView);

      function updateSlider() {
        // Calculate translate percentage: each slide moves by 50% (2 items per view)
        const translateX = -(currentIndex * 50);
        sliderTrack.style.transform = `translateX(${translateX}%)`;

        // Update button states
        if (prevBtn) {
          prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
          nextBtn.disabled = currentIndex >= maxIndex;
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
          }
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
          }
        });
      }

      // Initialize slider
      updateSlider();

      // Update on window resize
      let resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          updateSlider();
        }, 100);
      });
    }
  }
});
