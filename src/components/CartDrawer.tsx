
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Product } from './FeaturedProducts';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  return (
    <div 
      className={cn(
        "fixed inset-y-0 right-0 w-full sm:w-96 z-50 bg-white shadow-xl transition-transform duration-300 transform",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-brand flex items-center gap-2">
            <ShoppingCart size={18} />
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-brand transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex border-b pb-4">
                    <div className="w-20 h-20 rounded overflow-hidden mr-4 bg-gray-100">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-brand font-medium">{item.product.name}</h3>
                      <p className="text-brand-accent font-semibold">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button 
                          className="w-8 h-8 flex items-center justify-center border rounded-l"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center border-t border-b">
                          {item.quantity}
                        </span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center border rounded-r"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-brand-muted hover:text-red-500 transition-colors self-start"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold text-brand-accent">${total.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full mb-2">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
            <ShoppingCart size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-brand mb-2">Your cart is empty</h3>
            <p className="text-brand-muted mb-6">Add some items to get started</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
