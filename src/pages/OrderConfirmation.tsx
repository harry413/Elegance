
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto text-green-500 h-16 w-16 mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-brand">Thank You For Your Order!</h1>
        <p className="text-xl mb-8 text-brand-muted">
          Your order has been successfully placed.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-brand">Order Details</h2>
          <div className="border-b pb-4 mb-4">
            <p className="text-brand-muted">Order Number</p>
            <p className="text-lg font-medium">{orderNumber}</p>
          </div>
          <div className="border-b pb-4 mb-4">
            <p className="text-brand-muted">Date</p>
            <p className="text-lg font-medium">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-brand-muted">Payment Method</p>
            <p className="text-lg font-medium">Credit Card</p>
          </div>
        </div>
        
        <p className="mb-8 text-brand-muted">
          A confirmation email has been sent to your inbox with all the details of your purchase.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/account/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
