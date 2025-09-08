'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { THEMES } from '@/lib/constants';
import { validateStep3 } from '@/lib/validations';
import { cn } from '@/lib/utils';

export default function Step3Page() {
  const router = useRouter();
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const step3Data = formData.step3;
  const selectedThemes = step3Data.selectedThemes || [];

  const handleThemeSelect = (themeId: string) => {
    let newSelectedThemes: string[];
    
    if (selectedThemes.includes(themeId)) {
      // Deselect theme
      newSelectedThemes = [];
    } else {
      // Select this theme only (single selection)
      newSelectedThemes = [themeId];
    }
    
    updateFormData('step3', { selectedThemes: newSelectedThemes });
    
    // Clear error if it exists
    if (errors.selectedThemes) {
      setErrors(prev => ({ ...prev, selectedThemes: '' }));
    }
  };

  const handleBack = () => {
    router.push('/signup/step-2');
  };

  const handleNext = () => {
    const validationErrors = validateStep3(step3Data);
    
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(error => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    router.push('/signup/step-4');
  };


  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          What aspect matters most to your brand?
        </h1>
        <p className="text-lg text-gray-600">
          Choose one theme to focus your GEO analysis. This helps us provide more targeted insights.
        </p>
      </div>

      {/* Selection Counter */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-blue-50 p-4">
        <div className="flex items-center text-sm">
          <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-blue-800">
            {selectedThemes.length === 0 ? 'Select one theme' : <><strong>1</strong> theme selected</>}
          </span>
        </div>
        {selectedThemes.length === 1 && (
          <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
            ✓ Selected
          </span>
        )}
      </div>

      {/* Error Message */}
      {errors.selectedThemes && (
        <div className="mb-6 rounded-lg bg-red-50 p-4">
          <div className="flex items-center">
            <svg className="mr-2 h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-800">{errors.selectedThemes}</p>
          </div>
        </div>
      )}

      {/* Theme Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((theme) => {
          const isSelected = selectedThemes.includes(theme.id);

          return (
            <Card
              key={theme.id}
              selected={isSelected}
              selectable={true}
              onSelect={() => handleThemeSelect(theme.id)}
              className={cn(
                'transition-all duration-200',
                isSelected && 'ring-2 ring-blue-500 border-blue-500 bg-blue-50',
                !isSelected && 'hover:border-gray-400 hover:shadow-md'
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-lg',
                    isSelected ? 'bg-blue-100' : theme.color
                  )}>
                    <span className="text-2xl">{theme.icon}</span>
                  </div>
                  {isSelected && (
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardTitle className={cn(
                  'mb-2 text-lg',
                  isSelected ? 'text-blue-900' : 'text-gray-900'
                )}>
                  {theme.name}
                </CardTitle>
                <CardDescription className={cn(
                  'text-sm',
                  isSelected ? 'text-blue-700' : 'text-gray-600'
                )}>
                  {theme.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Theme Preview */}
      {selectedThemes.length > 0 && (
        <div className="mb-6 rounded-lg bg-green-50 p-4">
          <div className="flex items-start">
            <svg className="mr-2 mt-0.5 h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">
                Your GEO report will focus on:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedThemes.map(themeId => {
                  const theme = THEMES.find(t => t.id === themeId);
                  return (
                    <span key={themeId} className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      <span className="mr-2">{theme?.icon}</span>
                      {theme?.name}
                    </span>
                  );
                })}
              </div>
            </div>
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
          disabled={selectedThemes.length === 0}
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