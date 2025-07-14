
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useAuthModal } from '@/hooks/useAuthModal';
import AuthModal from './AuthModal';
import { ProductCardSkeleton } from './LoadingSkeleton';

export interface CategoryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  isNew?: boolean;
  category: string;
  description?: string;
}

interface CategoryItemsProps {
  categoryId: string;
  limit?: number;
  viewMode?: 'grid' | 'list';
}

// Dummy data for category items
const allCategoryItems: CategoryItem[] = [
  // Men's Category
  {
    id: 'm1',
    name: 'Classic Fit Denim Jeans',
    price: 59.99,
    image: '/placeholder.svg',
    category: 'men',
    description: 'Comfortable and durable denim jeans with a classic fit, perfect for everyday wear.'
  },
  {
    id: 'm2',
    name: 'Oxford Button-Down Shirt',
    price: 45.99,
    image: '/placeholder.svg',
    discount: 10,
    category: 'men',
    description: 'Premium cotton Oxford shirt with button-down collar, ideal for both formal and casual occasions.'
  },
  {
    id: 'm3',
    name: 'Slim Fit Blazer',
    price: 129.99,
    image: '/placeholder.svg',
    category: 'men',
    description: 'Tailored slim fit blazer made from high-quality fabric, perfect for a sophisticated look.'
  },
  {
    id: 'm4',
    name: 'Casual Chino Pants',
    price: 49.99,
    image: '/placeholder.svg',
    isNew: true,
    category: 'men',
    description: 'Versatile chino pants with a comfortable fit, suitable for both work and weekend wear.'
  },
  {
    id: 'm5',
    name: 'Merino Wool Sweater',
    price: 79.99,
    image: '/placeholder.svg',
    category: 'men',
    description: 'Soft and warm Merino wool sweater, perfect for cooler days.'
  },
  {
    id: 'm6',
    name: 'Leather Dress Belt',
    price: 34.99,
    image: '/placeholder.svg',
    discount: 15,
    category: 'men',
    description: 'Classic leather belt with a polished buckle, adding a finishing touch to any formal outfit.'
  },
  {
    id: 'm7',
    name: 'Lightweight Puffer Jacket',
    price: 89.99,
    image: '/placeholder.svg',
    isNew: true,
    category: 'men',
    description: 'Water-resistant puffer jacket that provides warmth without the bulk.'
  },
  {
    id: 'm8',
    name: 'Athletic Fit Polo Shirt',
    price: 39.99,
    image: '/placeholder.svg',
    category: 'men',
    description: 'Breathable polo shirt with an athletic fit, ideal for sports and casual wear.'
  },
  
  // Women's Category
  {
    id: 'w1',
    name: 'Floral Summer Dress',
    price: 69.99,
    image: '/placeholder.svg',
    isNew: true,
    category: 'women',
    description: 'Elegant floral summer dress with a flowy silhouette.'
  },
  {
    id: 'w2',
    name: 'High-Waist Skinny Jeans',
    price: 54.99,
    image: '/placeholder.svg',
    category: 'women',
    description: 'Slim-fitting high-waist skinny jeans with a chic design.'
  },
  {
    id: 'w3',
    name: 'Knit Cardigan Sweater',
    price: 49.99,
    image: '/placeholder.svg',
    discount: 15,
    category: 'women',
    description: 'Soft and cozy knit cardigan sweater with a classic look.'
  },
  {
    id: 'w4',
    name: 'Block Heel Sandals',
    price: 79.99,
    image: '/placeholder.svg',
    category: 'women',
    description: 'Stylish block heel sandals with a comfortable fit.'
  },
  
  // Kids' Category
  {
    id: 'k1',
    name: 'Graphic Print T-shirt',
    price: 19.99,
    image: '/placeholder.svg',
    category: 'kids',
    description: 'Fun graphic print t-shirt with a playful design.'
  },
  {
    id: 'k2',
    name: 'Elastic Waist Jeans',
    price: 34.99,
    image: '/placeholder.svg',
    isNew: true,
    category: 'kids',
    description: 'Elastic waist jeans with a comfortable fit and a trendy look.'
  },
  {
    id: 'k3',
    name: 'Hooded Sweatshirt',
    price: 29.99,
    image: '/placeholder.svg',
    discount: 20,
    category: 'kids',
    description: 'Warm and cozy hooded sweatshirt with a classic design.'
  },
  {
    id: 'k4',
    name: 'Canvas Slip-on Shoes',
    price: 39.99,
    image: '/placeholder.svg',
    category: 'kids',
    description: 'Comfortable canvas slip-on shoes with a classic look.'
  },
  
  // Accessories Category
  {
    id: 'a1',
    name: 'Leather Watch',
    price: 89.99,
    image: '/placeholder.svg',
    category: 'accessories',
    description: 'High-quality leather watch with a sleek design.'
  },
  {
    id: 'a2',
    name: 'Weekender Tote Bag',
    price: 49.99,
    image: '/placeholder.svg',
    discount: 5,
    category: 'accessories',
    description: 'Compact weekender tote bag with multiple compartments.'
  },
  {
    id: 'a3',
    name: 'Silver Hoop Earrings',
    price: 24.99,
    image: '/placeholder.svg',
    isNew: true,
    category: 'accessories',
    description: 'Sterling silver hoop earrings with a modern look.'
  },
  {
    id: 'a4',
    name: 'Silk Neck Scarf',
    price: 29.99,
    image: '/placeholder.svg',
    category: 'accessories',
    description: 'Soft and luxurious silk neck scarf with a classic design.'
  },
  
  // Additional Men's items for pagination
  {
    id: 'm9',
    name: 'Premium Denim Jacket',
    price: 99.99,
    image: '/placeholder.svg',
    category: 'men',
    description: 'Classic denim jacket with modern detailing, a staple for any wardrobe.'
  },
  {
    id: 'm10',
    name: 'Linen Summer Shirt',
    price: 54.99,
    image: '/placeholder.svg',
    discount: 20,
    category: 'men',
    description: 'Breathable linen shirt perfect for hot summer days.'
  },
  {
    id: 'm11',
    name: 'Tailored Dress Pants',
    price: 69.99,
    image: '/placeholder.svg',
    category: 'men',
    description: 'Elegant dress pants with a perfect drape and comfortable fit.'
  },
  {
    id: 'm12',
    name: 'Casual Hoodie',
    price: 49.99,
    image: '/placeholder.svg',
    isNew: true,
    category: 'men',
    description: 'Comfortable cotton hoodie with kangaroo pocket, perfect for layering.'
  }
];

