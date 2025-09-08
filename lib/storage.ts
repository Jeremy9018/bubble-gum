import { FormData } from './types';
import { FORM_STORAGE_KEY } from './constants';

export const saveFormData = (formData: Partial<FormData>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const existingData = getFormData();
    const updatedData = { ...existingData, ...formData };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.warn('Failed to save form data to localStorage:', error);
  }
};

export const getFormData = (): Partial<FormData> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(FORM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to retrieve form data from localStorage:', error);
    return {};
  }
};

export const clearFormData = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(FORM_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear form data from localStorage:', error);
  }
};

export const getInitialFormData = (): FormData => {
  const stored = getFormData();
  
  return {
    step1: {
      country: stored.step1?.country || '',
      language: stored.step1?.language || '',
    },
    step2: {
      brandName: stored.step2?.brandName || '',
      website: stored.step2?.website || '',
    },
    step3: {
      selectedThemes: stored.step3?.selectedThemes || [],
    },
    step4: {
      competitors: stored.step4?.competitors || [],
    },
    step5: {
      name: stored.step5?.name || stored.step4?.name || '',
      email: stored.step5?.email || stored.step4?.email || '',
      company: stored.step5?.company || stored.step4?.company || '',
      position: stored.step5?.position || stored.step4?.position || '',
      referralSource: stored.step5?.referralSource || stored.step4?.referralSource || '',
      preferredTimeSlot: stored.step5?.preferredTimeSlot || stored.step4?.preferredTimeSlot || '',
      preferredDate: stored.step5?.preferredDate || stored.step4?.preferredDate || '',
    },
  };
};