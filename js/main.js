/* ============================================
   RANN PORTFOLIO v2 — JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Page Loader
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 1400);
  }

  // Navbar scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile menu
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  // Scroll Reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // Stagger children
  const staggerContainers = document.querySelectorAll('[data-stagger]');
  staggerContainers.forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(30px)';
      child.style.transition = `all 0.6s ease ${i * 0.1}s`;
    });
    const staggerObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(entry.target.children).forEach(child => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          });
          staggerObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    staggerObs.observe(container);
  });

  // Counter Animation
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-counter'));
    const step = target / 125;
    let current = 0;
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const update = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(update);
            } else {
              counter.textContent = target;
            }
          };
          update();
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterObs.observe(counter);
  });

  // Contact form
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Sent!';
        btn.style.background = '#10b981';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // Smooth scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Console easter egg
  console.log('%c RANN ', 'background: #00d4ff; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 8px 16px;');
  console.log('%cBot Designer at Society', 'color: #00d4ff; font-size: 12px;');
});
