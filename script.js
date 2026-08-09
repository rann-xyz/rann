// =====================================
// PORTFOLIO v2.0 - PREMIUM SCRIPT
// =====================================

document.addEventListener('DOMContentLoaded', () => {

 const isTouch = window.matchMedia('(pointer: coarse)').matches;

 // ===============================
 // LOADING SCREEN
 // ===============================
 const loader = document.getElementById('loader');
 if (loader) {
   window.addEventListener('load', () => {
     setTimeout(() => {
       loader.classList.add('hidden');
       // Trigger initial reveals after loader
       setTimeout(() => {
         document.querySelectorAll('[data-reveal]').forEach((el, i) => {
           setTimeout(() => el.classList.add('revealed'), i * 120);
         });
       }, 400);
     }, 800);
   });
 }

 // ===============================
 // SCROLL PROGRESS
 // ===============================
 const scrollProgress = document.getElementById('scrollProgress');
 if (scrollProgress) {
   window.addEventListener('scroll', () => {
     const scrollTop = window.scrollY;
     const docHeight = document.documentElement.scrollHeight - window.innerHeight;
     const progress = (scrollTop / docHeight) * 100;
     scrollProgress.style.width = progress + '%';
   });
 }

 // ===============================
 // CUSTOM CURSOR
 // ===============================
 const cursorDot = document.getElementById('cursorDot');
 const cursorOutline = document.getElementById('cursorOutline');

 if (cursorDot && cursorOutline && !isTouch) {
   let mouseX = 0, mouseY = 0;
   let outlineX = 0, outlineY = 0;

   document.addEventListener('mousemove', (e) => {
     mouseX = e.clientX;
     mouseY = e.clientY;
     cursorDot.style.left = mouseX + 'px';
     cursorDot.style.top = mouseY + 'px';
   });

   function animateCursor() {
     outlineX += (mouseX - outlineX) * 0.15;
     outlineY += (mouseY - outlineY) * 0.15;
     cursorOutline.style.left = outlineX + 'px';
     cursorOutline.style.top = outlineY + 'px';
     requestAnimationFrame(animateCursor);
   }
   animateCursor();

   // Hover effects
   document.querySelectorAll('[data-cursor="hover"]').forEach(el => {
     el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
     el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
   });
 }

 // ===============================
 // NAVBAR SCROLL + HIDE/SHOW
 // ===============================
 const navbar = document.getElementById('navbar');
 let lastScroll = 0;

 if (navbar) {
   window.addEventListener('scroll', () => {
     const currentScroll = window.scrollY;
     navbar.classList.toggle('scrolled', currentScroll > 50);

     // Hide on scroll down, show on scroll up
     if (currentScroll > lastScroll && currentScroll > 200) {
       navbar.style.transform = 'translateY(-100%)';
     } else {
       navbar.style.transform = 'translateY(0)';
     }
     lastScroll = currentScroll;
   });
   navbar.style.transition = 'transform 0.4s var(--ease-smooth), background 0.4s, padding 0.4s, border-color 0.4s';
 }

 // ===============================
 // MOBILE MENU
 // ===============================
 const menuToggle = document.getElementById('menuToggle');
 const mobileNav = document.getElementById('mobileNav');

 if (menuToggle && mobileNav) {
   menuToggle.addEventListener('click', () => {
     menuToggle.classList.toggle('active');
     mobileNav.classList.toggle('open');
     document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
   });

   document.querySelectorAll('.mob-link').forEach(link => {
     link.addEventListener('click', () => {
       menuToggle.classList.remove('active');
       mobileNav.classList.remove('open');
       document.body.style.overflow = '';
     });
   });

   document.addEventListener('click', (e) => {
     if (mobileNav.classList.contains('open') &&
         !mobileNav.contains(e.target) &&
         !menuToggle.contains(e.target)) {
       menuToggle.classList.remove('active');
       mobileNav.classList.remove('open');
       document.body.style.overflow = '';
     }
   });
 }

 // ===============================
 // SMOOTH SCROLL
 // ===============================
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function(e) {
     e.preventDefault();
     const target = document.querySelector(this.getAttribute('href'));
     if (target) {
       const offset = navbar ? navbar.offsetHeight + 20 : 80;
       window.scrollTo({
         top: target.getBoundingClientRect().top + window.pageYOffset - offset,
         behavior: 'smooth'
       });
     }
   });
 });

 // ===============================
 // ACTIVE NAV LINK
 // ===============================
 const sections = document.querySelectorAll('section[id]');
 const navLinks = document.querySelectorAll('.nav-link');

 function updateActiveNav() {
   let current = '';
   const scrollPos = window.scrollY + 150;

   sections.forEach(section => {
     const top = section.offsetTop;
     const height = section.offsetHeight;
     if (scrollPos >= top && scrollPos < top + height) {
       current = section.getAttribute('id');
     }
   });

   navLinks.forEach(link => {
     link.classList.remove('active');
     if (link.getAttribute('href') === '#' + current) {
       link.classList.add('active');
     }
   });
 }

 window.addEventListener('scroll', updateActiveNav);
 updateActiveNav();

 // ===============================
 // SCROLL REVEAL (IntersectionObserver)
 // ===============================
 const revealObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       entry.target.classList.add('revealed');
       revealObserver.unobserve(entry.target);
     }
   });
 }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

 document.querySelectorAll('[data-reveal]').forEach(el => {
   revealObserver.observe(el);
 });

 // ===============================
 // COUNTER ANIMATION
 // ===============================
 const counterObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       const el = entry.target;
       const target = parseInt(el.getAttribute('data-count'));
       const duration = 2000;
       const start = performance.now();

       function updateCounter(now) {
         const elapsed = now - start;
         const progress = Math.min(elapsed / duration, 1);
         // Ease out expo
         const eased = 1 - Math.pow(1 - progress, 3);
         el.textContent = Math.floor(eased * target);
         if (progress < 1) requestAnimationFrame(updateCounter);
       }
       requestAnimationFrame(updateCounter);
       counterObserver.unobserve(el);
     }
   });
 }, { threshold: 0.5 });

 document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

 // ===============================
 // SKILL BARS ANIMATION
 // ===============================
 const skillObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       const fill = entry.target;
       const width = fill.getAttribute('data-width');
       setTimeout(() => { fill.style.width = width; }, 300);
       skillObserver.unobserve(fill);
     }
   });
 }, { threshold: 0.5 });

 document.querySelectorAll('.skill-fill').forEach(fill => skillObserver.observe(fill));

 // ===============================
 // MAGNETIC BUTTONS
 // ===============================
 if (!isTouch) {
   document.querySelectorAll('.magnetic').forEach(btn => {
     btn.addEventListener('mousemove', (e) => {
       const rect = btn.getBoundingClientRect();
       const x = e.clientX - rect.left - rect.width / 2;
       const y = e.clientY - rect.top - rect.height / 2;
       btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
     });
     btn.addEventListener('mouseleave', () => {
       btn.style.transform = '';
     });
   });
 }

 // ===============================
 // 3D TILT CARDS
 // ===============================
 if (!isTouch) {
   document.querySelectorAll('.tilt-card').forEach(card => {
     card.addEventListener('mousemove', (e) => {
       const rect = card.getBoundingClientRect();
       const x = e.clientX - rect.left;
       const y = e.clientY - rect.top;
       const centerX = rect.width / 2;
       const centerY = rect.height / 2;
       const rotateX = (y - centerY) / centerY * -8;
       const rotateY = (x - centerX) / centerX * 8;
       card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
     });
     card.addEventListener('mouseleave', () => {
       card.style.transform = '';
     });
   });
 }

 // ===============================
 // PARTICLE CANVAS (Hero Background)
 // ===============================
 const canvas = document.getElementById('heroCanvas');
 if (canvas && !isTouch) {
   const ctx = canvas.getContext('2d');
   let particles = [];
   const particleCount = 60;

   function resizeCanvas() {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
   }
   resizeCanvas();
   window.addEventListener('resize', resizeCanvas);

   class Particle {
     constructor() {
       this.reset();
     }
     reset() {
       this.x = Math.random() * canvas.width;
       this.y = Math.random() * canvas.height;
       this.size = Math.random() * 2 + 0.5;
       this.speedX = (Math.random() - 0.5) * 0.5;
       this.speedY = (Math.random() - 0.5) * 0.5;
       this.opacity = Math.random() * 0.5 + 0.1;
     }
     update() {
       this.x += this.speedX;
       this.y += this.speedY;
       if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
         this.reset();
       }
     }
     draw() {
       ctx.beginPath();
       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
       ctx.fillStyle = `rgba(239, 68, 68, ${this.opacity})`;
       ctx.fill();
     }
   }

   for (let i = 0; i < particleCount; i++) {
     particles.push(new Particle());
   }

   function drawLines() {
     for (let i = 0; i < particles.length; i++) {
       for (let j = i + 1; j < particles.length; j++) {
         const dx = particles[i].x - particles[j].x;
         const dy = particles[i].y - particles[j].y;
         const dist = Math.sqrt(dx * dx + dy * dy);
         if (dist < 150) {
           ctx.beginPath();
           ctx.strokeStyle = `rgba(239, 68, 68, ${0.1 * (1 - dist / 150)})`;
           ctx.lineWidth = 0.5;
           ctx.moveTo(particles[i].x, particles[i].y);
           ctx.lineTo(particles[j].x, particles[j].y);
           ctx.stroke();
         }
       }
     }
   }

   let frameCount = 0;
   function animateParticles() {
     frameCount++;
     if (frameCount % 2 === 0) { // 30fps for performance
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       particles.forEach(p => { p.update(); p.draw(); });
       drawLines();
     }
     requestAnimationFrame(animateParticles);
   }
   animateParticles();
 }

 // ===============================
 // GALLERY LIGHTBOX
 // ===============================
 document.querySelectorAll('.gallery-item').forEach(item => {
   item.addEventListener('click', () => {
     const img = item.querySelector('img');
     if (!img) return;

     const lb = document.createElement('div');
     lb.style.cssText = `
       position: fixed; inset: 0; z-index: 100000;
       background: rgba(10,6,6,0.95); backdrop-filter: blur(30px);
       display: flex; align-items: center; justify-content: center;
       cursor: zoom-out; opacity: 0; transition: opacity 0.4s ease;
     `;

     const lbImg = document.createElement('img');
     lbImg.src = img.src;
     lbImg.alt = img.alt;
     lbImg.style.cssText = `
       max-width: 90%; max-height: 85vh; border-radius: 20px;
       border: 1px solid rgba(239,68,68,0.2);
       box-shadow: 0 40px 80px rgba(0,0,0,0.6);
       transform: scale(0.9); transition: transform 0.5s var(--ease-bounce);
     `;

     const lbCaption = document.createElement('div');
     lbCaption.textContent = img.alt;
     lbCaption.style.cssText = `
       position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
       color: var(--text-secondary); font-size: 16px; font-weight: 600;
       opacity: 0; transition: opacity 0.4s 0.2s;
     `;

     lb.appendChild(lbImg);
     lb.appendChild(lbCaption);
     document.body.appendChild(lb);
     document.body.style.overflow = 'hidden';

     requestAnimationFrame(() => {
       lb.style.opacity = '1';
       lbImg.style.transform = 'scale(1)';
       lbCaption.style.opacity = '1';
     });

     lb.addEventListener('click', () => {
       lb.style.opacity = '0';
       lbImg.style.transform = 'scale(0.9)';
       setTimeout(() => { lb.remove(); document.body.style.overflow = ''; }, 400);
     });
   });
 });

 // ===============================
 // PARALLAX HERO
 // ===============================
 const heroContent = document.querySelector('.hero-content');
 if (heroContent && !isTouch) {
   let mx = 0, my = 0, cx = 0, cy = 0;
   document.addEventListener('mousemove', (e) => {
     mx = (window.innerWidth / 2 - e.clientX) / 60;
     my = (window.innerHeight / 2 - e.clientY) / 60;
   });
   function animParallax() {
     cx += (mx - cx) * 0.05;
     cy += (my - cy) * 0.05;
     heroContent.style.transform = `translate(${cx}px, ${cy}px)`;
     requestAnimationFrame(animParallax);
   }
   animParallax();
 }

 // ===============================
 // CONSOLE
 // ===============================
 console.log('%c🔴 Rann Portfolio v2.0', 'font-size: 20px; color: #ef4444; font-weight: 900; font-family: monospace;');
 console.log('%cPremium Edition Loaded', 'font-size: 13px; color: #b8a0a0; font-family: monospace;');
});

