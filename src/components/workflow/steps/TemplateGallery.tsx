import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Star } from 'lucide-react';
import { Template } from '../../../types/workflow';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

interface TemplateGalleryProps {
  nicheId: string;
  selectedTemplate: Template | null;
  onSelectTemplate: (template: Template) => void;
  onNext: (templateId: string) => void;
  onBack: () => void;
}


const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  nicheId,
  selectedTemplate,
  onSelectTemplate,
  onNext,
  onBack
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const templatesPerPage = 6;

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      console.log('[TEMPLATE] Fetching templates...');

      try {
        const response = await axios.get(`https://zovoaapi.lytortech.com/api/website-templets/get/templet/${nicheId}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });


        console.log('[TEMPLATE] Fetched response:', response.data);
        setTemplates(response.data);
      } catch (err) {
        console.error('[TEMPLATE] Fetch error:', err);
        setError('Failed to load templates.');
      } finally {
        setLoading(false);
        console.log('[TEMPLATE] Loading finished.');
      }
    };

    fetchTemplates();
  }, []);

  const handleNext = () => {
    if (selectedTemplate) {

      onNext(selectedTemplate.id);

    }
  };





  const filteredTemplates = templates.filter(template => template.nicheId === nicheId);
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);
  const startIndex = (currentPage - 1) * templatesPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, startIndex + templatesPerPage);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
        <p className="text-xl text-gray-600">Select a professional template that matches your vision</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="w-full aspect-video bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
                <div className="h-5 w-12 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex justify-between pt-2">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-gray-300 rounded"></div>
                  <div className="h-8 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${selectedTemplate?.id === template.id
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300'
                  }`}
              >
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 overflow-hidden group">
                    <img
                      src={template.thumbnail}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.split(',').map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        #{tag.trim()}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">${template.price}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(template.demoUrl, '_blank');
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Demo
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTemplate(template);
                        }}
                        className={selectedTemplate?.id === template.id ? 'bg-purple-600' : ''}
                      >
                        {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mb-8">
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              onClick={onBack}
              className="bg-black text-white hover:bg-gray-900"
            >
              Back to Niches
            </Button>


            <Button
              onClick={handleNext}
              disabled={!selectedTemplate}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Configure Template
            </Button>
          </div>
        </>
      )}
    </div>
  );

};

export default TemplateGallery;
