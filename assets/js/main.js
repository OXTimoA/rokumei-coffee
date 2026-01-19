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
  const logo = document.getElementById('heroLogo');
  const defaultSrc = 'assets/img/MainLOGO.png';
  const scrolledSrc = 'assets/img/LOGO.png';

  if (header && heroSection) {
    const heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
      if (window.scrollY > heroHeight - 100) { // Start sticking a bit before end of hero
        header.classList.add('scrolled');
        logo.src = scrolledSrc;
      } else {
        header.classList.remove('scrolled');
        logo.src = defaultSrc;
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

  // Ranking-tabs button switch functionality
  const tabButtons = document.querySelectorAll('.ranking-tabs .tab-btn');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  //Footer, when the button clieked, the text changed
  const form = document.querySelector('.newsletter-form');
  const button = document.querySelector('.newsletter-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page reload
    button.textContent = '登録を完了しました!';
    button.disabled = true; // optional: prevent re-click
  });

  // --- SP Campaign Slider ---
  const spMainSlider = document.querySelector('.campaign-sp-slider-wrap');
  const spThumbTrack = document.querySelector('.campaign-sp-thumb-track');
  const spThumbItems = document.querySelectorAll('.campaign-sp-thumb-item');
  const spThumbPrev = document.querySelector('.campaign-sp-thumb-prev');
  const spThumbNext = document.querySelector('.campaign-sp-thumb-next');
  const spThumbWrap = document.querySelector('.campaign-sp-thumb-wrap');

  if (spMainSlider && spThumbTrack && spThumbItems.length > 0) {
    const mainSlides = spMainSlider.querySelectorAll('.campaign-sp-slider-item');
    const totalSlides = mainSlides.length;
    let currentMainIndex = 0;
    let currentThumbIndex = 0;
    let isTransitioning = false;
    let autoScrollInterval;

    // Clone slides for infinite loop
    mainSlides.forEach((slide, index) => {
      if (index === 0) {
        // Clone first slide and append at end
        const clone = slide.cloneNode(true);
        spMainSlider.appendChild(clone);
      }
      if (index === totalSlides - 1) {
        // Clone last slide and prepend at start
        const clone = slide.cloneNode(true);
        spMainSlider.insertBefore(clone, spMainSlider.firstChild);
      }
    });

    // Now we have: [clone-last, original-1, original-2, ..., original-n, clone-first]
    // Start at index 1 (first original)
    currentMainIndex = 1;
    spMainSlider.style.transition = 'none';
    spMainSlider.style.transform = `translateX(-${currentMainIndex * 100}%)`;

    // Update main slider position
    function updateMainSlider(withTransition = true) {
      if (withTransition) {
        spMainSlider.style.transition = 'transform 0.5s ease-in-out';
      } else {
        spMainSlider.style.transition = 'none';
      }
      spMainSlider.style.transform = `translateX(-${currentMainIndex * 100}%)`;
    }

    // Update active thumbnail
    function updateActiveThumbnail(index) {
      spThumbItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      currentThumbIndex = index;
    }

    // Go to specific slide
    function goToSlide(index, fromThumbnail = false) {
      if (isTransitioning) return;
      isTransitioning = true;

      // Update main slider index
      // Index 0 is clone, 1 to totalSlides are originals, totalSlides+1 is clone
      currentMainIndex = index + 1; // +1 because first is clone
      updateMainSlider(true);

      // Update thumbnail if not called from thumbnail click
      if (!fromThumbnail) {
        updateActiveThumbnail(index);
      }
    }

    // Next slide
    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentMainIndex++;
      updateMainSlider(true);

      // Update thumbnail index
      currentThumbIndex = (currentThumbIndex + 1) % totalSlides;
      updateActiveThumbnail(currentThumbIndex);
    }

    // Previous slide
    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentMainIndex--;
      updateMainSlider(true);

      // Update thumbnail index
      currentThumbIndex = (currentThumbIndex - 1 + totalSlides) % totalSlides;
      updateActiveThumbnail(currentThumbIndex);
    }

    // Handle transition end for infinite loop
    spMainSlider.addEventListener('transitionend', () => {
      isTransitioning = false;

      // If we're at the clone at the end (index totalSlides + 1)
      if (currentMainIndex === totalSlides + 1) {
        spMainSlider.style.transition = 'none';
        currentMainIndex = 1; // Jump to first original
        updateMainSlider(false);
      }

      // If we're at the clone at the beginning (index 0)
      if (currentMainIndex === 0) {
        spMainSlider.style.transition = 'none';
        currentMainIndex = totalSlides; // Jump to last original
        updateMainSlider(false);
      }
    });

    // Auto-scroll every 4 seconds
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
    const spSliderContainer = document.querySelector('.campaign-sp-slider');
    if (spSliderContainer) {
      spSliderContainer.addEventListener('mouseenter', stopAutoScroll);
      spSliderContainer.addEventListener('mouseleave', startAutoScroll);
    }

    // Thumbnail click handlers
    spThumbItems.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        goToSlide(index, true);
        updateActiveThumbnail(index);
        startAutoScroll(); // Restart auto-scroll
      });
    });

    // Thumbnail navigation buttons
    if (spThumbPrev) {
      spThumbPrev.addEventListener('click', () => {
        prevSlide();
        startAutoScroll();
      });
    }

    if (spThumbNext) {
      spThumbNext.addEventListener('click', () => {
        nextSlide();
        startAutoScroll();
      });
    }

    // Touch/swipe support for main slider
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
      spMainSlider.style.transition = 'none';
      stopAutoScroll();

      const style = window.getComputedStyle(spMainSlider);
      const matrix = new WebKitCSSMatrix(style.transform);
      currentTranslate = matrix.m41;
      prevTranslate = currentTranslate;
    }

    function touchMove(e) {
      if (!isDragging) return;
      const currentX = getPositionX(e);
      const diffX = currentX - startX;
      spMainSlider.style.transform = `translateX(${prevTranslate + diffX}px)`;
    }

    function touchEnd() {
      if (!isDragging) return;
      isDragging = false;

      const style = window.getComputedStyle(spMainSlider);
      const matrix = new WebKitCSSMatrix(style.transform);
      const finalTranslate = matrix.m41;
      const movedBy = finalTranslate - prevTranslate;

      const containerWidth = spMainSlider.parentElement.offsetWidth;

      // Snap threshold: 20% of container width
      if (Math.abs(movedBy) > containerWidth * 0.2) {
        if (movedBy < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else {
        // Snap back to current position
        updateMainSlider(true);
      }

      startAutoScroll();
    }

    // Mouse events for main slider
    const mainSliderContainer = document.querySelector('.campaign-sp-main-slider');
    if (mainSliderContainer) {
      mainSliderContainer.addEventListener('mousedown', touchStart);
      window.addEventListener('mousemove', touchMove);
      window.addEventListener('mouseup', touchEnd);

      // Touch events
      mainSliderContainer.addEventListener('touchstart', touchStart, { passive: true });
      window.addEventListener('touchmove', touchMove);
      window.addEventListener('touchend', touchEnd);
    }
  }

});

