import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import RadioGroup from '../../components/ui/RadioGroup';
import { getIndustryQuestions } from '../../data/industries';
import { useOnboarding } from '../../context/OnboardingContext';
import { useAuth } from '../../context/AuthContext';
import { ComplianceQuestion, ComplianceResponse } from '../../types';

const Step3: React.FC = () => {
  const { state, updateIndustryResponses, prevStep, completeOnboarding } = useOnboarding();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<ComplianceQuestion[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    if (!state.industry) {
      navigate('/onboarding/step1');
    }

    loadQuestions();
  }, [isAuthenticated, navigate, state.industry]);

  const loadQuestions = async () => {
    if (!state.industry) return;

    try {
      setIsLoading(true);
      const fetchedQuestions = await getIndustryQuestions(state.industry);
      setQuestions(fetchedQuestions);

      // Initialize responses from existing state if available
      if (state.industryResponses.length > 0) {
        const initialResponses: Record<string, string> = {};
        state.industryResponses.forEach((response) => {
          initialResponses[response.questionId] = response.response;
        });
        setResponses(initialResponses);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleComplete = async () => {
    const formattedResponses: ComplianceResponse[] = Object.entries(responses).map(
      ([questionId, response]) => ({
        questionId,
        response: response as 'Yes' | 'No' | 'NotApplicable',
      })
    );

    await updateIndustryResponses(formattedResponses);
    completeOnboarding();
  };

  const allQuestionsAnswered = questions.every(
    (question) => responses[question.id]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
            <div 
              className="h-full rounded-full gradient-bg"
              style={{ width: '100%', transition: 'width 0.5s ease-in-out' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Step 1: Industry</span>
            <span>Step 2: General</span>
            <span className="font-medium text-primary">Step 3: Specific</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{state.industry} Specific Questions</h1>
            <p className="mt-2 text-gray-600">
              These questions apply specifically to businesses in the {state.industry} industry
            </p>
          </div>

          <div className="space-y-8">
            {questions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No industry-specific questions available for {state.industry} at this time.</p>
                <p className="text-sm text-gray-500 mt-2">You can proceed to complete your onboarding.</p>
              </div>
            ) : (
              questions.map((question) => (
                <div key={question.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary/50 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-3">{question.question}</h3>
                  <RadioGroup
                    name={`question-${question.id}`}
                    value={responses[question.id]}
                    onChange={(value) => handleResponseChange(question.id, value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                      { value: 'NotApplicable', label: 'Not Applicable' },
                    ]}
                  />
                </div>
              ))
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep}
              >
                Previous
              </Button>
              <Button 
                onClick={handleComplete}
                disabled={questions.length > 0 && !allQuestionsAnswered}
              >
                Complete & View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;