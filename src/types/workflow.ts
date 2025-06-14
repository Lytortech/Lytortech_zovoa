
export interface WorkflowState {
  currentStep: number;
  selectedNiche: Niche | null;
  selectedTemplate: Template | null;
  configuration: Configuration;
  payment: PaymentInfo | null;
  deployment: DeploymentStatus;
}

export interface Niche {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  requiresKeys: string[];
}

export interface Template {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  demoUrl: string;
  tags: string;
  price: number;
  nicheId: string;
}

export interface Configuration {
  apiKeys: {
    razorpayKey?: string;
    razorpaySecret?: string;
    calendarKey?: string;
  };
  domain: {
    type: 'own' | 'buy';
    existing?: {
      domain: string;
      dnsProvider: string;
    };
    new?: {
      name: string;
      tld: string;
    };
  };
  design: {
    primaryColor: string;
    font: string;
    layout: 'grid' | 'list';
  };
}

export interface PaymentInfo {
  amount: number;
  breakdown: {
    template: number;
    domain?: number;
  };
}

export interface DeploymentStatus {
  progress: number;
  currentTask: string;
  isComplete: boolean;
  liveUrl?: string;
  adminUrl?: string;
}

export type WorkflowAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SELECT_NICHE'; payload: Niche }
  | { type: 'SELECT_TEMPLATE'; payload: Template }
  | { type: 'UPDATE_CONFIG'; payload: Partial<Configuration> }
  | { type: 'SET_PAYMENT'; payload: PaymentInfo }
  | { type: 'UPDATE_DEPLOYMENT'; payload: Partial<DeploymentStatus> };
