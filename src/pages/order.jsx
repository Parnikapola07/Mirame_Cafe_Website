import React from 'react';

export default function Order({ addToast }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        addToast('Your order has been placed successfully!', 'success');
        e.target.reset();
      } else {
        addToast('Failed to place order. Please try again later.', 'error');
      }
    } catch (error) {
      addToast('Network error occurred.', 'error');
    }
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-espresso text-cream relative">
        <div className="container mx-auto px-6 relative z-10 text-center reveal-up">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Order Online</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-cream/80">Premium quality food, delivered to your doorstep.</p>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Direct Order Form */}
            <div className="lg:w-2/3 bg-white rounded-xl shadow-premium p-8 md:p-12 reveal-left border-t-4 border-gold">
              <div className="mb-8">
                <h2 className="font-serif text-3xl text-espresso font-bold mb-2">Direct Order Request</h2>
                <p className="text-espresso/70 text-sm">Fill in the details for takeaway or direct delivery.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="item" className="block text-espresso font-medium mb-2">Item to Order</label>
                    <input type="text" id="item" name="item" required className="form-input" placeholder="e.g., Signature Cold Coffee, Truffle Fries" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="quantity" className="block text-espresso font-medium mb-2">Quantity</label>
                    <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" required className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-espresso font-medium mb-2">Your Name</label>
                    <input type="text" id="name" name="name" required className="form-input" placeholder="John Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-espresso font-medium mb-2">Contact Number</label>
                    <input type="tel" id="phone" name="phone" required className="form-input" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-espresso font-medium mb-2">Delivery Address (or specify Takeaway)</label>
                    <textarea id="address" name="address" rows="3" required className="form-input" placeholder="Enter your full address"></textarea>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-primary w-full py-4 text-lg">Place Order</button>
                </div>
              </form>
            </div>

            {/* Delivery Partners */}
            <div className="lg:w-1/3 space-y-8 reveal-right">
              <div className="bg-white rounded-xl shadow-premium p-8 text-center h-full flex flex-col justify-center border border-cream/50">
                <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-motorcycle text-3xl text-gold"></i>
                </div>

                <h3 className="font-serif text-2xl font-bold text-espresso mb-4">Delivery Partners</h3>
                <p className="text-espresso/70 mb-8 leading-relaxed">
                  Order through your favorite food delivery apps for fast and trackable delivery.
                </p>

                <div className="space-y-4 w-full">
                  <a href="https://www.zomato.com" target="_blank" rel="noreferrer" className="block w-full py-3 px-6 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-3">
                    <span>Order on Zomato</span>
                  </a>

                  <a href="https://www.swiggy.com" target="_blank" rel="noreferrer" className="block w-full py-3 px-6 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm flex items-center justify-center gap-3">
                    <span>Order on Swiggy</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
