import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MVPState, MVPWorkflowAction } from '@/types/mvpWorkflow';
import { useToast } from '@/hooks/use-toast';
import { Code, Globe, Box, FileText } from 'lucide-react';
import { Expand, Minimize } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface DemoPreviewProps {
  state: MVPState;
  dispatch: React.Dispatch<any>;
}

const PREVIEW_PACKAGES = [
  {
    type: 'interactive' as const,
    title: 'Interactive Prototype',
    price: 4999,
    features: ['Interactive Figma prototype', 'Architecture diagram', 'Detailed feature specs', 'Priority roadmap'],
    description: 'Fully interactive prototype with technical specs'
  }
];


const SAMPLE_FEATURES = [
  { id: '1', title: 'User Authentication', description: 'Secure login and registration system', priority: 'high' as const },
  { id: '2', title: 'Dashboard', description: 'Main user interface and navigation', priority: 'high' as const },
  { id: '3', title: 'Payment Integration', description: 'Razorpay payment processing', priority: 'medium' as const },
  { id: '4', title: 'Push Notifications', description: 'Real-time user notifications', priority: 'low' as const }
];

const RAZORPAY_KEY_ID = 'rzp_live_BnPhMdUqppmXgD';
const BASE_URL = 'https://zovoaapi.lytortech.com/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const getCachedPaymentStatus = (projectId: string) => {
  const cachedData = localStorage.getItem(`paymentStatus_${projectId}`);
  return cachedData ? JSON.parse(cachedData) : null;
};

const setCachedPaymentStatus = (projectId: string, status: boolean) => {
  localStorage.setItem(`paymentStatus_${projectId}`, JSON.stringify(status));
};

