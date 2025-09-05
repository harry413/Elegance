
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CategoryItems from '@/components/CategoryItems';
import { Button } from '@/components/ui/button';
import { Grid3X3, Grid2X2, ArrowDown } from 'lucide-react';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsToShow, setItemsToShow] = useState<number>(12);
  
  // Map category IDs to their display names
  const categoryNames: Record<string, { name: string; bg: string }> = {
    men: { name: 'Men', bg: '/Men/menbg.jpeg' },
    women: { name: 'Women', bg: '/Women/womenbg.jpeg' },
    kids: { name: 'Kids', bg: '/Kids/kidsbg.webp' },
    accessories: { name: 'Accessories', bg: '/Accessories/accessoriesbg.webp' }
  };

  const categoryName = categoryNames[id || '']?.name || 'Category';
  const categoryBg = categoryNames[id || '']?.bg || '';

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 8);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Category Header */}
        <section className=" text-white py-12 md:py-16 lg:py-20 bg-blend-dark" style={{ backgroundImage: `url(${categoryBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container mx-auto px-4 ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">{categoryName} Collection</h1>
            <p className="text-center mt-4 max-w-2xl mx-auto text-white/80">
              Discover our latest {categoryName.toLowerCase()} collection featuring premium quality and stylish designs for every occasion.
            </p>
          </div>
        </section>
        
        {/* Category Controls */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <h2 className="font-medium mr-2">View:</h2>
                <div className="flex border rounded-md overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-brand-accent text-white' : 'bg-white'}`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-brand-accent text-white' : 'bg-white'}`}
                    aria-label="List view"
                  >
                    <Grid2X2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-brand-muted">
                  Showing {Math.min(itemsToShow, 24)} products
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Category Products */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className={`grid gap-4 md:gap-6 lg:gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1 md:grid-cols-2'
            }`}>
              <CategoryItems 
                categoryId={id || ''} 
                limit={itemsToShow}
                viewMode={viewMode}
              />
            </div>
            
            {itemsToShow < 24 && (
              <div className="mt-12 text-center">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  className="px-8 py-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white"
                >
                  Load More <ArrowDown size={16} className="ml-2" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
