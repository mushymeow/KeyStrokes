/**
 * Keystrokes Landing Page — Interactions
 * Scroll reveal, navbar scroll state, mobile menu
 */

(function () {
  'use strict';

  const NAV = document.getElementById('navbar');
  const NAV_TOGGLE = document.querySelector('.nav-toggle');
  const NAV_LINKS = document.querySelector('.nav-links');
  const REVEAL_ELEMENTS = document.querySelectorAll('.reveal');

  // ----- Navbar scroll state -----
  function updateNavbar() {
    if (window.scrollY > 40) {
      NAV.classList.add('scrolled');
    } else {
      NAV.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ----- Mobile menu -----
  function toggleMenu() {
    NAV_LINKS.classList.toggle('open');
    NAV_TOGGLE.classList.toggle('open');
    document.body.style.overflow = NAV_LINKS.classList.contains('open') ? 'hidden' : '';
  }

  NAV_TOGGLE.addEventListener('click', toggleMenu);

  NAV_LINKS.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // ----- Scroll reveal -----
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  REVEAL_ELEMENTS.forEach(function (el, i) {
    var delay = '0s';
    if (el.closest('.hero-text') || el.closest('.hero-preview')) {
      delay = Math.min(i, 6) * 0.08 + 's';
    } else if (el.closest('.feature-card') || el.closest('.feature-grid')) {
      delay = (i % 6) * 0.06 + 's';
    } else if (el.closest('.guide-steps') || el.closest('.guide-step')) {
      delay = (i % 3) * 0.1 + 's';
    } else if (el.closest('.examples-grid') || el.closest('.example-card')) {
      delay = (i % 4) * 0.08 + 's';
    }
    el.style.transitionDelay = delay;
    observer.observe(el);
  });

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Live overlay: combo display for any key + mouse (like the real program) -----
  const comboEl = document.getElementById('live-overlay-combo');
  const placeholderEl = document.getElementById('live-overlay-placeholder');
  if (comboEl && placeholderEl) {
    var pressed = {}; // code -> true

    function getLabel(code, key) {
      var special = {
        ControlLeft: 'Ctrl', ControlRight: 'Ctrl',
        ShiftLeft: 'Shift', ShiftRight: 'Shift',
        AltLeft: 'Alt', AltRight: 'Alt',
        MetaLeft: 'Win', MetaRight: 'Win',
        Space: 'Space', Enter: 'Enter', Tab: 'Tab', Escape: 'Esc',
        Backspace: 'Backspace', CapsLock: 'CapsLock',
        ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→'
      };
      if (special[code]) return special[code];
      if (code === 'LMB') return 'LMB';
      if (code === 'RMB') return 'RMB';
      if (code === 'MMB') return 'MMB';
      if (code && code.indexOf('Key') === 0 && code.length === 4) return code.slice(3).toUpperCase();
      if (code && code.indexOf('Digit') === 0) return code.slice(5);
      if (code && code.indexOf('Numpad') === 0) return 'Num' + code.slice(6);
      if (key && key.length === 1) return key.toUpperCase();
      if (code) return code.replace(/Left|Right|Key|Digit|Numpad/gi, '').replace(/^([a-z])/, function (m) { return m.toUpperCase(); }) || code;
      return '?';
    }

    function getSortOrder(label) {
      var modOrder = { Ctrl: 0, Shift: 1, Alt: 2, Win: 3 };
      if (modOrder[label] !== undefined) return modOrder[label];
      if (label === 'LMB' || label === 'RMB' || label === 'MMB') return 4;
      return 5;
    }

    function renderCombo() {
      var codes = Object.keys(pressed).filter(function (c) { return pressed[c]; });
      var withLabels = codes.map(function (code) { return { code: code, label: getLabel(code) }; });
      withLabels.sort(function (a, b) {
        var orderA = getSortOrder(a.label), orderB = getSortOrder(b.label);
        if (orderA !== orderB) return orderA - orderB;
        return a.label.localeCompare(b.label);
      });
      var labels = withLabels.map(function (x) { return x.label; });
      placeholderEl.style.display = labels.length ? 'none' : 'inline';
      while (comboEl.lastChild !== placeholderEl) {
        comboEl.removeChild(comboEl.lastChild);
      }
      if (labels.length === 0) return;
      labels.forEach(function (label, i) {
        if (i > 0) {
          var plus = document.createElement('span');
          plus.className = 'combo-plus';
          plus.textContent = ' + ';
          comboEl.appendChild(plus);
        }
        var key = document.createElement('span');
        var isMouse = label === 'LMB' || label === 'RMB' || label === 'MMB';
        key.className = 'key key-active key-combo' + (isMouse ? ' key-mouse' : '');
        key.textContent = label;
        comboEl.appendChild(key);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.repeat || !e.code) return;
      pressed[e.code] = true;
      renderCombo();
    });
    document.addEventListener('keyup', function (e) {
      if (!e.code) return;
      pressed[e.code] = false;
      renderCombo();
    });
    document.addEventListener('mousedown', function (e) {
      var code = e.button === 0 ? 'LMB' : e.button === 2 ? 'RMB' : e.button === 1 ? 'MMB' : null;
      if (code) { pressed[code] = true; renderCombo(); }
    });
    document.addEventListener('mouseup', function (e) {
      var code = e.button === 0 ? 'LMB' : e.button === 2 ? 'RMB' : e.button === 1 ? 'MMB' : null;
      if (code) { pressed[code] = false; renderCombo(); }
    });
  }
})();
