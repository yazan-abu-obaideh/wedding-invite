/* ============================================================
   AYAH & YAZAN — WEDDING INVITATION
   Router, Countdown, Navigation, Animations
   ============================================================ */

(function () {
  'use strict';

  const TOTAL_DESIGNS = 10;
  const WEDDING_DATE = new Date('2026-08-22T16:00:00');

  // ─── ROUTER ───────────────────────────────────────────────
  const body = document.body;
  const navLinks = document.querySelectorAll('.design-nav a');
  const designNumber = document.querySelector('.design-number');
  const designName = document.querySelector('.design-name');

  const designLabels = {
    design1: 'Classic Gold',
    design2: 'Garden Romance',
    design3: 'Modern Minimal',
    design4: 'Celestial Night',
    design5: 'Bohemian Dream',
    design6: 'Editorial Chic',
    design7: 'Watercolor Whispers',
    design8: 'Rustic Charm',
    design9: 'Art Deco Luxe',
    design10: 'Sunset Glow',
  };

  function setTheme(design) {
    const num = design.replace('design', '');
    body.setAttribute('data-theme', design);
    designNumber.textContent = num + ' / 10';
    designName.textContent = designLabels[design] || '';

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      if (href === design) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Rebuild special effects for current theme
    if (design === 'design2') buildPetals();
    if (design === 'design4') buildStars();
  }

  function handleHashChange() {
    var hash = window.location.hash.replace('#', '') || 'design1';
    var match = hash.match(/^design(\d+)$/);
    if (!match || parseInt(match[1], 10) < 1 || parseInt(match[1], 10) > TOTAL_DESIGNS) {
      hash = 'design1';
      window.location.hash = hash;
    }
    setTheme(hash);
  }

  window.addEventListener('hashchange', handleHashChange);

  // Keyboard navigation: left/right arrows to cycle designs
  window.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    var current = body.getAttribute('data-theme');
    var num = parseInt(current.replace('design', ''), 10);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      var next = num >= TOTAL_DESIGNS ? 1 : num + 1;
      window.location.hash = 'design' + next;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      var prev = num <= 1 ? TOTAL_DESIGNS : num - 1;
      window.location.hash = 'design' + prev;
    }
  });

  // ─── COUNTDOWN TIMER ──────────────────────────────────────
  var daysEl = document.getElementById('days');
  var hoursEl = document.getElementById('hours');
  var minutesEl = document.getElementById('minutes');
  var secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    var now = new Date().getTime();
    var diff = WEDDING_DATE.getTime() - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(mins).padStart(2, '0');
    secondsEl.textContent = String(secs).padStart(2, '0');

    // Animate pulse when seconds change
    secondsEl.style.transform = 'scale(1.15)';
    setTimeout(function () {
      secondsEl.style.transform = 'scale(1)';
    }, 150);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ─── NAVIGATION DRAWER ────────────────────────────────────
  var navToggle = document.querySelector('.nav-toggle');
  var designNav = document.querySelector('.design-nav');
  var navOverlay = document.querySelector('.nav-overlay');

  function openNav() {
    designNav.classList.add('open');
    navOverlay.classList.add('show');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    designNav.classList.remove('open');
    navOverlay.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    if (designNav.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  navOverlay.addEventListener('click', closeNav);

  // Close nav on design selection
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
    });
  });

  // Close nav on Escape
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // ─── FALLING PETALS (Design 2) ────────────────────────────
  var petalsContainer = document.querySelector('.petals-container');

  function buildPetals() {
    petalsContainer.innerHTML = '';
    var count = 35;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
      petal.style.animationDelay = (Math.random() * 10) + 's';
      petal.style.width = (Math.random() * 14 + 10) + 'px';
      petal.style.height = (Math.random() * 14 + 10) + 'px';
      fragment.appendChild(petal);
    }
    petalsContainer.appendChild(fragment);
  }

  // ─── TWINKLING STARS (Design 4) ───────────────────────────
  var starsContainer = document.querySelector('.stars-container');

  function buildStars() {
    starsContainer.innerHTML = '';
    var count = 120;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDuration = (Math.random() * 3 + 2) + 's';
      star.style.animationDelay = (Math.random() * 5) + 's';
      star.style.width = (Math.random() * 3 + 1) + 'px';
      star.style.height = star.style.width;
      fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);
  }

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────────
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href^="#"]');
    if (!target) return;
    var href = target.getAttribute('href');
    if (href === '#') return;
    // Only smooth-scroll for non-design hashes (in-page anchors)
    if (href.match(/^#design\d+$/)) return;
    e.preventDefault();
    var el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ─── INIT ─────────────────────────────────────────────────
  handleHashChange();

  // Add touch swipe support for mobile
  var touchStartX = 0;
  var touchStartY = 0;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    var absDx = Math.abs(dx);
    var absDy = Math.abs(dy);

    // Only trigger if horizontal swipe and not interacting with UI
    if (absDx > absDy && absDx > 50 && !designNav.classList.contains('open')) {
      var current = body.getAttribute('data-theme');
      var num = parseInt(current.replace('design', ''), 10);
      if (dx < 0) {
        // Swipe left -> next
        var next = num >= TOTAL_DESIGNS ? 1 : num + 1;
        window.location.hash = 'design' + next;
      } else {
        // Swipe right -> previous
        var prev = num <= 1 ? TOTAL_DESIGNS : num - 1;
        window.location.hash = 'design' + prev;
      }
    }
  }, { passive: true });

})();
