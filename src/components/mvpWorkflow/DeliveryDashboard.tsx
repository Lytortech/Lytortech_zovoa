
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MVPState, MVPWorkflowAction } from '@/types/mvpWorkflow';

interface DeliveryDashboardProps {
  state: MVPState;
  dispatch: React.Dispatch<MVPWorkflowAction>;
}

const DeliveryDashboard: React.FC<DeliveryDashboardProps> = ({ state, dispatch }) => {
  const handlePromotion = (type: 'appstore' | 'domain') => {
    console.log(`Processing promotion: ${type}`);
    // Here you would handle the promotion payment and setup
  };

  const getDeliveryContent = () => {
    switch (state.idea.platform) {
      case 'mobile':
        return {
          title: 'Mobile App Ready!',
          links: [
            { label: 'TestFlight (iOS)', url: 'https://testflight.apple.com/join/...' },
            { label: 'Play Store (Android)', url: 'https://play.google.com/store/apps/...' }
          ],
          promotions: [
            { type: 'appstore' as const, title: 'Deploy to App Stores', price: 199, description: 'Submit to Apple App Store and Google Play Store' }
          ]
        };
      case 'web':
        return {
          title: 'Web App Deployed!',
          links: [
            { label: 'Live Web App', url: `https://${state.idea.name.toLowerCase().replace(/\s+/g, '-')}.idealaunch.io` }
          ],
          promotions: [
            { type: 'domain' as const, title: 'Custom Domain', price: 15, description: 'Connect your own domain (per year)' }
          ]
        };
      case 'desktop':
        return {
          title: 'Desktop App Ready!',
          links: [
            { label: 'Download for Windows', url: '/downloads/app-windows.exe' },
            { label: 'Download for macOS', url: '/downloads/app-macos.dmg' },
            { label: 'Download for Linux', url: '/downloads/app-linux.appimage' }
          ],
          promotions: []
        };
      case 'cross':
        return {
          title: 'Cross-Platform App Ready!',
          links: [
            { label: 'Web App', url: `https://${state.idea.name.toLowerCase().replace(/\s+/g, '-')}.idealaunch.io` },
            { label: 'Mobile App (TestFlight)', url: 'https://testflight.apple.com/join/...' },
            { label: 'Desktop Downloads', url: '/downloads' }
          ],
          promotions: [
            { type: 'appstore' as const, title: 'Deploy to App Stores', price: 199, description: 'Submit to Apple App Store and Google Play Store' },
            { type: 'domain' as const, title: 'Custom Domain', price: 15, description: 'Connect your own domain (per year)' }
          ]
        };
    }
  };

  const deliveryContent = getDeliveryContent();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">{deliveryContent.title}</h1>
          <p className="text-green-700">
            Your MVP "{state.idea.name}" has been successfully developed and is ready for use!
          </p>
        </CardContent>
      </Card>

      {/* Access Links */}
      <Card>
        <CardHeader>
          <CardTitle>Access Your MVP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {deliveryContent.links.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{link.label}</h3>
                  <p className="text-sm text-gray-600">{link.url}</p>
                </div>
                <Button asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    Access
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investor Package */}
      {state.preview.type === 'investor' && (
        <Card>
          <CardHeader>
            <CardTitle>Investor Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium mb-2">📄 Professional Report</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Comprehensive PDF with market analysis, technical specifications, and financial projections.
                </p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">🔗 Shareable Demo</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Branded demo link perfect for investor presentations and pitches.
                </p>
                <Button variant="outline" size="sm">Copy Link</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Promotion Options */}
      {deliveryContent.promotions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Promote to Production</CardTitle>
            <p className="text-gray-600">Take your MVP to the next level with these optional services</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryContent.promotions.map((promotion, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{promotion.title}</h3>
                      <p className="text-sm text-gray-600">{promotion.description}</p>
                    </div>
                    <Badge variant="outline">${promotion.price}{promotion.type === 'domain' ? '/yr' : ''}</Badge>
                  </div>
                  <Button
                    onClick={() => handlePromotion(promotion.type)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Add for ${promotion.price}{promotion.type === 'domain' ? '/yr' : ''}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Launch Kit */}
      <Card>
        <CardHeader>
          <CardTitle>Launch Kit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📦</div>
              <h3 className="font-medium">Brand Assets</h3>
              <p className="text-sm text-gray-600">Logos, icons, and brand guidelines</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-medium">Analytics Code</h3>
              <p className="text-sm text-gray-600">Track usage and user behavior</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-medium">Support</h3>
              <p className="text-sm text-gray-600">30 days of technical support</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Your launch kit has been sent to your email address
            </p>
            <Button variant="outline">Resend Launch Kit</Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-medium">Gather User Feedback</h4>
                <p className="text-sm text-gray-600">Share your MVP with target users and collect feedback</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-medium">Iterate and Improve</h4>
                <p className="text-sm text-gray-600">Use feedback to plan your next development cycle</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-medium">Scale Your Product</h4>
                <p className="text-sm text-gray-600">Consider additional features and market expansion</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryDashboard;
