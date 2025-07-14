
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeroSkeleton } from './LoadingSkeleton';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Summer Collection 2025",
    description: "Discover our latest styles for the upcoming season",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1920&q=80",
    buttonText: "Shop Now",
    buttonLink: "/category/summer",
  },
  {
    id: 2,
    title: "Exclusive Designer Pieces",
    description: "Limited edition items from our top designers",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    buttonText: "Explore",
    buttonLink: "/category/exclusive",
  },
  {
    id: 3,
    title: "Sale Up To 50% Off",
    description: "Get amazing deals on our selected items",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1920&q=80",
    buttonText: "View Sale",
    buttonLink: "/category/sale",
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  // Simulate loading and auto slide
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const interval = setInterval(nextSlide, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(loadingTimer);
    };
  }, []);

  if (isLoading) {
    return <HeroSkeleton />;
  }
  
  return (
    <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={cn(
            "absolute top-0 left-0 w-full h-full transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          style={{
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.image}) no-repeat center center/cover`
          }}
        >
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in animate-scale-in">{slide.title}</h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg animate-fade-in animate-slide-in">{slide.description}</p>
            <Link to={slide.buttonLink}>
              <Button size="lg" className="bg-white text-brand hover:bg-brand-light hover:scale-105 transition-transform duration-200 animate-scale-in">
                {slide.buttonText}
              </Button>
            </Link>
          </div>
        </div>
      ))}
      
      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-brand transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-brand transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all", 
              index === currentSlide ? "bg-white w-8" : "bg-white bg-opacity-50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
