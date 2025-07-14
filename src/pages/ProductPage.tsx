
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { allCategoryItems } from '@/components/CategoryItems';
import { useAuthModal } from '@/hooks/useAuthModal';
import AuthModal from '@/components/AuthModal';

// Available sizes for products
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Available colors for products
const COLORS = [
  { name: 'Black', value: '#000' },
  { name: 'White', value: '#fff' },
  { name: 'Navy', value: '#001f3f' },
  { name: 'Red', value: '#e53e3e' },
  { name: 'Blue', value: '#3182ce' },
  { name: 'Green', value: '#38a169' },
];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showAuthModal, openLogin, closeModal, switchTo } = useAuthModal();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = allCategoryItems.find(item => item.id === id);
  
  // If product not found, navigate to not found page
  React.useEffect(() => {
    if (!product && id) {
      navigate('/not-found');
    }
  }, [product, id, navigate]);
  
  if (!product) {
    return null; // Don't render anything while redirecting
  }
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      category: product.category,
    }, openLogin);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          type={showAuthModal} 
          onClose={closeModal}
          onSwitch={switchTo}
        />
      )}
      
      <Navigation />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-brand-muted">
            <span onClick={() => navigate('/')} className="hover:text-brand-accent cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span onClick={() => navigate(`/category/${product.category}`)} className="hover:text-brand-accent cursor-pointer">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="bg-gray-100 rounded-lg aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.discount}% OFF
                    </div>
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      NEW
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-brand mb-2">{product.name}</h1>
              
              {/* Price */}
              <div className="mb-4">
                {product.discount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-brand-accent">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-brand-accent">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <p className="text-brand-muted">{product.description || 'No description available.'}</p>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-brand mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        w-12 h-12 rounded-md flex items-center justify-center text-sm font-medium
                        ${selectedSize === size 
                          ? 'bg-brand text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                        transition-colors
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-brand mb-3">Color: {selectedColor.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`
                        w-10 h-10 rounded-full relative
                        ${selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-brand-accent' : ''}
                      `}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Color: ${color.name}`}
                    ></button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-accent hover:bg-brand-accent/90 flex items-center justify-center gap-2 text-white rounded-md py-3"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </Button>
              </div>
              
              {/* Additional Info */}
              <div className="text-sm text-gray-500">
                <p className="mb-1">SKU: {product.id.toUpperCase()}</p>
                <p className="mb-1">Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p>Tags: {product.category}, fashion, {product.isNew ? 'new arrival' : 'bestseller'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
