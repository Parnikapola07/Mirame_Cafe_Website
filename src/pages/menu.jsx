import React, { useState } from 'react';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('starters');

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-espresso text-cream relative">
        <div className="container mx-auto px-6 relative z-10 text-center reveal-up">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-cream/80">
            Savor the extraordinary. A symphony of flavors curated just for you.
          </p>
        </div>
      </section>

      {/* Full Menu */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 reveal-up">
            <button
              onClick={() => setActiveTab('starters')}
              className={`px-8 py-3 rounded-full font-serif text-lg font-medium transition-all duration-300 ${
                activeTab === 'starters'
                  ? 'bg-espresso text-cream shadow-premium'
                  : 'bg-cream text-espresso hover:bg-gold hover:text-espresso'
              }`}
            >
              Starters
            </button>
            <button
              onClick={() => setActiveTab('mains')}
              className={`px-8 py-3 rounded-full font-serif text-lg font-medium transition-all duration-300 ${
                activeTab === 'mains'
                  ? 'bg-espresso text-cream shadow-premium'
                  : 'bg-cream text-espresso hover:bg-gold hover:text-espresso'
              }`}
            >
              Main Course
            </button>
            <button
              onClick={() => setActiveTab('beverages')}
              className={`px-8 py-3 rounded-full font-serif text-lg font-medium transition-all duration-300 ${
                activeTab === 'beverages'
                  ? 'bg-espresso text-cream shadow-premium'
                  : 'bg-cream text-espresso hover:bg-gold hover:text-espresso'
              }`}
            >
              Beverages
            </button>
            <button
              onClick={() => setActiveTab('desserts')}
              className={`px-8 py-3 rounded-full font-serif text-lg font-medium transition-all duration-300 ${
                activeTab === 'desserts'
                  ? 'bg-espresso text-cream shadow-premium'
                  : 'bg-cream text-espresso hover:bg-gold hover:text-espresso'
              }`}
            >
              Desserts
            </button>
          </div>

          {/* Tab Contents: Starters */}
          {activeTab === 'starters' && (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 animate-fadeIn">
              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Truffle Fries"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Truffle Fries</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$8.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Crispy shoestring fries tossed in white truffle oil, grated parmesan, and fresh rosemary.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Bruschetta"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Classic Bruschetta</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$10.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Toasted sourdough topped with heirloom tomatoes, fresh mozzarella, and balsamic glaze.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Calamari"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Crispy Calamari</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$14.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Lightly dusted calamari rings served with house-made garlic aioli and fresh lemon.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Salad"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Mirame House Salad</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$12.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Mixed organic greens, candied walnuts, goat cheese, and citrus vinaigrette.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Contents: Main Course */}
          {activeTab === 'mains' && (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 animate-fadeIn">
              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Pasta"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Creamy Alfredo Pasta</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$18.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Rich, velvety parmesan cream sauce tossed with artisanal fettuccine and fresh parsley.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Burger"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Gourmet Veg Burger</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$16.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Handcrafted plant-based patty with truffle mayo, caramelized onions, and brioche bun.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1544025162-831e5008cf0a?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Salmon"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Pan-Seared Salmon</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$26.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Wild-caught Atlantic salmon served over quinoa pilaf with lemon butter sauce.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Pizza"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Margherita Pizza</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$18.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Wood-fired sourdough base with San Marzano tomatoes, fresh mozzarella, and aromatic basil.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Contents: Beverages */}
          {activeTab === 'beverages' && (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 animate-fadeIn">
              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Signature Cold Coffee</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$7.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Overnight steeped cold brew shaken with hazelnut cream and dark chocolate dust.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Classic Cappuccino</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$5.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Espresso shot topped with deep layer of foamed milk.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Matcha Latte</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$6.50</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Premium ceremonial grade matcha steamed with almond milk and honey.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Artisan Iced Tea</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$5.50</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Peach and hibiscus infused iced tea with fresh mint leaves and lemon.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Contents: Desserts */}
          {activeTab === 'desserts' && (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 animate-fadeIn">
              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Cheesecake"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">New York Cheesecake</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$9.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Classic dense, rich cheesecake on graham cracker crust with berry coulis.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 pb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=200&h=200&fit=crop"
                  className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                  alt="Tiramisu"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">Classic Tiramisu</h4>
                    <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">$10.00</span>
                  </div>
                  <p className="text-espresso/70 leading-relaxed text-sm">
                    Espresso soaked ladyfingers layered with mascarpone cream and cocoa.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
