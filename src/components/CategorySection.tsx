
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import CategoryItems from './CategoryItems';

interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
}

const categories: Category[] = [
  {
    id: 'men',
    name: 'Men',
    image: '/Men/men.webp',
    path: '/category/men'
  },
  {
    id: 'women',
    name: 'Women',
    image: '/Women/women.jpg',
    path: '/category/women'
  },
  {
    id: 'kids',
    name: 'Kids',
    image: '/Kids/kids.webp',
    path: '/category/kids'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/Accessories/accessories.avif',
    path: '/category/accessories'
  }
];

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  
  const activeItem = categories.find(c => c.id === activeCategory);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-brand">Shop By Category</h2>
        
        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={cn(
                "category-card cursor-pointer group",
                activeCategory === category.id && "ring-2 ring-brand-accent ring-offset-2"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              <Link to={category.path} className="block">
                <div 
                  className="h-64 bg-gray-200 rounded-lg overflow-hidden" 
                  style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
                >
                  <div className="category-overlay flex items-center justify-center h-full bg-black/40 hover:bg-black/50 transition-colors">
                    <span className="text-white text-xl font-bold px-6 py-3 border-2 border-white hover:bg-white hover:text-brand transition-colors">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-brand">{category.name}</h3>
                <p className="text-brand-muted mt-1">Collection</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Category Items
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-brand">
              {activeItem?.name || ''} Collection
            </h3>
            <Link 
              to={activeItem?.path || '#'}
              className="text-brand-accent hover:underline font-medium"
            >
              View All
            </Link>
          </div>
          <CategoryItems categoryId={activeCategory} />
        </div> */}
      </div>
    </section>
  );
};

export default CategorySection;
