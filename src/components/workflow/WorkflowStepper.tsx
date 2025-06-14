
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface WorkflowStepperProps {
  currentStep: number;
  steps: Step[];
}

const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : currentStep === step.number
                    ? 'border-purple-600 text-purple-600 bg-white'
                    : 'border-gray-300 text-gray-400 bg-white'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-4 hidden md:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-8 h-0.5 bg-gray-200">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      currentStep > step.number ? 'bg-purple-600 w-full' : 'bg-purple-600 w-0'
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

export default WorkflowStepper;
