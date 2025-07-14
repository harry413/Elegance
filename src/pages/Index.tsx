
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSlider from '@/components/HeroSlider';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <HeroSlider />
        <CategorySection />
        <FeaturedProducts />
        
        {/* Newsletter Section */}
        <section className="py-16 bg-brand-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-brand">Join Our Newsletter</h2>
            <p className="text-lg text-brand-muted max-w-xl mx-auto mb-8">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 mb-2 sm:mb-0 sm:mr-2 rounded-md"
              />
              <button className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
