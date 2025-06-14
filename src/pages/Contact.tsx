
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@idealaunch.com',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Speak directly with our team during business hours'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      description: 'Schedule a meeting at our headquarters'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri 9AM-6PM PST',
      description: 'We\'re here when you need us'
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
              Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your idea into reality? Let's discuss your project and how we can help you succeed.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Tell Us About Your Project</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours with a custom proposal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="service">Service Interested In *</Label>
                        <Select onValueChange={(value) => handleSelectChange('service', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mvp">MVP Development</SelectItem>
                            <SelectItem value="website">Business Website</SelectItem>
                            <SelectItem value="3d">3D Brand Experience</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Project Budget</Label>
                        <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-5k">Under $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50k-plus">$50,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Project Description *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className="mt-2 min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Let's Start a Conversation
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    We're here to help bring your vision to life. Whether you have a specific project in mind or just want to explore possibilities, we'd love to hear from you.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <info.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                            <p className="text-lg text-gray-900 mb-1">{info.details}</p>
                            <p className="text-sm text-gray-600">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Need Immediate Help?</h3>
                    <p className="mb-4">
                      For urgent inquiries or technical support, reach out to us directly and we'll respond immediately.
                    </p>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      Emergency Contact
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Common Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">How quickly can you start my project?</h3>
                <p className="text-gray-600">Most projects can begin within 1-2 weeks of contract signing, depending on our current workload and project complexity.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you work with international clients?</h3>
                <p className="text-gray-600">Yes! We work with clients worldwide and have experience managing projects across different time zones.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What information do you need to provide a quote?</h3>
                <p className="text-gray-600">We'll need details about your project scope, timeline, platform preferences, and any specific features you have in mind.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you provide ongoing support after launch?</h3>
                <p className="text-gray-600">Yes, all our packages include post-launch support, and we offer extended support packages for long-term partnerships.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
