
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: 'p1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: '/placeholder.svg',
    category: 'men'
  },
  {
    id: 'p2',
    name: 'Summer Floral Dress',
    price: 59.99,
    image: '/placeholder.svg',
    category: 'women'
  },
  {
    id: 'p3',
    name: 'Kids Denim Jacket',
    price: 39.99,
    image: '/placeholder.svg',
    category: 'kids'
  },
  {
    id: 'p4',
    name: 'Leather Belt',
    price: 24.99,
    image: '/placeholder.svg',
    category: 'accessories'
  }
];

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-brand">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    variant="secondary" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                </div>
              </div>
              <Link to={`/product/${product.id}`} className="block">
                <h3 className="text-lg font-medium text-brand">{product.name}</h3>
                <p className="text-brand-accent font-semibold mt-1">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
