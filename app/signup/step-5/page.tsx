'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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

  const isValid = step5Data.name.trim().length >= 2 && 
                 step5Data.email.trim().length > 0 &&
                 step5Data.preferredDate.trim().length > 0 &&
                 step5Data.preferredTimeSlot.trim().length > 0 &&
                 Object.keys(errors).length === 0;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Almost done! Where should we send your report?
        </h1>
        <p className="text-lg text-gray-600">
          Your GEO analysis will be ready within 24 hours.
        </p>
      </div>

      <div className="space-y-6">
        {/* Required Fields */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="First Name"
              type="text"
              value={step5Data.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="John"
              error={errors.name}
              required
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <Input
              label="Email Address"
              type="email"
              value={step5Data.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@company.com"
              error={errors.email}
              helperText="We'll send your report here"
              required
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Optional Fields Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Help us personalize your report (optional)
            </h3>
            <p className="text-sm text-gray-600">
              This information helps us provide more relevant insights and recommendations.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Company"
                type="text"
                value={step5Data.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your Company Inc."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m5 0h4" />
                  </svg>
                }
              />

              <Input
                label="Position"
                type="text"
                value={step5Data.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="e.g., Marketing Manager, CEO"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H8a2 2 0 00-2 2v3.093l8-3.093z" />
                  </svg>
                }
              />
            </div>

            <Select
              label="How did you hear about BubbleShare?"
              options={referralOptions}
              value={step5Data.referralSource || ''}
              onChange={(value) => handleInputChange('referralSource', value)}
              placeholder="Select source..."
            />
          </div>
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
              Schedule a 30-minute results review session with our GEO expert.
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
                  <li>• Detailed walkthrough of your brand's AI visibility</li>
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