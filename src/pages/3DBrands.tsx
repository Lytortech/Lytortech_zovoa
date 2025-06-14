
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
import { Box, ArrowRight, CheckCircle, Eye, Star, Palette } from 'lucide-react';

const ThreeDBrands = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    brandName: '',
    industry: '',
    brandStory: '',
    targetAudience: '',
    features: [],
    colorScheme: '',
    hasAssets: false,
    additionalInfo: ''
  });

  const steps = [
    { number: 1, title: 'Brand Story', description: 'Tell us about your brand' },
    { number: 2, title: '3D Template', description: 'Choose your immersive design' },
    { number: 3, title: 'Customization', description: 'Personalize your experience' },
    { number: 4, title: 'Launch Setup', description: 'Final details and deployment' }
  ];

  const industries = [
    'Fashion & Apparel',
    'Food & Beverage',
    'Art & Design',
    'Jewelry & Luxury',
    'Automotive',
    'Architecture',
    'Technology',
    'Beauty & Cosmetics',
    'Sports & Fitness',
    'Entertainment',
    'Other'
  ];

  const templates = [
    {
      id: 1,
      name: 'Fashion Runway',
      category: 'Fashion',
      rating: 5.0,
      reviews: 43,
      features: ['3D Product Showcase', 'Virtual Fitting', 'Brand Story Timeline', 'Interactive Gallery'],
      preview: 'https://example.com/3d-demo1',
      price: '$3,999',
      complexity: 'High',
      timeline: '6-8 weeks'
    },
    {
      id: 2,
      name: 'Coffee Experience',
      category: 'Food & Beverage',
      rating: 4.9,
      reviews: 67,
      features: ['3D Coffee Journey', 'Bean Visualization', 'Brewing Process', 'Flavor Profiles'],
      preview: 'https://example.com/3d-demo2',
      price: '$4,299',
      complexity: 'High',
      timeline: '7-9 weeks'
    },
    {
      id: 3,
      name: 'Art Gallery Virtual',
      category: 'Art & Design',
      rating: 4.8,
      reviews: 34,
      features: ['Virtual Gallery Walk', '3D Artwork Display', 'Artist Spotlight', 'Interactive Exhibitions'],
      preview: 'https://example.com/3d-demo3',
      price: '$4,599',
      complexity: 'Very High',
      timeline: '8-10 weeks'
    },
    {
      id: 4,
      name: 'Jewelry Showcase',
      category: 'Luxury',
      rating: 5.0,
      reviews: 28,
      features: ['360° Product View', 'Material Visualization', 'Customization Tool', 'Virtual Try-On'],
      preview: 'https://example.com/3d-demo4',
      price: '$4,799',
      complexity: 'Very High',
      timeline: '8-12 weeks'
    },
    {
      id: 5,
      name: 'Automotive Showroom',
      category: 'Automotive',
      rating: 4.9,
      reviews: 52,
      features: ['3D Car Configurator', 'Interior/Exterior Views', 'Performance Visualization', 'Virtual Test Drive'],
      preview: 'https://example.com/3d-demo5',
      price: '$5,999',
      complexity: 'Very High',
      timeline: '10-14 weeks'
    },
    {
      id: 6,
      name: 'Architecture Studio',
      category: 'Architecture',
      rating: 4.8,
      reviews: 19,
      features: ['3D Building Tours', 'Design Process', 'Material Showcase', 'Project Timeline'],
      preview: 'https://example.com/3d-demo6',
      price: '$5,299',
      complexity: 'Very High',
      timeline: '9-12 weeks'
    }
  ];

  const threeDFeatures = [
    '3D Product Visualization',
    'Interactive Animations',
    'Virtual Reality Support',
    'Mobile Optimization',
    'Custom 3D Models',
    'Physics Simulations',
    'Audio Integration',
    'Loading Animations',
    'Touch/Gesture Controls',
    'Real-time Configurator',
    'Immersive Storytelling',
    'Performance Analytics'
  ];

  const colorSchemes = [
    'Warm & Vibrant',
    'Cool & Modern',
    'Monochromatic',
    'Brand Colors',
    'Earth Tones',
    'Neon & Electric',
    'Pastel & Soft',
    'Dark & Dramatic'
  ];

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

  const handleSubmit = () => {
    console.log('3D Brand submission:', { ...formData, selectedTemplate });
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-2xl inline-flex mb-6">
              <Box className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              3D Brand <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Experiences</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Immersive 3D websites that showcase your brand with cutting-edge WebGL technology and interactive elements that captivate your audience.
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
                      ? 'bg-green-600 text-white' 
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
                        className={`h-full bg-green-600 transition-all duration-300 ${
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
                {/* Step 1: Brand Story */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="brandName">Brand Name *</Label>
                      <Input
                        id="brandName"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleInputChange}
                        placeholder="Enter your brand name"
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Select onValueChange={(value) => handleSelectChange('industry', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, '-')}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="brandStory">Brand Story *</Label>
                      <Textarea
                        id="brandStory"
                        name="brandStory"
                        value={formData.brandStory}
                        onChange={handleInputChange}
                        placeholder="Tell us your brand's story, mission, and what makes it unique..."
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetAudience">Target Audience *</Label>
                      <Textarea
                        id="targetAudience"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        placeholder="Describe your ideal customers and what kind of experience they expect..."
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: 3D Template */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Choose Your 3D Experience Template</h3>
                      <p className="text-gray-600 mb-6">Select a template that best matches your brand's vision and industry</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {templates.map((template) => (
                          <Card 
                            key={template.id}
                            className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                              selectedTemplate?.id === template.id 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <CardHeader className="pb-3">
                              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20"></div>
                                <span className="text-white text-sm font-medium z-10">3D Preview</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{template.name}</CardTitle>
                                <Badge variant="secondary">{template.category}</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="ml-1 text-sm font-medium">{template.rating}</span>
                                  </div>
                                  <span className="text-sm text-gray-600">({template.reviews})</span>
                                </div>
                                <Badge variant={template.complexity === 'Very High' ? 'destructive' : 'secondary'}>
                                  {template.complexity}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Features:</h4>
                                  <ul className="space-y-1">
                                    {template.features.map((feature, idx) => (
                                      <li key={idx} className="text-xs text-gray-600">• {feature}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                  <div>⏱️ {template.timeline}</div>
                                  <div className="font-semibold">{template.price}</div>
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View 3D Demo
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Customization */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label>3D Features & Interactions *</Label>
                      <p className="text-sm text-gray-600 mb-4">Select the 3D features you want to include</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {threeDFeatures.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={feature}
                              checked={formData.features.includes(feature)}
                              onCheckedChange={() => handleFeatureToggle(feature)}
                            />
                            <Label htmlFor={feature} className="text-sm">{feature}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="colorScheme">Color Scheme & Mood *</Label>
                      <Select onValueChange={(value) => handleSelectChange('colorScheme', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your preferred color scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          {colorSchemes.map((scheme) => (
                            <SelectItem key={scheme} value={scheme.toLowerCase().replace(/\s+/g, '-')}>
                              <div className="flex items-center">
                                <Palette className="h-4 w-4 mr-2" />
                                {scheme}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasAssets"
                        checked={formData.hasAssets}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, hasAssets: checked as boolean })
                        }
                      />
                      <Label htmlFor="hasAssets">
                        I have existing 3D models, brand assets, or specific design files
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo">Creative Vision & Special Requirements</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Describe any specific 3D interactions, animations, or unique experiences you envision..."
                        className="mt-2 min-h-[120px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Launch Setup */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">
                        <CheckCircle className="inline h-5 w-5 mr-2" />
                        Your 3D Brand Experience Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Brand:</strong> {formData.brandName}</p>
                        <p><strong>Industry:</strong> {formData.industry}</p>
                        <p><strong>Template:</strong> {selectedTemplate?.name}</p>
                        <p><strong>3D Features:</strong> {formData.features.slice(0, 3).join(', ')}{formData.features.length > 3 ? '...' : ''}</p>
                        <p><strong>Color Scheme:</strong> {formData.colorScheme}</p>
                        <p><strong>Timeline:</strong> {selectedTemplate?.timeline}</p>
                        <p><strong>Investment:</strong> {selectedTemplate?.price}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        What Makes This Special?
                      </h3>
                      <div className="space-y-2 text-sm text-green-700">
                        <p>🎯 <strong>Immersive Storytelling:</strong> Your brand story told through interactive 3D experiences</p>
                        <p>⚡ <strong>WebGL Performance:</strong> Optimized for all devices with lightning-fast loading</p>
                        <p>🎨 <strong>Custom 3D Assets:</strong> Unique models and animations crafted specifically for your brand</p>
                        <p>📱 <strong>Mobile Optimized:</strong> Full experience across desktop, tablet, and mobile devices</p>
                        <p>🔧 <strong>Future-Proof:</strong> Built with cutting-edge technology that scales with your business</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                        Development Process
                      </h3>
                      <div className="space-y-2 text-sm text-yellow-700">
                        <p><strong>Week 1-2:</strong> Concept development and 3D asset creation begins</p>
                        <p><strong>Week 3-4:</strong> Interactive prototyping and WebGL optimization</p>
                        <p><strong>Week 5-6:</strong> Brand integration and performance testing</p>
                        <p><strong>Week 7-8:</strong> Final refinements and deployment preparation</p>
                        <p><strong>Launch:</strong> Your immersive 3D brand experience goes live!</p>
                      </div>
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
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      disabled={currentStep === 2 && !selectedTemplate}
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      Launch 3D Experience
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
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

export default ThreeDBrands;
