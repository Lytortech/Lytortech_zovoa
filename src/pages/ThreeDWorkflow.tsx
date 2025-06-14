
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ThreeDStepper from '../components/threeDWorkflow/ThreeDStepper';
import BrandSelection from '../components/threeDWorkflow/steps/BrandSelection';
import ThreeDTemplateGallery from '../components/threeDWorkflow/steps/ThreeDTemplateGallery';
import BrandCustomization from '../components/threeDWorkflow/steps/BrandCustomization';
import ThreeDDeploymentComponent from '../components/threeDWorkflow/steps/ThreeDDeployment';
import { useThreeDWorkflow } from '../hooks/useThreeDWorkflow';

const ThreeDWorkflow = () => {
  const { state, dispatch } = useThreeDWorkflow();

  const handleSetStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const handleSelectBrand = (brand: any) => {
    dispatch({ type: 'SELECT_BRAND', payload: brand });
  };

  const handleSelectTemplate = (template: any) => {
    dispatch({ type: 'SELECT_TEMPLATE', payload: template });
  };

  const handleUpdateCustomization = (customization: any) => {
    dispatch({ type: 'UPDATE_CUSTOMIZATION', payload: customization });
  };

  const handleUpdateDeployment = (deployment: any) => {
    dispatch({ type: 'UPDATE_DEPLOYMENT', payload: deployment });
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <BrandSelection
            selectedBrand={state.selectedBrand}
            onSelectBrand={handleSelectBrand}
            onNext={() => handleSetStep(2)}
          />
        );
      case 2:
        return (
          <ThreeDTemplateGallery
            brandNicheId={state.selectedBrand?.id || ''}
            selectedTemplate={state.selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
            onNext={() => handleSetStep(3)}
            onBack={() => handleSetStep(1)}
          />
        );
      case 3:
        return (
          <BrandCustomization
            customization={state.customization}
            selectedTemplate={state.selectedTemplate}
            onUpdateCustomization={handleUpdateCustomization}
            onNext={() => handleSetStep(4)}
            onBack={() => handleSetStep(2)}
          />
        );
      case 4:
        return (
          <ThreeDDeploymentComponent
            template={state.selectedTemplate!}
            customization={state.customization}
            deployment={state.deployment}
            onUpdateDeployment={handleUpdateDeployment}
            onBack={() => handleSetStep(3)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-3xl inline-flex mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🌐</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              3D Brand <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Experiences</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Create immersive 3D websites with WebGL technology, AR capabilities, and interactive experiences that showcase your brand in stunning detail.
            </p>
          </div>
        </section>

        <ThreeDStepper currentStep={state.currentStep} />
        
        <div className="animate-fade-in">
          {renderCurrentStep()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThreeDWorkflow;
