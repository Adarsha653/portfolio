document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Menu Toggle ----
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('nav-menu--open');
        navToggle.classList.toggle('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // ---- Sticky Navbar Background on Scroll ----
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }, { passive: true });

    // ---- Scroll Spy (Active Nav Link) ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const scrollSpy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('nav-link--active',
                        link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, {
        rootMargin: '-' + getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-height').trim() + ' 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => scrollSpy.observe(section));

    // ---- Fade-In Animations ----
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('fade-in--visible');
        });
    } else {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in--visible');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        document.querySelectorAll('.fade-in').forEach(el => {
            animationObserver.observe(el);
        });
    }

    // ---- Typewriter Effect ----
    const typedEl = document.getElementById('typed-text');
    if (typedEl) {
        const phrases = [
            'data pipelines.',
            'analytics solutions.',
            'scalable data systems.',
            'machine learning models.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 80;
        const deleteSpeed = 40;
        const pauseAfterType = 2000;
        const pauseAfterDelete = 400;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (!isDeleting) {
                typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, pauseAfterType);
                    return;
                }
                setTimeout(type, typeSpeed);
            } else {
                typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, pauseAfterDelete);
                    return;
                }
                setTimeout(type, deleteSpeed);
            }
        }

        // Start typing after hero animations finish
        setTimeout(type, 1200);
    }
});
