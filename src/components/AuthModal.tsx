
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  type: 'login' | 'signup';
  onClose: () => void;
  onSwitch: (type: 'login' | 'signup') => void;
}

const AuthModal = ({ type, onClose, onSwitch }: AuthModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-brand">
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {type === 'login' ? (
            <LoginForm onSuccess={onClose} />
          ) : (
            <SignupForm onSuccess={() => onSwitch('login')} />
          )}
          
          <div className="mt-6 text-center text-gray-500">
            {type === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => onSwitch('signup')}
                  className="text-brand-accent hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => onSwitch('login')}
                  className="text-brand-accent hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
