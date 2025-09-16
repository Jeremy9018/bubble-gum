'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { COUNTRIES, LANGUAGES } from '@/lib/constants';
import { validateStep1, formatWebsite } from '@/lib/validations';
import { detectUserCountry, getCountryLanguages } from '@/lib/utils';

export default function Step1Page() {
  const router = useRouter();
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDetecting, setIsDetecting] = useState(true);
  const [websitePreview, setWebsitePreview] = useState('');
  
  const step1Data = formData.step1;

  // Auto-detect user country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const detectedCountry = await detectUserCountry();
        const defaultLanguages = getCountryLanguages(detectedCountry);
        
        updateFormData('step1', {
          country: step1Data.country || detectedCountry,
          language: step1Data.language || defaultLanguages[0],
          brandName: step1Data.brandName || '',
          website: step1Data.website || ''
        });
      } catch (error) {
        console.warn('Failed to detect country:', error);
        // Set defaults if detection fails
        if (!step1Data.country) {
          updateFormData('step1', {
            country: 'US',
            language: 'en',
            brandName: step1Data.brandName || '',
            website: step1Data.website || ''
          });
        }
      } finally {
        setIsDetecting(false);
      }
    };

    detectCountry();
  }, [step1Data.country, step1Data.language, step1Data.brandName, step1Data.website, updateFormData]);

  // Update website preview when website changes
  useEffect(() => {
    if (step1Data.website) {
      const formatted = formatWebsite(step1Data.website);
      setWebsitePreview(formatted);
    } else {
      setWebsitePreview('');
    }
  }, [step1Data.website]);

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

  const handleBrandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData('step1', { brandName: value });
    
    // Clear error if it exists
    if (errors.brandName) {
      setErrors(prev => ({ ...prev, brandName: '' }));
    }
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData('step1', { website: value });
    
    // Clear error if it exists
    if (errors.website) {
      setErrors(prev => ({ ...prev, website: '' }));
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
          Let&apos;s start with your brand and market
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We&apos;ll analyze your brand&apos;s visibility in AI search results for your target market.
        </p>
      </div>

              <div className="space-y-6">
          <h2 className="text-xl font-semibold text-purple-900">Tell us about your brand</h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Brand Name"
              type="text"
              value={step1Data.brandName || ''}
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
              value={step1Data.website || ''}
              onChange={handleWebsiteChange}
              placeholder="e.g., tesla.com, apple.com"
              error={errors.website}
              helperText="We'll use this to suggest measurement theme and competitors."
              required
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              }
            />
          </div>
        </div>
      

      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-purple-900">Target Market</h2>
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

        {step1Data.country && step1Data.language && step1Data.brandName && step1Data.website && (
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
                  Preview: We&apos;ll analyze <strong className="text-purple-900">{step1Data.brandName}</strong> at{' '}
                  <strong className="text-purple-900">{websitePreview}</strong>
                </p>
                <p className="mt-2 text-xs text-purple-700 leading-relaxed">
                  AI search performance will be analyzed in{' '}
                  <span className="font-semibold">
                    {COUNTRIES.find(c => c.code === step1Data.country)?.name}
                  </span>{' '}
                  using{' '}
                  <span className="font-semibold">
                    {LANGUAGES.find(l => l.code === step1Data.language)?.name}
                  </span>{' '}
                  language.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleNext} 
            size="lg"
            disabled={!step1Data.country || !step1Data.language || !step1Data.brandName || !step1Data.website}
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