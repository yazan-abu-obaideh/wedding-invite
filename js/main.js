/* ============================================================
   YAZAN & AYAH — WEDDING INVITATION
   Router, Countdown, Navigation, Animations, i18n
   ============================================================ */

(function () {
  'use strict';

  const TOTAL_DESIGNS = 11;
  const WEDDING_DATE = new Date('2026-08-22T16:00:00');

  // ─── i18n TRANSLATIONS ────────────────────────────────────
  const translations = {
    en: {
      'lang.label': 'العربية',
      'lang.switch': 'Switch to Arabic',
      'nav.title': 'Choose a Design',
      'nav.subtitle': '11 styles for Yazan and Ayah',
      'design1.label': '1. Classic Gold',
      'design2.label': '2. Garden Romance',
      'design3.label': '3. Modern Minimal',
      'design4.label': '4. Celestial Night',
      'design5.label': '5. Bohemian Dream',
      'design6.label': '6. Editorial Chic',
      'design7.label': '7. Watercolor Whispers',
      'design8.label': '8. Rustic Charm',
      'design9.label': '9. Art Deco Luxe',
      'design10.label': '10. Sunset Glow',
      'design11.label': '11. Golden Petals',
      'hero.name.ayah': 'Ayah',
      'hero.name.and': 'and',
      'hero.name.yazan': 'Yazan',
      'hero.pre': 'Together with their families',
      'hero.invite': 'invite you to celebrate their wedding',
      'hero.month': 'August',
      'countdown.label': 'Counting Down',
      'countdown.days': 'Days',
      'countdown.hours': 'Hours',
      'countdown.minutes': 'Minutes',
      'countdown.seconds': 'Seconds',
      'story.title': 'Our Story',
      'story.p1': 'From the moment our paths crossed, the world felt a little brighter. Every shared laugh, every quiet moment, every adventure has led us here — to this beautiful beginning.',
      'story.p2': 'With hearts full of joy and gratitude, we invite you to share in the celebration of our love and the start of our forever.',
      'timeline.title': 'The Evening',
      'timeline.arrival.time': '7:00 PM',
      'timeline.arrival.title': 'Guest Arrival',
      'timeline.arrival.desc': 'Welcome drinks & canapés',
      'timeline.zaffeh.time': '7:30 PM',
      'timeline.zaffeh.title': 'Zaffeh',
      'timeline.zaffeh.desc': 'The grand entrance',
      'timeline.dinner.time': '9:30 PM',
      'timeline.dinner.title': 'Dinner',
      'timeline.dinner.desc': 'Feast & celebration',
      'location.title': 'Location',
      'location.link': 'Marriott Hotel Amman ↗',
      'gallery.title': 'Gallery',
      'gallery.placeholder': 'Add your photos here',
      'rsvp.title': 'RSVP',
      'rsvp.text': 'Kindly respond by August 1st, 2026',
      'rsvp.button': 'Send Your RSVP',
      'footer.names': 'Yazan and Ayah',
      'footer.date': 'August 22nd, 2026',
      'designLabel.design1': 'Classic Gold',
      'designLabel.design2': 'Garden Romance',
      'designLabel.design3': 'Modern Minimal',
      'designLabel.design4': 'Celestial Night',
      'designLabel.design5': 'Bohemian Dream',
      'designLabel.design6': 'Editorial Chic',
      'designLabel.design7': 'Watercolor Whispers',
      'designLabel.design8': 'Rustic Charm',
      'designLabel.design9': 'Art Deco Luxe',
      'designLabel.design10': 'Sunset Glow',
      'designLabel.design11': 'Golden Petals',
    },
    ar: {
      'lang.label': 'English',
      'lang.switch': 'التبديل إلى الإنجليزية',
      'nav.title': 'اختر تصميماً',
      'nav.subtitle': '11 تصميماً ليزن و آية',
      'design1.label': '1. الكلاسيكية الذهبية',
      'design2.label': '2. رومانسية الحديقة',
      'design3.label': '3. البساطة العصرية',
      'design4.label': '4. الليل السماوي',
      'design5.label': '5. الحلم البوهيمي',
      'design6.label': '6. الأناقة التحريرية',
      'design7.label': '7. همسات مائية',
      'design8.label': '8. السحر الريفي',
      'design9.label': '9. فخامة آرت ديكو',
      'design10.label': '10. توهج الغروب',
      'design11.label': '11. البتلات الذهبية',
      'hero.name.ayah': 'آية',
      'hero.name.and': 'و',
      'hero.name.yazan': 'يزن',
      'hero.pre': 'مع عائلاتهما',
      'hero.invite': 'يدعوانكم للاحتفال بزفافهما',
      'hero.month': 'أغسطس',
      'countdown.label': 'العد التنازلي',
      'countdown.days': 'يوم',
      'countdown.days.plural': 'أيام',
      'countdown.hours': 'ساعات',
      'countdown.minutes': 'دقائق',
      'countdown.seconds': 'ثوانٍ',
      'story.title': 'قصتنا',
      'story.p1': 'منذ اللحظة التي تقاطعت فيها طرقنا، أصبح العالم أكثر إشراقاً. كل ضحكة شاركناها، وكل لحظة هادئة، وكل مغامرة قادتنا إلى هنا — إلى هذه البداية الجميلة.',
      'story.p2': 'بقلوب مليئة بالفرح والامتنان، ندعوكم لمشاركتنا الاحتفال بحبنا وبداية حياتنا معاً.',
      'timeline.title': 'برنامج المساء',
      'timeline.arrival.time': '7:00 مساءً',
      'timeline.arrival.title': 'وصول الضيوف',
      'timeline.arrival.desc': 'مشروبات ترحيبية ومقبلات',
      'timeline.zaffeh.time': '7:30 مساءً',
      'timeline.zaffeh.title': 'زفّة',
      'timeline.zaffeh.desc': 'الدخلة الملكية',
      'timeline.dinner.time': '9:30 مساءً',
      'timeline.dinner.title': 'عشاء',
      'timeline.dinner.desc': 'وليمة واحتفال',
      'location.title': 'الموقع',
      'location.link': 'فندق الماريوت عمّان ↗',
      'gallery.title': 'معرض الصور',
      'gallery.placeholder': 'أضف صورك هنا',
      'rsvp.title': 'تأكيد الحضور',
      'rsvp.text': 'الرجاء تأكيد الحضور قبل 1 أغسطس 2026',
      'rsvp.button': 'أرسل التأكيد',
      'footer.names': 'يزن و آية',
      'footer.date': '22 أغسطس 2026',
      'designLabel.design1': 'الكلاسيكية الذهبية',
      'designLabel.design2': 'رومانسية الحديقة',
      'designLabel.design3': 'البساطة العصرية',
      'designLabel.design4': 'الليل السماوي',
      'designLabel.design5': 'الحلم البوهيمي',
      'designLabel.design6': 'الأناقة التحريرية',
      'designLabel.design7': 'همسات مائية',
      'designLabel.design8': 'السحر الريفي',
      'designLabel.design9': 'فخامة آرت ديكو',
      'designLabel.design10': 'توهج الغروب',
      'designLabel.design11': 'البتلات الذهبية',
    }
  };

  let currentLang = 'en';

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || (translations.en[key]) || key;
  }

  function setLanguage(lang) {
    currentLang = lang;
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all [data-i18n] elements
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = t(key);
      }
    }

    // Update all [data-i18n-attr] elements (for aria-label etc.)
    var attrElements = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrElements.length; j++) {
      var attrEl = attrElements[j];
      var attrDef = attrEl.getAttribute('data-i18n-attr');
      if (attrDef) {
        var parts = attrDef.split(':');
        var attrName = parts[0];
        var attrKey = parts[1];
        attrEl.setAttribute(attrName, t(attrKey));
      }
    }

    // Update document title
    document.title = lang === 'ar'
      ? 'يزن و آية — 22 أغسطس 2026'
      : 'Yazan and Ayah — August 22nd, 2026';

    // Update design indicator
    var body = document.body;
    var design = body.getAttribute('data-theme');
    if (design) {
      var designNameEl = document.querySelector('.design-name');
      if (designNameEl) {
        designNameEl.textContent = t('designLabel.' + design) || '';
      }
    }

    // Persist preference
    try {
      localStorage.setItem('wedding-lang', lang);
    } catch (e) { /* ignore */ }

    // Refresh countdown to update Arabic days label
    updateCountdown();
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'ar' ? 'en' : 'ar');
  }

  // ─── LANGUAGE TOGGLE BUTTON ───────────────────────────────
  var langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }

  // ─── ROUTER ───────────────────────────────────────────────
  const body = document.body;
  const navLinks = document.querySelectorAll('.design-nav a');
  const designNumber = document.querySelector('.design-number');
  const designName = document.querySelector('.design-name');

  function setTheme(design) {
    const num = design.replace('design', '');
    body.setAttribute('data-theme', design);
    designNumber.textContent = num + ' / ' + TOTAL_DESIGNS;
    designName.textContent = t('designLabel.' + design) || '';

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      if (href === design) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Rebuild special effects for current theme
    if (design === 'design2' || design === 'design11') buildPetals();
    if (design === 'design4') buildStars();
  }

  function handleHashChange() {
    var hash = window.location.hash.replace('#', '') || 'design11';
    var match = hash.match(/^design(\d+)$/);
    if (!match || parseInt(match[1], 10) < 1 || parseInt(match[1], 10) > TOTAL_DESIGNS) {
      hash = 'design11';
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
  var daysLabelEl = document.querySelector('[data-i18n="countdown.days"]');

  function updateCountdown() {
    var now = new Date().getTime();
    var diff = WEDDING_DATE.getTime() - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      if (daysLabelEl && currentLang === 'ar') {
        daysLabelEl.textContent = t('countdown.days');
      }
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

    // Dynamic Arabic days label: "يوم" except when count is 2-9, then "أيام"
    if (daysLabelEl && currentLang === 'ar') {
      daysLabelEl.textContent = (days >= 2 && days <= 9) ? t('countdown.days.plural') : t('countdown.days');
    }

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
  // Dev mode: show design selector only when ?dev=true
  if (window.location.search.indexOf('dev=true') !== -1) {
    document.body.classList.add('dev-mode');
  }

  // Load saved language preference
  var savedLang = null;
  try {
    savedLang = localStorage.getItem('wedding-lang');
  } catch (e) { /* ignore */ }
  if (savedLang === 'ar' || savedLang === 'en') {
    setLanguage(savedLang);
  }

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
