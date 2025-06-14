
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Globe, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-20 pb-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Turn Your Ideas Into
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Digital Reality
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            From MVPs to immersive 3D experiences, we transform your concepts into stunning digital products that captivate users and drive results.
          </p>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/mvp-workflow">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                <Rocket className="mr-2 h-5 w-5" />
                Start MVP Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/website-workflow">
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                <Globe className="mr-2 h-5 w-5" />
                Build Website
              </Button>
            </Link>
            <Link to="/3d-workflow">
              <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                <Box className="mr-2 h-5 w-5" />
                3D Experience
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">MVP Development</h3>
              <p className="text-gray-600">Launch your startup idea quickly with our rapid MVP development process.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Websites</h3>
              <p className="text-gray-600">Professional websites that convert visitors into customers.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Box className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3D Experiences</h3>
              <p className="text-gray-600">Immersive 3D websites that showcase your brand uniquely.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
