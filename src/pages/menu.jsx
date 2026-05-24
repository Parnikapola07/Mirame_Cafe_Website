import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuItems';

export default function Menu({ cart = {}, addToCart, removeFromCart }) {
  const [activeTab, setActiveTab] = useState('starters');
  
  const activeItems = MENU_ITEMS.filter((item) => item.category === activeTab);

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

          {/* Tab Contents */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 animate-fadeIn">
            {activeItems.map((item) => {
              const cartItem = cart[item.id];
              const qty = cartItem?.quantity || 0;
              const hasItem = qty > 0;

              return (
                <div key={item.id} className="flex gap-6 border-b border-gray-100 pb-6 group">
                  {item.category !== 'beverages' && (
                    <img
                      src={item.image}
                      className="w-24 h-24 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500 flex-shrink-0"
                      alt={item.name}
                    />
                  )}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-serif text-2xl font-bold text-espresso group-hover:text-gold transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-bold text-gold text-xl border-b border-gold/30 pb-1">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-espresso/70 leading-relaxed text-sm mb-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Cart Add/Subtract controls */}
                    <div className="flex justify-start pt-1">
                      {hasItem ? (
                        <div className="flex items-center gap-3 bg-espresso/5 border border-espresso/10 rounded-full px-3 py-1 select-none">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-espresso hover:bg-gold hover:text-espresso transition-colors text-sm font-bold"
                          >
                            <i className="fa-solid fa-minus text-[10px]"></i>
                          </button>
                          <span className="font-bold text-espresso text-sm w-4 text-center">{qty}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-espresso hover:bg-gold hover:text-espresso transition-colors text-sm font-bold"
                          >
                            <i className="fa-solid fa-plus text-[10px]"></i>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="btn-primary py-1.5 px-4 text-xs font-semibold rounded-full flex items-center gap-1.5"
                        >
                          <i className="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

