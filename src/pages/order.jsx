import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Order({ cart = {}, addToCart, removeFromCart, deleteFromCart, clearCart, addToast }) {
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'takeaway'

  // Cart calculations
  const cartItems = Object.values(cart);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' && subtotal > 0 && subtotal < 30 ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      addToast('Your cart is empty. Please add items from the Menu page.', 'error');
      return;
    }

    const formData = new FormData(e.target);

    // Serialize cart items: e.g. "[Delivery] 2x Truffle Fries ($16.00), 1x Cappuccino ($5.00)"
    const serializedCart = `${orderType === 'takeaway' ? '[Takeaway] ' : '[Delivery] '}` + cartItems
      .map(item => `${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`)
      .join(', ');

    // Set serialized fields for the backend request
    formData.set('item', serializedCart);
    formData.set('quantity', cartItemCount);
    
    // Set takeaway address placeholder if takeaway is chosen (since column is not-null)
    if (orderType === 'takeaway') {
      formData.set('address', 'Takeaway (Self-Pickup)');
    }

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        addToast('Your order has been placed successfully!', 'success');
        e.target.reset();
        clearCart();
      } else {
        addToast('Failed to place order. Please try again later.', 'error');
      }
    } catch (error) {
      addToast('Network error occurred.', 'error');
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-espresso text-cream relative">
        <div className="container mx-auto px-6 relative z-10 text-center reveal-up">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Order Online</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-cream/80">Premium quality food, delivered to your doorstep.</p>
        </div>
      </section>

      {/* Main Order/Cart Section */}
      <section className="py-24 bg-cream min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Cart & Checkout Form OR Empty State */}
            <div className="lg:w-2/3 flex flex-col gap-8">
              {cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="bg-white rounded-xl shadow-premium p-12 text-center reveal-left border-t-4 border-gold flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mb-6">
                    <i className="fa-solid fa-basket-shopping text-4xl text-gold/60"></i>
                  </div>
                  <h2 className="font-serif text-3xl text-espresso font-bold mb-4">Your Cart is Empty</h2>
                  <p className="text-espresso/70 mb-8 max-w-md leading-relaxed text-sm">
                    It looks like you haven't added anything to your cart yet. Check out our menu to select some delicious coffee and food.
                  </p>
                  <Link to="/menu" className="btn-primary py-3 px-8 text-base rounded-full inline-flex items-center gap-2">
                    <i className="fa-solid fa-utensils"></i> Go to Menu
                  </Link>
                </div>
              ) : (
                /* Cart Items Review & Checkout Form */
                <div className="space-y-8">
                  {/* Cart Items Card */}
                  <div className="bg-white rounded-xl shadow-premium p-8 border-t-4 border-gold reveal-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-espresso/5 pb-4">
                      <h2 className="font-serif text-2xl text-espresso font-bold flex items-center gap-2">
                        <i className="fa-solid fa-receipt text-gold"></i> Review Your Order
                      </h2>
                      <Link to="/menu" className="text-gold hover:text-gold/80 font-semibold text-sm flex items-center gap-1.5 transition-colors group select-none">
                        <span className="transform group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> Add more items
                      </Link>
                    </div>

                    <div className="space-y-4 divide-y divide-gray-100">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                          <div className="flex items-center gap-4">
                            {item.category !== 'beverages' && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover shadow-sm flex-shrink-0"
                              />
                            )}
                            <div>
                              <p className="font-serif font-bold text-espresso text-lg">{item.name}</p>
                              <p className="text-xs text-espresso/60">${item.price.toFixed(2)} each</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-6">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 bg-espresso/5 border border-espresso/10 rounded-full px-3 py-1.5 select-none">
                              <button 
                                type="button"
                                onClick={() => removeFromCart(item)}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-espresso hover:bg-gold hover:text-espresso transition-colors text-sm font-bold"
                              >
                                <i className="fa-solid fa-minus text-[10px]"></i>
                              </button>
                              <span className="font-bold text-espresso text-base w-4 text-center">{item.quantity}</span>
                              <button 
                                type="button"
                                onClick={() => addToCart(item)}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-espresso hover:bg-gold hover:text-espresso transition-colors text-sm font-bold"
                              >
                                <i className="fa-solid fa-plus text-[10px]"></i>
                              </button>
                            </div>

                            {/* Item Price & Delete */}
                            <div className="flex items-center gap-4 min-w-[100px] justify-end">
                              <span className="font-serif font-bold text-espresso text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                type="button"
                                onClick={() => deleteFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 transition hover:scale-105"
                                title="Remove item"
                              >
                                <i className="fa-solid fa-trash-can text-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Summary Breakdown */}
                    <div className="border-t border-espresso/10 mt-6 pt-6 space-y-3 text-sm text-espresso/80">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                      </div>
                      {orderType === 'delivery' ? (
                        <>
                          <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span className="font-semibold">{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}</span>
                          </div>
                          {deliveryFee > 0 && (
                            <p className="text-[11px] text-gold font-medium italic text-right animate-fadeIn">
                              Add ${(30 - subtotal).toFixed(2)} more for FREE Delivery!
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="flex justify-between text-green-600 font-medium">
                          <span>Takeaway Pickup</span>
                          <span>FREE</span>
                        </div>
                      )}
                      <div className="flex justify-between font-serif font-bold text-espresso border-t border-dashed border-espresso/10 pt-4 text-xl">
                        <span>Total Price</span>
                        <span className="text-gold">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Details Form Card */}
                  <div className="bg-white rounded-xl shadow-premium p-8 md:p-12 reveal-left border-t-4 border-gold">
                    <div className="mb-8">
                      <h2 className="font-serif text-3xl text-espresso font-bold mb-2">Direct Order Details</h2>
                      <p className="text-espresso/70 text-sm">Please select your order type and enter your details below.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Order Type Toggle */}
                      <div>
                        <label className="block text-espresso font-semibold mb-3">Order Type</label>
                        <div className="grid grid-cols-2 gap-4">
                          <label className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 font-semibold select-none ${
                            orderType === 'delivery'
                              ? 'border-gold bg-gold/5 text-espresso shadow-sm font-bold'
                              : 'border-espresso/10 bg-white text-espresso/70 hover:border-gold/30'
                          }`}>
                            <input
                              type="radio"
                              name="order_type"
                              value="delivery"
                              checked={orderType === 'delivery'}
                              onChange={() => setOrderType('delivery')}
                              className="sr-only"
                            />
                            <i className="fa-solid fa-motorcycle text-lg"></i>
                            <span>Delivery</span>
                          </label>

                          <label className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 font-semibold select-none ${
                            orderType === 'takeaway'
                              ? 'border-gold bg-gold/5 text-espresso shadow-sm font-bold'
                              : 'border-espresso/10 bg-white text-espresso/70 hover:border-gold/30'
                          }`}>
                            <input
                              type="radio"
                              name="order_type"
                              value="takeaway"
                              checked={orderType === 'takeaway'}
                              onChange={() => setOrderType('takeaway')}
                              className="sr-only"
                            />
                            <i className="fa-solid fa-bag-shopping text-lg"></i>
                            <span>Takeaway</span>
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-espresso font-medium mb-2">Your Name</label>
                          <input type="text" id="name" name="name" required className="form-input" placeholder="John Doe" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-espresso font-medium mb-2">Contact Number</label>
                          <input type="tel" id="phone" name="phone" required className="form-input" placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      {orderType === 'delivery' ? (
                        <div className="grid grid-cols-1 gap-6 animate-fadeIn">
                          <div>
                            <label htmlFor="address" className="block text-espresso font-medium mb-2">Delivery Address</label>
                            <textarea id="address" name="address" rows="3" required className="form-input" placeholder="Enter your full address for delivery"></textarea>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-cream/50 border border-gold/25 rounded-xl p-4 text-sm text-espresso/80 animate-fadeIn">
                          <p className="font-semibold text-espresso flex items-center gap-2 mb-1">
                            <i className="fa-solid fa-store text-gold"></i> Self-Pickup Info
                          </p>
                          <p>You have selected <strong>Takeaway</strong>. Your order will be prepared and ready for pickup at our Metro Hub location. Simply present your name and phone number at the counter.</p>
                        </div>
                      )}

                      <div className="pt-4">
                        <button type="submit" className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2">
                          <i className="fa-solid fa-circle-check"></i> Place Order (${total.toFixed(2)})
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Delivery Partners */}
            <div className="lg:w-1/3 reveal-right">
              <div className="bg-white rounded-xl shadow-premium p-8 text-center h-fit flex flex-col border border-cream/50 min-h-[350px] justify-center sticky top-28">
                <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-motorcycle text-3xl text-gold"></i>
                </div>

                <h3 className="font-serif text-2xl font-bold text-espresso mb-4">Delivery Partners</h3>
                <p className="text-espresso/70 mb-8 leading-relaxed text-sm">
                  Order through your favorite food delivery apps for fast and trackable delivery.
                </p>

                <div className="space-y-4 w-full">
                  <a href="https://www.zomato.com" target="_blank" rel="noreferrer" className="block w-full py-3.5 px-6 bg-[#E23744] text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-3">
                    <span className="font-bold">Order on Zomato</span>
                  </a>

                  <a href="https://www.swiggy.com" target="_blank" rel="noreferrer" className="block w-full py-3.5 px-6 bg-[#FC8019] text-white font-medium rounded-lg hover:bg-[#E06D11] transition-colors shadow-sm flex items-center justify-center gap-3">
                    <span className="font-bold">Order on Swiggy</span>
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
