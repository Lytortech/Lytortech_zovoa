
import { useReducer } from 'react';
import { MVPState, MVPWorkflowAction } from '../types/mvpWorkflow';

const initialState: MVPState = {
  step: 'submit',
  idea: {
    name: '',
    description: '',
    audience: [],
    platform: 'web',
    attachments: [],
    mail: '',
    phone_number: ''
  },
  preview: {
    type: 'free',
    features: [],
    price: 0
  },
  payments: {
    prototype: false,
    design: false,
    development: false
  },
  status: 'review',
  projectData: null
};

export function mvpWorkflowReducer(state: MVPState, action: MVPWorkflowAction): MVPState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'UPDATE_IDEA':
      return {
        ...state,
        idea: {
          ...state.idea,
          ...action.payload,
          attachments: action.payload.attachments ?? state.idea.attachments
        }
      };

    case 'SET_PREVIEW':
      return {
        ...state,
        preview: {
          ...state.preview,
          ...action.payload,
          features: action.payload.features ?? state.preview.features
        }
      };

    case 'UPDATE_PAYMENTS':
      return {
        ...state,
        payments: {
          ...state.payments,
          ...action.payload
        }
      };

    case 'SET_STATUS':
      return { ...state, status: action.payload };

    case 'SET_PROJECT_DATA':
      return {
        ...state,
        projectData: action.payload,
        idea: {
          ...state.idea,
          name: action.payload.title || '',
          description: action.payload.description || '',
          platform: getPlatformFromType(action.payload.type),
          //mail: action.payload.contact?.email || state.idea.mail,
          //phone_number: action.payload.contact?.phone || state.idea.phone_number
        },
        step: 'preview'
      };

    case 'RESET_WORKFLOW':
      return initialState;

    case 'SET_DEVELOPMENT_PHASES':
      return {
        ...state,
        developmentPhases: action.payload
      };

    case 'UPDATE_DEVELOPMENT_PHASE':
      return {
        ...state,
        developmentPhases: state.developmentPhases?.map(phase =>
          phase.id === action.payload.id ? { ...phase, ...action.payload } : phase
        )
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        developmentPhases: state.developmentPhases?.map(phase =>
          phase.id === action.payload.phaseId
            ? {
              ...phase,
              feedback: [
                ...phase.feedback,
                {
                  id: Date.now().toString(),
                  text: action.payload.text,
                  timestamp: new Date().toISOString(),
                  attachments: action.payload.attachments
                }
              ]
            }
            : phase
        )
      };

    default:
      return state;
  }
}

function getPlatformFromType(type: string): MVPState['idea']['platform'] {
  switch (type.toLowerCase()) {
    case 'mobile':
      return 'mobile';
    case 'desktop':
      return 'desktop';
    case '3d':
      return 'cross';
    default:
      return 'web';
  }
}

export const useMVPWorkflow = () => {
  const [state, dispatch] = useReducer(mvpWorkflowReducer, initialState);
  return { state, dispatch };
};













// useEffect(() => {
//     console.log('Is project data available?', !!state.projectData);
//     console.group('📊 Data from Dashboard');
//     console.log('Full project data:', state.projectData);
//     console.log('Project title:', state.projectData?.title);
//     console.log('Project description:', state.projectData?.description);
//     console.log('Project type:', state.projectData?.type);
//     console.log('Project status:', state.projectData?.status);
//     console.log('Project progress:', state.projectData?.progress);
//     console.log('Project price:', state.projectData?.price);
//     console.log('Project Live-Url:', state.projectData?.liveUrl);
//     console.log('Project milestones:', state.projectData?.milestones);
//     console.log('Project files:', state.projectData?.files);
//     console.log('Project recent activity:', state.projectData?.recentActivity);
//     console.groupEnd();
//   }, [state.projectData]);











































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
//   projectData: null,
//   developmentPhases: []
// };


// function mvpWorkflowReducer(state: MVPState, action: MVPWorkflowAction): MVPState {
//   switch (action.type) {
//     case 'SET_STEP':
//       return { ...state, step: action.payload };
//     case 'UPDATE_IDEA':
//       return {
//         ...state,
//         idea: { ...state.idea, ...action.payload }
//       };
//     case 'SET_PREVIEW':
//       return {
//         ...state,
//         preview: { ...state.preview, ...action.payload }
//       };
//     case 'UPDATE_PAYMENTS':
//       return {
//         ...state,
//         payments: { ...state.payments, ...action.payload }
//       };
//     case 'SET_PROJECT_DATA':
//       return {
//         ...state,
//         projectData: action.payload,
//         idea: {
//           ...state.idea,
//           name: action.payload.title || '',
//           description: action.payload.description || '',
//           platform: getPlatformFromType(action.payload.type),
//           // mail: action.payload.contact?.email || state.idea.mail,
//           // phone_number: action.payload.contact?.phone || state.idea.phone_number
//         },
//         step: 'preview'
//       };
//     case 'SET_STATUS':
//       return { ...state, status: action.payload };

//     default:
//       return state;
//   }
// }

// export const useMVPWorkflow = () => {
//   const [state, dispatch] = useReducer(mvpWorkflowReducer, initialState);
//   return { state, dispatch };
// };

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
