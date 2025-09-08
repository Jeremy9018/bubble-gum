import React from 'react';
import { cn } from '@/lib/utils';
import { STEPS } from '@/lib/constants';

interface ProgressProps {
  currentStep: number;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ currentStep, className }) => {
  const progressPercentage = (currentStep / STEPS.length) * 100;

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile Progress Bar */}
      <div className="block sm:hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200',
                      isCompleted && 'border-blue-600 bg-blue-600 text-white',
                      isCurrent && 'border-blue-600 bg-white text-blue-600 ring-4 ring-blue-100',
                      isUpcoming && 'border-gray-300 bg-white text-gray-400'
                    )}
                  >
                    {isCompleted ? (
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={cn(
                        'text-xs font-medium',
                        (isCompleted || isCurrent) && 'text-gray-900',
                        isUpcoming && 'text-gray-400'
                      )}
                    >
                      {step.title}
                    </div>
                    <div
                      className={cn(
                        'text-xs',
                        (isCompleted || isCurrent) && 'text-gray-500',
                        isUpcoming && 'text-gray-400'
                      )}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-4 h-0.5 w-16 transition-all duration-200 lg:w-24',
                      stepNumber < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Progress };