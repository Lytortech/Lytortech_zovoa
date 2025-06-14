import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MVPState, MVPWorkflowAction } from '@/types/mvpWorkflow';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



interface IdeaSubmissionFormProps {
  state: MVPState;
  dispatch: React.Dispatch<MVPWorkflowAction>;
}

interface AnalysisResponse {
  aiSummary: string;
  status: string;
}

const AUDIENCE_SUGGESTIONS = ['GenZ', 'SMEs', 'Millennials', 'B2B', 'B2C', 'Enterprises', 'Startups'];

const BASE_URL = 'https://zovoaapi.lytortech.com/api';

const IdeaSubmissionForm: React.FC<IdeaSubmissionFormProps> = ({ state, dispatch }) => {
  const { currentUser } = useAuth();
  console.log("uid:" + currentUser.uid);
  const [audienceInput, setAudienceInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAudienceAdd = (audience: string) => {
    if (audience && !state.idea.audience.includes(audience)) {
      dispatch({
        type: 'UPDATE_IDEA',
        payload: { audience: [...state.idea.audience, audience] }
      });
      setAudienceInput('');
    }
  };

  const handleAudienceRemove = (audience: string) => {
    dispatch({
      type: 'UPDATE_IDEA',
      payload: { audience: state.idea.audience.filter(a => a !== audience) }
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!state.idea.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (state.idea.description.length < 100) {
      newErrors.description = 'Description must be at least 100 characters';
    }
    if (state.idea.audience.length === 0) {
      newErrors.audience = 'At least one target audience is required';
    }
    if (!state.idea.mail || !state.idea.mail.includes('@')) {
      newErrors.mail = 'Valid email is required';
    }
    if (!state.idea.phone_number || state.idea.phone_number.length < 10) {
      newErrors.phone_number = 'Valid phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const analyzeIdea = async () => {
    if (!validateForm()) {
      console.warn("⚠️ Form validation failed. Analysis aborted.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    const analysisData = {
      title: state.idea.name,
      description: state.idea.description,
      targetAudience: state.idea.audience.join(','),
      platform: state.idea.platform
    };

    try {
      console.log("🔍 Sending data for analysis...");
      const response = await fetch(`${BASE_URL}/mvp/mvp/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any-value'
        },
        body: JSON.stringify(analysisData)
      });

      if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
      }

      const result: AnalysisResponse = await response.json();
      setAnalysisResult(result);
      setShowAnalysis(true);
      console.log("✅ Analysis successful:", result);
    } catch (error) {
      console.error('💥 Analysis error:', error);
      setAnalysisError('Failed to analyze the idea. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!analysisResult) {
      console.warn("Analysis not completed yet");
      return;
    }

    setIsSubmitting(true);
    const formData = {
      type: "MVP Development",
      title: state.idea.name,
      description: state.idea.description,
      targetAudience: state.idea.audience.join(','),
      platform: state.idea.platform,
      pdfUrl: 'https://example.com/file.pdf',
      uid: currentUser.uid,
      userId: '1234',
      contactEmail: state.idea.mail,
      contactPhone: state.idea.phone_number,
      demoUrl: '',
      isPaid: false,
      price: 4999,
      priority: "High",
      prompt: analysisResult.aiSummary,
      files: [
        {
          fileName: "doc.pdf",
          fileUrl: "https://..."
        }
      ],
      milestones: [
        {
          name: "Design",
          completed: false
        }
      ],
      recentActivity: [
        {
          action: "Submitted",
          by: "User"
        }
      ]
    };

    try {
      console.log("🚀 Data submission endpoint triggered");
      console.log("data sending " + JSON.stringify(formData, null, 2));
      const response = await fetch(`${BASE_URL}/mvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any-value'
        },
        body: JSON.stringify(formData)
      });

      const responseBody = await response.text();
      console.log("📡 Response:", responseBody);

      if (response.ok) {
        console.log('✅ Form submitted successfully!');
        setShowModal(true);
      } else {
        console.error('❌ Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('💥 Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditIdea = () => {
    setShowAnalysis(false);
    setAnalysisResult(null);
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {showAnalysis ? 'Review AI Analysis' : 'Submit Your MVP Idea'}
          </CardTitle>
        </CardHeader>

        {!showAnalysis ? (
          <CardContent className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                value={state.idea.name}
                onChange={(e) => dispatch({ type: 'UPDATE_IDEA', payload: { name: e.target.value } })}
                placeholder="Enter your product name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={state.idea.description}
                onChange={(e) => dispatch({ type: 'UPDATE_IDEA', payload: { description: e.target.value } })}
                placeholder="Describe your product idea in detail (minimum 100 characters)"
                rows={6}
                className={errors.description ? 'border-red-500' : ''}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{state.idea.description.length}/100 characters minimum</span>
                {errors.description && <span className="text-red-500">{errors.description}</span>}
              </div>
            </div>

            {/* Target Audience */}
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {state.idea.audience.map((audience) => (
                  <span key={audience} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {audience}
                    <button onClick={() => handleAudienceRemove(audience)} className="text-blue-600 hover:text-blue-800">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={audienceInput}
                  onChange={(e) => setAudienceInput(e.target.value)}
                  placeholder="Add target audience"
                  onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAudienceAdd(audienceInput); } }}
                />
                <Button type="button" variant="outline" onClick={() => handleAudienceAdd(audienceInput)}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="text-sm text-gray-500">Suggestions:</span>
                {AUDIENCE_SUGGESTIONS.map((suggestion) => (
                  <button key={suggestion} onClick={() => handleAudienceAdd(suggestion)} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">{suggestion}</button>
                ))}
              </div>
              {errors.audience && <p className="text-red-500 text-sm">{errors.audience}</p>}
            </div>

            {/* Platform */}
            <div className="space-y-2">
              <Label>Platform</Label>
              <RadioGroup
                value={state.idea.platform}
                onValueChange={(value) => dispatch({ type: 'UPDATE_IDEA', payload: { platform: value as MVPState['idea']['platform'] } })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile">Mobile App</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="web" id="web" />
                  <Label htmlFor="web">Web App</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="desktop" id="desktop" />
                  <Label htmlFor="desktop">Desktop</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cross" id="cross" />
                  <Label htmlFor="cross">Cross-Platform</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={state.idea.mail || ''}
                onChange={(e) => dispatch({ type: 'UPDATE_IDEA', payload: { mail: e.target.value } })}
                placeholder="Enter your email"
                className={errors.mail ? 'border-red-500' : ''}
              />
              {errors.mail && <p className="text-red-500 text-sm">{errors.mail}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                value={state.idea.phone_number || ''}
                onChange={(e) => dispatch({ type: 'UPDATE_IDEA', payload: { phone_number: e.target.value } })}
                placeholder="Enter your phone number"
                className={errors.phone_number ? 'border-red-500' : ''}
              />
              {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
            </div>

            {/* Attachments Placeholder */}
            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-500">Drag & drop files here (PDF, FIGMA, ZIP)</p>
                <p className="text-sm text-gray-400 mt-1">Or click to browse files</p>
              </div>
            </div>

            <Button
              onClick={analyzeIdea}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Idea'}
            </Button>
          </CardContent>
        ) : (
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AI Analysis of Your Idea</h3>

              {analysisError ? (
                <div className="text-red-500 p-4 bg-red-50 rounded-lg">
                  {analysisError}
                </div>
              ) : (
                <>
                  <Textarea
                    value={analysisResult?.aiSummary || ''}
                    readOnly
                    rows={10}
                    className="bg-gray-50"
                  />

                  <div className="flex justify-between gap-4">
                    <Button
                      variant="outline"
                      onClick={handleEditIdea}
                      className="flex-1"
                    >
                      Edit Idea
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">🎉 Submission Successful!</h2>
            <p className="mb-4">
              Your idea submission was successful. Our developers will review your requirements and contact you within 24 hrs through mail or mobile. You can review your idea in your projects section.
            </p>

            <div className="flex justify-end">
              <Button onClick={() => navigate('/dashboard')} className="bg-green-600 hover:bg-green-700 text-white">
                Go to Projects section
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IdeaSubmissionForm;