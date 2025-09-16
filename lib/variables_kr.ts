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
export const DEFAULT_BRAND = "Samsung Galaxy Fold";
export const DEFAULT_THEME = "Smartphones Recommendation";
export const DEFAULT_COUNTRY = "KR";
export const DEFAULT_LANGUAGE = "KO";

// Brand visibility metrics
export const brandVisibilityData = {
  mentionRate: 75,
  shareOfVoice: 34
};

// Platform performance data
export const platformData = [
  // { name: 'Google AIO', mentionRate: 88, trend: 'up', trendValue: '+5%', logo: 'google' },
  { name: 'Gemini', mentionRate: 73, trend: 'up', trendValue: '+3%', logo: 'gemini' },
  // { name: 'Naver AI Briefing', mentionRate: 75, trend: 'down', trendValue: '-2%', logo: 'naver' },
  { name: 'ChatGPT', mentionRate: 70, trend: 'up', trendValue: '+7%', logo: 'openai' },
  { name: 'Perplexity', mentionRate: 83, trend: 'up', trendValue: '+4%', logo: 'perplexity' },
];

// Platform names for chart
export const platforms = ['Overall', 'Gemini', 'Perplexity', 'ChatGPT'];

// Competitor analysis data
export const competitorData = {
  brandRanking: 0,
  competitors: [
    { 
      name: 'Samsung Galaxy Fold', 
      mentionRates:{ Overall:75, ChatGPT:70, Gemini:73, Perplexity:83},
      color: '#3B82F6', // blue (target brand)
      isTarget: true
    },
    { 
      name: 'Apple iPhone', 
      mentionRates:{ Overall:35, ChatGPT:30, Gemini:36, Perplexity:39},
      color: '#8B5CF6', // purple
      isTarget: false
    },
    { 
      name: 'Google Pixel',
      mentionRates:{ Overall:27, ChatGPT:29, Gemini:36, Perplexity:15},
      color: '#10B981', // green
      isTarget: false
    },
    { 
      name:'Xiaomi',
      mentionRates:{ Overall:20, ChatGPT:18, Gemini:18, Perplexity:23},
      color: '#F59E0B', // amber
      isTarget: false
    },
    { 
      name:'OnePlus',
      mentionRates:{ Overall:5, ChatGPT:3, Gemini:5, Perplexity:6},
      color: '#EF4444', // red
      isTarget: false
    },
    { 
      name:'Honor',
      mentionRates:{ Overall:9, ChatGPT:5, Gemini:9, Perplexity:12},
      color: '#6B7280', // gray
      isTarget: false
    }
  ]
};

// Source breakdown data
export const sourceBreakdownData = {
  linkSources: [
    { source: 'https://www.youtube.com/', percentage: 6 },
    { source: 'https://www.ajd.co.kr/	', percentage: 4 },
    { source: 'https://www.techradar.com/	', percentage: 3 },
    { source: 'https://www.samsung.com/	', percentage: 3 },
    { source: 'https://kds099.tistory.com/	', percentage: 2 }
  ],

  contentTypes: [
    // { type: 'Informational', percentage: 52 },
    // { type: 'Commercial', percentage: 31 },
    // { type: 'Transactional', percentage: 12 },
    // { type: 'Navigational', percentage: 5 }
  ]
};

// Example keyword-prompt pairs (5 sets)
export const keywordPromptPairs = [
  {
    keyword: 'smartphone recommendation',
    prompt: '새 폰 살 때 지금 쓰는 폰 보상판매할 수 있나요?'
  },
  {
    keyword: 'best smart phone 2025',
    prompt: '2025년 기준으로 가성비 제일 좋은 스마트폰은 어떤 제품일까요?'
  },
  {
    keyword: 'smartphone recommendation',
    prompt: '블랙프라이데이 때 스마트폰 할인 많이 하나요?'
  },
  {
    keyword: 'foldable smart phone',
    prompt: '기존 스마트폰과 비교했을 때 폴더블폰의 장단점은 어떤 게 있나요?'
  },
  {
    keyword: 'smartphone recommendation',
    prompt: '삼성 갤럭시랑 아이폰은 배터리나 성능 면에서 어떤 차이가 있나요?'
  }
];

// Legacy arrays for backward compatibility
export const exampleKeywords = keywordPromptPairs.map(pair => pair.keyword);
export const examplePrompts = keywordPromptPairs.map(pair => pair.prompt);

// Key insights data
export const keyInsights = {
  highestPlatform: { name: 'Perplexity', rate: 83 },
  lowestPlatform: { name: 'ChatGPT', rate: 70 },
  competitorRank: 1,
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