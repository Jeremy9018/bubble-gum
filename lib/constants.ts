import { Theme, Country, Language } from './types';

export const THEMES: Theme[] = [
  {
    id: 'charity-organizations',
    name: '기부단체',
    description: '신뢰할 수 있는 기부 단체와 자선 기관의 평판 및 투명성',
    icon: '',
    color: 'bg-blue-500'
  },
  {
    id: 'donation-methods',
    name: '기부방법',
    description: '다양한 기부 방식과 플랫폼의 편의성 및 접근성',
    icon: '',
    color: 'bg-green-500'
  },
  {
    id: 'sponsorship',
    name: '후원',
    description: '지속적인 후원 프로그램과 장기적 지원 시스템',
    icon: '',
    color: 'bg-purple-500'
  },
  {
    id: 'international-relief',
    name: '국제구호',
    description: '전 세계 재해 구호와 국제적 인도주의 지원 활동',
    icon: '',
    color: 'bg-orange-500'
  },
  {
    id: 'child-protection',
    name: '아동보호',
    description: '아동 복지와 권리 보호를 위한 안전망 및 지원 서비스',
    icon: '',
    color: 'bg-pink-500'
  }
];

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' }
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
];

export const REFERRAL_SOURCES = [
  'Google Search',
  'Social Media',
  'Industry Publication',
  'Word of Mouth',
  'Conference/Event',
  'Partner Referral',
  'LinkedIn',
  'Twitter',
  'Other'
];

export const TIME_SLOTS = [
  { value: '9-930am', label: '9:00 - 9:30 AM' },
  { value: '930-10am', label: '9:30 - 10:00 AM' },
  { value: '10-1030am', label: '10:00 - 10:30 AM' },
  { value: '1030-11am', label: '10:30 - 11:00 AM' },
  { value: '11-1130am', label: '11:00 - 11:30 AM' },
  { value: '1130-12pm', label: '11:30 AM - 12:00 PM' },
  { value: '12-1230pm', label: '12:00 - 12:30 PM' },
  { value: '1230-1pm', label: '12:30 - 1:00 PM' },
  { value: '1-130pm', label: '1:00 - 1:30 PM' },
  { value: '130-2pm', label: '1:30 - 2:00 PM' },
  { value: '2-230pm', label: '2:00 - 2:30 PM' },
  { value: '230-3pm', label: '2:30 - 3:00 PM' },
  { value: '3-330pm', label: '3:00 - 3:30 PM' },
  { value: '330-4pm', label: '3:30 - 4:00 PM' },
  { value: '4-430pm', label: '4:00 - 4:30 PM' },
  { value: '430-5pm', label: '4:30 - 5:00 PM' },
  { value: '5-530pm', label: '5:00 - 5:30 PM' },
  { value: '530-6pm', label: '5:30 - 6:00 PM' }
];

// Generate next 7 business days
export const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  const currentDate = new Date(today);
  currentDate.setDate(today.getDate() + 1); // Start from tomorrow
  
  while (dates.length < 7) {
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const displayStr = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      dates.push({ value: dateStr, label: displayStr });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

export const FORM_STORAGE_KEY = 'geo-report-form-data';

export const STEPS = [
  { id: 1, title: 'Location', description: 'Country & Language' },
  { id: 2, title: 'Brand', description: 'Name & Website' },
  { id: 3, title: 'Themes', description: 'Focus Areas' },
  { id: 4, title: 'Competitors', description: 'Competitor Analysis' },
  { id: 5, title: 'Contact', description: 'Your Information' }
];