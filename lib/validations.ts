import { ValidationError } from './types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateWebsite = (website: string): boolean => {
  try {
    const url = website.startsWith('http') ? website : `https://${website}`;
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const formatWebsite = (website: string): string => {
  if (!website) return '';
  if (website.startsWith('http://') || website.startsWith('https://')) {
    return website;
  }
  return `https://${website}`;
};

export const validateStep1 = (data: { country: string; language: string }): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!data.country) {
    errors.push({ field: 'country', message: 'Please select a country' });
  }
  
  if (!data.language) {
    errors.push({ field: 'language', message: 'Please select a language' });
  }
  
  return errors;
};

export const validateStep2 = (data: { brandName: string; website: string }): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!data.brandName.trim()) {
    errors.push({ field: 'brandName', message: 'Please enter your brand name' });
  } else if (data.brandName.trim().length < 2) {
    errors.push({ field: 'brandName', message: 'Brand name must be at least 2 characters' });
  }
  
  if (!data.website.trim()) {
    errors.push({ field: 'website', message: 'Please enter your website URL' });
  } else if (!validateWebsite(data.website)) {
    errors.push({ field: 'website', message: 'Please enter a valid website URL (e.g., example.com)' });
  }
  
  return errors;
};

export const validateStep3 = (data: { selectedThemes: string[] }): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (data.selectedThemes.length === 0) {
    errors.push({ field: 'selectedThemes', message: 'Please select one theme' });
  } else if (data.selectedThemes.length > 1) {
    errors.push({ field: 'selectedThemes', message: 'Please select only one theme' });
  }
  
  return errors;
};

export const validateStep4 = (data: { competitors: string[] }): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (data.competitors.length === 0) {
    errors.push({ field: 'competitors', message: 'Please select at least one competitor for analysis' });
  } else if (data.competitors.length > 5) {
    errors.push({ field: 'competitors', message: 'Please select no more than 5 competitors' });
  }
  
  return errors;
};

export const validateStep5 = (data: { 
  name: string; 
  email: string; 
  company?: string; 
  position?: string; 
  referralSource?: string;
  preferredDate: string;
  preferredTimeSlot: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Please enter your name' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }
  
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Please enter your email address' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }
  
  if (!data.preferredDate) {
    errors.push({ field: 'preferredDate', message: 'Please select a preferred date for your meeting' });
  }
  
  if (!data.preferredTimeSlot) {
    errors.push({ field: 'preferredTimeSlot', message: 'Please select a preferred time slot for your meeting' });
  }
  
  return errors;
};