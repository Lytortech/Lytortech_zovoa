
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Search, 
  Palette, 
  Code, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Settings,
  Rocket
} from 'lucide-react';

const ProcessFlow = () => {
  const mvpFlow = [
    {
      icon: Lightbulb,
      title: "Submit Your Idea",
      description: "Share your product vision, target audience, and platform preferences through our structured form."
    },
    {
      icon: FileText,
      title: "Demo Document",
      description: "Receive an auto-generated demo document with requirements summary and sample designs."
    },
    {
      icon: Code,
      title: "Development",
      description: "Track progress through our dashboard with real-time updates and milestone completions."
    },
    {
      icon: Rocket,
      title: "Launch",
      description: "Final delivery with deployment links and comprehensive documentation."
    }
  ];

  const websiteFlow = [
    {
      icon: Search,
      title: "Select Niche",
      description: "Choose your industry and specify required features like eCommerce, booking, or portfolio."
    },
    {
      icon: Palette,
      title: "Choose Template",
      description: "Browse our curated gallery and preview high-quality templates with live demos."
    },
    {
      icon: Settings,
      title: "Configure Keys",
      description: "Provide API keys for payments, integrations, and domain configuration."
    },
    {
      icon: Globe,
      title: "Go Live",
      description: "Deploy your website with custom domain setup and SSL configuration."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two streamlined workflows designed to take your ideas from concept to reality with minimal friction.
          </p>
        </div>

        {/* MVP Flow */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              MVP Development Flow
            </h3>
            <p className="text-lg text-gray-600">
              Transform your product ideas into functional MVPs with our structured process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mvpFlow.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full bg-white/80 backdrop-blur-sm border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-blue-600 mb-2">STEP {index + 1}</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                
                {/* Arrow */}
                {index < mvpFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Website/3D Flow */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Website & 3D Brand Flow
            </h3>
            <p className="text-lg text-gray-600">
              Create stunning business websites and immersive 3D experiences with our template-driven approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {websiteFlow.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full bg-white/80 backdrop-blur-sm border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-purple-600 mb-2">STEP {index + 1}</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                
                {/* Arrow */}
                {index < websiteFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl mb-6 opacity-90">Choose your service and begin your journey today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start MVP Project
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Browse Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
