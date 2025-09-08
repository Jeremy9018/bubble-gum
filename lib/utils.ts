import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { COUNTRIES } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const detectUserCountry = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const countryCode = data.country_code;
    
    // Check if the detected country is in our list
    const country = COUNTRIES.find(c => c.code === countryCode);
    return country ? countryCode : 'US'; // Default to US if not found
  } catch (error) {
    console.warn('Failed to detect user country:', error);
    return 'US'; // Default fallback
  }
};

export const getCountryLanguages = (countryCode: string): string[] => {
  const languageMap: Record<string, string[]> = {
    'US': ['en'],
    'GB': ['en'],
    'CA': ['en', 'fr'],
    'AU': ['en'],
    'DE': ['de'],
    'FR': ['fr'],
    'ES': ['es'],
    'IT': ['it'],
    'NL': ['nl'],
    'SE': ['sv'],
    'NO': ['no'],
    'DK': ['da'],
    'JP': ['ja'],
    'KR': ['ko'],
    'SG': ['en'],
    'IN': ['en', 'hi'],
    'BR': ['pt'],
    'MX': ['es'],
    'AR': ['es'],
    'ZA': ['en']
  };
  
  return languageMap[countryCode] || ['en'];
};

export const formatStepUrl = (step: number): string => {
  return `/signup/step-${step}`;
};

export const getCurrentStep = (pathname: string): number => {
  const match = pathname.match(/\/signup\/step-(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

export const isValidStep = (step: number): boolean => {
  return step >= 1 && step <= 5;
};

export const getProgressPercentage = (currentStep: number): number => {
  return (currentStep / 5) * 100;
};