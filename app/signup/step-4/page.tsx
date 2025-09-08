'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { validateStep4 } from '@/lib/validations';
import { cn } from '@/lib/utils';

// Default competitor suggestions (from report data)
const DEFAULT_COMPETITORS = [
  '유니세프',
  '월드비전',
  '굿네이버스',
  '컴패션',
  '세이브더칠드런'
];

export default function Step4Page() {
  const router = useRouter();
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customCompetitor, setCustomCompetitor] = useState('');
  
  const step4Data = formData.step4 || { competitors: DEFAULT_COMPETITORS.slice() };
  const selectedCompetitors = step4Data.competitors || [];

  const handleCompetitorToggle = (competitor: string) => {
    let newCompetitors;
    
    if (selectedCompetitors.includes(competitor)) {
      // Remove competitor
      newCompetitors = selectedCompetitors.filter(c => c !== competitor);
    } else {
      // Add competitor (limit to 10 max)
      if (selectedCompetitors.length < 10) {
        newCompetitors = [...selectedCompetitors, competitor];
      } else {
        return; // Don't add if already at max
      }
    }
    
    updateFormData('step4', { competitors: newCompetitors });
    
    // Clear error if it exists
    if (errors.competitors) {
      setErrors(prev => ({ ...prev, competitors: '' }));
    }
  };

  const handleAddCustomCompetitor = () => {
    if (customCompetitor.trim() && !selectedCompetitors.includes(customCompetitor.trim()) && selectedCompetitors.length < 10) {
      const newCompetitors = [...selectedCompetitors, customCompetitor.trim()];
      updateFormData('step4', { competitors: newCompetitors });
      setCustomCompetitor('');
      
      // Clear error if it exists
      if (errors.competitors) {
        setErrors(prev => ({ ...prev, competitors: '' }));
      }
    }
  };

  const handleRemoveCompetitor = (competitor: string) => {
    const newCompetitors = selectedCompetitors.filter(c => c !== competitor);
    updateFormData('step4', { competitors: newCompetitors });
  };

  const handleBack = () => {
    router.push('/signup/step-3');
  };

  const handleNext = () => {
    const validationErrors = validateStep4({ competitors: selectedCompetitors });
    
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(error => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    router.push('/signup/step-5');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Who are your main competitors?
        </h1>
        <p className="text-lg text-gray-600">
          Select up to 5 competitors that you'd like to compare your brand against. We've suggested some similar brands to get you started.
        </p>
      </div>

      {/* Selection Counter */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-blue-50 p-4">
        <div className="flex items-center text-sm">
          <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 7-2 7m-14 0l-2-7 2-7" />
          </svg>
          <span className="text-blue-800">
            <strong>{selectedCompetitors.length}</strong> of 5 competitors selected
          </span>
        </div>
        {selectedCompetitors.length >= 3 && (
          <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
            Good selection
          </span>
        )}
      </div>

      {/* Error Message */}
      {errors.competitors && (
        <div className="mb-6 rounded-lg bg-red-50 p-4">
          <div className="flex items-center">
            <svg className="mr-2 h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-800">{errors.competitors}</p>
          </div>
        </div>
      )}

      {/* Suggested Competitors */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Suggested Competitors</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEFAULT_COMPETITORS.map((competitor) => {
            const isSelected = selectedCompetitors.includes(competitor);
            const isAtMax = selectedCompetitors.length >= 5 && !isSelected;

            return (
              <Card
                key={competitor}
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  isSelected && 'ring-2 ring-blue-500 border-blue-500 bg-blue-50',
                  !isSelected && !isAtMax && 'hover:border-gray-400 hover:shadow-md',
                  isAtMax && 'opacity-50 cursor-not-allowed'
                )}
                onClick={() => !isAtMax && handleCompetitorToggle(competitor)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className={cn(
                      'text-base',
                      isSelected ? 'text-blue-900' : 'text-gray-900'
                    )}>
                      {competitor}
                    </CardTitle>
                    {isSelected && (
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Custom Competitor */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Add Custom Competitor</h3>
        <div className="flex gap-3">
          <Input
            type="text"
            value={customCompetitor}
            onChange={(e) => setCustomCompetitor(e.target.value)}
            placeholder="Enter competitor name..."
            className="flex-1"
            disabled={selectedCompetitors.length >= 5}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCustomCompetitor();
              }
            }}
          />
          <Button 
            onClick={handleAddCustomCompetitor}
            variant="outline"
            disabled={!customCompetitor.trim() || selectedCompetitors.includes(customCompetitor.trim()) || selectedCompetitors.length >= 5}
          >
            Add
          </Button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          You can add up to {5 - selectedCompetitors.length} more competitors
        </p>
      </div>

      {/* Selected Competitors */}
      {selectedCompetitors.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Selected Competitors</h3>
          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex flex-wrap gap-2">
              {selectedCompetitors.map((competitor) => (
                <span
                  key={competitor}
                  className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {competitor}
                  <button
                    onClick={() => handleRemoveCompetitor(competitor)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-green-700">
              Your GEO report will compare your brand against these {selectedCompetitors.length} competitors
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handleBack}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        
        <Button 
          onClick={handleNext} 
          size="lg"
          disabled={selectedCompetitors.length === 0}
        >
          Continue
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}