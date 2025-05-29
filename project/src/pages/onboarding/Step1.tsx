import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { industries } from '../../data/industries';
import { useOnboarding } from '../../context/OnboardingContext';
import { useAuth } from '../../context/AuthContext';

const Step1: React.FC = () => {
  const { state, setIndustry, nextStep } = useOnboarding();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleContinue = () => {
    if (state.industry) {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
            <div 
              className="h-full rounded-full gradient-bg"
              style={{ width: '33.33%', transition: 'width 0.5s ease-in-out' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="font-medium text-primary">Step 1: Industry</span>
            <span>Step 2: General</span>
            <span>Step 3: Specific</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Select Your Industry</h1>
            <p className="mt-2 text-gray-600">
              We'll customize your compliance questions based on your industry
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <Select
                placeholder="Select your industry"
                options={industries}
                value={state.industry}
                onChange={(value) => setIndustry(value as any)}
              />
              {!state.industry && (
                <p className="text-sm text-gray-500">
                  Selecting your industry helps us provide relevant compliance guidance
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!state.industry}
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

export default Step1;