const CategoryItems: React.FC<CategoryItemsProps> = ({ categoryId, limit = 4, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { showAuthModal, openLogin, closeModal, switchTo } = useAuthModal();
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter items by category
  const items = allCategoryItems.filter(item => item.category === categoryId).slice(0, limit);
  
  const handleAddToCart = (e: React.MouseEvent, item: CategoryItem) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation(); // Stop event propagation
    
    addToCart({
      id: item.id,
      name: item.name,
      price: item.discount ? item.price * (1 - item.discount / 100) : item.price,
      image: item.image,
      category: item.category
    }, openLogin);
  };
  
  return (
    <>
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          type={showAuthModal} 
          onClose={closeModal}
          onSwitch={switchTo}
        />
      )}
      
      {items.map((item) => (
        <Link to={`/product/${item.id}`} key={item.id} className="group animate-fade-in">
          <Card className={`h-full overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}>
            <div className={`relative ${viewMode === 'grid' ? 'h-52' : 'h-52 md:h-full md:w-1/3'}`}>
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                {item.discount && (
                  <Badge variant="destructive">
                    {item.discount}% OFF
                  </Badge>
                )}
                {item.isNew && (
                  <Badge variant="secondary">
                    NEW
                  </Badge>
                )}
              </div>
              <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="gap-1"
                  onClick={(e) => handleAddToCart(e, item)}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </Button>
              </div>
            </div>
            <CardContent className={`p-4 ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
              <h4 className={`font-medium ${viewMode === 'grid' ? 'truncate' : ''}`}>{item.name}</h4>
              
              {viewMode === 'list' && (
                <p className="text-brand-muted mt-2 line-clamp-2">{item.description}</p>
              )}
              
              <div className="flex items-center justify-between mt-2">
                <div>
                  {item.discount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-brand-accent font-bold">
                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm line-through">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-brand-accent font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {viewMode === 'list' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                    onClick={(e) => handleAddToCart(e, item)}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default CategoryItems;
export { allCategoryItems };
