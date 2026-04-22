import React // eslint-disable-next-line
from 'react';

export default function About() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-espresso text-cream relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg"
            alt="Coffee beans"
            className="w-full h-full object-cover opacity-20 parallax-bg"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center reveal-up">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Our Story</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-cream/80">
            Discover the passion, craft, and heart behind Mirame Cafe & Kitchen.
          </p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 reveal-left relative">
              <img
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000&auto=format&fit=crop"
                className="rounded-xl shadow-premium w-full h-[600px] object-cover"
                alt="Cafe Interior"
              />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl z-[-1]"></div>
            </div>

            <div className="lg:w-1/2 reveal-right">
              <h3 className="text-gold uppercase tracking-widest text-sm font-semibold mb-3">Est. 2026</h3>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-espresso leading-tight">
                A Dream Shared Over Coffee
              </h2>
              <p className="text-lg text-espresso/80 leading-relaxed mb-6">
                Founded in 2026, <strong className="text-espresso">Mirame Cafe & Kitchen</strong> began as a simple
                dream: to create a space where time slows down and connections are forged over exceptional coffee
                and food. We believe that a modern cafe is more than just a place to eat; it is the beating heart of
                a community.
              </p>
              <p className="text-lg text-espresso/80 leading-relaxed mb-8">
                Our culinary experts and master baristas work hand-in-hand to bring you a menu that celebrates local
                flavors while embracing modern international techniques. Every ingredient is ethically sourced, from
                our single-origin coffee beans to the farm-fresh produce used in our gourmet dishes.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-10 p-8 bg-white rounded-xl shadow-sm border border-cream/50">
                <div className="text-center">
                  <i className="fa-solid fa-mug-hot text-4xl text-gold mb-4"></i>
                  <h4 className="font-bold text-xl text-espresso mb-2">Artisanal Coffee</h4>
                  <p className="text-sm text-espresso/60">Crafted by master baristas</p>
                </div>
                <div className="text-center">
                  <i className="fa-solid fa-leaf text-4xl text-gold mb-4"></i>
                  <h4 className="font-bold text-xl text-espresso mb-2">Fresh Ingredients</h4>
                  <p className="text-sm text-espresso/60">Farm-to-table approach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
