// Variables file for centralized data management
// Contains all form data, metrics, and report configuration

export interface FormData {
  step1: { country: string; language: string };
  step2: { 
    name: string; 
    company: string; 
    email: string; 
    position: string;
    brandName: string; 
    website: string; 
  };
  step3: { selectedThemes: string[]; };
  step4: { competitors: string[]; };
  step5: { 
    preferredDate: string; 
    preferredTimeSlot: string;
    referralSource?: string;
  };
}

// Default brand and form data
export const DEFAULT_BRAND = "굿네이버스";
export const DEFAULT_THEME = "기부방법";
export const DEFAULT_COUNTRY = "Korea";
export const DEFAULT_LANGUAGE = "Korean";

// Brand visibility metrics
export const brandVisibilityData = {
  mentionRate: 78,
  shareOfVoice: 34
};

// Platform performance data
export const platformData = [
  { name: 'Google AIO', mentionRate: 82, trend: 'up', trendValue: 'Leading platform', logo: 'google' },
  { name: 'Naver AI Briefing', mentionRate: 75, trend: 'up', trendValue: 'Strong presence', logo: 'naver' },
  { name: 'ChatGPT', mentionRate: 67, trend: 'neutral', trendValue: 'Growing awareness', logo: 'openai' }
];

// Platform names for chart
export const platforms = ['Overall', 'Google', 'Naver', 'ChatGPT'];

// Competitor analysis data
export const competitorData = {
  brandRanking: 3,
  competitors: [
    { 
      name: '유니세프', 
      mentionRates: { Overall: 85, Google: 88, Naver: 82, ChatGPT: 85 },
      color: '#10B981', // green
      isTarget: false
    },
    { 
      name: '월드비전', 
      mentionRates: { Overall: 78, Google: 82, Naver: 75, ChatGPT: 77 },
      color: '#8B5CF6', // purple
      isTarget: false
    },
    { 
      name: '굿네이버스', 
      mentionRates: { Overall: 72, Google: 75, Naver: 70, ChatGPT: 71 },
      color: '#3B82F6', // blue (target brand)
      isTarget: true
    },
    { 
      name: '컴패션', 
      mentionRates: { Overall: 65, Google: 68, Naver: 62, ChatGPT: 65 },
      color: '#F59E0B', // amber
      isTarget: false
    },
    { 
      name: '세이브더칠드런', 
      mentionRates: { Overall: 58, Google: 62, Naver: 55, ChatGPT: 57 },
      color: '#EF4444', // red
      isTarget: false
    },
    { 
      name: '월드쉐어', 
      mentionRates: { Overall: 45, Google: 48, Naver: 43, ChatGPT: 44 },
      color: '#6B7280', // gray
      isTarget: false
    }
  ]
};

// Source breakdown data
export const sourceBreakdownData = {
  linkSources: [
    { source: 'reddit.com', percentage: 32 },
    { source: 'm.blog.naver.com', percentage: 24 },
    { source: 'www.tistory.com', percentage: 18 },
    { source: 'news.naver.com', percentage: 15 },
    { source: 'www.instagram.com', percentage: 11 },
    { source: 'Others', percentage: 0 }
  ],
  contentTypes: [
    { type: 'Informational', percentage: 52 },
    { type: 'Commercial', percentage: 31 },
    { type: 'Transactional', percentage: 12 },
    { type: 'Navigational', percentage: 5 }
  ]
};

// Example keyword-prompt pairs (5 sets)
export const keywordPromptPairs = [
  {
    keyword: '소액 기부',
    prompt: '소액이라도 기부 가능할까요?'
  },
  {
    keyword: '국제 아동 후원',
    prompt: '국제 아동 도울수있는 후원 단체 뭐 있어요?'
  },
  {
    keyword: '기부 사이트 추천',
    prompt: '기부하려는데 사이트 추천해주세요'
  },
  {
    keyword: '정기 후원',
    prompt: '정기적으로 후원하는 방법이 있나요?'
  },
  {
    keyword: '해외 구호 단체',
    prompt: '해외 구호활동하는 단체 어디가 좋을까요?'
  }
];

// Legacy arrays for backward compatibility
export const exampleKeywords = keywordPromptPairs.map(pair => pair.keyword);
export const examplePrompts = keywordPromptPairs.map(pair => pair.prompt);

// Key insights data
export const keyInsights = {
  highestPlatform: { name: 'Google AIO', rate: 82 },
  lowestPlatform: { name: 'ChatGPT', rate: 67 },
  competitorRank: 3,
  geoScore: 8.5
};

// Helper function to get brand name from form data or default
export const getBrandName = (formData?: FormData): string => {
  return formData?.step2?.brandName || DEFAULT_BRAND;
};

// Helper function to get theme from form data or default
export const getTheme = (formData?: FormData): string => {
  return formData?.step3?.selectedThemes?.[0] || DEFAULT_THEME;
};

// Helper function to get country from form data or default
export const getCountry = (formData?: FormData): string => {
  return formData?.step1?.country || DEFAULT_COUNTRY;
};

// Helper function to get language from form data or default
export const getLanguage = (formData?: FormData): string => {
  return formData?.step1?.language || DEFAULT_LANGUAGE;
};

// Helper function to get website from form data
export const getWebsite = (formData?: FormData): string | undefined => {
  return formData?.step2?.website;
};

// Helper function to get competitors from form data
export const getCompetitors = (formData?: FormData): string[] => {
  return formData?.step4?.competitors || [];
};