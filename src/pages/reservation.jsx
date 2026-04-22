import React from 'react';

export default function Reservation({ addToast }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        addToast('Your table has been successfully reserved! We look forward to seeing you.', 'success');
        e.target.reset();
      } else {
        addToast('Failed to reserve table. Please try again later.', 'error');
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
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Reserve a Table</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-cream/80">Experience luxury dining. Secure your spot today.</p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-12 flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-premium p-8 md:p-12 reveal-up border-t-4 border-gold">
            <div className="text-center mb-10">
              <i className="fa-solid fa-bell-concierge text-4xl text-gold mb-4"></i>
              <h2 className="font-serif text-3xl text-espresso font-bold">Book Your Experience</h2>
              <p className="text-espresso/70 mt-2">Fill out the details below to reserve your table</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-espresso font-medium mb-2">Full Name</label>
                  <input type="text" id="name" name="name" required className="form-input" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-espresso font-medium mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required className="form-input" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="guests" className="block text-espresso font-medium mb-2">Guests</label>
                  <select id="guests" name="guests" required defaultValue="2" className="form-input text-espresso/80">
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6+ People</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-espresso font-medium mb-2">Date</label>
                  <input type="date" id="date" name="date" required className="form-input" />
                </div>
                <div>
                  <label htmlFor="time" className="block text-espresso font-medium mb-2">Time</label>
                  <input type="time" id="time" name="time" required className="form-input" />
                </div>
              </div>

              <div>
                <label htmlFor="special_request" className="block text-espresso font-medium mb-2">Special Request (Optional)</label>
                <textarea id="special_request" name="special_request" rows="4" className="form-input" placeholder="Any dietary preferences or special occasions?"></textarea>
              </div>

              <div className="text-center pt-4">
                <button type="submit" className="btn-primary w-full md:w-auto px-12 py-4 text-lg">Confirm Reservation</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
