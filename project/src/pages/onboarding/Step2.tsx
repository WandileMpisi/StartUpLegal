import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import RadioGroup from '../../components/ui/RadioGroup';
import { generalQuestions } from '../../data/industries';
import { useOnboarding } from '../../context/OnboardingContext';
import { useAuth } from '../../context/AuthContext';
import { ComplianceResponse } from '../../types';

const Step2: React.FC = () => {
  const { state, updateGeneralResponses, nextStep, prevStep } = useOnboarding();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    if (!state.industry) {
      navigate('/onboarding/step1');
    }

    // Initialize responses from existing state if available
    if (state.generalResponses.length > 0) {
      const initialResponses: Record<string, string> = {};
      state.generalResponses.forEach((response) => {
        initialResponses[response.questionId] = response.response;
      });
      setResponses(initialResponses);
    }
  }, [isAuthenticated, navigate, state.industry, state.generalResponses]);

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleContinue = () => {
    const formattedResponses: ComplianceResponse[] = Object.entries(responses).map(
      ([questionId, response]) => ({
        questionId,
        response: response as 'Yes' | 'No' | 'NotApplicable',
      })
    );

    updateGeneralResponses(formattedResponses);
    nextStep();
  };

  const allQuestionsAnswered = generalQuestions.every(
    (question) => responses[question.id]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
            <div 
              className="h-full rounded-full gradient-bg"
              style={{ width: '66.66%', transition: 'width 0.5s ease-in-out' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Step 1: Industry</span>
            <span className="font-medium text-primary">Step 2: General</span>
            <span>Step 3: Specific</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">General Compliance Questions</h1>
            <p className="mt-2 text-gray-600">
              These questions apply to all businesses in South Africa
            </p>
          </div>

          <div className="space-y-8">
            {generalQuestions.map((question) => (
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
            ))}

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep}
              >
                Previous
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!allQuestionsAnswered}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;