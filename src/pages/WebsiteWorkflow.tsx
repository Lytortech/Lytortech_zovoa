
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WorkflowStepper from '../components/workflow/WorkflowStepper';
import NicheSelection from '../components/workflow/steps/NicheSelection';
import TemplateGallery from '../components/workflow/steps/TemplateGallery';
import ConfigurationForm from '../components/workflow/steps/ConfigurationForm';
import PreviewDeploy from '../components/workflow/steps/PreviewDeploy';
import { useWorkflow } from '../hooks/useWorkflow';

const steps = [
  { number: 1, title: 'Niche', description: 'Choose industry' },
  { number: 2, title: 'Template', description: 'Select design' },
  { number: 3, title: 'Configure', description: 'Setup & customize' },
  { number: 4, title: 'Deploy', description: 'Make it live' }
];

const WebsiteWorkflow = () => {
  const { state, dispatch } = useWorkflow();

  const handleSetStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const handleSelectNiche = (niche: any) => {
    dispatch({ type: 'SELECT_NICHE', payload: niche });
  };

  const handleSelectTemplate = (template: any) => {
    dispatch({ type: 'SELECT_TEMPLATE', payload: template });
  };

  const handleUpdateConfig = (config: any) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
  };

  const handleUpdateDeployment = (deployment: any) => {
    dispatch({ type: 'UPDATE_DEPLOYMENT', payload: deployment });
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <NicheSelection
            selectedNiche={state.selectedNiche}
            onSelectNiche={handleSelectNiche}
            onNext={() => handleSetStep(2)}
          />
        );
      case 2:
        return (
          <TemplateGallery
            nicheId={state.selectedNiche?.id || ''}
            selectedTemplate={state.selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
            onNext={() => handleSetStep(3)}
            onBack={() => handleSetStep(1)}
          />
        );
      case 3:
        return (
          <ConfigurationForm
            configuration={state.configuration}
            selectedNiche={state.selectedNiche!}
            selectedTemplateId={state.selectedTemplate?.id || ''}
            onUpdateConfig={handleUpdateConfig}
            onNext={() => handleSetStep(4)}
            onBack={() => handleSetStep(2)}
          />
        );
      case 4:
        return (
          <PreviewDeploy
            template={state.selectedTemplate!}
            configuration={state.configuration}
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Website Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create stunning websites with immersive 3D experiences. From concept to deployment in minutes.
            </p>
          </div>
        </section>

        <WorkflowStepper currentStep={state.currentStep} steps={steps} />
        
        <div className="animate-fade-in">
          {renderCurrentStep()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebsiteWorkflow;
