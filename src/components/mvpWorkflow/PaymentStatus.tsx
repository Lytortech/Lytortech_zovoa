
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface PaymentStatusProps {
  status: 'pending' | 'success' | 'failed';
  amount: number;
  packageType: string;
  paymentId?: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ 
  status, 
  amount, 
  packageType, 
  paymentId 
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'failed':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Clock className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Payment Successful</Badge>;
      case 'failed':
        return <Badge variant="destructive">Payment Failed</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          {getStatusIcon()}
        </div>
        <CardTitle>Payment Status</CardTitle>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-semibold">{packageType}</p>
          <p className="text-2xl font-bold text-purple-600">${amount}</p>
        </div>
        
        {paymentId && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Payment ID:</p>
            <p className="text-sm text-gray-600 font-mono">{paymentId}</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="text-center text-green-600">
            <p className="font-medium">Thank you for your purchase!</p>
            <p className="text-sm">You now have access to your selected package.</p>
          </div>
        )}
        
        {status === 'failed' && (
          <div className="text-center text-red-600">
            <p className="font-medium">Payment could not be processed</p>
            <p className="text-sm">Please try again or contact support.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentStatus;
