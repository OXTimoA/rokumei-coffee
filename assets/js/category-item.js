document.addEventListener("DOMContentLoaded", function () {
  // Favorite button functionality (red-bar)
  const btn = document.getElementById("favoriteBtn");
  if (btn) {
    btn.addEventListener("click", function () {
      btn.classList.toggle("active");
      const img = btn.querySelector("img");
      const text = btn.querySelector("p");
      if (img) {
        if (btn.classList.contains("active")) {
          img.src = "./assets/img/category-item/act-bookmark.png";
        } else {
          img.src = "./assets/img/category-item/bookmark.png";
        }
      }
      if (text) {
        text.textContent = btn.classList.contains("active")
          ? "お気に入りに追加しました"
          : "お気に入りに追加する";
      }
    });
  }

  // Favorite button functionality (item page)
  const favoriteBtnItem = document.getElementById("favoriteBtnItem");
  if (favoriteBtnItem) {
    favoriteBtnItem.addEventListener("click", function () {
      favoriteBtnItem.classList.toggle("active");
      const img = favoriteBtnItem.querySelector("img");
      const text = favoriteBtnItem.querySelector("p");
      if (img) {
        if (favoriteBtnItem.classList.contains("active")) {
          img.src = "./assets/img/category-item/act-bookmark.png";
        } else {
          img.src = "./assets/img/category-item/bookmark.png";
        }
      }
      if (text) {
        text.textContent = favoriteBtnItem.classList.contains("active")
          ? "お気に入りに追加しました"
          : "お気に入りに追加する";
      }
    });
  }

  // Image slider/carousel
  const mainImage = document.querySelector(".item-slider .main-image img");
  const thumbnailItems = document.querySelectorAll(
    ".item-slider .thumbnail-item"
  );
  const thumbnailTrack = document.querySelector(
    ".item-slider .thumbnail-track"
  );
  const carouselPrev = document.querySelector(".carousel-prev");
  const carouselNext = document.querySelector(".carousel-next");

  if (thumbnailItems.length > 0) {
    let currentThumbIndex = 0;
    const thumbnailsPerView = 5;

    // Update main image when thumbnail is clicked
    thumbnailItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        thumbnailItems.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        const imgSrc = this.querySelector("img").src;
        if (mainImage) {
          mainImage.src = imgSrc;
        }
      });
    });

    // Carousel navigation
    if (carouselPrev && carouselNext && thumbnailTrack) {
      carouselPrev.addEventListener("click", function () {
        if (currentThumbIndex > 0) {
          currentThumbIndex--;
          updateCarousel();
        }
      });

      carouselNext.addEventListener("click", function () {
        const maxIndex = Math.max(0, thumbnailItems.length - thumbnailsPerView);
        if (currentThumbIndex < maxIndex) {
          currentThumbIndex++;
          updateCarousel();
        }
      });

      function updateCarousel() {
        const itemWidth = thumbnailItems[0].offsetWidth + 10; // including gap
        const translateX = -(currentThumbIndex * itemWidth);
        thumbnailTrack.style.transform = `translateX(${translateX}px)`;
      }
    }
  }

  // Dropdown functionality
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownBox = document.querySelector(".dropdown-box");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownBtn && dropdownBox && dropdownMenu) {
    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownBox.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!dropdownBox.contains(e.target)) {
        dropdownBox.classList.remove("active");
      }
    });

    // Select dropdown option
    const dropdownOptions = dropdownMenu.querySelectorAll("p");
    dropdownOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const selectedText = this.textContent;
        dropdownBtn.querySelector("p").textContent = selectedText;
        dropdownBox.classList.remove("active");
      });
    });
  }

  // Quantity selector
  const quantitySelectors = document.querySelectorAll(".quantity-selector");
  quantitySelectors.forEach((selector) => {
    const minusBtn = selector.querySelector(".qty-minus");
    const plusBtn = selector.querySelector(".qty-plus");
    const input = selector.querySelector(".qty-input");

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener("click", function () {
        const currentValue = parseInt(input.value) || 1;
        if (currentValue > 1) {
          input.value = currentValue - 1;
        }
      });

      plusBtn.addEventListener("click", function () {
        const currentValue = parseInt(input.value) || 1;
        input.value = currentValue + 1;
      });

      input.addEventListener("change", function () {
        const value = parseInt(this.value) || 1;
        if (value < 1) {
          this.value = 1;
        }
      });
    }
  });

  // Price set selection
  const priceSets = document.querySelectorAll(".price-set");
  const radioButtons = document.querySelectorAll('input[name="size"]');

  radioButtons.forEach((radio, index) => {
    radio.addEventListener("change", function () {
      priceSets.forEach((set) => set.classList.remove("active"));
      if (this.checked && priceSets[index]) {
        priceSets[index].classList.add("active");
      }
    });
  });

  // Review accordion toggle
  const reviewToggle = document.getElementById("reviewToggle");
  const reviewBox = document.querySelector(".review-box");

  if (reviewToggle && reviewBox) {
    reviewToggle.addEventListener("click", function () {
      reviewBox.classList.toggle("active");
    });
  }
});
