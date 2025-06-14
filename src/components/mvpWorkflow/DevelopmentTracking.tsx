
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MVPState, MVPWorkflowAction, DevelopmentPhase } from '@/types/mvpWorkflow';

interface DevelopmentTrackingProps {
  state: MVPState;
  dispatch: React.Dispatch<MVPWorkflowAction>;
}

const DEVELOPMENT_PHASES: DevelopmentPhase[] = [
  {
    id: 'review',
    title: 'REVIEW',
    status: 'done',
    dateStarted: '2024-01-15',
    dateCompleted: '2024-01-17',
    feedback: []
  },
  {
    id: 'design',
    title: 'DESIGN',
    status: 'in-progress',
    dateStarted: '2024-01-18',
    feedback: [],
    milestonePayment: 299
  },
  {
    id: 'development',
    title: 'DEVELOPMENT',
    status: 'pending',
    feedback: [],
    milestonePayment: 499
  },
  {
    id: 'ready',
    title: 'READY',
    status: 'pending',
    feedback: []
  }
];

const DevelopmentTracking: React.FC<DevelopmentTrackingProps> = ({ state, dispatch }) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const getStatusColor = (status: DevelopmentPhase['status']) => {
    switch (status) {
      case 'done': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusBadge = (status: DevelopmentPhase['status']) => {
    switch (status) {
      case 'done': return <Badge className="bg-green-500">Done</Badge>;
      case 'in-progress': return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const handlePayment = (amount: number, phase: string) => {
    console.log(`Processing payment of $${amount} for ${phase} phase`);
    // Here you would integrate with Stripe payment
    // For now, we'll simulate a successful payment
    if (phase === 'design') {
      dispatch({ type: 'UPDATE_PAYMENTS', payload: { design: true } });
    } else if (phase === 'development') {
      dispatch({ type: 'UPDATE_PAYMENTS', payload: { development: true } });
    }
  };

  const submitFeedback = (phaseId: string) => {
    if (feedbackText.trim()) {
      console.log(`Submitting feedback for ${phaseId}: ${feedbackText}`);
      setFeedbackText('');
      setSelectedPhase(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Development Progress</CardTitle>
          <p className="text-center text-gray-600">Track your MVP development journey</p>
        </CardHeader>
      </Card>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        
        <div className="space-y-8">
          {DEVELOPMENT_PHASES.map((phase, index) => (
            <div key={phase.id} className="relative flex items-start gap-6">
              {/* Timeline Dot */}
              <div className={`relative z-10 w-6 h-6 rounded-full border-4 border-white ${getStatusColor(phase.status)}`}></div>
              
              {/* Phase Card */}
              <Card className="flex-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(phase.status)}
                        {phase.milestonePayment && (
                          <Badge variant="outline">${phase.milestonePayment} milestone</Badge>
                        )}
                      </div>
                    </div>
                    {phase.status === 'in-progress' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedPhase(phase.id)}
                        >
                          Add Feedback
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          Request Revision
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Dates */}
                    <div className="flex gap-6 text-sm text-gray-600">
                      {phase.dateStarted && (
                        <div>
                          <span className="font-medium">Started:</span> {phase.dateStarted}
                        </div>
                      )}
                      {phase.dateCompleted && (
                        <div>
                          <span className="font-medium">Completed:</span> {phase.dateCompleted}
                        </div>
                      )}
                    </div>

                    {/* Phase Description */}
                    <div className="text-sm">
                      {phase.id === 'review' && (
                        <p>Your idea has been reviewed and approved by our team. We've created an initial project plan and technical requirements.</p>
                      )}
                      {phase.id === 'design' && (
                        <p>Our designers are creating wireframes and high-fidelity mockups. You'll receive design files for review and approval.</p>
                      )}
                      {phase.id === 'development' && (
                        <p>Development team is building your MVP. You'll receive regular updates and preview builds for testing.</p>
                      )}
                      {phase.id === 'ready' && (
                        <p>Final testing and quality assurance. Your MVP will be ready for deployment and user acceptance testing.</p>
                      )}
                    </div>

                    {/* Milestone Payment */}
                    {phase.milestonePayment && phase.status === 'in-progress' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Milestone Payment Required</h4>
                            <p className="text-sm text-gray-600">
                              Pay ${phase.milestonePayment} to approve this phase and continue development
                            </p>
                          </div>
                          <Button
                            onClick={() => handlePayment(phase.milestonePayment!, phase.title)}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            Pay ${phase.milestonePayment}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Feedback Section */}
                    {selectedPhase === phase.id && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Add Feedback</h4>
                        <Textarea
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Share your thoughts, suggestions, or concerns about this phase..."
                          rows={3}
                        />
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            onClick={() => submitFeedback(phase.id)}
                          >
                            Submit Feedback
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPhase(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Previous Feedback */}
                    {phase.feedback.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Previous Feedback</h4>
                        <div className="space-y-2">
                          {phase.feedback.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 rounded p-3 text-sm">
                              <p>{comment.text}</p>
                              <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="text-center py-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <p className="text-gray-600">
              Our team is here to support you throughout the development process.
            </p>
            <Button variant="outline">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentTracking;
