import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="relative flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  step.id <= currentStep
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'border-gray-300'
                } transition-all duration-300 ease-in-out ${
                  onStepClick ? 'cursor-pointer hover:scale-110' : ''
                }`}
                onClick={() => onStepClick && onStepClick(step.id)}
              >
                {step.id < currentStep ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span
                    className={`text-sm font-bold ${
                      step.id <= currentStep ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {step.id}
                  </span>
                )}
              </div>
              <div
                className={`mt-2 text-xs font-medium uppercase ${
                  step.id <= currentStep ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="text-xs text-gray-400 text-center mt-1 max-w-xs">
                  {step.description}
                </div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  step.id < currentStep ? 'border-indigo-600' : 'border-gray-300'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface FormWizardProps {
  steps: Step[];
  onComplete: (data: any) => void;
}

const FormWizard: React.FC<FormWizardProps> = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderFormStep = (step: Step) => {
    switch (step.id) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.email || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.address || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.city || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.cardNumber || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.expiryDate || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[currentStep - 1].title}</h2>
          {renderFormStep(steps[currentStep - 1])}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {currentStep === steps.length ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage
const App: React.FC = () => {
  const steps = [
    { id: 1, title: 'Personal Info', description: 'Enter your personal details' },
    { id: 2, title: 'Address', description: 'Provide your address information' },
    { id: 3, title: 'Payment', description: 'Enter your payment details' },
  ];

  const handleComplete = (data: any) => {
    console.log('Form completed with data:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <FormWizard steps={steps} onComplete={handleComplete} />
    </div>
  );
};

export default App;