const DemoPreview: React.FC<DemoPreviewProps> = ({ state, dispatch }) => {
  const { toast } = useToast();
  const location = useLocation();
  const projectDataFromRouter = location.state?.projectData;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);
  const { currentUser } = useAuth();

  const isPaid = state.projectData?.paid || (state.projectData?.id && getCachedPaymentStatus(state.projectData.id));
  const canViewLive = isPaymentSaved || isPaid;


  useEffect(() => {
    if (projectDataFromRouter && !state.projectData) {
      const rehydrated = {
        ...projectDataFromRouter,
        icon: getIconComponent(projectDataFromRouter.type),
        statusColor: 'bg-blue-500',
        liveUrl: ''
      };
      dispatch({ type: 'SET_PROJECT_DATA', payload: rehydrated });
    }
  }, [projectDataFromRouter, dispatch]);



  useEffect(() => {
    console.log('Is project data available?', !!state.projectData);
    console.group('📊 Data from Dashboard');
    console.log('Full project data:', state.projectData);
    console.log('Project title:', state.projectData?.title);
    console.log('Project description:', state.projectData?.description);
    console.log('Project type:', state.projectData?.type);
    console.log('Project status:', state.projectData?.status);
    console.log('Project progress:', state.projectData?.progress);
    console.log('Project price:', state.projectData?.price);
    console.log('Project LiveUrl:', state.projectData?.liveUrl);
    console.log('Project milestones:', state.projectData?.milestones);
    console.log('Project files:', state.projectData?.files);
    console.log('Project recent activity:', state.projectData?.recentActivity);
    console.log('Project paid:', state.projectData?.paid);
    console.groupEnd();
  }, [state.projectData]);

  useEffect(() => {
    if (state.projectData?.id) {
      const cachedStatus = getCachedPaymentStatus(state.projectData.id);
      if (cachedStatus) {
        dispatch({ type: 'UPDATE_PAYMENTS', payload: { prototype: true } });
      }
    }
  }, [state.projectData?.id, dispatch]);


  const getIconComponent = (type: string) => {
    switch (type.toLowerCase()) {
      case 'mvp': return Code;
      case 'website': return Globe;
      case '3d': return Box;
      default: return FileText;
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initializeRazorpayPayment = async (amount: number, packageType: 'interactive') => {
    console.log('🚀 Initiating Razorpay payment with amount:', amount, 'and packageType:', packageType);
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast({ title: 'Payment Error', description: 'Failed to load Razorpay SDK.', variant: 'destructive' });
      console.error('❌ Razorpay SDK failed to load');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/v1/payments/order`, {
        amount: 100,
        currency: 'INR'
      });

      console.log('✅ Order created successfully:', res.data);

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: 100 * 100,
        currency: 'INR',
        name: 'IdeaLaunch',
        description: 'Interactive Prototype',
        order_id: res.data.orderId,
        handler: function (response: any) {
          console.log('💰 Razorpay payment successful:', response);
          handlePaymentSuccess(response, packageType);
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '+1234567890'
        },
        theme: { color: '#7C3AED' },
        modal: {
          ondismiss: function () {
            toast({ title: 'Payment Cancelled', description: 'You cancelled the payment.', variant: 'destructive' });
            console.warn('⚠️ Razorpay modal dismissed');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('❌ Error creating Razorpay order:', err);
      toast({ title: 'Payment Error', description: 'Failed to initiate payment.', variant: 'destructive' });
    }
  };

  const handlePaymentSuccess = async (response: any, packageType: 'interactive') => {
    console.log('Payment successful response:', response);

    // 🔄 Step 1: Verify payment with backend
    let verifyResData;
    try {
      const verifyRes = await axios.post(`${BASE_URL}/v1/payments/verify`, {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature
      });

      verifyResData = verifyRes.data;
      console.log('✅ Payment verified on backend:', verifyResData);


    } catch (error) {
      console.error('❌ Payment verification failed:', error);
      toast({
        title: 'Verification Error',
        description: 'Payment verification failed on server.',
        variant: 'destructive'
      });
      return;
    }

    // 🧾 Step 2: Save payment to database
    const paymentPayload = {
      mvp_user_id: state.projectData?.id,
      uid: currentUser.uid,
      paymentId: response.razorpay_payment_id,
      price: 49.0,
      isPaid: true,
      transactionStatus: 'success',
      receipt: response.razorpay_order_id,
      currency: 'INR',
      paymentSignature: response.razorpay_signature,
      userContact: response.razorpay_contact || 'NA'
    };

    try {
      console.log('📤 Sending payment payload:', paymentPayload);

      const saveRes = await axios.post(
        `${BASE_URL}/mvp/save/payment`,
        paymentPayload
      );

      if (saveRes.status === 200) {
        console.log('✅ Payment record saved:', saveRes.data);
        setIsPaymentSaved(true); // ✅ unlock button
      } else {
        console.warn('⚠️ Save payment did not return 200:', saveRes.status);
        setIsPaymentSaved(false);
      }
    } catch (error) {
      console.error('❌ Failed to save payment record:', error);
      setIsPaymentSaved(false);
    }

    // After successful payment verification and saving
    if (state.projectData?.id) {
      setCachedPaymentStatus(state.projectData.id, true);
    }


    // 🎯 Step 3: Update UI state
    dispatch({
      type: 'SET_PREVIEW',
      payload: {
        type: packageType,
        accessToken: response.razorpay_payment_id,
        paymentStatus: 'success' as const,
        paymentId: response.razorpay_payment_id
      }
    });
    dispatch({ type: 'UPDATE_PAYMENTS', payload: { prototype: true } });

    toast({
      title: 'Payment Successful!',
      description: 'Live Project Access Unlocked.'
    });
  };


  const extractYouTubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Interactive Prototype</CardTitle>
          </CardHeader>
          <CardContent className="relative p-0">
            <div className={`relative rounded-xl overflow-hidden transition-all duration-500 ease-in-out border bg-gradient-to-br from-gray-100 to-white ${isExpanded ? 'h-[480px]' : 'h-64'}`}>
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${extractYouTubeId(state.projectData?.demoUrl || '')}`}
                title="YouTube video player"
                allowFullScreen
              ></iframe>
              <div className="absolute bottom-3 right-3 z-10">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="rounded-full shadow-md hover:scale-105 transition-transform"
                  title={isExpanded ? 'Shrink Video' : 'Expand Video'}
                >
                  {isExpanded ? <Minimize className="w-4 h-4 text-gray-700" /> : <Expand className="w-4 h-4 text-gray-700" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Architecture Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 h-48 flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>System Architecture Diagram</p>
                <p className="text-sm">(Mermaid.js visualization)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {SAMPLE_FEATURES.map((feature) => (
              <div key={feature.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Badge
                  variant={feature.priority === 'high' ? 'destructive' : feature.priority === 'medium' ? 'default' : 'secondary'}
                >
                  {feature.priority}
                </Badge>
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Purchase Card */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {PREVIEW_PACKAGES.map((pkg) => (
                <div
                  key={pkg.type}
                  className={`border rounded-lg p-4 ${state.preview.type === pkg.type ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{pkg.title}</h3>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">₹{pkg.price}</span>
                    </div>
                  </div>

                  <ul className="space-y-1 mb-4">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => initializeRazorpayPayment(pkg.price, pkg.type)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={(state.preview.type === pkg.type && !!state.preview.accessToken) || isPaid}
                  >
                    {(state.preview.type === pkg.type && state.preview.accessToken) || isPaid
                      ? '✓ Purchased'
                      : `Pay ₹${state.projectData?.price} with Razorpay`}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Locked Button Card */}
        <Card>
          <CardHeader>
            <CardTitle> Live Project Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm">
                Complete your payment to unlock and view your live MVP deployment.
              </p>
              <Button
                className={`w-full ${canViewLive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!canViewLive}
                onClick={() => {
                  if (canViewLive) {
                    const liveUrl = state.projectData?.liveUrl;
                    if (liveUrl) {
                      window.open(liveUrl, '_blank');
                    }
                  }
                  console.log("view live project button is clicked ");
                }}
              >
                {canViewLive ? '🚀 View Live Project' : '🔒 Locked — Complete Payment First'}
              </Button>
            </div>

          </CardContent>
        </Card>

        {/* Info Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                'Your idea enters our review process',
                'We create detailed wireframes and mockups',
                'Development begins with regular updates',
                'Final delivery with deployment options'
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">{index + 1}</span>
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default DemoPreview;