import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Star, Calendar, Users, Rocket } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'FoodieConnect - Restaurant Discovery App',
      category: 'MVP Development',
      client: 'TechStartup Inc.',
      timeline: '6 weeks',
      team: '4 developers',
      rating: 5.0,
      description: 'A comprehensive restaurant discovery platform with real-time reservations, reviews, and social features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      features: ['User Authentication', 'Real-time Booking', 'Payment Integration', 'Social Reviews'],
      results: '10,000+ downloads in first month, Featured on App Store',
      image: '/placeholder.svg',
      link: 'https://foodieconnect-demo.com'
    },
    {
      id: 2,
      title: 'EcoLux - Sustainable Fashion Brand',
      category: '3D Brand Experience',
      client: 'EcoLux Fashion',
      timeline: '8 weeks',
      team: '3D specialists',
      rating: 4.9,
      description: 'An immersive 3D website showcasing sustainable fashion with virtual try-on and interactive product visualization.',
      technologies: ['Three.js', 'WebGL', 'React', 'GSAP'],
      features: ['3D Product Viewer', 'Virtual Try-On', 'Sustainability Timeline', 'Interactive Catalog'],
      results: '300% increase in engagement, 85% boost in conversions',
      image: '/placeholder.svg',
      link: 'https://ecolux-3d-demo.com'
    },
    {
      id: 3,
      title: 'HealthCare Plus - Medical Practice Website',
      category: 'Business Website',
      client: 'HealthCare Plus Clinic',
      timeline: '3 weeks',
      team: '2 developers',
      rating: 4.8,
      description: 'Professional medical practice website with appointment booking, patient portal, and telemedicine integration.',
      technologies: ['WordPress', 'PHP', 'MySQL', 'Stripe'],
      features: ['Appointment Booking', 'Patient Portal', 'Insurance Info', 'Telemedicine'],
      results: '50% reduction in phone bookings, Improved patient satisfaction',
      image: '/placeholder.svg',
      link: 'https://healthcareplus-demo.com'
    },
    {
      id: 4,
      title: 'CryptoTracker - Portfolio Management App',
      category: 'MVP Development',
      client: 'CryptoTracker LLC',
      timeline: '10 weeks',
      team: '5 developers',
      rating: 4.9,
      description: 'Advanced cryptocurrency portfolio tracking with real-time analytics, price alerts, and trading insights.',
      technologies: ['React Native', 'Node.js', 'Redis', 'WebSocket'],
      features: ['Real-time Tracking', 'Price Alerts', 'Portfolio Analytics', 'Trading Signals'],
      results: '25,000+ active users, $500K+ in tracked portfolios',
      image: '/placeholder.svg',
      link: 'https://cryptotracker-demo.com'
    },
    {
      id: 5,
      title: 'ArtisanCraft - Handmade Marketplace',
      category: 'Business Website',
      client: 'ArtisanCraft Collective',
      timeline: '4 weeks',
      team: '3 developers',
      rating: 4.7,
      description: 'E-commerce marketplace for handmade crafts with vendor management, custom product builder, and community features.',
      technologies: ['Shopify', 'React', 'Node.js', 'PayPal API'],
      features: ['Multi-vendor Support', 'Custom Product Builder', 'Community Forum', 'Seller Analytics'],
      results: '200+ vendors onboarded, $100K+ in first quarter sales',
      image: '/placeholder.svg',
      link: 'https://artisancraft-demo.com'
    },
    {
      id: 6,
      title: 'LuxuryAutos - 3D Car Showroom',
      category: '3D Brand Experience',
      client: 'LuxuryAutos Dealership',
      timeline: '12 weeks',
      team: '3D specialists',
      rating: 5.0,
      description: 'Immersive 3D car showroom with virtual test drives, 360° interior views, and real-time customization.',
      technologies: ['Three.js', 'WebXR', 'React', 'Node.js'],
      features: ['3D Car Configurator', 'Virtual Test Drive', '360° Views', 'AR Integration'],
      results: '400% increase in showroom visits, 60% boost in test drive bookings',
      image: '/placeholder.svg',
      link: 'https://luxuryautos-3d-demo.com'
    }
  ];

  const stats = [
    { number: '--', label: 'Projects Completed' },
    { number: '--%', label: 'Client Satisfaction' },
    { number: '--', label: 'Client Revenue Generated' },
    { number: '24/7', label: 'Support & Maintenance' }
  ];

  const testimonials = [
    {
      text: "IdeaLaunch transformed our vision into a stunning 3D experience that our customers absolutely love. The attention to detail and technical expertise is unmatched.",
      author: "Sarah Chen",
      role: "CEO, EcoLux Fashion",
      rating: 5
    },
    {
      text: "The MVP they built for us exceeded all expectations. We went from idea to market in just 6 weeks, and the quality was outstanding.",
      author: "Michael Rodriguez",
      role: "Founder, FoodieConnect",
      rating: 5
    },
    {
      text: "Our new website has completely transformed our business. Patient bookings increased by 50% and our online presence is now professional and modern.",
      author: "Dr. Emily Johnson",
      role: "Director, HealthCare Plus",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the amazing projects we've built for our clients. From MVPs to immersive 3D experiences, 
              see how we turn ideas into successful digital products.
            </p>
            
            {/* Quick Action Button */}
            <div className="mb-8">
              <Link to="/mvp-workflow">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Building Your MVP
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <span className="text-gray-500">Project Preview</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{project.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{project.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Project Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{project.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{project.team}</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {project.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Results */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h4 className="font-semibold text-sm text-green-800 mb-1">Results:</h4>
                        <p className="text-sm text-green-700">{project.results}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live
                        </Button>
                        <Link to="/contact" className="flex-1">
                          <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                            Start Similar Project
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Don't just take our word for it - hear from the clients whose projects we've brought to life.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our portfolio of successful projects and let us help you transform your idea into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mvp-workflow">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Start Your MVP
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
