// Mobile menu toggle and general site functionality
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle for hero header
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (mobileMenuToggle && mobileMenuOverlay) {
    mobileMenuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.add('active');
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileMenuClose && mobileMenuOverlay) {
    mobileMenuClose.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenuToggle.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Accordion Toggling
  const accordions = document.querySelectorAll('.mobile-accordion');
  accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      accordion.classList.toggle('active');
    });
  });

  // Close menu when clicking a link (if it's not part of an accordion toggle)
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', function (event) {
      const target = event.target;
      if (target.tagName === 'A' || target.closest('a')) {
        // If it's a sub-link or a main link (not an accordion header click caught above)
        mobileMenuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Hero Slideshow ---
  const slides = document.querySelectorAll('.hero-slide');
  const progressBar = document.querySelector('.hero-progress-line .progress-bar');
  let currentSlide = 0;
  const slideInterval = 3000; // 3 seconds

  if (slides.length > 0 && progressBar) {
    // Initialize indicator height and position
    const indicatorHeight = 100 / slides.length;
    progressBar.style.height = `${indicatorHeight}%`;
    progressBar.style.position = 'absolute';
    progressBar.style.top = '0%';
    progressBar.style.transition = 'top 0.3s ease'; // Optional smooth jump, or remove 'transition' line for instant jump

    setInterval(() => {
      // Fade out current
      slides[currentSlide].classList.remove('active');

      // Next slide
      currentSlide = (currentSlide + 1) % slides.length;

      // Fade in new
      slides[currentSlide].classList.add('active');

      // Move indicator
      progressBar.style.top = `${currentSlide * indicatorHeight}%`;

    }, slideInterval);
  }

  // --- Sticky Header ---
  const header = document.querySelector('.site-header');
  const heroSection = document.querySelector('.hero');

  if (header && heroSection) {
    const heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
      if (window.scrollY > heroHeight - 100) { // Start sticking a bit before end of hero
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Coupon Badge Close ---
  const badgeClose = document.querySelector('.hero-badge-close');
  const badge = document.querySelector('.hero-badge');

  if (badgeClose && badge) {
    badgeClose.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent bubbling if needed
      e.preventDefault(); // Prevent link click if overlay is somehow nested (it's not, but good practice)
      badge.style.display = 'none';
    });
  }

  // Campaign slider functionality
  const campaignSlider = document.querySelector('.campaign-slider');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (campaignSlider && prevBtn && nextBtn) {
    const originalItems = campaignSlider.querySelectorAll('.campaign-item');
    const totalOriginal = originalItems.length;

    // We want to show 3 items.
    // To support infinite scrolling in both directions seamlessly, we clone items.
    // Minimal set for seamless 3-item view loop:
    // [Last, First, Second, Third, First] - simplified?
    // Robust way: Clone all items before and after.

    // Clone all items and append
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone-after');
      campaignSlider.appendChild(clone);
    });

    // Clone all items and prepend
    // We need to re-query or use originalItems list (which is static NodeList usually, but verify)
    // Actually, let's just create array of clones.
    for (let i = totalOriginal - 1; i >= 0; i--) {
      const clone = originalItems[i].cloneNode(true);
      clone.classList.add('clone-before');
      campaignSlider.insertBefore(clone, campaignSlider.firstChild);
    }

    // Now structure is: [ClonesBefore(3), Originals(3), ClonesAfter(3)]
    // Indices: 0,1,2 (clones), 3,4,5 (originals), 6,7,8 (clones)
    // Start at index 3.
    let currentIndex = totalOriginal; // 3

    // Initial setup for responsiveness
    function getItemsToShow() {
      return window.innerWidth <= 767 ? 1 : 3;
    }

    let itemsToShow = getItemsToShow();
    let itemWidthPercent = 100 / itemsToShow;

    // Initial position without transition
    campaignSlider.style.transition = 'none';
    campaignSlider.style.transform = `translateX(-${currentIndex * itemWidthPercent}%)`;

    let isTransitioning = false;

    function updateSlider(withTransition = true) {
      if (withTransition) {
        campaignSlider.style.transition = 'transform 0.5s ease-in-out';
      } else {
        campaignSlider.style.transition = 'none';
      }
      const translateX = -currentIndex * itemWidthPercent;
      campaignSlider.style.transform = `translateX(${translateX}%)`;
    }

    // Update on resize
    window.addEventListener('resize', () => {
      const newItemsToShow = getItemsToShow();
      if (newItemsToShow !== itemsToShow) {
        itemsToShow = newItemsToShow;
        itemWidthPercent = 100 / itemsToShow;
        updateSlider(false);
      }
    });

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      updateSlider(true);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;
      updateSlider(true);
    }

    // --- Auto-scroll (4 seconds) ---
    let autoScrollInterval;

    function startAutoScroll() {
      stopAutoScroll();
      autoScrollInterval = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    function stopAutoScroll() {
      clearInterval(autoScrollInterval);
    }

    startAutoScroll();

    // Pause auto-scroll on hover
    campaignSlider.parentElement.addEventListener('mouseenter', stopAutoScroll);
    campaignSlider.parentElement.addEventListener('mouseleave', startAutoScroll);


    // --- Manual Dragging ---
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function getPositionX(e) {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function touchStart(e) {
      if (isTransitioning) return;
      isDragging = true;
      startX = getPositionX(e);
      campaignSlider.style.transition = 'none';
      stopAutoScroll();

      // Calculate current offset relative to slider
      const style = window.getComputedStyle(campaignSlider);
      const matrix = new WebKitCSSMatrix(style.transform);
      currentTranslate = matrix.m41;
      prevTranslate = currentTranslate;
    }

    function touchMove(e) {
      if (!isDragging) return;
      const currentX = getPositionX(e);
      const diffX = currentX - startX;
      campaignSlider.style.transform = `translateX(${prevTranslate + diffX}px)`;
    }

    function touchEnd() {
      if (!isDragging) return;
      isDragging = false;

      const style = window.getComputedStyle(campaignSlider);
      const matrix = new WebKitCSSMatrix(style.transform);
      const finalTranslate = matrix.m41;
      const movedBy = finalTranslate - prevTranslate;

      const containerWidth = campaignSlider.parentElement.offsetWidth;
      const itemWidth = containerWidth / itemsToShow;

      // Snap threshold: 20% of item width
      if (Math.abs(movedBy) > itemWidth * 0.2) {
        if (movedBy < 0) {
          currentIndex++;
        } else {
          currentIndex--;
        }
      }

      updateSlider(true);
      startAutoScroll();
    }

    // Mouse events
    campaignSlider.parentElement.addEventListener('mousedown', touchStart);
    window.addEventListener('mousemove', touchMove);
    window.addEventListener('mouseup', touchEnd);

    // Touch events
    campaignSlider.parentElement.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchmove', touchMove);
    window.addEventListener('touchend', touchEnd);


    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoScroll();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoScroll();
    });

    campaignSlider.addEventListener('transitionend', () => {
      isTransitioning = false;

      // Check for loop conditions
      if (currentIndex >= totalOriginal * 2) {
        campaignSlider.style.transition = 'none';
        currentIndex = currentIndex - totalOriginal;
        updateSlider(false);
      }

      if (currentIndex < totalOriginal) {
        campaignSlider.style.transition = 'none';
        currentIndex = currentIndex + totalOriginal;
        updateSlider(false);
      }
    });
  }
});

