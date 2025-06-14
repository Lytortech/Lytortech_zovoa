
import { useReducer } from 'react';
import { WorkflowState, WorkflowAction } from '../types/workflow';

const initialState: WorkflowState = {
  currentStep: 1,
  selectedNiche: null,
  selectedTemplate: null,
  configuration: {
    apiKeys: {},
    domain: { type: 'buy' },
    design: {
      primaryColor: '#3B82F6',
      font: 'Inter',
      layout: 'grid'
    }
  },
  payment: null,
  deployment: {
    progress: 0,
    currentTask: '',
    isComplete: false
  }
};

function workflowReducer(state: WorkflowState, action: WorkflowAction): WorkflowState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SELECT_NICHE':
      return { ...state, selectedNiche: action.payload };
    case 'SELECT_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'UPDATE_CONFIG':
      return {
        ...state,
        configuration: { ...state.configuration, ...action.payload }
      };
    case 'SET_PAYMENT':
      return { ...state, payment: action.payload };
    case 'UPDATE_DEPLOYMENT':
      return {
        ...state,
        deployment: { ...state.deployment, ...action.payload }
      };
    default:
      return state;
  }
}

export const useWorkflow = () => {
  const [state, dispatch] = useReducer(workflowReducer, initialState);
  return { state, dispatch };
};
