import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Rocket, Globe, Box, Zap, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesOverview = () => {
  const services = [
    {
      icon: Rocket,
      title: 'MVP Development',
      description: 'Transform your startup idea into a working product quickly and efficiently.',
      features: ['Rapid prototyping', 'User feedback integration', 'Scalable architecture', 'Market validation'],
      price: 'Starting at ',
      link: '/mvp-workflow',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      title: 'Business Websites',
      description: 'Professional websites that drive conversions and grow your business.',
      features: ['Responsive design', 'SEO optimization', 'CMS integration', 'Analytics setup'],
      price: 'Starting at ',
      link: '/website-workflow',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Box,
      title: '3D Brand Experiences',
      description: 'Immersive 3D websites that captivate users and showcase your brand.',
      features: ['WebGL technology', 'Interactive 3D models', 'AR capabilities', 'Custom animations'],
      price: 'Starting at ',
      link: '/3d-workflow',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect solution for your needs. From rapid MVP development to immersive 3D experiences, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className={`bg-gradient-to-r ${service.gradient} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-6">
                    <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                  </div>
                  <Link to={service.link}>
                    <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white`}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-8">Trusted by 500+ businesses worldwide</p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">500+ Happy Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">48hr Average Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-700">4.9/5 Client Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
