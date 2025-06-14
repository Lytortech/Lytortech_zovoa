import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Key, Globe, Palette } from 'lucide-react';
import { Configuration, Niche } from '../../../types/workflow';
import { useAuth } from '../../../context/AuthContext';
import { toast } from "@/components/ui/use-toast";


interface ConfigurationFormProps {
  configuration: Configuration;
  selectedNiche: Niche;
  onUpdateConfig: (config: Partial<Configuration>) => void;
  selectedTemplateId: string;
  onNext: () => void;
  onBack: () => void;
}

const colorPalette = [
  '#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B', '#EC4899'
];

const fonts = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins'
];

const tlds = ['.com', '.io', '.store', '.app', '.co', '.net'];

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  configuration,
  selectedNiche,
  selectedTemplateId,
  onUpdateConfig,
  onNext,
  onBack
}) => {
  const requiresPayment = selectedNiche.requiresKeys.includes('razorpayKey');
  const requiresCalendar = selectedNiche.requiresKeys.includes('calendarKey');
  const { currentUser } = useAuth();

  const [formData, setFormData] = React.useState({
    templet_id: selectedTemplateId,
    uid: currentUser.uid,
    name: '',
    phoneNumber: '',
    email: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  console.log("template ID (typeof):", typeof selectedTemplateId, "| Value:", selectedTemplateId);



  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.slice(0, 4) + '*'.repeat(key.length - 8) + key.slice(-4);
  };

  const isFormValid = () => {
    if (requiresPayment && (!configuration.apiKeys.razorpayKey || !configuration.apiKeys.razorpaySecret)) {
      return false;
    }
    if (requiresCalendar && !configuration.apiKeys.calendarKey) {
      return false;
    }
    if (configuration.domain.type === 'own' && (!configuration.domain.existing?.domain || !configuration.domain.existing?.dnsProvider)) {
      return false;
    }
    if (configuration.domain.type === 'buy' && (!configuration.domain.new?.name || !configuration.domain.new?.tld)) {
      return false;
    }
    return true;
  };

  const handleSubmitForm = async () => {
    try {
      console.log('🚀 Sending form data to backend:', formData);

      const response = await fetch('https://zovoaapi.lytortech.com/api/website-forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Form submission failed');

      const data = await response.json();
      console.log('✅ Response from backend:', data);
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      });

      setIsFormSubmitted(true);
    } catch (error) {
      console.error('❌ Error during form submission:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Configure Your Website</h2>
        <p className="text-xl text-gray-600">Set up integrations and customize your design</p>
      </div>

      <div className="space-y-8">
        {/* API Keys */}
        {/* {(requiresPayment || requiresCalendar) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API Keys & Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {requiresPayment && (
                <>
                  <div>
                    <Label htmlFor="razorpayKey">Razorpay API Key *</Label>
                    <Input
                      id="razorpayKey"
                      placeholder="rzp_test_XXXXXXXXXXXXXX"
                      value={configuration.apiKeys.razorpayKey || ''}
                      onChange={(e) => onUpdateConfig({
                        apiKeys: { ...configuration.apiKeys, razorpayKey: e.target.value }
                      })}
                      className="font-mono"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Display: {configuration.apiKeys.razorpayKey ? maskApiKey(configuration.apiKeys.razorpayKey) : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="razorpaySecret">Razorpay Secret Key *</Label>
                    <Input
                      id="razorpaySecret"
                      type="password"
                      placeholder="rzp_secret_XXXXXXXXXXXXXX"
                      value={configuration.apiKeys.razorpaySecret || ''}
                      onChange={(e) => onUpdateConfig({
                        apiKeys: { ...configuration.apiKeys, razorpaySecret: e.target.value }
                      })}
                      className="font-mono"
                    />
                  </div>
                </>
              )}
              {requiresCalendar && (
                <div>
                  <Label htmlFor="calendarKey">Calendar API Key *</Label>
                  <Input
                    id="calendarKey"
                    placeholder="cal_XXXXXXXXXXXXXX"
                    value={configuration.apiKeys.calendarKey || ''}
                    onChange={(e) => onUpdateConfig({
                      apiKeys: { ...configuration.apiKeys, calendarKey: e.target.value }
                    })}
                    className="font-mono"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )} */}

        {/* Domain Settings */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Domain Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={configuration.domain.type}
              onValueChange={(value: 'own' | 'buy') =>
                onUpdateConfig({ domain: { ...configuration.domain, type: value } })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="own" id="own" />
                <Label htmlFor="own">I have an existing domain</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy">Buy a new domain</Label>
              </div>
            </RadioGroup>

            {configuration.domain.type === 'own' && (
              <div className="space-y-4 pl-6">
                <div>
                  <Label htmlFor="existingDomain">Domain Name *</Label>
                  <Input
                    id="existingDomain"
                    placeholder="example.com"
                    value={configuration.domain.existing?.domain || ''}
                    onChange={(e) => onUpdateConfig({
                      domain: {
                        ...configuration.domain,
                        existing: { ...configuration.domain.existing, domain: e.target.value }
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="dnsProvider">DNS Provider *</Label>
                  <Input
                    id="dnsProvider"
                    placeholder="Cloudflare, GoDaddy, etc."
                    value={configuration.domain.existing?.dnsProvider || ''}
                    onChange={(e) => onUpdateConfig({
                      domain: {
                        ...configuration.domain,
                        existing: { ...configuration.domain.existing, dnsProvider: e.target.value }
                      }
                    })}
                  />
                </div>
              </div>
            )}

            {configuration.domain.type === 'buy' && (
              <div className="space-y-4 pl-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="newDomain">Domain Name *</Label>
                    <Input
                      id="newDomain"
                      placeholder="myawesomewebsite"
                      value={configuration.domain.new?.name || ''}
                      onChange={(e) => onUpdateConfig({
                        domain: {
                          ...configuration.domain,
                          new: { ...configuration.domain.new, name: e.target.value }
                        }
                      })}
                    />
                  </div>
                  <div className="w-32">
                    <Label>Extension</Label>
                    <Select
                      value={configuration.domain.new?.tld || '.com'}
                      onValueChange={(value) => onUpdateConfig({
                        domain: {
                          ...configuration.domain,
                          new: { ...configuration.domain.new, tld: value }
                        }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tlds.map((tld) => (
                          <SelectItem key={tld} value={tld}>{tld}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card> */}

        {/* Design */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Design Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Primary Color</Label>
              <div className="flex gap-2 mt-2">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${configuration.design.primaryColor === color
                      ? 'border-gray-400 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => onUpdateConfig({
                      design: { ...configuration.design, primaryColor: color }
                    })}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Font Family</Label>
              <Select
                value={configuration.design.font}
                onValueChange={(value) => onUpdateConfig({
                  design: { ...configuration.design, font: value }
                })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font} value={font}>{font}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Layout Style</Label>
              <RadioGroup
                value={configuration.design.layout}
                onValueChange={(value: 'grid' | 'list') =>
                  onUpdateConfig({ design: { ...configuration.design, layout: value } })
                }
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="grid" id="grid" />
                  <Label htmlFor="grid">Grid Layout</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="list" id="list" />
                  <Label htmlFor="list">List Layout</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card> */}

        {/* Owner Details Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              Website Owner Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              disabled={isFormSubmitted}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="Phone Number"
              value={formData.phoneNumber}
              disabled={isFormSubmitted}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={formData.email}
              disabled={isFormSubmitted}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              placeholder="UID"
              value={currentUser.uid}
              readOnly
            />
            <Input
              placeholder="Template ID"
              value={selectedTemplateId}
              readOnly
            />

            <div className="pt-4">
              {isFormSubmitted ? (
                <p className="text-green-600 font-semibold text-center">
                  ✅ Form is already submitted. We will reach you within 24 hrs.
                </p>
              ) : (
                <Button
                  onClick={handleSubmitForm}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Submit Details
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Footer Controls */}
      <div className="flex justify-between mt-12">
        <Button
          onClick={onBack}
          className="bg-black text-white hover:bg-gray-900"
        >
          Back to Templates
        </Button>

        <Button onClick={onNext} disabled={!isFormValid()} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Preview & Deploy
        </Button>
      </div>
    </div>
  );
};

export default ConfigurationForm;
