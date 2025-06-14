
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Star } from 'lucide-react';

const Templates = () => {
  const templateCategories = [
    {
      id: 'business',
      title: 'Business Websites',
      templates: [
        {
          id: 1,
          name: 'Professional Services',
          category: 'Business',
          rating: 4.9,
          reviews: 127,
          features: ['Contact Forms', 'Service Pages', 'Testimonials'],
          preview: 'https://example.com/demo1',
          price: ' '
        },
        {
          id: 2,
          name: 'Restaurant & Food',
          category: 'Food',
          rating: 4.8,
          reviews: 98,
          features: ['Online Menu', 'Reservations', 'Gallery'],
          preview: 'https://example.com/demo2',
          price: ' '
        },
        {
          id: 3,
          name: 'E-commerce Store',
          category: 'Retail',
          rating: 4.9,
          reviews: 156,
          features: ['Product Catalog', 'Payment Gateway', 'Inventory'],
          preview: 'https://example.com/demo3',
          price: ' '
        }
      ]
    },
    {
      id: '3d',
      title: '3D Brand Experiences',
      templates: [
        {
          id: 4,
          name: 'Fashion Portfolio',
          category: '3D Fashion',
          rating: 5.0,
          reviews: 43,
          features: ['3D Models', 'Interactive Gallery', 'Brand Story'],
          preview: 'https://example.com/demo4',
          price: ' '
        },
        {
          id: 5,
          name: 'Coffee Experience',
          category: '3D Food',
          rating: 4.9,
          reviews: 67,
          features: ['3D Visualization', 'Product Showcase', 'WebGL'],
          preview: 'https://example.com/demo5',
          price: ' '
        },
        {
          id: 6,
          name: 'Art Gallery',
          category: '3D Art',
          rating: 4.8,
          reviews: 34,
          features: ['Virtual Gallery', '3D Interactions', 'Artist Profile'],
          preview: 'https://example.com/demo6',
          price: ' '
        }
      ]
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
              Premium <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Templates</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from our collection of professionally designed templates for business websites and immersive 3D experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Browse All Templates
              </Button>
              <Button size="lg" variant="outline">
                View Live Demos
              </Button>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {templateCategories.map((category) => (
              <div key={category.id} className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{category.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.templates.map((template) => (
                    <Card key={template.id} className="group hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                          <span className="text-gray-500">Template Preview</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{template.name}</CardTitle>
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">{template.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">({template.reviews} reviews)</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Features:</h4>
                            <ul className="space-y-1">
                              {template.features.map((feature, idx) => (
                                <li key={idx} className="text-sm text-gray-600">• {feature}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <span className="text-2xl font-bold text-gray-900">{template.price}</span>

                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => window.open(template.preview, '_blank')}>
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>

                              <Link
                                to={
                                  category.id === 'business'
                                    ? '/website-workflow'
                                    : category.id === '3d'
                                      ? '/3d-workflow'
                                      : '/'
                                }
                              >
                                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                                  Use Template
                                </Button>
                              </Link>
                            </div>

                          </div>
                        </div>
                      </CardContent>

                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Choose your template and let us bring your vision to life.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Start Your Project Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Templates;
