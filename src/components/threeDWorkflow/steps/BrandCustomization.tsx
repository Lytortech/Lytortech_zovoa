
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Upload, ArrowRight, Palette } from 'lucide-react';
import { BrandCustomization as BrandCustomizationType, ThreeDTemplate } from '../../../types/threeDWorkflow';
import { useAuth } from '../../../context/AuthContext';

interface BrandCustomizationProps {
  customization: BrandCustomizationType;
  onUpdateCustomization: (customization: Partial<BrandCustomizationType>) => void;
  onNext: () => void;
  onBack: () => void;
  selectedTemplate: ThreeDTemplate;
}

const brandColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

const BrandCustomization: React.FC<BrandCustomizationProps> = ({
  customization,
  onUpdateCustomization,
  onNext,
  onBack,
  selectedTemplate = null
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { currentUser } = useAuth();


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  useEffect(() => {
    console.log('[DEBUG] Selected Template:', selectedTemplate);
    if (selectedTemplate) {
      console.log('[DEBUG] Template ID exists:', selectedTemplate.id);
    } else {
      console.warn('[DEBUG] No template selected');
    }
  }, [selectedTemplate]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoUpload(e.dataTransfer.files[0]);
    }
  };

  const handleLogoUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onUpdateCustomization({
        design: {
          ...customization.design,
          logo: file
        }
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Brand Customization Studio
        </h2>
        <p className="text-xl text-gray-600">
          Personalize your 3D experience with custom branding and design
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Domain Configuration */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Domain Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Choose Domain Option</Label>
              <RadioGroup
                value={customization.domain.type}
                onValueChange={(value: 'subdomain' | 'custom') =>
                  onUpdateCustomization({
                    domain: { ...customization.domain, type: value }
                  })
                }
                className="mt-3"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="subdomain" id="subdomain" />
                  <Label htmlFor="subdomain" className="flex-1">
                    <div className="font-medium">IdeaLaunch Subdomain</div>
                    <div className="text-sm text-gray-500">yourbrand.idealaunch.io (Free)</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="flex-1">
                    <div className="font-medium">Custom Domain</div>
                    <div className="text-sm text-gray-500">Connect your own domain ($15/yr)</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {customization.domain.type === 'custom' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    placeholder="yourbrand"
                    value={customization.domain.value || ''}
                    onChange={(e) => onUpdateCustomization({
                      domain: { ...customization.domain, value: e.target.value }
                    })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Top Level Domain</Label>
                  <Select
                    value={customization.domain.tld}
                    onValueChange={(value) => onUpdateCustomization({
                      domain: { ...customization.domain, tld: value }
                    })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=".com">.com</SelectItem>
                      <SelectItem value=".art">.art</SelectItem>
                      <SelectItem value=".store">.store</SelectItem>
                      <SelectItem value=".io">.io</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card> */}

        {/* Design Studio */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Design Studio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div>
              <Label className="text-base font-medium">Brand Color</Label>
              <div className="grid grid-cols-5 gap-3 mt-3">
                {brandColors.map((color) => (
                  <button
                    key={color}
                    className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${customization.design.brandColor === color
                        ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-400'
                        : 'border-gray-200'
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => onUpdateCustomization({
                      design: { ...customization.design, brandColor: color }
                    })}
                  />
                ))}
              </div>
            </div>

            
            <div>
              <Label className="text-base font-medium">Surface Texture</Label>
              <Select
                value={customization.design.texture}
                onValueChange={(value: 'matte' | 'glossy' | 'transparent') =>
                  onUpdateCustomization({
                    design: { ...customization.design, texture: value }
                  })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matte">Matte Finish</SelectItem>
                  <SelectItem value="glossy">Glossy Shine</SelectItem>
                  <SelectItem value="transparent">Transparent Glass</SelectItem>
                </SelectContent>
              </Select>
            </div>

            
            <div>
              <Label className="text-base font-medium">Ambient Lighting</Label>
              <div className="mt-3">
                <Slider
                  value={[customization.design.lighting]}
                  onValueChange={(value) => onUpdateCustomization({
                    design: { ...customization.design, lighting: value[0] }
                  })}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Dim</span>
                  <span>{customization.design.lighting}%</span>
                  <span>Bright</span>
                </div>
              </div>
            </div>

            
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Background Music</Label>
              <Switch
                checked={customization.design.backgroundMusic}
                onCheckedChange={(checked) => onUpdateCustomization({
                  design: { ...customization.design, backgroundMusic: checked }
                })}
              />
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Logo Upload */}
      {/* <Card className="mb-12">
        <CardHeader>
          <CardTitle>Brand Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {customization.design.logo ? customization.design.logo.name : 'Drop your logo here'}
            </p>
            <p className="text-gray-500 mb-4">
              or click to browse files (PNG, JPG, SVG)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleLogoUpload(e.target.files[0]);
                }
              }}
              className="hidden"
              id="logo-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="logo-upload" className="cursor-pointer">
                Choose File
              </label>
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Submission Form Card */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Submit User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {formSubmitted ? (
            <div className="text-center text-green-600 font-medium text-lg">
              ✅ Form has already been submitted. We will reach out to you within 24 hours.
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                console.log('[SUBMIT] Checking selected template:', {
                  selectedTemplate,
                  hasId: !!selectedTemplate?.id,
                  idValue: selectedTemplate?.id || 'undefined'
                });
                const formData = new FormData(e.currentTarget);
                const payload = {
                  website_id: Number(formData.get('website_id')),
                  uid: formData.get('uid'),
                  name: formData.get('name'),
                  number: formData.get('number'),
                  email: formData.get('email'),
                  templet_id: String(selectedTemplate?.id)
                };

                console.log('[FORM SUBMIT PAYLOAD]', payload);

                try {
                  const res = await fetch('https://zovoaapi.lytortech.com/api/3d-website-forms', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify(payload)
                  });

                  if (res.ok) {
                    console.log('[FORM SUBMIT SUCCESS]');
                    setFormSubmitted(true);
                  } else {
                    alert('❌ Submission failed. Try again.');
                  }
                } catch (err) {
                  console.error('POST error:', err);
                  alert('❌ Something went wrong.');
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website_id">Website ID</Label>
                  <Input name="website_id" type="number" required disabled={formSubmitted} />
                </div>
                <div>
                  <Label htmlFor="uid">UID</Label>
                  <Input
                    id="uid"
                    name="uid"
                    type="text"
                    value={currentUser.uid}
                    readOnly
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input name="name" type="text" required disabled={formSubmitted} />
                </div>
                <div>
                  <Label htmlFor="number">Phone Number</Label>
                  <Input name="number" type="tel" required disabled={formSubmitted} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" type="email" required disabled={formSubmitted} />
                </div>
                <div>
                  <div>
                    <Label htmlFor="templet_id">Template ID</Label>
                    <Input
                      name="templet_id"
                      type="text"
                      required
                      disabled
                      value={selectedTemplate?.id ?? ''}
                      readOnly
                    />
                  </div>

                </div>
              </div>

              <Button
                type="submit"
                disabled={formSubmitted}
                className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Submit Form
              </Button>
            </form>
          )}
        </CardContent>
      </Card>



      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          size="lg"
          className="px-8 bg-black text-white"
        >
          Back to Templates
        </Button>

        <Button
          onClick={onNext}
          size="lg"
          disabled 
          className="px-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform transition-all duration-300 hover:scale-105"
        >
          Preview & Deploy
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default BrandCustomization;
