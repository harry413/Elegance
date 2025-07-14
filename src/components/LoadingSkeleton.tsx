import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => (
  <div className="bg-card rounded-lg shadow-sm border overflow-hidden animate-pulse">
    <Skeleton className="h-80 w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-1/3" />
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="bg-card rounded-lg shadow-sm border overflow-hidden animate-pulse">
    <Skeleton className="h-48 w-full" />
    <div className="p-4">
      <Skeleton className="h-6 w-2/3 mx-auto" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative h-96 overflow-hidden animate-pulse">
    <Skeleton className="w-full h-full" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-80 mx-auto" />
        <Skeleton className="h-6 w-60 mx-auto" />
        <Skeleton className="h-12 w-40 mx-auto" />
      </div>
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
    <Skeleton className="w-full h-96 rounded-lg" />
    <div className="space-y-6">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-10 w-10 rounded" />
        </div>
      </div>
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);

export const ListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4 animate-pulse">
        <Skeleton className="h-12 w-12 rounded" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);