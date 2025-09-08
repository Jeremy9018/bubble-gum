export interface FormData {
  step1: {
    country: string;
    language: string;
  };
  step2: {
    brandName: string;
    website: string;
  };
  step3: {
    selectedThemes: string[];
  };
  step4: {
    competitors: string[];
  };
  step5: {
    name: string;
    email: string;
    company?: string;
    position?: string;
    referralSource?: string;
    preferredTimeSlot: string;
    preferredDate: string;
  };
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => void;
  onNext: () => void;
  onBack?: () => void;
  isLoading?: boolean;
}