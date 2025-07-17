
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { User, Users, Award, Sparkles } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-brand text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Discover the journey behind Elegance - Where Style Meets Quality
            </p>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <img 
                  src="/placeholder.svg" 
                  alt="Our Brand Story" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-brand">Our Brand Story</h2>
                <p className="text-brand-muted mb-6">
                  Founded in 2010, Elegance started as a small boutique with a big dream - to create fashion that empowers 
                  people to express themselves confidently. What began as a passion project has evolved into a global brand 
                  known for quality craftsmanship and timeless designs.
                </p>
                <p className="text-brand-muted mb-6">
                  Our journey has been driven by a commitment to sustainable practices and ethical manufacturing. We believe 
                  that great style shouldn't come at the expense of our planet or the people who make our clothes.
                </p>
                <p className="text-brand-muted">
                  Today, we continue to innovate and inspire, creating collections that blend contemporary trends with 
                  classic elegance, ensuring that every piece in your wardrobe tells a story of quality and style.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-brand-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-brand">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-brand-accent" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand">Quality</h3>
                <p className="text-brand-muted">
                  We never compromise on the materials or craftsmanship that goes into creating our pieces.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="text-brand-accent" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand">Innovation</h3>
                <p className="text-brand-muted">
                  We continuously explore new designs, materials, and processes to stay ahead of fashion trends.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                  <User className="text-brand-accent" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand">Inclusivity</h3>
                <p className="text-brand-muted">
                  We design for everyone, embracing diversity in all forms and celebrating individual style.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-brand-accent" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand">Community</h3>
                <p className="text-brand-muted">
                  We're committed to making a positive impact on our communities and the environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-brand">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sachin Patidar",
                  role: "Founder & Creative Director",
                  image: "/placeholder.svg",
                  bio: "With over 15 years in fashion design, Sachin's vision drives our creative direction."
                },
                {
                  name: "Muskan Chouhan",
                  role: "Head of Design",
                  image: "/placeholder.svg",
                  bio: "Muskan brings innovation and fresh perspectives to every collection."
                },
                {
                  name: "Gopal PAtidar",
                  role: "Sustainability Officer",
                  image: "/placeholder.svg",
                  bio: "Gopal ensures our commitment to ethical and sustainable practices."
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 overflow-hidden rounded-full w-40 h-40 mx-auto">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-brand">{member.name}</h3>
                  <p className="text-brand-accent font-medium mb-3">{member.role}</p>
                  <p className="text-brand-muted">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Be part of our story as we continue to redefine fashion with purpose and passion.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact-us" 
                className="bg-white text-brand hover:bg-brand-light px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
