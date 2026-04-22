import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      name: 'Sarah Johnson',
      stars: 5,
      text: 'Beautiful ambience and amazing coffee. One of the best cafes in the city. The truffle pasta is to die for!'
    },
    {
      name: 'Michael Chen',
      stars: 5,
      text: 'A hidden gem! The attention to detail in every dish and the warmth of the staff makes every visit memorable.'
    },
    {
      name: 'Elena Rodriguez',
      stars: 4,
      text: 'The cold brew is the best I\'ve ever had. Perfect spot for a Sunday brunch or a quiet evening date.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-espresso">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
            alt="Mirame Cafe Interior"
            className="w-full h-full object-cover parallax-bg animate-hero-zoom opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-overlay to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div className="reveal-up">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">Mirame</h1>
            <h2 className="font-serif text-2xl md:text-3xl text-gold mb-6 italic">Cafe & Kitchen</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-cream/90 font-light mb-10 max-w-2xl mx-auto">
              "Where Flavor Meets Comfort"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu" className="btn-primary text-lg px-8 py-3">View Menu</Link>
              <Link to="/reservation" className="btn-secondary-white text-lg px-8 py-3">Reserve Table</Link>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <a href="#about" className="text-white/70 hover:text-gold transition-colors">
            <i className="fa-solid fa-chevron-down text-2xl"></i>
          </a>
        </div>
      </section>

      {/* About Snippet Section */}
      <section id="about" className="py-24 bg-cream relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 reveal-left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
                  alt="Barista preparing coffee"
                  className="w-full h-[500px] object-cover rounded-xl shadow-premium animate-float-slow"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-full blur-2xl z-[-1] animate-float"></div>
                <div
                  className="absolute -top-6 -left-6 w-32 h-32 bg-espresso/10 rounded-full blur-2xl z-[-1] animate-float"
                  style={{ animationDelay: '2s' }}
                ></div>
              </div>
            </div>

            <div className="lg:w-1/2 reveal-right">
              <h3 className="text-gold uppercase tracking-widest text-sm font-semibold mb-3">Our Story</h3>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-8 leading-tight">
                An unforgettable culinary journey
              </h2>
              <p className="text-lg text-espresso/80 leading-relaxed mb-6">
                <strong className="font-medium text-espresso">Mirame Cafe & Kitchen</strong> is a cozy destination where
                delicious food, handcrafted coffee, and warm ambience come together to create unforgettable moments.
              </p>
              <p className="text-lg text-espresso/80 leading-relaxed mb-10">
                Sourced from the finest local ingredients and crafted with passion, every dish tells a story of
                tradition meeting modern culinary art. Step into our world and let us indulge your senses.
              </p>
              <Link to="/about" className="btn-secondary">Read More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal-up">
            <h3 className="text-gold uppercase tracking-widest text-sm font-semibold mb-3">Chef's Recommendations</h3>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso">Signature Tastes</h2>
            <div className="section-divider">
              <i className="fa-solid fa-utensils"></i>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="menu-card group rounded-xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 bg-cream">
              <div className="image-zoom-container h-64">
                <img src="https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=800&auto=format&fit=crop" alt="Creamy Alfredo Pasta" className="image-zoom" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif text-xl font-bold text-espresso group-hover:text-gold transition-colors">Creamy Alfredo Pasta</h4>
                  <span className="font-bold text-gold font-sans text-lg">$16</span>
                </div>
                <p className="text-espresso/70 text-sm line-clamp-2 mb-4">Rich, velvety parmesan cream sauce tossed with artisanal fettuccine and fresh parsley.</p>
              </div>
            </div>

            <div className="menu-card group rounded-xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 bg-cream">
              <div className="image-zoom-container h-64">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" alt="Gourmet Veg Burger" className="image-zoom" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif text-xl font-bold text-espresso group-hover:text-gold transition-colors">Gourmet Veg Burger</h4>
                  <span className="font-bold text-gold font-sans text-lg">$14</span>
                </div>
                <p className="text-espresso/70 text-sm line-clamp-2 mb-4">Handcrafted plant-based patty with truffle mayo, caramelized onions, and brioche bun.</p>
              </div>
            </div>

            <div className="menu-card group rounded-xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 bg-cream">
              <div className="image-zoom-container h-64">
                <img src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop" alt="Signature Cold Coffee" className="image-zoom" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif text-xl font-bold text-espresso group-hover:text-gold transition-colors">Signature Cold Coffee</h4>
                  <span className="font-bold text-gold font-sans text-lg">$7</span>
                </div>
                <p className="text-espresso/70 text-sm line-clamp-2 mb-4">Overnight steeped cold brew shaken with hazelnut cream and dark chocolate dust.</p>
              </div>
            </div>

            <div className="menu-card group rounded-xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 bg-cream">
              <div className="image-zoom-container h-64">
                <img src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800&auto=format&fit=crop" alt="Margherita Pizza" className="image-zoom" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif text-xl font-bold text-espresso group-hover:text-gold transition-colors">Margherita Pizza</h4>
                  <span className="font-bold text-gold font-sans text-lg">$18</span>
                </div>
                <p className="text-espresso/70 text-sm line-clamp-2 mb-4">Wood-fired sourdough base with San Marzano tomatoes, fresh mozzarella, and basil.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 reveal-up">
            <Link to="/menu" className="btn-primary">Explore Full Menu</Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 bg-espresso text-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-float" style={{ animationDelay: '3s' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 reveal-up">
            <h3 className="text-gold uppercase tracking-widest text-sm font-semibold mb-3">Words From Guests</h3>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">Customer Experiences</h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative min-h-[250px] flex items-center justify-center">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  } text-center px-8 w-full flex flex-col justify-center`}
                >
                  <div className="text-gold text-2xl mb-6">
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                  <p className="font-serif text-xl md:text-3xl leading-relaxed mb-8 text-cream/90 italic">
                    "{slide.text}"
                  </p>
                  <div className="flex justify-center gap-1 text-gold mb-4">
                    {Array.from({ length: slide.stars }).map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <h4 className="font-bold text-lg tracking-wide uppercase">— {slide.name}</h4>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center gap-4 mt-8 relative z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index ? 'bg-gold w-8' : 'bg-cream/30 hover:bg-cream/50'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-cream border-t border-espresso/10">
        <div className="container mx-auto px-6 lg:px-12 text-center reveal-up">
          <a href="#" className="inline-flex items-center gap-3 text-espresso hover:text-gold transition-colors group mb-8">
            <i className="fa-brands fa-instagram text-3xl group-hover:scale-110 transition-transform"></i>
            <h3 className="font-serif text-2xl font-bold">@miramecafe</h3>
          </a>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 overflow-hidden rounded-xl">
            <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=400&h=400&fit=crop" className="w-full h-full object-cover hover:opacity-80 transition cursor-pointer" alt="Insta Post 1" />
            <img src="https://images.unsplash.com/photo-1495474472204-5186b6eb21e8?q=80&w=400&h=400&fit=crop" className="w-full h-full object-cover hover:opacity-80 transition cursor-pointer" alt="Insta Post 2" />
            <img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=400&h=400&fit=crop" className="w-full h-full object-cover hover:opacity-80 transition cursor-pointer" alt="Insta Post 3" />
            <img src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=400&h=400&fit=crop" className="w-full h-full object-cover hover:opacity-80 transition cursor-pointer" alt="Insta Post 4" />
          </div>
        </div>
      </section>
    </>
  );
}
