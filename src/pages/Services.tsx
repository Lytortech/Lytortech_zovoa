import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, 
  Globe, 
  Box, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Clock,
  Users,
  Target,
  Palette,
  Zap,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'mvp',
      icon: Code,
      title: "MVP Development",
      subtitle: "Transform Ideas into Products",
      description: "Complete product development from concept to launch with our structured approach and milestone-based delivery system.",
      features: [
        "Detailed requirement analysis and feasibility study",
        "Auto-generated demo documents with wireframes",
        "Real-time progress tracking dashboard",
        "Milestone-based payment system",
        "Expert development team across all platforms",
        "Post-launch support and iteration planning"
      ],
      pricing: {
        starting: "",
        timeline: "4-8 weeks",
        complexity: "Based on features and platform"
      },
      gradient: "from-blue-500 to-cyan-500",
      link: "/mvp-workflow",
      testimonial: {
        text: "IdeaLaunch turned my concept into a working product faster than I ever imagined possible.",
        author: "Sarah Chen, Startup Founder"
      }
    },
    {
      id: 'websites',
      icon: Globe,
      title: "Business Websites",
      subtitle: "Professional Web Presence",
      description: "Template-driven websites with eCommerce, booking systems, and custom integrations tailored to your business needs.",
      features: [
        "Curated template gallery with live previews",
        "eCommerce platform integration (Shopify, WooCommerce)",
        "Payment gateway setup (Stripe, Razorpay, PayPal)",
        "Booking and appointment systems",
        "SEO optimization and analytics setup",
        "Complete domain and hosting management"
      ],
      pricing: {
        starting: " ",
        timeline: "2-4 weeks",
        complexity: "Based on integrations and customizations"
      },
      gradient: "from-purple-500 to-pink-500",
      link: "/website-workflow",
      testimonial: {
        text: "My restaurant's online presence completely transformed. Orders increased 300% in the first month.",
        author: "Marco Rodriguez, Restaurant Owner"
      }
    },
    {
      id: '3d-brands',
      icon: Box,
      title: "3D Brand Experiences",
      subtitle: "Immersive Digital Storytelling",
      description: "Cutting-edge 3D websites that create unforgettable brand experiences using WebGL technology and interactive elements.",
      features: [
        "Custom 3D modeling and animation",
        "WebGL optimization for all devices",
        "Interactive product showcases",
        "Immersive brand storytelling",
        "Performance optimization and loading strategies",
        "Cross-platform compatibility testing"
      ],
      pricing: {
        starting: " ",
        timeline: "6-10 weeks",
        complexity: "Based on 3D complexity and interactions"
      },
      gradient: "from-green-500 to-blue-500",
      link: "/3d-workflow",
      testimonial: {
        text: "Our 3D website became a conversation starter. Clients are amazed before they even see our products.",
        author: "Elena Vasquez, Fashion Designer"
      }
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: "Premium Domain Management",
      description: "End-to-end domain services including purchase, DNS, SSL, and ongoing management."
    },
    {
      icon: Zap,
      title: "API Integration Services",
      description: "Connect your platform with CRM, payment systems, and third-party tools."
    },
    {
      icon: Users,
      title: "White-Label Solutions",
      description: "Complete platform solutions for agencies and consultants to offer to their clients."
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
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect solution for your business. From MVP development to immersive 3D experiences, 
              we have the expertise to bring your vision to life.
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {services.map((service, index) => (
                <div key={service.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pricing Info */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{service.pricing.starting}</div>
                          <div className="text-sm text-gray-600">Starting price</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold text-gray-900 flex items-center justify-center md:justify-start">
                            <Clock className="h-5 w-5 mr-2" />
                            {service.pricing.timeline}
                          </div>
                          <div className="text-sm text-gray-600">Typical timeline</div>
                        </div>
                        <div>
                          <div className="text-lg font-medium text-gray-900">Custom Quote</div>
                          <div className="text-sm text-gray-600">{service.pricing.complexity}</div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white border-l-4 border-blue-500 p-4 mb-6">
                      <p className="text-gray-700 italic">"{service.testimonial.text}"</p>
                      <p className="text-sm text-gray-600 mt-2">— {service.testimonial.author}</p>
                    </div>

                    {/* CTA */}
                    <Link to={service.link}>
                      <Button className={`bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all duration-300 text-lg px-8 py-3`}>
                        Get Started with {service.title}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-xl">
                      <CardContent className="p-8">
                        <div className={`bg-gradient-to-r ${service.gradient} rounded-2xl p-8 text-white text-center`}>
                          <service.icon className="h-20 w-20 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold mb-4">{service.subtitle}</h3>
                          <div className="space-y-2 text-white/90">
                            <div>✓ Professional Quality</div>
                            <div>✓ On-Time Delivery</div>
                            <div>✓ 100% Satisfaction</div>
                            <div>✓ Post-Launch Support</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Additional Services
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive solutions to support your complete digital transformation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-blue-600 mx-auto" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
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
              Ready to Transform Your Ideas?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of satisfied clients who have successfully launched their projects with IdeaLaunch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Start Your Project
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                  View Our Work
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

export default Services;
