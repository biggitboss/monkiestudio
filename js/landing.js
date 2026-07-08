document.addEventListener('DOMContentLoaded', () => {

  // ===== HERO SLIDER =====
  (function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-arrow-prev');
    const nextBtn = document.querySelector('.hero-arrow-next');
    const slider = document.querySelector('.hero-slider');
    let current = 0;
    let interval;

    if (slides.length < 2) return;

    function goTo(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      current = index;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function next() {
      goTo((current + 1) % slides.length);
    }

    function prev() {
      goTo((current - 1 + slides.length) % slides.length);
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.slide));
        resetAutoplay();
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

    function startAutoplay() {
      interval = setInterval(next, 6000);
    }

    function stopAutoplay() {
      clearInterval(interval);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (slider) {
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
      slider.addEventListener('focusin', stopAutoplay);
      slider.addEventListener('focusout', startAutoplay);
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    });

    startAutoplay();
  })();

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  function updateActiveSection() {
    let current = 'inicio';
    const scrollY = window.scrollY + 150;
    sections.forEach(s => {
      if (s.offsetTop <= scrollY) {
        current = s.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      const target = link.getAttribute('href').slice(1);
      link.classList.toggle('active', target === current);
    });
  }

  function updateHeaderScroll() {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('header--scrolled', scrolled);
    header.classList.toggle('shadow-md', scrolled);
    updateActiveSection();
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');

  if (hamburger && navOverlay) {
    function toggleMenu() {
      const isOpen = hamburger.classList.toggle('open');
      navOverlay.classList.toggle('hidden', !isOpen);
      navOverlay.classList.toggle('flex', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);

    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navOverlay.classList.add('hidden');
        navOverlay.classList.remove('flex');
        hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== FADE-UP ON SCROLL =====
  (function () {
    const elements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach(el => observer.observe(el));
  })();

  // ===== FORM VALIDATION =====
  function setupForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required]');

      inputs.forEach(input => {
        const group = input.closest('.form-group');
        const helper = group ? group.querySelector('.helper') : null;
        let invalid = false;

        if (input.type === 'checkbox') {
          invalid = !input.checked;
        } else if (!input.value.trim()) {
          invalid = true;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          invalid = true;
        }

        if (invalid) {
          if (input.type !== 'checkbox') {
            input.classList.add('border-coral');
            input.classList.remove('border-stone');
          }
          if (helper) {
            helper.textContent = input.type === 'checkbox' ? 'Debes aceptar la política de privacidad' :
                                 input.tagName === 'SELECT' ? 'Selecciona una opción' :
                                 input.type === 'email' ? 'Ingresa un correo válido' :
                                 'Este campo es obligatorio';
            helper.className = 'helper text-xs mt-1 text-coral';
          }
          isValid = false;
        } else {
          if (input.type !== 'checkbox') {
            input.classList.remove('border-coral');
            input.classList.add('border-stone');
          }
          if (helper) {
            helper.textContent = '';
            helper.className = 'helper text-xs mt-1 text-black/70';
          }
        }
      });

      if (isValid) {
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.innerHTML = '<span class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Enviando...';

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
          const toast = document.getElementById('toast');
          toast.textContent = '\u2713 Gracias. Te contactaremos pronto.';
          toast.classList.remove('opacity-0', 'pointer-events-none');
          toast.classList.add('opacity-100');
          setTimeout(() => {
            toast.classList.remove('opacity-100');
            toast.classList.add('opacity-0', 'pointer-events-none');
            inputs.forEach(input => {
              input.classList.remove('border-coral');
              input.value = '';
            });
            form.reset();
          }, 3000);
        }, 2000);
      }
    });
  }

  setupForm('formContacto');

  // ===== PRIVACY MODAL =====
  const privacyLink = document.getElementById('privacyLink');
  const privacyModal = document.getElementById('privacyModal');
  const privacyClose = document.getElementById('privacyClose');
  const privacyAccept = document.getElementById('privacyAccept');

  if (privacyLink && privacyModal) {
    function openModal(e) {
      e.preventDefault();
      privacyModal.classList.remove('hidden');
      privacyModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      privacyModal.classList.add('hidden');
      privacyModal.classList.remove('flex');
      document.body.style.overflow = '';
    }
    privacyLink.addEventListener('click', openModal);
    if (privacyClose) privacyClose.addEventListener('click', closeModal);
    if (privacyAccept) privacyAccept.addEventListener('click', closeModal);
    privacyModal.addEventListener('click', e => {
      if (e.target === privacyModal) closeModal();
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});