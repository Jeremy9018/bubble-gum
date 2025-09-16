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

export const validateStep1 = (data: { 
  country: string; 
  language: string; 
  brandName: string; 
  website: string; 
}): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!data.country) {
    errors.push({ field: 'country', message: 'Please select a country' });
  }
  
  if (!data.language) {
    errors.push({ field: 'language', message: 'Please select a language' });
  }
  
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

export const validateStep2 = (data: { 
  name: string; 
  company: string; 
  email: string; 
  position: string; 
}): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  // Validate personal information
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Please enter your full name' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }
  
  if (!data.company.trim()) {
    errors.push({ field: 'company', message: 'Please enter your company name' });
  } else if (data.company.trim().length < 2) {
    errors.push({ field: 'company', message: 'Company name must be at least 2 characters' });
  }
  
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Please enter your email address' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }
  
  if (!data.position.trim()) {
    errors.push({ field: 'position', message: 'Please enter your position' });
  } else if (data.position.trim().length < 2) {
    errors.push({ field: 'position', message: 'Position must be at least 2 characters' });
  }
  
  return errors;
};

export const validateStep3 = (data: { 
  selectedThemes: string[];
  customTheme?: { name: string; description: string; };
}): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const hasSelectedTheme = data.selectedThemes.length > 0;
  const hasCustomTheme = data.customTheme?.name?.trim() && data.customTheme?.description?.trim();
  
  if (!hasSelectedTheme && !hasCustomTheme) {
    errors.push({ field: 'selectedThemes', message: 'Please select one theme or create a custom theme' });
  } else if (hasSelectedTheme && hasCustomTheme) {
    errors.push({ field: 'selectedThemes', message: 'Please select either a predefined theme or create a custom theme, not both' });
  } else if (data.selectedThemes.length > 1) {
    errors.push({ field: 'selectedThemes', message: 'Please select only one theme' });
  }
  
  // Validate custom theme fields if user has started filling them
  if (data.customTheme) {
    if (data.customTheme.name?.trim() && !data.customTheme.description?.trim()) {
      errors.push({ field: 'customThemeDescription', message: 'Please add a description for your custom theme' });
    } else if (!data.customTheme.name?.trim() && data.customTheme.description?.trim()) {
      errors.push({ field: 'customThemeName', message: 'Please add a name for your custom theme' });
    } else if (data.customTheme.name?.trim() && data.customTheme.name.length < 3) {
      errors.push({ field: 'customThemeName', message: 'Theme name must be at least 3 characters' });
    } else if (data.customTheme.description?.trim() && data.customTheme.description.length < 10) {
      errors.push({ field: 'customThemeDescription', message: 'Theme description must be at least 10 characters' });
    }
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
  referralSource?: string;
  preferredDate: string;
  preferredTimeSlot: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!data.preferredDate) {
    errors.push({ field: 'preferredDate', message: 'Please select a preferred date for your meeting' });
  }
  
  if (!data.preferredTimeSlot) {
    errors.push({ field: 'preferredTimeSlot', message: 'Please select a preferred time slot for your meeting' });
  }
  
  return errors;
};