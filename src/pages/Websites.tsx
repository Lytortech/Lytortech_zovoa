
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Eye, 
  Star, 
  Key, 
  CreditCard, 
  ShoppingCart, 
  Calendar,
  Camera,
  Users,
  MapPin,
  Mail,
  Smartphone,
  Search,
  DollarSign,
  Shield,
  Zap,
  Settings
} from 'lucide-react';

const Websites = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedNiche, setSelectedNiche] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    description: '',
    features: [],
    domain: '',
    hasContent: false,
    additionalInfo: '',
    needsDomain: false,
    preferredDomains: '',
    apiKeys: {
      razorpay: '',
      stripe: '',
      ecommerce: '',
      crm: '',
      analytics: '',
      email: ''
    },
    hostingDetails: {
      provider: '',
      credentials: ''
    }
  });

  const steps = [
    { number: 1, title: 'Select Niche', description: 'Choose your industry and required features' },
    { number: 2, title: 'Choose Template', description: 'Browse and preview templates' },
    { number: 3, title: 'Configure Keys', description: 'API keys and integrations setup' },
    { number: 4, title: 'Make It Live', description: 'Domain setup and final deployment' }
  ];

  const niches = [
    { 
      id: 'restaurant', 
      name: 'Restaurant & Food', 
      icon: '🍽️',
      features: ['Online Menu', 'Table Reservations', 'Online Ordering', 'Payment Gateway', 'Location Map'],
      requiredKeys: ['razorpay', 'analytics']
    },
    { 
      id: 'ecommerce', 
      name: 'E-commerce & Retail', 
      icon: '🛒',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Order Tracking'],
      requiredKeys: ['razorpay', 'stripe', 'ecommerce', 'analytics']
    },
    { 
      id: 'services', 
      name: 'Professional Services', 
      icon: '💼',
      features: ['Service Pages', 'Appointment Booking', 'Contact Forms', 'Team Profiles', 'Testimonials'],
      requiredKeys: ['analytics', 'email']
    },
    { 
      id: 'portfolio', 
      name: 'Creative Portfolio', 
      icon: '🎨',
      features: ['Portfolio Gallery', 'Project Showcase', 'Client Testimonials', 'Contact Forms', 'Blog'],
      requiredKeys: ['analytics']
    },
    { 
      id: 'healthcare', 
      name: 'Healthcare', 
      icon: '🏥',
      features: ['Appointment Booking', 'Service Pages', 'Insurance Info', 'Patient Portal', 'Contact Forms'],
      requiredKeys: ['analytics', 'crm', 'email']
    },
    { 
      id: 'realestate', 
      name: 'Real Estate', 
      icon: '🏠',
      features: ['Property Listings', 'Search Filters', 'Agent Profiles', 'Virtual Tours', 'Contact Forms'],
      requiredKeys: ['analytics', 'crm']
    }
  ];

  const templates = {
    restaurant: [
      {
        id: 1,
        name: 'Bistro Deluxe',
        category: 'Restaurant',
        rating: 4.9,
        reviews: 127,
        features: ['Online Menu', 'Reservations', 'Gallery', 'Location Map'],
        preview: 'https://bistro-demo.example.com',
        price: '$1,799',
        image: '/placeholder.svg'
      },
      {
        id: 2,
        name: 'Fast Food Pro',
        category: 'Quick Service',
        rating: 4.8,
        reviews: 98,
        features: ['Online Ordering', 'Delivery Tracking', 'Loyalty Program'],
        preview: 'https://fastfood-demo.example.com',
        price: '$1,599',
        image: '/placeholder.svg'
      }
    ],
    ecommerce: [
      {
        id: 3,
        name: 'E-commerce Pro',
        category: 'Retail',
        rating: 4.9,
        reviews: 156,
        features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Inventory'],
        preview: 'https://ecommerce-demo.example.com',
        price: '$2,299',
        image: '/placeholder.svg'
      },
      {
        id: 4,
        name: 'Fashion Store',
        category: 'Fashion',
        rating: 4.8,
        reviews: 89,
        features: ['Lookbook', 'Size Guide', 'Wishlist', 'Reviews'],
        preview: 'https://fashion-demo.example.com',
        price: '$2,499',
        image: '/placeholder.svg'
      }
    ],
    services: [
      {
        id: 5,
        name: 'Professional Services',
        category: 'Business',
        rating: 4.9,
        reviews: 134,
        features: ['Service Pages', 'Booking', 'Team Profiles', 'Testimonials'],
        preview: 'https://services-demo.example.com',
        price: '$1,499',
        image: '/placeholder.svg'
      }
    ],
    portfolio: [
      {
        id: 6,
        name: 'Creative Portfolio',
        category: 'Creative',
        rating: 4.7,
        reviews: 76,
        features: ['Portfolio Gallery', 'Project Showcase', 'Blog', 'Contact'],
        preview: 'https://portfolio-demo.example.com',
        price: '$1,399',
        image: '/placeholder.svg'
      }
    ],
    healthcare: [
      {
        id: 7,
        name: 'Medical Practice',
        category: 'Healthcare',
        rating: 4.9,
        reviews: 67,
        features: ['Appointment Booking', 'Services', 'Insurance', 'Patient Portal'],
        preview: 'https://medical-demo.example.com',
        price: '$1,899',
        image: '/placeholder.svg'
      }
    ],
    realestate: [
      {
        id: 8,
        name: 'Real Estate Pro',
        category: 'Real Estate',
        rating: 4.8,
        reviews: 112,
        features: ['Property Listings', 'Search', 'Agent Profiles', 'Virtual Tours'],
        preview: 'https://realestate-demo.example.com',
        price: '$2,099',
        image: '/placeholder.svg'
      }
    ]
  };

  const apiKeyFields = {
    razorpay: { label: 'Razorpay API Key', placeholder: 'rzp_test_...', description: 'For payment processing' },
    stripe: { label: 'Stripe Secret Key', placeholder: 'sk_test_...', description: 'Alternative payment gateway' },
    ecommerce: { label: 'E-commerce Platform API', placeholder: 'Shopify/WooCommerce API key', description: 'Product management' },
    crm: { label: 'CRM Integration Key', placeholder: 'HubSpot/Salesforce API key', description: 'Lead management' },
    analytics: { label: 'Google Analytics ID', placeholder: 'GA-XXXXXXX', description: 'Website analytics' },
    email: { label: 'Email Service API', placeholder: 'Mailchimp/SendGrid API key', description: 'Email marketing' }
  };

  const domainExtensions = ['.com', '.in', '.store', '.business', '.tech', '.online'];

  const getCurrentNiche = () => niches.find(n => n.id === selectedNiche);
  const getCurrentTemplates = () => templates[selectedNiche] || [];
  const getRequiredKeys = () => getCurrentNiche()?.requiredKeys || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFeatureToggle = (feature: string) => {
    const features = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature];
    setFormData({ ...formData, features });
  };

  const handleApiKeyChange = (keyType: string, value: string) => {
    setFormData({
      ...formData,
      apiKeys: {
        ...formData.apiKeys,
        [keyType]: value
      }
    });
  };

  const generateDemoPreview = () => {
    if (!selectedTemplate) return;
    
    console.log('Generating demo preview with:', {
      template: selectedTemplate,
      niche: selectedNiche,
      features: formData.features,
      apiKeys: formData.apiKeys
    });
    
    alert('Demo preview is being generated! You can view it in the next step.');
  };

  const handleMakeItLive = () => {
    console.log('Making website live:', { 
      ...formData, 
      selectedTemplate, 
      selectedNiche 
    });
    alert('Your website deployment has been initiated! You will receive confirmation within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl inline-flex mb-6">
              <Globe className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Business <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Websites</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Professional websites with eCommerce, booking systems, and custom integrations. From template selection to live deployment with premium domain management.
            </p>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= step.number 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4 h-0.5 bg-gray-200">
                      <div 
                        className={`h-full bg-purple-600 transition-all duration-300 ${
                          currentStep > step.number ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Select Niche */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Select Your Industry/Niche *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {niches.map((niche) => (
                          <Card 
                            key={niche.id}
                            className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                              selectedNiche === niche.id 
                                ? 'border-purple-500 bg-purple-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedNiche(niche.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <div className="text-4xl mb-3">{niche.icon}</div>
                              <h4 className="font-semibold text-lg mb-2">{niche.name}</h4>
                              <div className="space-y-1 text-xs text-gray-600">
                                {niche.features.slice(0, 3).map((feature, idx) => (
                                  <div key={idx}>• {feature}</div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {selectedNiche && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h4 className="font-semibold text-purple-800 mb-3">
                          Included Features for {getCurrentNiche()?.name}:
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {getCurrentNiche()?.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-purple-700">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Enter your business name"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Business Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your business, products/services, and target customers..."
                        className="mt-2 min-h-[120px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Choose Template */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Templates for {getCurrentNiche()?.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {getCurrentTemplates().map((template) => (
                          <Card 
                            key={template.id}
                            className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                              selectedTemplate?.id === template.id 
                                ? 'border-purple-500 bg-purple-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <CardHeader className="pb-3">
                              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">Live Preview Available</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{template.name}</CardTitle>
                                <Badge variant="secondary">{template.category}</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span className="ml-1 text-sm font-medium">{template.rating}</span>
                                </div>
                                <span className="text-sm text-gray-600">({template.reviews})</span>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Features:</h4>
                                  <ul className="space-y-1">
                                    {template.features.slice(0, 3).map((feature, idx) => (
                                      <li key={idx} className="text-xs text-gray-600">• {feature}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t">
                                  <span className="text-lg font-bold text-purple-600">{template.price}</span>
                                  <Button size="sm" variant="outline" onClick={() => window.open(template.preview, '_blank')}>
                                    <Eye className="h-3 w-3 mr-1" />
                                    Live Demo
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {selectedTemplate && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-green-800">Template Selected: {selectedTemplate.name}</h4>
                            <p className="text-sm text-green-700">Click "Generate Demo Preview" to see your customized version</p>
                          </div>
                          <Button onClick={generateDemoPreview} className="bg-green-600 hover:bg-green-700">
                            Generate Demo Preview
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Configure Keys */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                        <Key className="h-5 w-5 mr-2" />
                        Required API Keys & Integrations
                      </h3>
                      <p className="text-sm text-blue-700 mb-4">
                        Based on your selected niche and template, the following integrations are required:
                      </p>
                      <div className="grid gap-4">
                        {getRequiredKeys().map((keyType) => (
                          <div key={keyType} className="space-y-2">
                            <Label htmlFor={keyType} className="flex items-center">
                              <Key className="h-4 w-4 mr-2" />
                              {apiKeyFields[keyType].label} *
                            </Label>
                            <Input
                              id={keyType}
                              value={formData.apiKeys[keyType]}
                              onChange={(e) => handleApiKeyChange(keyType, e.target.value)}
                              placeholder={apiKeyFields[keyType].placeholder}
                              className="font-mono text-sm"
                            />
                            <p className="text-xs text-gray-600">{apiKeyFields[keyType].description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="domain">Domain Name</Label>
                      <Input
                        id="domain"
                        name="domain"
                        value={formData.domain}
                        onChange={handleInputChange}
                        placeholder="yourbusiness.com (leave blank if you need help)"
                        className="mt-2"
                      />
                      <div className="flex items-center space-x-2 mt-3">
                        <Checkbox
                          id="needsDomain"
                          checked={formData.needsDomain}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, needsDomain: checked as boolean })
                          }
                        />
                        <Label htmlFor="needsDomain" className="text-sm">
                          I need help purchasing and setting up a domain
                        </Label>
                      </div>
                    </div>

                    {formData.needsDomain && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">Premium Domain Management Service</h4>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="preferredDomains">Preferred Domain Names</Label>
                            <Textarea
                              id="preferredDomains"
                              name="preferredDomains"
                              value={formData.preferredDomains}
                              onChange={handleInputChange}
                              placeholder="List 3-5 preferred domain names (e.g., mybusiness, mycompany, mybrand)"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Preferred Extensions</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {domainExtensions.map((ext) => (
                                <Badge key={ext} variant="outline" className="cursor-pointer">
                                  {ext}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white border border-yellow-300 rounded p-4">
                            <h5 className="font-medium mb-2">Included in Premium Domain Service:</h5>
                            <ul className="text-sm space-y-1">
                              <li>• Domain purchase and registration</li>
                              <li>• DNS configuration and SSL setup</li>
                              <li>• Professional email setup (if needed)</li>
                              <li>• 1-year domain management</li>
                              <li>• Additional cost: $99-299 based on domain</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label>Hosting Details</Label>
                      <div className="space-y-3 mt-2">
                        <Select onValueChange={(value) => setFormData({
                          ...formData,
                          hostingDetails: { ...formData.hostingDetails, provider: value }
                        })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select hosting provider (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="managed">IdeaLaunch Managed Hosting (Recommended)</SelectItem>
                            <SelectItem value="aws">Amazon AWS</SelectItem>
                            <SelectItem value="gcp">Google Cloud</SelectItem>
                            <SelectItem value="digitalocean">DigitalOcean</SelectItem>
                            <SelectItem value="other">Other/Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Make It Live */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">
                        <CheckCircle className="inline h-5 w-5 mr-2" />
                        Your Website Summary
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 text-sm">
                          <p><strong>Business:</strong> {formData.businessName}</p>
                          <p><strong>Niche:</strong> {getCurrentNiche()?.name}</p>
                          <p><strong>Template:</strong> {selectedTemplate?.name}</p>
                          <p><strong>Domain:</strong> {formData.domain || formData.needsDomain ? 'Premium Domain Service' : 'Will be provided'}</p>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><strong>Features:</strong> {getCurrentNiche()?.features.join(', ')}</p>
                          <p><strong>API Keys:</strong> {getRequiredKeys().length} integrations configured</p>
                          <p><strong>Hosting:</strong> {formData.hostingDetails.provider || 'IdeaLaunch Managed'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        <Zap className="inline h-5 w-5 mr-2" />
                        Final Cost Breakdown
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Template & Development:</span>
                          <span className="font-semibold">{selectedTemplate?.price}</span>
                        </div>
                        {formData.needsDomain && (
                          <div className="flex justify-between">
                            <span>Premium Domain Service:</span>
                            <span className="font-semibold">$99 - $299</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Setup & Deployment:</span>
                          <span className="font-semibold">$199</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-green-600">
                            {selectedTemplate ? 
                              `$${parseInt(selectedTemplate.price.replace('$', '').replace(',', '')) + 199 + (formData.needsDomain ? 199 : 0)}` 
                              : 'TBD'
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-purple-800 mb-4">
                        🚀 Deployment Process
                      </h3>
                      <div className="space-y-2 text-sm text-purple-700">
                        <p>• We'll configure your domain and DNS settings</p>
                        <p>• All API integrations will be tested and activated</p>
                        <p>• Your website will be deployed with SSL certification</p>
                        <p>• Final testing and live URL delivery within 24-48 hours</p>
                        <p>• Complete credentials and admin access provided</p>
                        <p>• 30-day post-launch support included</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button 
                        onClick={handleMakeItLive}
                        size="lg"
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg"
                      >
                        <Zap className="mr-2 h-5 w-5" />
                        Make It Live & Pay Now
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        Secure payment via Stripe/Razorpay • 100% Money-back guarantee
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button
                      onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={
                        (currentStep === 1 && !selectedNiche) ||
                        (currentStep === 2 && !selectedTemplate)
                      }
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Websites;
