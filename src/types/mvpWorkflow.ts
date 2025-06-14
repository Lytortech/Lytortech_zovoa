// import { ServiceRequest } from '../types/mvpWorkflow';
// import { useReducer } from 'react';

interface ServiceRequest {
  id: string;
  type: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  createdAt: string;
  estimatedCompletion: string;
  price: number;
  icon: any;
  demoUrl?:string;
  statusColor: string;
  priority: string;
  assignedTo: string;
  nextMilestone?: string;
  completedAt?: string;
  liveUrl?: string;
  paid: boolean;
  milestones: {
    name: string;
    completed: boolean;
    current?: boolean;
    date?: string;
    dueDate?: string;
  }[];
  files: {
    name: string;
    size: string;
    uploadDate: string;
  }[];
  recentActivity: {
    action: string;
    date: string;
    type: string;
  }[];
}

export interface MVPState {
  step: 'submit' | 'preview' | 'tracking' | 'delivery';
  idea: {
    name: string;
    description: string;
    audience: string[];
    platform: 'mobile' | 'web' | 'desktop' | 'cross';
    attachments: string[]; // S3 URLs
    mail: string;
    phone_number: string;
  };
  preview: {
    type: 'free' | 'interactive' | 'investor';
    accessToken?: string;
    paymentStatus?: 'pending' | 'success' | 'failed';
    paymentId?: string;
    figmaEmbed?: string;
    architectureDiagram?: string;
    features?: Feature[];
    price?: number;
  };
  payments: {
    prototype: boolean;
    design: boolean;
    development: boolean;
  };
  status: 'review' | 'design' | 'development' | 'ready';
  projectData: ServiceRequest | null;
  developmentPhases?: DevelopmentPhase[];
}

export interface IdeaSubmission {
  name: string;
  description: string;
  audience: string[];
  platform: 'mobile' | 'web' | 'desktop' | 'cross';
  attachments: File[];
  mail: string;
  phone_number: string;
}

export interface PreviewPackage {
  type: 'free' | 'interactive' | 'investor';
  figmaEmbed?: string;
  architectureDiagram?: string;
  features: Feature[];
  price: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface DevelopmentPhase {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'done';
  dateStarted?: string;
  dateCompleted?: string;
  feedback: Comment[];
  milestonePayment?: number;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: string;
  attachments?: string[];
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export type MVPWorkflowAction =
  | { type: 'SET_STEP'; payload: MVPState['step'] }
  | { type: 'UPDATE_IDEA'; payload: Partial<MVPState['idea']> }
  | { type: 'SET_PREVIEW'; payload: Partial<MVPState['preview']> }
  | { type: 'UPDATE_PAYMENTS'; payload: Partial<MVPState['payments']> }
  | { type: 'SET_STATUS'; payload: MVPState['status'] }
  | { type: 'SET_PROJECT_DATA'; payload: ServiceRequest }
  | { type: 'RESET_WORKFLOW' }
  | { type: 'UPDATE_DEVELOPMENT_PHASE'; payload: { id: string } & Partial<DevelopmentPhase> }
  | { type: 'ADD_COMMENT'; payload: { phaseId: string; text: string; attachments?: string[] } }
  | { type: 'SET_DEVELOPMENT_PHASES'; payload: DevelopmentPhase[] };












// const initialState: MVPState = {
//   step: 'submit',
//   idea: {
//     name: '',
//     description: '',
//     audience: [],
//     platform: 'web',
//     attachments: [],
//     mail: '',
//     phone_number: ''
//   },
//   preview: {
//     type: 'free',
//     features: [],
//     price: 0
//   },
//   payments: {
//     prototype: false,
//     design: false,
//     development: false
//   },
//   status: 'review',
//   projectData: null
// };

// export function mvpWorkflowReducer(state: MVPState, action: MVPWorkflowAction): MVPState {
//   switch (action.type) {
//     case 'SET_STEP':
//       return { ...state, step: action.payload };

//     case 'UPDATE_IDEA':
//       return {
//         ...state,
//         idea: {
//           ...state.idea,
//           ...action.payload,
//           attachments: action.payload.attachments ?? state.idea.attachments
//         }
//       };

//     case 'SET_PREVIEW':
//       return {
//         ...state,
//         preview: {
//           ...state.preview,
//           ...action.payload,
//           features: action.payload.features ?? state.preview.features
//         }
//       };

//     case 'UPDATE_PAYMENTS':
//       return {
//         ...state,
//         payments: {
//           ...state.payments,
//           ...action.payload
//         }
//       };

//     case 'SET_STATUS':
//       return { ...state, status: action.payload };

//     case 'SET_PROJECT_DATA':
//       return {
//         ...state,
//         projectData: action.payload,
//         idea: {
//           ...state.idea,
//           name: action.payload.title || '',
//           description: action.payload.description || '',
//           platform: getPlatformFromType(action.payload.type),
//           //mail: action.payload.contact?.email || state.idea.mail,
//           //phone_number: action.payload.contact?.phone || state.idea.phone_number
//         },
//         step: 'preview'
//       };

//     case 'RESET_WORKFLOW':
//       return initialState;

//     case 'SET_DEVELOPMENT_PHASES':
//       return {
//         ...state,
//         developmentPhases: action.payload
//       };

//     case 'UPDATE_DEVELOPMENT_PHASE':
//       return {
//         ...state,
//         developmentPhases: state.developmentPhases?.map(phase =>
//           phase.id === action.payload.id ? { ...phase, ...action.payload } : phase
//         )
//       };

//     case 'ADD_COMMENT':
//       return {
//         ...state,
//         developmentPhases: state.developmentPhases?.map(phase =>
//           phase.id === action.payload.phaseId
//             ? {
//               ...phase,
//               feedback: [
//                 ...phase.feedback,
//                 {
//                   id: Date.now().toString(),
//                   text: action.payload.text,
//                   timestamp: new Date().toISOString(),
//                   attachments: action.payload.attachments
//                 }
//               ]
//             }
//             : phase
//         )
//       };

//     default:
//       return state;
//   }
// }

// function getPlatformFromType(type: string): MVPState['idea']['platform'] {
//   switch (type.toLowerCase()) {
//     case 'mobile':
//       return 'mobile';
//     case 'desktop':
//       return 'desktop';
//     case '3d':
//       return 'cross';
//     default:
//       return 'web';
//   }
// }

// export const useMVPWorkflow = () => {
//   const [state, dispatch] = useReducer(mvpWorkflowReducer, initialState);
//   return { state, dispatch };
// };