
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former tech lead at Google with 10+ years in product development.',
      image: '/placeholder.svg'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      bio: 'Full-stack architect specializing in scalable web applications.',
      image: '/placeholder.svg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Director',
      bio: 'Award-winning designer with expertise in UX and 3D experiences.',
      image: '/placeholder.svg'
    },
    {
      name: 'David Kumar',
      role: 'Lead Developer',
      bio: 'MVP specialist with experience launching 50+ successful products.',
      image: '/placeholder.svg'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Countries Served' },
    { number: '24/7', label: 'Support Available' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We exist to turn great ideas into successful digital products that make a real impact.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your success is our success. We work as an extension of your team to achieve your goals.'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We maintain the highest standards in everything we do, from code quality to customer service.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving clients worldwide with localized support and culturally aware solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">IdeaLaunch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                We're on a mission to democratize digital innovation by making high-quality development accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    IdeaLaunch was born from a simple observation: too many great ideas never see the light of day because of technical barriers and high development costs.
                  </p>
                  <p>
                    Founded in 2020 by a team of experienced developers and designers, we set out to create a platform that could bridge the gap between imagination and implementation.
                  </p>
                  <p>
                    Today, we've helped hundreds of entrepreneurs, businesses, and creatives transform their concepts into successful digital products that users love.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
                <div className="space-y-8">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-4xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do and shape how we work with our clients.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-blue-600 mx-auto" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate individuals behind IdeaLaunch who make your digital dreams a reality.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Photo</span>
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-semibold">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
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
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's turn your idea into a successful digital product together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Get In Touch
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

export default About;
