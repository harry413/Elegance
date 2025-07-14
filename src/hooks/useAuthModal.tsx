import { useState } from 'react';

export const useAuthModal = () => {
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);

  const openLogin = () => setShowAuthModal('login');
  const openSignup = () => setShowAuthModal('signup');
  const closeModal = () => setShowAuthModal(null);
  const switchTo = (type: 'login' | 'signup') => setShowAuthModal(type);

  return {
    showAuthModal,
    openLogin,
    openSignup,
    closeModal,
    switchTo,
  };
};