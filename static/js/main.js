/**
 * Main JavaScript for Mirame Cafe & Kitchen
 */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize ScrollReveal for premium enter animations
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1200,
            delay: 100,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: true // Set to true so animations repeat and feel alive on every scroll
        });

        // Add reveal classes inside templates and initialize here
        sr.reveal('.reveal-up');
        sr.reveal('.reveal-delay-1', { delay: 200 });
        sr.reveal('.reveal-delay-2', { delay: 300 });
        sr.reveal('.reveal-delay-3', { delay: 400 });

        sr.reveal('.reveal-left', { origin: 'left', distance: '50px' });
        sr.reveal('.reveal-right', { origin: 'right', distance: '50px' });

        // Staggered reveal for grid items
        sr.reveal('.menu-card', { interval: 100 });
    }

    // Parallax effect for hero sections
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrollY * 0.4}px)`;
        });
    });

});
