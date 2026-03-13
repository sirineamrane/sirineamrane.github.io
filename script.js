/* ═══════════════════════════════════════
   SIRINE AMRANE — Personal Site
   script.js
═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────
     Attention Weights Cursor
     4 particles orbit the cursor at different
     radii and speeds, like attention heads
     scanning different parts of the input.
  ──────────────────────────────────── */
  const ods = [
    document.getElementById('od0'),
    document.getElementById('od1'),
    document.getElementById('od2'),
    document.getElementById('od3'),
  ];

  const orbits = [
    { r: 20, speed: 0.048, angle: 0 },
    { r: 30, speed: 0.031, angle: Math.PI * 0.5 },
    { r: 15, speed: 0.068, angle: Math.PI },
    { r: 24, speed: 0.039, angle: Math.PI * 1.5 },
  ];

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function animateOrbits() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    orbits.forEach((o, i) => {
      o.angle += o.speed;
      ods[i].style.left = (cx + o.r * Math.cos(o.angle)) + 'px';
      ods[i].style.top  = (cy + o.r * Math.sin(o.angle)) + 'px';
    });
    requestAnimationFrame(animateOrbits);
  })();

  /* ────────────────────────────────────
     SGD Convergence Cursor
     Each particle independently follows the mouse
     with a different lerp factor — faster ones stay
     close (recent iterations), slower ones lag behind
     (earlier iterations converging to the minimum).
  ──────────────────────────────────── */

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
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.style.color = link.getAttribute('href') === '#' + current ? '#d4b87e' : '';
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
     Scroll Reveal
  ──────────────────────────────────── */
  const revealObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

  /* ────────────────────────────────────
     Stagger delays in grids
  ──────────────────────────────────── */
  document.querySelectorAll('.research-grid, .work-grid, .hobbies-grid, .contact-links').forEach((container) => {
    container.querySelectorAll('.reveal, .contact-link').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  /* ────────────────────────────────────
     Hero entrance
  ──────────────────────────────────── */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 180 + i * 140);
    });
  });

})();
