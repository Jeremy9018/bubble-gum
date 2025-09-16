'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { REFERRAL_SOURCES, TIME_SLOTS, getAvailableDates } from '@/lib/constants';
import { validateStep5 } from '@/lib/validations';
import { clearFormData } from '@/lib/storage';

export default function Step5Page() {
  const router = useRouter();
  const { formData, updateFormData, setIsLoading } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const step5Data = formData.step5;

  const handleInputChange = (field: keyof typeof step5Data, value: string) => {
    updateFormData('step5', { [field]: value });
    
    // Clear error if it exists
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBack = () => {
    router.push('/signup/step-4');
  };

  const handleSubmit = async () => {
    const validationErrors = validateStep5(step5Data);
    
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(error => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear form data from localStorage since we're done
      clearFormData();
      
      // Navigate to confirmation page
      router.push('/signup/confirmation');
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error (could show toast or error message)
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const referralOptions = REFERRAL_SOURCES.map(source => ({
    value: source,
    label: source
  }));

  const timeSlotOptions = TIME_SLOTS.map(slot => ({
    value: slot.value,
    label: slot.label
  }));

  const dateOptions = getAvailableDates().map(date => ({
    value: date.value,
    label: date.label
  }));

  const isValid = step5Data.preferredDate && step5Data.preferredDate.trim().length > 0 &&
                 step5Data.preferredTimeSlot && step5Data.preferredTimeSlot.trim().length > 0 &&
                 Object.keys(errors).length === 0;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Almost done! Let&apos;s schedule your results review
        </h1>
        <p className="text-lg text-gray-600">
          Schedule a meeting with our GEO expert and optionally let us know how you found us.
        </p>
      </div>

      <div className="space-y-6">
        {/* Optional Referral Source */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              How did you hear about us?
            </h3>
            <p className="text-sm text-gray-600">
              This helps us understand how to better reach businesses like yours.
            </p>
          </div>

          <Select
            label="Referral Source"
            options={referralOptions}
            value={step5Data.referralSource || ''}
            onChange={(value) => handleInputChange('referralSource', value)}
            placeholder="Select how you found us..."
          />
        </div>

        {/* Meeting Scheduling Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
              <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v0M7 7h10M7 7l-4 4v10a2 2 0 002 2h10a2 2 0 002-2V11l-4-4" />
              </svg>
              Schedule Your Results Review Meeting
            </h3>
            <p className="text-sm text-gray-600">
              Schedule a 30-minute review session with our GEO expert.
            </p>
          </div>

          <div className="space-y-4 rounded-lg bg-blue-50 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Preferred Date"
                options={dateOptions}
                value={step5Data.preferredDate || ''}
                onChange={(value) => handleInputChange('preferredDate', value)}
                placeholder="Select a date..."
                error={errors.preferredDate}
              />

              <Select
                label="Preferred Time (KST)"
                options={timeSlotOptions}
                value={step5Data.preferredTimeSlot || ''}
                onChange={(value) => handleInputChange('preferredTimeSlot', value)}
                placeholder="Select a time..."
                error={errors.preferredTimeSlot}
              />
            </div>

            <div className="flex items-start rounded-lg bg-blue-100 p-3">
              <svg className="mr-2 mt-0.5 h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">What to expect:</p>
                <ul className="space-y-1">
                  <li>• 30-minute video call via Google Meet or Zoom</li>
                  <li>• Detailed walkthrough of your brand&apos;s AI visibility</li>
                  <li>• Personalized recommendations and action plan</li>
                  <li>• Q&A session about GEO strategy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-start">
            <svg className="mr-2 mt-0.5 h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-1">We respect your privacy</p>
              <p>Your information is used only to generate and deliver your GEO report. No spam, unsubscribe anytime.</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
          
          <Button 
            onClick={handleSubmit} 
            size="lg"
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Generating Report...' : 'Get My Report'}
            {!isSubmitting && (
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}