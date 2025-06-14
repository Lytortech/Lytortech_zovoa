
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrandNiche } from '../../../types/threeDWorkflow';
import ThreeDModel from '../ThreeDModel';

interface BrandSelectionProps {
  selectedBrand: BrandNiche | null;
  onSelectBrand: (brand: BrandNiche) => void;
  onNext: () => void;
}

const brandNiches: BrandNiche[] = [
  {
    id: 'coffee-shop',
    title: 'Coffee Experience',
    description: 'Immersive coffee journey with 3D brewing visualization',
    icon: '☕',
    modelUrl: '',
    experience: 'Virtual coffee tasting and origin stories'
  },
  {
    id: 'fashion-label',
    title: 'Fashion Showcase',
    description: 'Virtual runway with interactive garment viewer',
    icon: '👗',
    modelUrl: '',
    experience: 'AR try-on and style configurator'
  },
  {
    id: 'art-gallery',
    title: 'Art Gallery',
    description: 'Immersive gallery with virtual exhibitions',
    icon: '🎨',
    modelUrl: '',
    experience: 'Interactive art exploration and artist stories'
  },
  {
    id: 'jewelry-brand',
    title: 'Luxury Jewelry',
    description: '360° product showcase with material visualization',
    icon: '💎',
    modelUrl: '',
    experience: 'Virtual try-on and customization studio'
  }
];

const BrandSelection: React.FC<BrandSelectionProps> = ({ 
  selectedBrand, 
  onSelectBrand, 
  onNext 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Choose Your Brand Experience
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select the 3D experience that best represents your brand vision
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {brandNiches.map((brand) => (
          <Card 
            key={brand.id}
            className={`group cursor-pointer border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-200/50 ${
              selectedBrand?.id === brand.id 
                ? 'border-green-500 bg-gradient-to-br from-green-50 to-blue-50 shadow-xl ring-4 ring-green-200' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => onSelectBrand(brand)}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4 relative">
                <ThreeDModel 
                  modelUrl={brand.modelUrl} 
                  className="w-full h-32" 
                  autoRotate={true}
                />
                <div className="absolute top-2 right-2 text-2xl">
                  {brand.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                {brand.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {brand.description}
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 font-medium">
                  Experience: {brand.experience}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={!selectedBrand}
          size="lg"
          className="px-12 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          Continue to Templates
        </Button>
      </div>
    </div>
  );
};

export default BrandSelection;
