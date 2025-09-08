'use client';

import { useState, useEffect, useCallback } from 'react';
import { FormData } from '@/lib/types';
import { getInitialFormData, saveFormData } from '@/lib/storage';

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(() => getInitialFormData());
  const [isLoading, setIsLoading] = useState(false);

  // Auto-save to localStorage whenever form data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      saveFormData(formData);
    }, 500); // Debounce saves by 500ms

    return () => clearTimeout(timer);
  }, [formData]);

  const updateFormData = useCallback((step: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data
      }
    }));
  }, []);

  const resetFormData = useCallback(() => {
    const initialData = getInitialFormData();
    setFormData(initialData);
    saveFormData(initialData);
  }, []);

  const getStepData = useCallback((step: keyof FormData) => {
    return formData[step];
  }, [formData]);

  return {
    formData,
    updateFormData,
    resetFormData,
    getStepData,
    isLoading,
    setIsLoading
  };
};