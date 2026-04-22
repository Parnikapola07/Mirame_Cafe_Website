import React from 'react';

export default function Gallery() {
  return (
    <>
      <section className="pt-32 pb-16 bg-espresso text-cream relative">
        <div className="container mx-auto px-6 relative z-10 text-center reveal-up">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-cream/80">A visual taste of the Mirame experience.</p>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <div className="break-inside-avoid shadow-premium rounded-lg overflow-hidden group cursor-pointer relative">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
                alt="Cafe Interior"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-magnifying-glass-plus text-3xl text-gold"></i>
              </div>
            </div>

            <div className="break-inside-avoid shadow-premium rounded-lg overflow-hidden group cursor-pointer relative">
              <img
                src="https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=800&auto=format&fit=crop"
                alt="Food Prep"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-magnifying-glass-plus text-3xl text-gold"></i>
              </div>
            </div>

            <div className="break-inside-avoid shadow-premium rounded-lg overflow-hidden group cursor-pointer relative">
              <img
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop"
                alt="Coffee Pour"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-magnifying-glass-plus text-3xl text-gold"></i>
              </div>
            </div>

            <div className="break-inside-avoid shadow-premium rounded-lg overflow-hidden group cursor-pointer relative">
              <img
                src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800&auto=format&fit=crop"
                alt="Pizza"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-magnifying-glass-plus text-3xl text-gold"></i>
              </div>
            </div>

            <div className="break-inside-avoid shadow-premium rounded-lg overflow-hidden group cursor-pointer relative">
              <img
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop"
                alt="Ambiance"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-magnifying-glass-plus text-3xl text-gold"></i>
              </div>
            </div>

            <div className="break-inside-avoid shadow-premium rounded-lg overflow-hidden group cursor-pointer relative">
              <img
                src="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=800&auto=format&fit=crop"
                alt="Dessert"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-magnifying-glass-plus text-3xl text-gold"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
