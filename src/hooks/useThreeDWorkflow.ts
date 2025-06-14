
import { useReducer } from 'react';
import { ThreeDWorkflowState, ThreeDWorkflowAction } from '../types/threeDWorkflow';

const initialState: ThreeDWorkflowState = {
  currentStep: 1,
  selectedBrand: null,
  selectedTemplate: null,
  customization: {
    domain: {
      type: 'subdomain',
      tld: '.com'
    },
    design: {
      brandColor: '#3B82F6',
      texture: 'matte',
      lighting: 50,
      backgroundMusic: false
    }
  },
  deployment: {
    progress: 0,
    currentTask: '',
    isComplete: false
  }
};

function threeDWorkflowReducer(state: ThreeDWorkflowState, action: ThreeDWorkflowAction): ThreeDWorkflowState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SELECT_BRAND':
      return { ...state, selectedBrand: action.payload };
    case 'SELECT_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'UPDATE_CUSTOMIZATION':
      return {
        ...state,
        customization: { ...state.customization, ...action.payload }
      };
    case 'UPDATE_DEPLOYMENT':
      return {
        ...state,
        deployment: { ...state.deployment, ...action.payload }
      };
    default:
      return state;
  }
}

export const useThreeDWorkflow = () => {
  const [state, dispatch] = useReducer(threeDWorkflowReducer, initialState);
  return { state, dispatch };
};
