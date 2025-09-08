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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData('step2', { name: value });
    
    // Clear error if it exists
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData('step2', { email: value });
    
    // Clear error if it exists
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData('step2', { position: value });
    
    // Clear error if it exists
    if (errors.position) {
      setErrors(prev => ({ ...prev, position: '' }));
    }
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData('step2', { company: value });
    
    // Clear error if it exists
    if (errors.company) {
      setErrors(prev => ({ ...prev, company: '' }));
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
                 step2Data.name.trim().length >= 2 &&
                 step2Data.company.trim().length >= 2 &&
                 step2Data.email.trim().length > 0 &&
                 step2Data.position.trim().length > 0 &&
                 Object.keys(errors).length === 0;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-purple-900">
          Tell us about you and your brand
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We&apos;ll analyze how your brand appears in AI-generated responses.
        </p>
      </div>

              {/* Brand Information Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-purple-900">Brand Information</h2>
          
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
            helperText="We&apos;ll use this to suggest theme for your brand in the next step."
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
              </svg>
            }
          />
          <div className="space-y-4"></div>
        </div>


      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-900">Your Information</h2>
          
          <Input
            label="Full Name"
            type="text"
            value={step2Data.name || ''}
            onChange={handleNameChange}
            placeholder="e.g., John Smith"
            error={errors.name}
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          <Input
            label="Company"
            type="text"
            value={step2Data.company || ''}
            onChange={handleCompanyChange}
            placeholder="e.g., Your Company Inc."
            error={errors.company}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m5 0h4" />
              </svg>
            }
          />

          <Input
            label="Email Address"
            type="email"
            value={step2Data.email || ''}
            onChange={handleEmailChange}
            placeholder="e.g., john@company.com"
            error={errors.email}
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />

          <Input
            label="Position"
            type="text"
            value={step2Data.position || ''}
            onChange={handlePositionChange}
            placeholder="e.g., Marketing Manager, CEO, Founder"
            error={errors.position}
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
              </svg>
            }
          />
        </div>

        {step2Data.brandName && step2Data.website && (
          <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-2 border-purple-100">
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-purple-800">
                  Preview: We&apos;ll analyze <strong className="text-purple-900">{step2Data.brandName}</strong> at{' '}
                  <strong className="text-purple-900">{websitePreview}</strong>
                </p>
                <p className="mt-2 text-xs text-purple-700 leading-relaxed">
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