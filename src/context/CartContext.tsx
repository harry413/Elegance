
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '@/components/FeaturedProducts';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, onAuthRequired?: () => void) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (product: Product, onAuthRequired?: () => void) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your cart');
      if (onAuthRequired) {
        onAuthRequired();
      }
      return;
    }

    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );
      
      if (existingItemIndex > -1) {
        // Product exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        toast.success(`Added another ${product.name} to your cart`);
        return updatedItems;
      } else {
        // Product doesn't exist, add new item
        toast.success(`${product.name} added to your cart`);
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => item.product.id !== productId)
    );
    toast.success('Item removed from cart');
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
