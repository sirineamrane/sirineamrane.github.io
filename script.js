/* ═══════════════════════════════════════
   SIRINE AMRANE — Personal Site
   script.js
═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────
     SGD Convergence Cursor
     4 particles each independently lerp toward
     the mouse at different rates. Fast ones stay
     close (recent iterations near the minimum),
     slow ones trail behind (early iterations
     still converging).
  ──────────────────────────────────── */
  const ods = [
    document.getElementById('od0'),
    document.getElementById('od1'),
    document.getElementById('od2'),
    document.getElementById('od3'),
  ];

  const lerps = [0.28, 0.16, 0.09, 0.05];
  const pos   = ods.map(() => ({ x: -100, y: -100 }));

  let mx = -100, my = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function animateSGD() {
    pos.forEach((p, i) => {
      p.x += (mx - p.x) * lerps[i];
      p.y += (my - p.y) * lerps[i];
      ods[i].style.left = p.x + 'px';
      ods[i].style.top  = p.y + 'px';
    });
    requestAnimationFrame(animateSGD);
  })();

  /* ────────────────────────────────────
     SGD Convergence Cursor
     Each particle independently follows the mouse
     with a different lerp factor — faster ones stay
     close (recent iterations), slower ones lag behind
     (earlier iterations converging to the minimum).
  ──────────────────────────────────── */

  /* ────────────────────────────────────
     Audio player
  ──────────────────────────────────── */
  const audio     = document.getElementById('bgAudio');
  const audioBtn  = document.getElementById('audioBtn');
  const iconPlay  = document.getElementById('audioIconPlay');
  const iconPause = document.getElementById('audioIconPause');

  audioBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      iconPlay.style.display  = 'none';
      iconPause.style.display = '';
      audioBtn.classList.add('playing');
    } else {
      audio.pause();
      iconPlay.style.display  = '';
      iconPause.style.display = 'none';
      audioBtn.classList.remove('playing');
    }
  });

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
