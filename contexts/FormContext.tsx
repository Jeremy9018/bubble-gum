'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { FormData } from '@/lib/types';
import { useFormData } from '@/hooks/useFormData';

interface FormContextType {
  formData: FormData;
  updateFormData: (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => void;
  resetFormData: () => void;
  getStepData: (step: keyof FormData) => FormData[keyof FormData];
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const formHook = useFormData();

  return (
    <FormContext.Provider value={formHook}>
      {children}
    </FormContext.Provider>
  );
};