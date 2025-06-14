
import React from 'react';
import { Box, Palette, Settings, Rocket } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  icon: React.ReactNode;
}

interface ThreeDStepperProps {
  currentStep: number;
}

const steps: Step[] = [
  { number: 1, title: 'Brand', icon: <Box className="h-5 w-5" /> },
  { number: 2, title: 'Template', icon: <Palette className="h-5 w-5" /> },
  { number: 3, title: 'Customize', icon: <Settings className="h-5 w-5" /> },
  { number: 4, title: 'Deploy', icon: <Rocket className="h-5 w-5" /> }
];

const ThreeDStepper: React.FC<ThreeDStepperProps> = ({ currentStep }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center">
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                  currentStep >= step.number 
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 border-transparent text-white scale-110' 
                    : currentStep === step.number
                    ? 'border-green-600 text-green-600 bg-white scale-105'
                    : 'border-gray-300 text-gray-400 bg-white'
                }`}>
                  <div className={`absolute inset-0 rounded-full ${
                    currentStep >= step.number ? 'animate-pulse bg-gradient-to-r from-green-400 to-blue-400 opacity-20' : ''
                  }`} />
                  {step.icon}
                </div>
                <div className="ml-4 hidden md:block">
                  <p className={`text-sm font-medium transition-colors ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 bg-gradient-to-r from-green-600 to-blue-600 ${
                      currentStep > step.number ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeDStepper;
