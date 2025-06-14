
export interface ThreeDWorkflowState {
  currentStep: number;
  selectedBrand: BrandNiche | null;
  selectedTemplate: ThreeDTemplate | null;
  customization: BrandCustomization;
  deployment: ThreeDDeployment;
}

export interface BrandNiche {
  id: string;
  title: string;
  description: string;
  icon: string;
  modelUrl: string;
  experience: string;
}

export interface ThreeDTemplate {
  id: string;
  title: string;
  description: string;
  modelUrl: string;
  demoUrl: string;
  tags: string;
  style: 'minimalist' | 'interactive' | 'photorealistic';
  brandNicheId: string;
}

export interface BrandCustomization {
  domain: {
    type: 'subdomain' | 'custom';
    value?: string;
    tld: string;
  };
  design: {
    brandColor: string;
    texture: 'matte' | 'glossy' | 'transparent';
    lighting: number;
    logo?: File;
    backgroundMusic: boolean;
  };
}

export interface ThreeDDeployment {
  progress: number;
  currentTask: string;
  isComplete: boolean;
  liveUrl?: string;
  arQrCode?: string;
}

export type ThreeDWorkflowAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SELECT_BRAND'; payload: BrandNiche }
  | { type: 'SELECT_TEMPLATE'; payload: ThreeDTemplate }
  | { type: 'UPDATE_CUSTOMIZATION'; payload: Partial<BrandCustomization> }
  | { type: 'UPDATE_DEPLOYMENT'; payload: Partial<ThreeDDeployment> };
