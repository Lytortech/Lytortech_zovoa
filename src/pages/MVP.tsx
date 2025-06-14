
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
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  FileText, 
  MessageSquare, 
  Upload,
  CreditCard,
  Monitor,
  Smartphone,
  Globe,
  Code,
  Database,
  Users,
  Target,
  DollarSign
} from 'lucide-react';

const MVP = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    productIdea: '',
    targetAudience: '',
    preferredPlatform: '',
    features: [],
    budget: '',
    timeline: '',
    hasWireframes: false,
    additionalInfo: '',
    contactMethod: ''
  });

  const [projectStatus, setProjectStatus] = useState('initial'); // initial, submitted, in_review, development, review, completed

  const steps = [
    { number: 1, title: 'Product Details', description: 'Tell us about your product idea' },
    { number: 2, title: 'Platform & Features', description: 'Choose platform and key features' },
    { number: 3, title: 'Budget & Timeline', description: 'Set expectations and budget' },
    { number: 4, title: 'Review & Submit', description: 'Final review and submission' }
  ];

  const platforms = [
    { id: 'web', name: 'Web Application', icon: Globe, description: 'Progressive web app accessible via browsers' },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone, description: 'Native iOS and Android applications' },
    { id: 'desktop', name: 'Desktop App', icon: Monitor, description: 'Cross-platform desktop application' },
    { id: 'api', name: 'API Service', icon: Database, description: 'Backend API and microservices' }
  ];

  const coreFeatures = [
    'User Authentication & Profiles',
    'Payment Gateway Integration',
    'Real-time Notifications',
    'Admin Dashboard',
    'Analytics & Reporting',
    'File Upload & Storage',
    'Search & Filtering',
    'Social Media Integration',
    'Multi-language Support',
    'Third-party API Integration',
    'Push Notifications',
    'Offline Mode Support'
  ];

  const budgetRanges = [
    '$2,999 - $5,999 (Basic MVP)',
    '$6,000 - $12,999 (Standard MVP)',
    '$13,000 - $24,999 (Advanced MVP)',
    '$25,000+ (Enterprise MVP)'
  ];

  const timelineOptions = [
    '4-6 weeks (Fast Track)',
    '6-8 weeks (Standard)',
    '8-12 weeks (Complex)',
    '12+ weeks (Enterprise)'
  ];

  // Mock project progress data
  const progressData = {
    'in_review': { progress: 15, status: 'In Review', description: 'Our team is reviewing your requirements' },
    'development': { progress: 65, status: 'Development', description: 'Your MVP is being built' },
    'review': { progress: 85, status: 'Ready for Review', description: 'MVP ready for your feedback' },
    'completed': { progress: 100, status: 'Completed', description: 'Your MVP is live and ready!' }
  };

  const milestones = [
    { id: 1, title: 'Requirements Analysis', amount: '$999', status: 'paid', description: 'Detailed analysis and demo document' },
    { id: 2, title: 'UI/UX Design', amount: '$1,499', status: 'current', description: 'Wireframes and visual designs' },
    { id: 3, title: 'Development Phase 1', amount: '$2,499', status: 'pending', description: 'Core functionality development' },
    { id: 4, title: 'Final Development', amount: '$1,999', status: 'pending', description: 'Testing and deployment' }
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
    console.log('MVP submission:', formData);
    setProjectStatus('submitted');
    // Simulate progress
    setTimeout(() => setProjectStatus('in_review'), 2000);
  };

  const generateDemoDocument = () => {
    // Simulate demo document generation
    console.log('Generating demo document for:', formData);
    alert('Demo document will be generated and sent to your email within 24 hours!');
  };

  if (projectStatus !== 'initial') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-20">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="shadow-xl">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-flex mb-6">
                    <Rocket className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-3xl">Your MVP Project</CardTitle>
                  <CardDescription>Track progress and manage your project development</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Progress Tracking */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Project Progress</h3>
                      <Badge variant={projectStatus === 'completed' ? 'default' : 'secondary'}>
                        {progressData[projectStatus]?.status || 'Submitted'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{progressData[projectStatus]?.description || 'Project submitted successfully'}</span>
                        <span>{progressData[projectStatus]?.progress || 10}%</span>
                      </div>
                      <Progress value={progressData[projectStatus]?.progress || 10} className="w-full" />
                    </div>
                  </div>

                  {/* Milestone Payments */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Milestone Payments
                    </h3>
                    <div className="grid gap-4">
                      {milestones.map((milestone) => (
                        <Card key={milestone.id} className={`border-2 ${
                          milestone.status === 'paid' ? 'border-green-200 bg-green-50' :
                          milestone.status === 'current' ? 'border-blue-200 bg-blue-50' :
                          'border-gray-200'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{milestone.title}</h4>
                                <p className="text-sm text-gray-600">{milestone.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">{milestone.amount}</div>
                                <Badge variant={
                                  milestone.status === 'paid' ? 'default' :
                                  milestone.status === 'current' ? 'secondary' : 'outline'
                                }>
                                  {milestone.status === 'paid' ? 'Paid' :
                                   milestone.status === 'current' ? 'Due Now' : 'Pending'}
                                </Badge>
                              </div>
                            </div>
                            {milestone.status === 'current' && (
                              <Button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600">
                                Pay {milestone.amount}
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Feedback System */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Feedback & Communication
                    </h3>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <Textarea
                          placeholder="Share your feedback, questions, or additional requirements..."
                          className="min-h-[100px]"
                        />
                        <div className="flex items-center space-x-4">
                          <Button variant="outline" className="flex items-center">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Files
                          </Button>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                            Send Feedback
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Demo Document */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Demo Document
                    </h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Requirements Summary & Sample Designs</h4>
                            <p className="text-sm text-gray-600">Auto-generated document with your project details</p>
                          </div>
                          <Button onClick={generateDemoDocument} variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Generate Document
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-flex mb-6">
              <Rocket className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              MVP <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Development</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Transform your product ideas into functional MVPs with our structured development process, progress tracking, and milestone-based payments.
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
                      ? 'bg-blue-600 text-white' 
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
                        className={`h-full bg-blue-600 transition-all duration-300 ${
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
                {/* Step 1: Product Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        placeholder="Enter your product name"
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="productIdea">Product Idea & Description *</Label>
                      <Textarea
                        id="productIdea"
                        name="productIdea"
                        value={formData.productIdea}
                        onChange={handleInputChange}
                        placeholder="Describe your product idea, what problem it solves, and key functionalities..."
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
                        placeholder="Who are your target users? Describe their demographics, needs, and behaviors..."
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Platform & Features */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Preferred Platform *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {platforms.map((platform) => (
                          <Card 
                            key={platform.id}
                            className={`cursor-pointer border-2 transition-all duration-300 ${
                              formData.preferredPlatform === platform.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setFormData({ ...formData, preferredPlatform: platform.id })}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <platform.icon className="h-8 w-8 text-blue-600" />
                                <div>
                                  <h4 className="font-semibold">{platform.name}</h4>
                                  <p className="text-sm text-gray-600">{platform.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Core Features *</Label>
                      <p className="text-sm text-gray-600 mb-4">Select the key features your MVP needs</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {coreFeatures.map((feature) => (
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
                  </div>
                )}

                {/* Step 3: Budget & Timeline */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="budget">Budget Range *</Label>
                      <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timeline">Preferred Timeline *</Label>
                      <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasWireframes"
                        checked={formData.hasWireframes}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, hasWireframes: checked as boolean })
                        }
                      />
                      <Label htmlFor="hasWireframes">
                        I have existing wireframes, designs, or technical documentation
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Any specific technical requirements, integrations, or additional details..."
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">
                        <CheckCircle className="inline h-5 w-5 mr-2" />
                        Project Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Product:</strong> {formData.productName}</p>
                        <p><strong>Platform:</strong> {platforms.find(p => p.id === formData.preferredPlatform)?.name}</p>
                        <p><strong>Features:</strong> {formData.features.join(', ')}</p>
                        <p><strong>Budget:</strong> {formData.budget}</p>
                        <p><strong>Timeline:</strong> {formData.timeline}</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="contactMethod">Preferred Contact Method *</Label>
                      <Select onValueChange={(value) => handleSelectChange('contactMethod', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="How should we contact you?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="video">Video Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        What Happens Next?
                      </h3>
                      <div className="space-y-2 text-sm text-green-700">
                        <p>• We'll review your requirements within 24 hours</p>
                        <p>• Auto-generated demo document with wireframes and cost breakdown</p>
                        <p>• Milestone-based development with regular progress updates</p>
                        <p>• Real-time project tracking dashboard access</p>
                        <p>• Optional deployment and post-launch support</p>
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
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      Submit MVP Request
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

export default MVP;
