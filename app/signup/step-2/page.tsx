'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validateStep2, formatWebsite } from '@/lib/validations';

export default function Step2Page() {
  const router = useRouter();
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [websitePreview, setWebsitePreview] = useState('');
  
  const step2Data = formData.step2;

  // Update website preview when website changes
  useEffect(() => {
    if (step2Data.website) {
      const formatted = formatWebsite(step2Data.website);
      setWebsitePreview(formatted);
    } else {
      setWebsitePreview('');
    }
  }, [step2Data.website]);

  const handleBrandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData('step2', { brandName: value });
    
    // Clear error if it exists
    if (errors.brandName) {
      setErrors(prev => ({ ...prev, brandName: '' }));
    }
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData('step2', { website: value });
    
    // Clear error if it exists
    if (errors.website) {
      setErrors(prev => ({ ...prev, website: '' }));
    }
  };

  const handleBack = () => {
    router.push('/signup/step-1');
  };

  const handleNext = () => {
    const validationErrors = validateStep2(step2Data);
    
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(error => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    router.push('/signup/step-3');
  };

  const isValid = step2Data.brandName.trim().length >= 2 && 
                 step2Data.website.trim().length > 0 && 
                 Object.keys(errors).length === 0;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Tell us about your brand
        </h1>
        <p className="text-lg text-gray-600">
          We'll analyze how your brand appears in AI-generated responses.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="Brand Name"
          type="text"
          value={step2Data.brandName}
          onChange={handleBrandNameChange}
          placeholder="e.g., Tesla, Apple, Microsoft"
          error={errors.brandName}
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m5 0h4" />
            </svg>
          }
        />

        <Input
          label="Website"
          type="url"
          value={step2Data.website}
          onChange={handleWebsiteChange}
          placeholder="e.g., tesla.com, apple.com"
          error={errors.website}
          helperText="We'll use this to understand your brand's online presence"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
            </svg>
          }
        />

        {step2Data.brandName && step2Data.website && (
          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-start">
              <svg className="mr-2 mt-0.5 h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800">
                  Preview: We'll analyze <strong>{step2Data.brandName}</strong> at{' '}
                  <strong>{websitePreview}</strong>
                </p>
                <p className="mt-1 text-xs text-green-700">
                  This will help us understand how AI systems perceive and describe your brand.
                </p>
              </div>
            </div>
          </div>
        )}

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
            disabled={!isValid}
          >
            Continue
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}