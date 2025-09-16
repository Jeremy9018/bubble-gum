'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { THEMES } from '@/lib/constants';
import { validateStep3 } from '@/lib/validations';
import { cn } from '@/lib/utils';

export default function Step3Page() {
  const router = useRouter();
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  const step3Data = formData.step3;
  const selectedThemes = step3Data.selectedThemes || [];
  const customTheme = step3Data.customTheme || { name: '', description: '' };

  // Hide loading widget after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleThemeSelect = (themeId: string) => {
    let newSelectedThemes: string[];
    
    if (selectedThemes.includes(themeId)) {
      // Deselect theme
      newSelectedThemes = [];
    } else {
      // Select this theme only (single selection)
      newSelectedThemes = [themeId];
    }
    
    // Clear custom theme when selecting a predefined theme
    updateFormData('step3', { 
      selectedThemes: newSelectedThemes,
      customTheme: { name: '', description: '' }
    });
    
    // Clear errors if they exist
    setErrors(prev => ({ ...prev, selectedThemes: '', customThemeName: '', customThemeDescription: '' }));
  };

  const handleCustomThemeChange = (field: 'name' | 'description', value: string) => {
    const newCustomTheme = { ...customTheme, [field]: value };
    
    // Clear selected themes when user starts typing custom theme
    updateFormData('step3', {
      selectedThemes: value.trim() ? [] : selectedThemes,
      customTheme: newCustomTheme
    });
    
    // Clear errors if they exist
    if (errors[`customTheme${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`customTheme${field.charAt(0).toUpperCase() + field.slice(1)}`]: '' }));
    }
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


  // Loading widget component
  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="mb-6">
              <div className="relative mx-auto w-20 h-20">
                {/* Outer spinning ring */}
                <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
                
                {/* Inner pulsing circle */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-80"></div>
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-purple-900 mb-3">
              Analyzing your brand...
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              We&apos;re generating personalized theme suggestions based on your brand information.
            </p>
            
            {/* Progress dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-purple-900">
          What aspect matters most to your brand?
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Choose one theme for your GEO analysis, where your brand's visability will be measured.
        </p>
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
                'transition-all duration-300 transform hover:scale-[1.02]',
                isSelected && 'ring-2 ring-purple-500 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg',
                !isSelected && 'hover:border-purple-300 hover:shadow-lg border-2'
              )}
            >              
              <CardContent className="pt-0 relative">
                <CardTitle className={cn(
                  'mb-2 text-lg font-semibold',
                  isSelected ? 'text-purple-900' : 'text-gray-900'
                )}>
                  {theme.name}
                </CardTitle>
                <CardDescription className={cn(
                  'text-sm leading-relaxed',
                  isSelected ? 'text-purple-700' : 'text-gray-600'
                )}>
                  {theme.description}
                </CardDescription>
                {isSelected && (
                  <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Custom Theme Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="mx-4 text-sm text-gray-500 font-medium">OR</div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        
        <Card className={cn(
          'transition-all duration-300 border-2',
          (customTheme.name?.trim() || customTheme.description?.trim()) && 'ring-2 ring-purple-500 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50',
          !(customTheme.name?.trim() || customTheme.description?.trim()) && 'hover:border-purple-300 hover:shadow-lg'
        )}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-semibold">
              <div className="mr-3 h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              Create Your Own Theme
            </CardTitle>
            <CardDescription>
              Define a custom theme that&apos;s specific to your brand&apos;s focus
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Input
              label="Theme Name"
              placeholder="e.g., Sustainable Fashion, Tech Innovation"
              value={customTheme.name}
              onChange={(e) => handleCustomThemeChange('name', e.target.value)}
              error={errors.customThemeName}
            />
            
            <div className="w-full">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Theme Description
              </label>
              <textarea
                className={cn(
                  'flex min-h-[100px] w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-500 hover:border-purple-300 hover:shadow-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50',
                  errors.customThemeDescription && 'border-red-500 focus:border-red-500 focus:ring-red-500/20 hover:border-red-400'
                )}
                placeholder="Describe what this theme covers and why it's important to your brand..."
                value={customTheme.description}
                onChange={(e) => handleCustomThemeChange('description', e.target.value)}
              />
              {errors.customThemeDescription && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.customThemeDescription}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Theme Preview */}
      {(selectedThemes.length > 0 || (customTheme.name?.trim() && customTheme.description?.trim())) && (
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-2 border-purple-100">
          <div className="flex items-start">
            <div className="mr-3 flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-800 mb-3">
                Your GEO report will focus on:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedThemes.map(themeId => {
                  const theme = THEMES.find(t => t.id === themeId);
                  return (
                    <span key={themeId} className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full border border-purple-200 shadow-sm">
                      {theme?.name}
                    </span>
                  );
                })}
                {customTheme.name?.trim() && customTheme.description?.trim() && (
                  <div className="w-full">
                    <span className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full border border-purple-200 shadow-sm mb-3">
                      <div className="mr-2 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <svg className="h-2 w-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      {customTheme.name}
                    </span>
                    <p className="text-xs text-purple-700 mt-1 ml-1 leading-relaxed">
                      {customTheme.description}
                    </p>
                  </div>
                )}
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
          disabled={selectedThemes.length === 0 && (!customTheme.name?.trim() || !customTheme.description?.trim())}
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