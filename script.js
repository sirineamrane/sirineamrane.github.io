/* ═══════════════════════════════════════
   SIRINE AMRANE — Personal Site
   script.js
═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────
     SGD Convergence Cursor
     Each particle independently follows the mouse
     with a different lerp factor — faster ones stay
     close (recent iterations), slower ones lag behind
     (earlier iterations converging to the minimum).
  ──────────────────────────────────── */
  const cursorMain = document.getElementById('cursorMain');
  const particles  = Array.from(document.querySelectorAll('.sgd-particle'));

  const lerpFactors = [0.22, 0.15, 0.10, 0.06, 0.035];

  let mx = -20, my = -20;
  const pos = particles.map(() => ({ x: -20, y: -20 }));

  if (cursorMain) {
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorMain.style.left = mx + 'px';
      cursorMain.style.top  = my + 'px';
    });

    (function animate() {
      particles.forEach((p, i) => {
        pos[i].x += (mx - pos[i].x) * lerpFactors[i];
        pos[i].y += (my - pos[i].y) * lerpFactors[i];
        p.style.left = pos[i].x + 'px';
        p.style.top  = pos[i].y + 'px';
      });
      requestAnimationFrame(animate);
    })();

    document.querySelectorAll('a, button, .work-card, .research-card, .hobby-card, .contact-link').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorMain.style.transform = 'translate(-50%, -50%) scale(2.2)';
        cursorMain.style.boxShadow = '0 0 14px rgba(212, 184, 126, 0.9)';
      });
      el.addEventListener('mouseleave', () => {
        cursorMain.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorMain.style.boxShadow = '0 0 8px rgba(212, 184, 126, 0.7)';
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
