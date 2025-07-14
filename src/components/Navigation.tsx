
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import ProfileDropdown from './ProfileDropdown';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);
  const { cartItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const categoryLinks = [
    { name: 'Men', path: '/category/men' },
    { name: 'Women', path: '/category/women' },
    { name: 'Kids', path: '/category/kids' },
    { name: 'Accessories', path: '/category/accessories' }
  ];
  
  const pageLinks = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact Us', path: '/contact-us' }
  ];

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white shadow-sm"
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-brand">ELEGANCE</Link>
            
            {/* Desktop Navigation */}
            <nav className={cn("hidden md:flex space-x-8 items-center")}>
              {categoryLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="nav-link hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {pageLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="nav-link hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button aria-label="Search" className="text-brand hover:text-brand-accent transition-colors">
                <Search size={20} />
              </button>
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <button 
                  onClick={() => setShowAuthModal('login')}
                  className="text-brand hover:text-brand-accent transition-colors flex items-center"
                >
                  <User size={20} />
                  <span className="ml-1 hidden sm:inline">Sign In</span>
                </button>
              )}
              <button 
                aria-label="Cart" 
                className="text-brand hover:text-brand-accent transition-colors relative"
                onClick={toggleCart}
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-brand" 
                onClick={toggleMenu}
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && isMobile && (
            <div className="md:hidden py-4 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                {categoryLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className="text-brand hover:text-brand-accent transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {pageLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className="text-brand hover:text-brand-accent transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-2 py-1 text-brand font-medium">
                      {user?.name}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-brand hover:text-brand-accent transition-colors px-2 py-1"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal('login');
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-brand hover:text-brand-accent transition-colors px-2 py-1"
                  >
                    Sign In / Register
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          type={showAuthModal} 
          onClose={() => setShowAuthModal(null)}
          onSwitch={(type) => setShowAuthModal(type)}
        />
      )}
    </>
  );
};

export default Navigation;
