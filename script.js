document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = nav.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Intersection Observer for Fade-in Animations ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // --- Combined Scroll Effects Handler ---
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Header background change
        if (header) {
            header.style.backgroundColor = scrollY > 50 
                ? 'rgba(15, 23, 42, 0.95)' 
                : 'rgba(15, 23, 42, 0.8)';
        }

        // Hero parallax effect
        if (hero && scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
});