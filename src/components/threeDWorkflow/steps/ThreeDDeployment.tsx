
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Rocket, Share, Download, QrCode } from 'lucide-react';
import { BrandCustomization, ThreeDDeployment, ThreeDTemplate } from '../../../types/threeDWorkflow';
import ThreeDModel from '../ThreeDModel';

interface ThreeDDeploymentProps {
  template: ThreeDTemplate;
  customization: BrandCustomization;
  deployment: ThreeDDeployment;
  onUpdateDeployment: (deployment: Partial<ThreeDDeployment>) => void;
  onBack: () => void;
}

const ThreeDDeploymentComponent: React.FC<ThreeDDeploymentProps> = ({
  template,
  customization,
  deployment,
  onUpdateDeployment,
  onBack
}) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const deploymentSteps = [
    'Optimizing 3D assets',
    'Configuring WebGL renderer',
    'Baking lighting system',
    'Enabling AR capabilities',
    'Finalizing deployment'
  ];

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const stepIndex = Math.floor(i / 20);
      onUpdateDeployment({
        progress: i,
        currentTask: i < 100 ? deploymentSteps[stepIndex] : 'Complete!',
        isComplete: i === 100
      });
    }

    // Set success state
    onUpdateDeployment({
      liveUrl: 'https://yourbrand.idealaunch.io',
      arQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://yourbrand.idealaunch.io'
    });
    
    setIsDeploying(false);
    setShowSuccess(true);
  };

  const getPrice = () => {
    const basePrice = 99;
    const domainPrice = customization.domain.type === 'custom' ? 15 : 0;
    return basePrice + domainPrice;
  };

  if (showSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            3D Experience Launched! 🎉
          </h2>
          <p className="text-xl text-gray-600">
            Your immersive brand experience is now live and ready to amaze your audience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Rocket className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Website</h3>
              <p className="text-sm text-gray-600 mb-4">{deployment.liveUrl}</p>
              <Button variant="outline" size="sm" onClick={() => window.open(deployment.liveUrl, '_blank')}>
                Visit Site
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <QrCode className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AR Experience</h3>
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={deployment.arQrCode} alt="AR QR Code" className="w-20 h-20" />
              </div>
              <Button variant="outline" size="sm">
                View in AR
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Share className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Share & Promote</h3>
              <p className="text-sm text-gray-600 mb-4">Social media ready</p>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Instagram</Button>
                <Button variant="outline" size="sm">Facebook</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Launch Kit Email Sent</h3>
                <p className="text-gray-600">Check your inbox for brand assets, analytics code, and support contacts</p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Assets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Preview & Deploy
        </h2>
        <p className="text-xl text-gray-600">
          Review your 3D experience and launch it to the world
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Preview Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
              <ThreeDModel 
                modelUrl={template.modelUrl}
                className="w-full h-full"
                autoRotate={!isDeploying}
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Template:</span>
                <Badge>{template.title}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Domain:</span>
                <span className="font-mono">
                  {customization.domain.type === 'custom' 
                    ? `${customization.domain.value}${customization.domain.tld}`
                    : 'yourbrand.idealaunch.io'
                  }
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Brand Color:</span>
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: customization.design.brandColor }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Deployment Center</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Requirements Checklist */}
            <div>
              <h3 className="font-semibold mb-3">Requirements Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Brand configured</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Template selected</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Domain configured</span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div>
              <h3 className="font-semibold mb-3">Investment</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>3D Template & Development</span>
                  <span>$99</span>
                </div>
                {customization.domain.type === 'custom' && (
                  <div className="flex justify-between text-sm">
                    <span>Custom Domain (1 year)</span>
                    <span>$15</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${getPrice()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment Progress */}
            {isDeploying && (
              <div>
                <h3 className="font-semibold mb-3">Deployment Progress</h3>
                <Progress value={deployment.progress} className="mb-2" />
                <p className="text-sm text-gray-600">{deployment.currentTask}</p>
              </div>
            )}

            {/* Deploy Button */}
            <Button
              onClick={handleDeploy}
              disabled={isDeploying}
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isDeploying ? 'Deploying...' : 'Launch 3D Experience'}
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <Button
          variant="outline"
          onClick={onBack}
          size="lg"
          className="px-8"
          disabled={isDeploying}
        >
          Back to Customization
        </Button>
      </div>
    </div>
  );
};

export default ThreeDDeploymentComponent;
