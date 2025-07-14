
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">ELEGANCE</h2>
            <p className="text-gray-300">
              Redefining style with premium quality clothing for every occasion.
            </p>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/men" className="text-gray-300 hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/category/women" className="text-gray-300 hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/category/kids" className="text-gray-300 hover:text-white transition-colors">Kids</Link></li>
              <li><Link to="/category/accessories" className="text-gray-300 hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/contact-us" className="text-gray-300 hover:text-white transition-colors">Customer Service</Link></li>
              <li><Link to="/contact-us" className="text-gray-300 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact-us" className="text-gray-300 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact-us" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about-us" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="px-4 py-2 w-full text-brand"
              />
              <button className="bg-brand-accent text-white px-4 py-2 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Elegance. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
