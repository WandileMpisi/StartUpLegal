import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComplianceResponse, OnboardingState, Industry } from '../types';
import { getFromStorage, saveToStorage } from '../lib/utils';

interface OnboardingContextType {
  state: OnboardingState;
  setIndustry: (industry: Industry) => void;
  updateGeneralResponses: (responses: ComplianceResponse[]) => void;
  updateIndustryResponses: (responses: ComplianceResponse[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOnboarding: () => void;
  completeOnboarding: () => void;
}

const defaultOnboardingState: OnboardingState = {
  industry: '' as Industry,
  generalResponses: [],
  industryResponses: [],
  currentStep: 1,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(() => {
    const savedState = getFromStorage<OnboardingState>('onboarding', defaultOnboardingState);
    return savedState;
  });
  const navigate = useNavigate();

  // Save state to local storage whenever it changes
  useEffect(() => {
    saveToStorage('onboarding', state);
  }, [state]);

  const setIndustry = (industry: Industry) => {
    setState((prev) => ({
      ...prev,
      industry,
    }));
  };

  const updateGeneralResponses = (responses: ComplianceResponse[]) => {
    setState((prev) => ({
      ...prev,
      generalResponses: responses,
    }));
  };

  const updateIndustryResponses = (responses: ComplianceResponse[]) => {
    setState((prev) => ({
      ...prev,
      industryResponses: responses,
    }));
  };

  const nextStep = () => {
    const nextStepNum = state.currentStep + 1;
    setState((prev) => ({
      ...prev,
      currentStep: nextStepNum,
    }));

    // Navigate to the appropriate step
    switch (nextStepNum) {
      case 2:
        navigate('/onboarding/step2');
        break;
      case 3:
        navigate('/onboarding/step3');
        break;
      case 4:
        // Onboarding complete, navigate to dashboard
        navigate('/dashboard');
        break;
      default:
        break;
    }
  };

  const prevStep = () => {
    const prevStepNum = Math.max(1, state.currentStep - 1);
    setState((prev) => ({
      ...prev,
      currentStep: prevStepNum,
    }));

    // Navigate to the appropriate step
    switch (prevStepNum) {
      case 1:
        navigate('/onboarding/step1');
        break;
      case 2:
        navigate('/onboarding/step2');
        break;
      default:
        break;
    }
  };

  const resetOnboarding = () => {
    setState(defaultOnboardingState);
    navigate('/onboarding/step1');
  };

  const completeOnboarding = () => {
    saveToStorage('onboardingCompleted', true);
    navigate('/dashboard');
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setIndustry,
        updateGeneralResponses,
        updateIndustryResponses,
        nextStep,
        prevStep,
        resetOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};