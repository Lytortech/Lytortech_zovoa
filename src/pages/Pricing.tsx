
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Business Website',
      price: '--',
      description: 'Perfect for small businesses and professionals',
      timeline: '2-4 weeks',
      features: [
        'Professional website design',
        'Mobile responsive layout',
        'Contact forms & integrations',
        'SEO optimization',
        'Domain setup assistance',
        '3 months support',
        'SSL certificate included',
        'Basic analytics setup'
      ],
      cta: 'Start Website Project',
      popular: false,
      link: '/website-workflow'
    },
    {
      name: 'MVP Development',
      price: '--',
      description: 'Transform your idea into a working product',
      timeline: '4-8 weeks',
      features: [
        'Complete MVP development',
        'Cross-platform compatibility',
        'User authentication system',
        'Database design & setup',
        'API development',
        'Progress tracking dashboard',
        'Milestone-based delivery',
        '6 months support',
        'Deployment assistance',
        'Post-launch iterations'
      ],
      cta: 'Start MVP Project',
      popular: true,
      link: '/mvp-workflow'
    },
    {
      name: '3D Brand Experience',
      price: '--',
      description: 'Immersive 3D websites that wow your audience',
      timeline: '6-10 weeks',
      features: [
        'Custom 3D modeling',
        'WebGL optimization',
        'Interactive animations',
        'Brand storytelling',
        'Performance optimization',
        'Cross-device compatibility',
        'Advanced interactions',
        '6 months support',
        'Premium hosting setup',
        'Ongoing maintenance'
      ],
      cta: 'Start 3D Project',
      popular: false,
      link: '/3d-workflow'
    }
  ];

  const addOns = [
    { name: 'Premium Domain Management', price: '$299', description: 'Complete domain purchase and setup service' },
    { name: 'eCommerce Integration', price: '$499', description: 'Full online store with payment processing' },
    { name: 'Advanced Analytics', price: '$199', description: 'Comprehensive tracking and reporting' },
    { name: 'Social Media Integration', price: '$149', description: 'Connect all your social platforms' },
    { name: 'Email Marketing Setup', price: '$249', description: 'Newsletter and email automation' },
    { name: 'Extended Support (12 months)', price: '$599', description: 'Priority support for a full year' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transparent Pricing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your project. No hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={plan.name} className={`relative ${plan.popular ? 'border-blue-500 border-2' : ''} hover:shadow-xl transition-all duration-300`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    </div>
                    <CardDescription className="text-lg mt-2">{plan.description}</CardDescription>
                    <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                      <span>⏱️ {plan.timeline}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={plan.link} className="block">
                      <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}>
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Optional Add-ons
              </h2>
              <p className="text-xl text-gray-600">
                Enhance your project with these additional services
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{addon.name}</CardTitle>
                      <span className="text-xl font-bold text-blue-600">{addon.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{addon.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">What's included in the base price?</h3>
                <p className="text-gray-600">Each plan includes everything listed in the features section, plus our standard support and deployment assistance.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you offer payment plans?</h3>
                <p className="text-gray-600">Yes! We offer milestone-based payments to make it easier for you to manage your budget throughout the project.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What happens after the project is complete?</h3>
                <p className="text-gray-600">You'll receive full ownership of your project, along with documentation and support during the included support period.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I upgrade my plan later?</h3>
                <p className="text-gray-600">Absolutely! You can add features or upgrade your plan at any time during the development process.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of satisfied clients who have transformed their ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                  Contact Sales
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

export default Pricing;
