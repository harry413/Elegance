import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import LoadingScreen from './components/LoadingScreen.tsx'
import './index.css'

const AppWithLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <App />;
};

createRoot(document.getElementById("root")!).render(<AppWithLoading />);
