'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { COUNTRIES, LANGUAGES } from '@/lib/constants';
import { validateStep1 } from '@/lib/validations';
import { detectUserCountry, getCountryLanguages } from '@/lib/utils';

export default function Step1Page() {
  const router = useRouter();
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDetecting, setIsDetecting] = useState(true);
  
  const step1Data = formData.step1;

  // Auto-detect user country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const detectedCountry = await detectUserCountry();
        const defaultLanguages = getCountryLanguages(detectedCountry);
        
        updateFormData('step1', {
          country: step1Data.country || detectedCountry,
          language: step1Data.language || defaultLanguages[0]
        });
      } catch (error) {
        console.warn('Failed to detect country:', error);
        // Set defaults if detection fails
        if (!step1Data.country) {
          updateFormData('step1', {
            country: 'US',
            language: 'en'
          });
        }
      } finally {
        setIsDetecting(false);
      }
    };

    detectCountry();
  }, [step1Data.country, step1Data.language, updateFormData]);

  const handleCountryChange = (countryCode: string) => {
    const defaultLanguages = getCountryLanguages(countryCode);
    updateFormData('step1', {
      country: countryCode,
      language: defaultLanguages[0] // Auto-select the primary language
    });
    
    // Clear country error if it exists
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: '' }));
    }
  };

  const handleLanguageChange = (languageCode: string) => {
    updateFormData('step1', { language: languageCode });
    
    // Clear language error if it exists
    if (errors.language) {
      setErrors(prev => ({ ...prev, language: '' }));
    }
  };

  const handleNext = () => {
    const validationErrors = validateStep1(step1Data);
    
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(error => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    router.push('/signup/step-2');
  };

  // Prepare options for selects
  const countryOptions = COUNTRIES.map(country => ({
    value: country.code,
    label: country.name,
    icon: country.flag
  }));

  const languageOptions = LANGUAGES.map(language => ({
    value: language.code,
    label: `${language.name} (${language.nativeName})`
  }));

  if (isDetecting) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse mx-auto"></div>
              <svg className="absolute inset-0 h-8 w-8 animate-spin text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          <p className="text-sm text-purple-900 font-medium">Detecting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-purple-900">
          Let&apos;s start with your market
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We&apos;ll analyze your brand&apos;s visibility in AI search results for your target market.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <Select
            label="Country"
            options={countryOptions}
            value={step1Data.country}
            onChange={handleCountryChange}
            placeholder="Select your country..."
            searchable
            error={errors.country}
          />

          <Select
            label="Language"
            options={languageOptions}
            value={step1Data.language}
            onChange={handleLanguageChange}
            placeholder="Select language..."
            error={errors.language}
          />
        </div>

        {step1Data.country && step1Data.language && (
          <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-2 border-purple-100">
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-purple-800 font-medium leading-relaxed">
                We&apos;ll analyze your brand&apos;s AI search performance in{' '}
                <span className="font-bold text-purple-900">
                  {COUNTRIES.find(c => c.code === step1Data.country)?.name}
                </span>{' '}
                using{' '}
                <span className="font-bold text-purple-900">
                  {LANGUAGES.find(l => l.code === step1Data.language)?.name}
                </span>{' '}
                language.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleNext} 
            size="lg"
            disabled={!step1Data.country || !step1Data.language}
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