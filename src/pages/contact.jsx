import React from 'react';

export default function Contact({ addToast }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            addToast('Thank you for contacting us! We will get back to you shortly.', 'success');
            e.target.reset();
        } else {
            addToast('Failed to send message. Please try again later.', 'error');
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
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-cream/80">We would love to hear from you.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Details & Map */}
            <div className="lg:w-1/2 reveal-left space-y-10">
              <div>
                <h2 className="font-serif text-3xl font-bold text-espresso mb-6">Contact Information</h2>
                <ul className="space-y-6 text-espresso/80">
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-location-dot text-xl"></i>
                    </div>
                    <div>
                      <strong className="block text-espresso font-medium mb-1">Our Location</strong>
                      123 Luxury Avenue, Metro Hub,<br />City 400001
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <strong className="block text-espresso font-medium mb-1">Email Us</strong>
                      hello@miramecafe.com
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-phone text-xl"></i>
                    </div>
                    <div>
                      <strong className="block text-espresso font-medium mb-1">Call Us</strong>
                      +91 98765 43210
                    </div>
                  </li>
                </ul>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-xl overflow-hidden shadow-premium h-64 border border-cream/50">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.646011494668!2d72.8258323!3d19.1232014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU0JzMwLjUiTiA3MsKwNDknMTAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-premium p-8 md:p-12 reveal-right border-t-4 border-gold">
                <div className="mb-8">
                  <h2 className="font-serif text-3xl text-espresso font-bold mb-2">Send a Message</h2>
                  <p className="text-espresso/70 text-sm">Have a question or feedback? We're here to help.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-espresso font-medium mb-2">Your Name</label>
                      <input type="text" id="name" name="name" required className="form-input" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-espresso font-medium mb-2">Your Email</label>
                      <input type="email" id="email" name="email" required className="form-input" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-espresso font-medium mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" required className="form-input" placeholder="How can we help?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-espresso font-medium mb-2">Message</label>
                    <textarea id="message" name="message" rows="5" required className="form-input" placeholder="Write your message here..."></textarea>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn-primary w-full py-4 text-lg">Send Message</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
