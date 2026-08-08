// =====================================
// PORTFOLIO - CRIMSON SCRIPT
// =====================================

document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // CUSTOM CURSOR
    // ===============================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (cursorDot && cursorOutline && !isTouch) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        const interactives = document.querySelectorAll('a, button, .work-card, .skill-item, .gallery-item, .contact-item');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '56px';
                cursorOutline.style.height = '56px';
                cursorOutline.style.borderColor = 'var(--accent-light)';
                cursorOutline.style.opacity = '0.6';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '36px';
                cursorOutline.style.height = '36px';
                cursorOutline.style.borderColor = 'var(--accent)';
                cursorOutline.style.opacity = '0.4';
            });
        });
    }

    // ===============================
    // NAVBAR SCROLL
    // ===============================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        });
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
                const offset = navbar ? navbar.offsetHeight + 16 : 80;
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
        const scrollPos = window.scrollY + 120;

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
    // SCROLL REVEAL
    // ===============================
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObs.observe(el));

    // ===============================
    // SKILL BARS ANIMATION
    // ===============================
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                setTimeout(() => { fill.style.width = width; }, 200);
                skillObs.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => skillObs.observe(fill));

    // ===============================
    // HERO PARALLAX (desktop)
    // ===============================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && !isTouch) {
        let mx = 0, my = 0, cx = 0, cy = 0;
        document.addEventListener('mousemove', (e) => {
            mx = (window.innerWidth / 2 - e.clientX) / 50;
            my = (window.innerHeight / 2 - e.clientY) / 50;
        });
        function anim() {
            cx += (mx - cx) * 0.06;
            cy += (my - cy) * 0.06;
            heroContent.style.transform = `translate(${cx}px, ${cy}px)`;
            requestAnimationFrame(anim);
        }
        anim();
    }

    // ===============================
    // MAGNETIC BUTTONS
    // ===============================
    const magBtns = document.querySelectorAll('.btn-main, .btn-ghost');
    if (!isTouch) {
        magBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ===============================
    // GALLERY LIGHTBOX (simple)
    // ===============================
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                // Create lightbox
                const lb = document.createElement('div');
                lb.style.cssText = `
                    position: fixed; inset: 0; z-index: 10000;
                    background: rgba(15,10,10,0.95); backdrop-filter: blur(20px);
                    display: flex; align-items: center; justify-content: center;
                    cursor: zoom-out; opacity: 0; transition: opacity 0.3s;
                `;
                const lbImg = document.createElement('img');
                lbImg.src = img.src;
                lbImg.style.cssText = `
                    max-width: 90%; max-height: 85vh; border-radius: 16px;
                    border: 1px solid rgba(239,68,68,0.2); box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                    transform: scale(0.9); transition: transform 0.4s var(--ease-smooth);
                `;
                lb.appendChild(lbImg);
                document.body.appendChild(lb);
                document.body.style.overflow = 'hidden';

                requestAnimationFrame(() => {
                    lb.style.opacity = '1';
                    lbImg.style.transform = 'scale(1)';
                });

                lb.addEventListener('click', () => {
                    lb.style.opacity = '0';
                    lbImg.style.transform = 'scale(0.9)';
                    setTimeout(() => { lb.remove(); document.body.style.overflow = ''; }, 300);
                });
            }
        });
    });

    // ===============================
    // CONSOLE
    // ===============================
    console.log('%c🔴 Portfolio Loaded', 'font-size: 18px; color: #ef4444; font-weight: bold; font-family: monospace;');
    console.log('%cCrafted by Rann', 'font-size: 13px; color: #a89090; font-family: monospace;');
});

