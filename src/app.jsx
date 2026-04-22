import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';

import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Menu from './pages/menu.jsx';
import Gallery from './pages/gallery.jsx';
import Contact from './pages/contact.jsx';
import Reservation from './pages/reservation.jsx';
import Order from './pages/order.jsx';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const location = useLocation();

  // Scroll logic for Navbar
  useEffect(() => {
    const handleScroll = () => {
      const isHome = location.pathname === '/';
      const threshold = isHome ? window.innerHeight - 80 : 50;
      setScrolled(window.pageYOffset > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Global Animations (ScrollReveal & Parallax)
  useEffect(() => {
    // Parallax logic
    const handleParallax = () => {
      let scrollY = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrollY * 0.4}px)`;
      });
    };
    window.addEventListener('scroll', handleParallax);

    // ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1200,
      delay: 100,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: true 
    });

    sr.reveal('.reveal-up');
    sr.reveal('.reveal-delay-1', { delay: 200 });
    sr.reveal('.reveal-delay-2', { delay: 300 });
    sr.reveal('.reveal-delay-3', { delay: 400 });
    sr.reveal('.reveal-left', { origin: 'left', distance: '50px' });
    sr.reveal('.reveal-right', { origin: 'right', distance: '50px' });
    sr.reveal('.menu-card', { interval: 100 });

    // Scroll to top on route change
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('scroll', handleParallax);
      // Wait, scrollreveal doesn't have an explicit destroy, but that's fine inside SPA.
    };
  }, [location.pathname]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <>
      {/* Flash Messages Toast */}
      {toasts.length > 0 && (
        <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast-message bg-white shadow-premium rounded-lg px-6 py-4 flex items-center gap-3 border-l-4 border-gold transform transition-all duration-500`}>
              {toast.type === 'success' ? (
                <i className="fa-solid fa-check-circle text-gold text-xl"></i>
              ) : (
                <i className="fa-solid fa-info-circle text-gold text-xl"></i>
              )}
              <p className="font-medium">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="ml-4 text-gray-400 hover:text-espresso transition">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Bar */}
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <span className={`font-serif text-2xl font-bold tracking-wide transition-colors duration-300 ${scrolled ? 'text-espresso' : 'text-white'}`}>
              Mírame
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link to="/" className={`nav-link hover:text-gold transition-colors duration-300 ${scrolled ? 'text-espresso' : 'text-white/90'}`}>Home</Link>
            <Link to="/menu" className={`nav-link hover:text-gold transition-colors duration-300 ${scrolled ? 'text-espresso' : 'text-white/90'}`}>Menu</Link>
            <Link to="/gallery" className={`nav-link hover:text-gold transition-colors duration-300 ${scrolled ? 'text-espresso' : 'text-white/90'}`}>Gallery</Link>
            <Link to="/about" className={`nav-link hover:text-gold transition-colors duration-300 ${scrolled ? 'text-espresso' : 'text-white/90'}`}>About</Link>
            <Link to="/contact" className={`nav-link hover:text-gold transition-colors duration-300 ${scrolled ? 'text-espresso' : 'text-white/90'}`}>Contact</Link>
            <Link to="/order" className={`nav-link hover:text-gold transition-colors duration-300 md:mr-4 ${scrolled ? 'text-espresso' : 'text-white/90'}`}>Order Online</Link>
            <Link to="/reservation" className="btn-primary transition-all duration-300">Reserve Table</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden z-50 text-2xl focus:outline-none transition-colors duration-300 ${
              scrolled || mobileMenuOpen ? 'text-espresso' : 'text-white'
            }`}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-6 text-xl shadow-premium animate-fadeIn">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="font-serif hover:text-gold transition-colors">Home</Link>
            <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className="font-serif hover:text-gold transition-colors">Menu</Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="font-serif hover:text-gold transition-colors">Gallery</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="font-serif hover:text-gold transition-colors">About</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="font-serif hover:text-gold transition-colors">Contact</Link>
            <Link to="/order" onClick={() => setMobileMenuOpen(false)} className="font-serif hover:text-gold transition-colors">Order Online</Link>
            <Link to="/reservation" onClick={() => setMobileMenuOpen(false)} className="btn-primary mt-4">Reserve Table</Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact addToast={addToast} />} />
          <Route path="/reservation" element={<Reservation addToast={addToast} />} />
          <Route path="/order" element={<Order addToast={addToast} />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-espresso text-cream pt-16 pb-8 border-t-[6px] border-gold">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-3xl font-bold mb-4">Mírame</h3>
            <p className="text-cream/80 leading-relaxed mb-6">
              Where flavor meets comfort. Experience modern luxury with artisanal coffee and fine dining in a cozy ambiance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-espresso transition-all duration-300">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-espresso transition-all duration-300">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-espresso transition-all duration-300">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-cream/80 hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Home</Link></li>
              <li><Link to="/about" className="text-cream/80 hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Our Story</Link></li>
              <li><Link to="/menu" className="text-cream/80 hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">View Menu</Link></li>
              <li><Link to="/gallery" className="text-cream/80 hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-gold">Contact Us</h4>
            <ul className="space-y-4 text-cream/80">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot mt-1 text-gold"></i>
                <span>123 Luxury Avenue,<br/>Metro Hub, City 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-gold"></i>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-gold"></i>
                <span>hello@miramecafe.com</span>
              </li>
            </ul>
          </div>

          {/* Open Hours */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-gold">Opening Hours</h4>
            <ul className="space-y-3 text-cream/80">
              <li className="flex justify-between border-b border-cream/20 pb-2">
                <span>Mon - Fri</span>
                <span>10:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-cream/20 pb-2">
                <span>Sat - Sun</span>
                <span>09:00 AM - 12:00 AM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-6 pt-8 border-t border-cream/20 text-center text-sm text-cream/60">
          <p>&copy; 2026 Mírame Cafe & Kitchen. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
