
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ExternalLink, Download, CreditCard } from 'lucide-react';
import { Template, Configuration, DeploymentStatus } from '../../../types/workflow';

interface PreviewDeployProps {
  template: Template;
  configuration: Configuration;
  deployment: DeploymentStatus;
  onUpdateDeployment: (status: Partial<DeploymentStatus>) => void;
  onBack: () => void;
}

const PreviewDeploy: React.FC<PreviewDeployProps> = ({
  template,
  configuration,
  deployment,
  onUpdateDeployment,
  onBack
}) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  const domainCost = configuration.domain.type === 'buy' ? 15 : 0;
  const totalCost = template.price + domainCost;

  const requirements = [
    {
      id: 'keys',
      label: 'API Keys Configured',
      completed: configuration.apiKeys.razorpayKey || configuration.apiKeys.calendarKey || true
    },
    {
      id: 'domain',
      label: 'Domain Configured',
      completed: (configuration.domain.type === 'own' && configuration.domain.existing?.domain) ||
                 (configuration.domain.type === 'buy' && configuration.domain.new?.name)
    },
    {
      id: 'design',
      label: 'Design Preferences Set',
      completed: configuration.design.primaryColor && configuration.design.font
    }
  ];

  const allRequirementsMet = requirements.every(req => req.completed);

  const handlePayment = async () => {
    setIsPaymentOpen(true);
    // Simulate payment process
    setTimeout(() => {
      setIsPaymentOpen(false);
      startDeployment();
    }, 2000);
  };

  const startDeployment = () => {
    const tasks = [
      { name: 'Configuring DNS', duration: 2000 },
      { name: 'Setting up SSL', duration: 1500 },
      { name: 'Deploying Website', duration: 2500 },
      { name: 'Final Checks', duration: 1000 }
    ];

    let currentProgress = 0;
    tasks.forEach((task, index) => {
      setTimeout(() => {
        const progress = ((index + 1) / tasks.length) * 100;
        onUpdateDeployment({
          progress,
          currentTask: task.name,
          isComplete: index === tasks.length - 1
        });

        if (index === tasks.length - 1) {
          onUpdateDeployment({
            liveUrl: `https://${configuration.domain.new?.name || 'yoursite'}.idealaunch.io`,
            adminUrl: `https://admin-${configuration.domain.new?.name || 'yoursite'}.idealaunch.io`
          });
        }
      }, currentProgress);
      currentProgress += task.duration;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Preview & Deploy</h2>
        <p className="text-xl text-gray-600">Review your configuration and make it live</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Panel */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                {deployment.progress > 0 ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Generating preview...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <iframe
                      src={template.demoUrl}
                      className="w-full h-full rounded-lg"
                      title="Website Preview"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Requirements Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requirements.map((req) => (
                <div key={req.id} className="flex items-center space-x-3">
                  <CheckCircle 
                    className={`h-5 w-5 ${
                      req.completed ? 'text-green-500' : 'text-gray-300'
                    }`}
                  />
                  <span className={req.completed ? 'text-gray-900' : 'text-gray-500'}>
                    {req.label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Template: {template.title}</span>
                <span>${template.price}</span>
              </div>
              {domainCost > 0 && (
                <div className="flex justify-between">
                  <span>Domain (1 year)</span>
                  <span>${domainCost}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-purple-600">${totalCost}</span>
              </div>
            </CardContent>
          </Card>

          {/* Deployment Status */}
          {deployment.progress > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Deployment Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{deployment.currentTask}</span>
                    <span className="text-sm text-gray-600">{deployment.progress}%</span>
                  </div>
                  <Progress value={deployment.progress} className="h-2" />
                </div>
                {deployment.isComplete && (
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-700">Deployment Complete!</span>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => window.open(deployment.liveUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live Site
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(deployment.adminUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Credentials
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {!deployment.isComplete && (
            <div className="space-y-4">
              <Button
                onClick={handlePayment}
                disabled={!allRequirementsMet || deployment.progress > 0}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg"
                size="lg"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {isPaymentOpen ? 'Processing Payment...' : `Make It Live - $${totalCost}`}
              </Button>
              <Button variant="outline" onClick={onBack} className="w-full">
                Back to Configuration
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewDeploy;
