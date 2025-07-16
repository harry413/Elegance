
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';


const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative py-20 bg-brand text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Get in touch with our team. We're here to help with any questions about our products or services.
            </p>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Information */}
              <div className="lg:w-1/3">
                <h2 className="text-3xl font-bold mb-8 text-brand">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 text-brand-accent">
                      <MapPin />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-brand">Visit Us</h3>
                      <address className="not-italic text-brand-muted">
                        123 Fashion Street<br />
                       Indore, Madhya Pradesh <br />
                       India
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 text-brand-accent">
                      <Mail />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-brand">Email Us</h3>
                      <p className="text-brand-muted">
                        <a href="mailto:info@elegance.com" className="hover:text-brand-accent transition-colors">
                        patidarharry413@elegance.com
                        </a>
                      </p>
                      <p className="text-brand-muted">
                        <a href="mailto:support@elegance.com" className="hover:text-brand-accent transition-colors">
                          support@elegance.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 text-brand-accent">
                      <Phone />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-brand">Call Us</h3>
                      <p className="text-brand-muted">
                        <a href="tel:+12125551234" className="hover:text-brand-accent transition-colors">
                          +91 (958) 900-5828
                        </a>
                      </p>
                      <p className="text-brand-muted">
                        <a href="tel:+18005551234" className="hover:text-brand-accent transition-colors">
                          +91 (980) 555-1234 (Toll-free)
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 text-brand-accent">
                      <Clock />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-brand">Opening Hours</h3>
                      <p className="text-brand-muted">Monday - Friday: 9am - 6pm</p>
                      <p className="text-brand-muted">Saturday: 10am - 4pm</p>
                      <p className="text-brand-muted">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:w-2/3">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-brand">Send Us A Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject of your message"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={5}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-brand-accent hover:bg-brand-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* This would typically be a Google Maps or other map embed */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <p className="text-gray-600 font-medium">Map Location Placeholder</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-brand-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-brand">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-brand">What are your shipping times?</h3>
                <p className="text-brand-muted">
                  We process orders within 1-2 business days. Standard shipping takes 3-5 business days, while express shipping is delivered within 1-2 business days.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-brand">What is your return policy?</h3>
                <p className="text-brand-muted">
                  We offer a 30-day return policy for items in original condition with tags attached. Please visit our returns page for more details.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-brand">Do you ship internationally?</h3>
                <p className="text-brand-muted">
                  Yes, we ship to over 50 countries worldwide. International shipping times vary by location.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-brand">How can I track my order?</h3>
                <p className="text-brand-muted">
                  Once your order ships, you'll receive a confirmation email with tracking information for your shipment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
