/* ═══════════════════════════════════════
   SIRINE AMRANE — Personal Site
   script.js
═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────
     Custom Cursor
  ──────────────────────────────────── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && cursorDot && window.matchMedia('(hover: hover)').matches) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let moved = false;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;

      if (!moved) {
        moved = true;
        cursor.classList.add('visible');
        cursorDot.classList.add('visible');
      }

      cursorDot.style.left = mx + 'px';
      cursorDot.style.top  = my + 'px';
    });

    (function animateCursor() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      cursor.style.left = rx + 'px';
      cursor.style.top  = ry + 'px';
      requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll('a, button, .work-card, .research-card, .hobby-card, .contact-link').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width       = '48px';
        cursor.style.height      = '48px';
        cursor.style.borderColor = 'rgba(167, 139, 250, 0.75)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width       = '30px';
        cursor.style.height      = '30px';
        cursor.style.borderColor = 'rgba(139, 92, 246, 0.55)';
      });
    });
  }

  /* ────────────────────────────────────
     Nav — scroll behaviour
  ──────────────────────────────────── */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ────────────────────────────────────
     Nav — active link highlight
  ──────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) {
        current = s.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === '#' + current;
      link.style.color = isActive ? '#a78bfa' : '';
    });
  }, { passive: true });

  /* ────────────────────────────────────
     Mobile Menu
  ──────────────────────────────────── */
  const navToggle  = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let   menuOpen   = false;

  function toggleMenu(force) {
    menuOpen = typeof force !== 'undefined' ? force : !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const [s1, s2] = navToggle.querySelectorAll('span');
    if (menuOpen) {
      s1.style.transform = 'translateY(6.5px) rotate(45deg)';
      s2.style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      s1.style.transform = '';
      s2.style.transform = '';
    }
  }

  navToggle.addEventListener('click', () => toggleMenu());

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* ────────────────────────────────────
     Scroll Reveal — IntersectionObserver
  ──────────────────────────────────── */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

  /* ────────────────────────────────────
     Stagger delays within grid containers
  ──────────────────────────────────── */
  document.querySelectorAll('.research-grid, .work-grid, .hobbies-grid, .about-tags, .contact-links').forEach((container) => {
    container.querySelectorAll('.reveal, .tag, .contact-link').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  /* ────────────────────────────────────
     Hero — staggered entrance on load
  ──────────────────────────────────── */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 180 + i * 140);
    });
  });

})();
