/* ============================================================
   YAZAN & AYAH — WEDDING INVITATION
   Countdown, Petals, i18n
   ============================================================ */

(function () {
  'use strict';

  const WEDDING_DATE = new Date('2026-08-22T19:00:00+03:00');

  // ─── i18n TRANSLATIONS ────────────────────────────────────
  const translations = {
    en: {
      'lang.label': 'العربية',
      'lang.switch': 'Switch to Arabic',
      'hero.name.ayah': 'Ayah',
      'hero.name.and': '&',
      'hero.name.yazan': 'Yazan',
      'hero.parents.amer': 'Eng. Amer Abu Obaideh',
      'hero.parents.and': '&',
      'hero.parents.munir': 'Dr. Munir Zaqqa',
      'hero.pre': 'Together with their families, invite you to celebrate the wedding of',
      'hero.after1': 'Your presence is our greatest joy',
      'hero.after2': 'Sweet dreams to your little ones',
      'hero.invite': '',
      'hero.day': 'Saturday',
      'hero.month': 'August',
      'countdown.label': 'Counting Down',
      'countdown.days': 'Days',
      'countdown.hours': 'Hours',
      'countdown.minutes': 'Minutes',
      'countdown.seconds': 'Seconds',
      'timeline.title': 'Festivities',
      'timeline.arrival.time': '7:00 PM',
      'timeline.arrival.title': 'Reception',
      'timeline.arrival.desc': 'Welcome drinks & canapés',
      'timeline.zaffeh.time': '7:30 PM',
      'timeline.zaffeh.title': 'Zaffeh',
      'timeline.zaffeh.desc': 'The grand entrance',
      'timeline.dinner.time': '9:30 PM',
      'timeline.dinner.title': 'Dinner',
      'timeline.dinner.desc': 'Feast & celebration',
      'timeline.entrance.time': '10:30 PM',
      'timeline.entrance.title': 'Second Entrance',
      'location.title': 'Venue',
      'location.link': 'Marriott Hotel Amman ↗',
      'footer.names': 'Yazan and Ayah',
      'footer.date': 'August 22nd, 2026',
    },
    ar: {
      'lang.label': 'English',
      'lang.switch': 'التبديل إلى الإنجليزية',
      'hero.name.ayah': 'آيَة',
      'hero.name.and': 'وَ',
      'hero.name.yazan': 'يَزَن',
      'hero.parents.amer': 'المهندس عامر أبوعبيدة',
      'hero.parents.and': 'و',
      'hero.parents.munir': 'الدكتور منير الزقّة',
      'hero.pre': 'يتشرفان بدعوتكم لحفل زفاف نجليهما',
      'hero.after1': 'بحضوركم يتم لنا الفرح والسرور',
      'hero.after2': 'ونوماً هنيئاً لأطفالكم',
      'hero.invite': '',
      'hero.day': 'يوم السبت',
      'hero.month': 'آب',
      'countdown.label': 'العد التنازلي',
      'countdown.days': 'يوم',
      'countdown.days.plural': 'أيام',
      'countdown.hours': 'ساعات',
      'countdown.minutes': 'دقائق',
      'countdown.seconds': 'ثوانٍ',
      'timeline.title': 'برنامج المساء',
      'timeline.arrival.time': '7:00 مساءً',
      'timeline.arrival.title': 'الاستقبال',
      'timeline.arrival.desc': 'مشروبات ترحيبية ومقبلات',
      'timeline.zaffeh.time': '7:30 مساءً',
      'timeline.zaffeh.title': 'زفّة العرسان',
      'timeline.zaffeh.desc': 'الدخلة الملكية',
      'timeline.dinner.time': '9:30 مساءً',
      'timeline.dinner.title': 'العشاء',
      'timeline.dinner.desc': 'وليمة واحتفال',
      'timeline.entrance.time': '10:30 مساءً',
      'timeline.entrance.title': 'الزفة الثانية',
      'location.title': 'الموقع',
      'location.link': 'فندق الماريوت عمّان ↖',
      'footer.names': 'يزن و آية',
      'footer.date': '22 آب 2026',
    }
  };

  let currentLang = 'ar';

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
      ? 'يزن و آية — 22 آب 2026'
      : 'Yazan and Ayah — August 22nd, 2026';

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

  // ─── FALLING PETALS ───────────────────────────────────────
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

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────────
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href^="#"]');
    if (!target) return;
    var href = target.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    var el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ─── INIT ─────────────────────────────────────────────────
  // Priority: query param > localStorage > default (ar)
  function getQueryLang() {
    var match = window.location.search.match(/[?&]lang=([a-z]{2})/i);
    return match ? match[1].toLowerCase() : null;
  }

  var queryLang = getQueryLang();
  var savedLang = null;
  try {
    savedLang = localStorage.getItem('wedding-lang');
  } catch (e) { /* ignore */ }

  var initLang = queryLang || savedLang || 'ar';
  if (initLang === 'ar' || initLang === 'en') {
    setLanguage(initLang);
  }

  buildPetals();

  // ─── BACKGROUND MUSIC ─────────────────────────────────────
  var bgMusic = document.querySelector('audio');
  if (bgMusic) {
    bgMusic.play().catch(function () {}); // attempt muted playback
    function unmuteMusic() {
      bgMusic.muted = false;
      bgMusic.play().catch(function () {});
    }
    var events = ['click', 'touchstart', 'scroll', 'keydown'];
    for (var i = 0; i < events.length; i++) {
      window.addEventListener(events[i], unmuteMusic, { once: true, passive: true });
    }
  }

})();
