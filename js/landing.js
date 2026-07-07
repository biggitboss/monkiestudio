document.addEventListener('DOMContentLoaded', () => {

  // ===== THEME TOGGLE =====
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeIconPath = document.getElementById('themeIconPath');

  const moonPath = 'M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z';
  const sunPath = 'M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z';

  function getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeIconPath.setAttribute('d', theme === 'dark' ? sunPath : moonPath);
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme || getPreferredTheme());

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ===== HERO SLIDER =====
  (function() {
    const track = document.getElementById('heroTrack');
    const slides = track.querySelectorAll('.hero-slide');
    const prev = document.getElementById('heroPrev');
    const next = document.getElementById('heroNext');
    const dotsContainer = document.getElementById('heroDots');
    let current = 0;
    let interval;

    if (!track || slides.length < 2) return;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero-slider__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir a slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      slides[current].classList.remove('active');
      dotsContainer.children[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dotsContainer.children[current].classList.add('active');
    }

    function nextSlide() { goTo((current + 1) % slides.length); }
    function prevSlide() { goTo((current - 1 + slides.length) % slides.length); }

    if (prev) prev.addEventListener('click', prevSlide);
    if (next) next.addEventListener('click', nextSlide);

    function startAutoplay() { interval = setInterval(nextSlide, 6000); }
    function stopAutoplay() { clearInterval(interval); }

    const slider = document.querySelector('.hero-slider');
    if (slider) {
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
      slider.addEventListener('focusin', stopAutoplay);
      slider.addEventListener('focusout', startAutoplay);
    }

    startAutoplay();
  })();

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.header');

  function updateHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const overlayLinks = navOverlay.querySelectorAll('a');

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('open');
    navOverlay.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navOverlay.classList.remove('open');
      hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
      document.body.style.overflow = '';
    });
  });

  // ===== CLIENT LOGO CAROUSEL =====
  (function() {
    const track = document.getElementById('clientesTrack');
    const dotsContainer = document.getElementById('clientesDots');
    if (!track) return;

    const slides = track.querySelectorAll('.clientes-carousel__slide');
    let current = 0;
    let interval;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'clientes-carousel__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir a ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      slides[current].classList.remove('active');
      dotsContainer.children[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dotsContainer.children[current].classList.add('active');
    }

    function next() {
      goTo((current + 1) % slides.length);
    }

    function startAutoplay() { interval = setInterval(next, 5000); }
    function stopAutoplay() { clearInterval(interval); }

    const carousel = document.querySelector('.clientes-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
      carousel.addEventListener('focusin', stopAutoplay);
      carousel.addEventListener('focusout', startAutoplay);
    }

    startAutoplay();
  })();

  // ===== ANIMATED COUNTERS =====
  (function() {
    const counters = document.querySelectorAll('.counter');

    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1500;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  })();

  // ===== FADE-UP ON SCROLL =====
  (function() {
    const elements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  })();

  // ===== FORM VALIDATION =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('formName');
      const email = document.getElementById('formEmail');
      const message = document.getElementById('formMessage');

      const fields = [
        { el: name, validate: v => v.trim().length >= 2, msg: 'Ingresa tu nombre (mín. 2 caracteres)' },
        { el: email, validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Ingresa un correo válido' },
        { el: message, validate: v => v.trim().length >= 10, msg: 'El mensaje debe tener al menos 10 caracteres' },
      ];

      fields.forEach(({ el, validate, msg }) => {
        const helper = el.closest('.form-group').querySelector('.helper');
        if (!validate(el.value)) {
          el.classList.add('error');
          helper.textContent = msg;
          helper.className = 'helper error';
          isValid = false;
        } else {
          el.classList.remove('error');
          helper.textContent = '';
          helper.className = 'helper';
        }
      });

      if (isValid) {
        const toast = document.getElementById('toast');
        toast.textContent = '\u2713 Mensaje enviado. Te contactaremos pronto.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
        form.reset();
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
