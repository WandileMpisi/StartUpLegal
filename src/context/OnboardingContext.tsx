import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { ComplianceResponse, OnboardingState, Industry } from '../types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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
  const [state, setState] = useState<OnboardingState>(defaultOnboardingState);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Load onboarding state from database when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadOnboardingState();
    }
  }, [isAuthenticated, user]);

  const loadOnboardingState = async () => {
    if (!user) return;

    try {
      const { data: session, error } = await supabase
        .from('onboarding_sessions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (session) {
        // Load user responses
        const { data: responses, error: responsesError } = await supabase
          .from('user_responses')
          .select(`
            *,
            compliance_questions (
              question_key,
              industry
            )
          `)
          .eq('user_id', user.id);

        if (responsesError) {
          throw responsesError;
        }

        const generalResponses: ComplianceResponse[] = [];
        const industryResponses: ComplianceResponse[] = [];

        responses?.forEach((response: any) => {
          const complianceResponse: ComplianceResponse = {
            questionId: response.compliance_questions.question_key,
            response: response.response,
          };

          if (response.compliance_questions.industry === null) {
            generalResponses.push(complianceResponse);
          } else {
            industryResponses.push(complianceResponse);
          }
        });

        setState({
          industry: session.industry || ('' as Industry),
          generalResponses,
          industryResponses,
          currentStep: session.current_step || 1,
        });
      }
    } catch (error: any) {
      console.error('Error loading onboarding state:', error);
    }
  };

  const saveOnboardingState = async (newState: Partial<OnboardingState>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('onboarding_sessions')
        .upsert({
          user_id: user.id,
          current_step: newState.currentStep || state.currentStep,
          industry: newState.industry || state.industry,
        });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error saving onboarding state:', error);
    }
  };

  const setIndustry = async (industry: Industry) => {
    const newState = { ...state, industry };
    setState(newState);
    await saveOnboardingState({ industry });

    // Update user profile with industry
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ industry })
        .eq('id', user!.id);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error updating user industry:', error);
    }
  };

  const saveResponses = async (responses: ComplianceResponse[], isIndustrySpecific: boolean) => {
    if (!user) return;

    try {
      // Get question IDs from question keys
      const questionKeys = responses.map(r => r.questionId);
      const { data: questions, error: questionsError } = await supabase
        .from('compliance_questions')
        .select('id, question_key')
        .in('question_key', questionKeys);

      if (questionsError) {
        throw questionsError;
      }

      // Prepare responses for database
      const dbResponses = responses.map(response => {
        const question = questions?.find(q => q.question_key === response.questionId);
        return {
          user_id: user.id,
          question_id: question?.id,
          response: response.response,
        };
      }).filter(r => r.question_id); // Filter out responses without matching questions

      if (dbResponses.length > 0) {
        const { error } = await supabase
          .from('user_responses')
          .upsert(dbResponses, {
            onConflict: 'user_id,question_id'
          });

        if (error) {
          throw error;
        }
      }
    } catch (error: any) {
      console.error('Error saving responses:', error);
      toast.error('Failed to save responses');
    }
  };

  const updateGeneralResponses = async (responses: ComplianceResponse[]) => {
    setState((prev) => ({
      ...prev,
      generalResponses: responses,
    }));
    await saveResponses(responses, false);
  };

  const updateIndustryResponses = async (responses: ComplianceResponse[]) => {
    setState((prev) => ({
      ...prev,
      industryResponses: responses,
    }));
    await saveResponses(responses, true);
  };

  const nextStep = async () => {
    const nextStepNum = state.currentStep + 1;
    const newState = { ...state, currentStep: nextStepNum };
    setState(newState);
    await saveOnboardingState({ currentStep: nextStepNum });

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

  const prevStep = async () => {
    const prevStepNum = Math.max(1, state.currentStep - 1);
    const newState = { ...state, currentStep: prevStepNum };
    setState(newState);
    await saveOnboardingState({ currentStep: prevStepNum });

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

  const resetOnboarding = async () => {
    setState(defaultOnboardingState);
    if (user) {
      try {
        // Delete onboarding session
        await supabase
          .from('onboarding_sessions')
          .delete()
          .eq('user_id', user.id);

        // Delete user responses
        await supabase
          .from('user_responses')
          .delete()
          .eq('user_id', user.id);
      } catch (error: any) {
        console.error('Error resetting onboarding:', error);
      }
    }
    navigate('/onboarding/step1');
  };

  const completeOnboarding = async () => {
    if (!user) return;

    try {
      // Mark onboarding as completed
      const { error } = await supabase
        .from('onboarding_sessions')
        .update({ completed_at: new Date().toISOString() })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      // Generate compliance items based on responses
      await generateComplianceItems();

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding');
    }
  };

  const generateComplianceItems = async () => {
    if (!user) return;

    try {
      // Get all questions that the user answered "No" to
      const { data: responses, error: responsesError } = await supabase
        .from('user_responses')
        .select(`
          *,
          compliance_questions (*)
        `)
        .eq('user_id', user.id)
        .eq('response', 'No');

      if (responsesError) {
        throw responsesError;
      }

      // Generate compliance items for each "No" response
      const complianceItems = responses?.map((response: any) => {
        const question = response.compliance_questions;
        return {
          user_id: user.id,
          title: question.compliance_requirement,
          description: question.implementation_steps,
          type: 'Required' as const,
          status: 'Pending' as const,
          industry: question.industry,
          question_id: question.id,
          official_site_url: getOfficialSiteUrl(question.law_requirement),
        };
      }) || [];

      if (complianceItems.length > 0) {
        const { error } = await supabase
          .from('compliance_items')
          .upsert(complianceItems, {
            onConflict: 'user_id,question_id'
          });

        if (error) {
          throw error;
        }
      }
    } catch (error: any) {
      console.error('Error generating compliance items:', error);
    }
  };

  const getOfficialSiteUrl = (lawRequirement: string): string | undefined => {
    if (lawRequirement.includes('POPIA')) {
      return 'https://www.justice.gov.za/inforeg/';
    }
    if (lawRequirement.includes('SARS') || lawRequirement.includes('Tax')) {
      return 'https://www.sars.gov.za';
    }
    if (lawRequirement.includes('FSCA') || lawRequirement.includes('FAIS')) {
      return 'https://www.fsca.co.za';
    }
    return undefined;
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