document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".filter-dropdown");
  const dropdownBtn = document.querySelector(".filter-dropdown-btn");
  const dropdownItems = document.querySelectorAll(".filter-dropdown-item");

  if (!dropdown || !dropdownBtn) return;

  // Toggle dropdown on button click
  dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });

  // Handle item selection
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      const value = this.getAttribute("data-value");
      const text =
        this.querySelector("span:first-child")?.textContent ||
        this.textContent.trim();

      // Remove active class from all items
      dropdownItems.forEach((i) => i.classList.remove("active"));

      // Add active class to selected item
      this.classList.add("active");

      // Update button text
      const btnSpan = dropdownBtn.querySelector("span:first-child");
      if (btnSpan) {
        btnSpan.textContent = text;
      } else {
        dropdownBtn.textContent = text;
      }

      // Close dropdown
      dropdown.classList.remove("active");

      // Here you can add logic to actually sort the products
      console.log("Selected sort option:", value);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  // Filter box toggle functionality
  const filterBox = document.querySelector(".filter-box");
  const filterBtn = document.querySelector(".add-filter-btn");
  const filterList = document.querySelector(".filter-list");

  if (filterBox && filterBtn && filterList) {
    filterBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      filterBox.classList.toggle("active");
      filterBtn.classList.toggle("active");
    });

    // Close filter box when clicking outside
    document.addEventListener("click", function (e) {
      if (
        filterBox &&
        !filterBox.contains(e.target) &&
        filterBox.classList.contains("active")
      ) {
        filterBox.classList.remove("active");
        filterBtn.classList.remove("active");
      }
    });

    // Handle filter item button clicks
    const filterItemBtns = document.querySelectorAll(".filter-item-btn");
    filterItemBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        // Toggle active state for the clicked button
        this.classList.toggle("active");
      });
    });
  }

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
