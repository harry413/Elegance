
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 py-16">
          <h1 className="text-6xl font-bold text-brand mb-4">404</h1>
          <p className="text-xl text-brand-muted mb-8">Oops! Page not found</p>
          <p className="max-w-md mx-auto text-brand-muted mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
