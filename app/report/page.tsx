'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { FormData } from '@/lib/types';

// Placeholder data for the metrics
const brandVisibilityData = {
  mentionRate: 78,
  shareOfVoice: 34
};

const platformData = [
  { name: 'Google AIO', mentionRate: 82, trend: 'up', trendValue: 'Leading platform', logo: 'google' },
  { name: 'Naver AI Briefing', mentionRate: 75, trend: 'up', trendValue: 'Strong presence', logo: 'naver' },
  { name: 'ChatGPT', mentionRate: 67, trend: 'neutral', trendValue: 'Growing awareness', logo: 'openai' }
];

const competitorData = {
  brandRanking: 3,
  competitors: [
    { name: '유니세프', mentionRate: 85 },
    { name: '월드비전', mentionRate: 78 },
    { name: '굿네이버스', mentionRate: 72 },
    { name: '컴패션', mentionRate: 65 },
    { name: '세이브더칠드런', mentionRate: 58 }
  ]
};

const sourceBreakdownData = {
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

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const MetricCard = ({ title, value, subtitle, trend, trendValue }: MetricCardProps) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };

  return (
    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <CardDescription className="text-sm font-medium text-gray-600 tracking-wide">
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
          {typeof value === 'number' ? `${value}%` : value}
        </CardTitle>
      </CardHeader>
      {(subtitle || trend) && (
        <CardContent className="pt-0">
          {subtitle && (
            <p className="text-sm text-gray-600 mb-2 leading-relaxed">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className={`flex items-center text-sm font-medium ${trendColors[trend]} transition-colors duration-200`}>
              <span className="mr-2 text-base">{trendIcons[trend]}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
}

const ProgressBar = ({ label, percentage, color = 'bg-blue-600' }: ProgressBarProps) => {
  return (
    <div className="mb-4 group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{label}</span>
        <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-200">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
        <div 
          className={`h-3 rounded-full ${color} transition-all duration-500 ease-out relative overflow-hidden group-hover:brightness-110`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

interface PlatformCardProps {
  platform: {
    name: string;
    mentionRate: number;
    trend: string;
    trendValue: string;
    logo: string;
  };
}

const PlatformCard = ({ platform }: PlatformCardProps) => {

  const getPlatformLogo = (logo: string) => {
    switch (logo) {
      case 'google':
        return (
          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
        );
      case 'naver':
        return (
          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path fill="#03C75A" d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
            </svg>
          </div>
        );
      case 'openai':
        return (
          <div className="w-8 h-8 flex items-center justify-center bg-black rounded-lg">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          {getPlatformLogo(platform.logo)}
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900 mb-1">{platform.mentionRate}%</div>
          </div>
        </div>
        <CardDescription className="text-sm font-medium text-gray-600">
          {platform.name}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

interface RankingItemProps {
  position: number;
  name: string;
  mentionRate: number;
  isCurrentBrand?: boolean;
}

const RankingItem = ({ position, name, mentionRate, isCurrentBrand = false }: RankingItemProps) => {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer group ${
      isCurrentBrand 
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:from-blue-100 hover:to-indigo-100' 
        : 'bg-gray-50 hover:bg-white hover:shadow-lg'
    }`}>
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-4 transition-all duration-300 ${
          isCurrentBrand 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white group-hover:scale-110' 
            : 'bg-gray-300 text-gray-700 group-hover:bg-gray-400 group-hover:scale-105'
        }`}>
          {position}
        </div>
        <span className={`font-medium transition-colors duration-200 ${
          isCurrentBrand ? 'text-blue-900 group-hover:text-blue-800' : 'text-gray-900 group-hover:text-gray-800'
        }`}>
          {name}
        </span>
      </div>
      <span className={`text-sm font-semibold transition-all duration-200 ${
        isCurrentBrand ? 'text-blue-700 group-hover:text-blue-600 group-hover:text-base' : 'text-gray-600 group-hover:text-gray-700'
      }`}>
        {mentionRate}%
      </span>
    </div>
  );
};

export default function ReportPage() {
  const [formData, setFormData] = useState<FormData>({
    step1: { country: '', language: '' },
    step2: { 
      name: '', 
      company: '', 
      email: '', 
      position: '', 
      brandName: '', 
      website: '' 
    },
    step3: { selectedThemes: [] },
    step4: { competitors: [] },
    step5: { 
      preferredDate: '', 
      preferredTimeSlot: '',
      referralSource: ''
    }
  });

  useEffect(() => {
    // Load form data from localStorage
    const savedData = localStorage.getItem('geo-report-form-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.warn('Failed to parse saved form data:', error);
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-screen-2xl px-6 py-8 lg:px-8 xl:px-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl xl:text-4xl">
              BubbleShare GEO report
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-700 tracking-wide">
              굿네이버스 - 기부방법
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              {formData.step1?.country && (
                <div className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {formData.step1.country}
                </div>
              )}
              {formData.step2?.website && (
                <div className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  {formData.step2.website}
                </div>
              )}
              {formData.step1?.language && (
                <div className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {formData.step1.language.toUpperCase()}
                </div>
              )}
              {formData.step3?.selectedThemes && formData.step3.selectedThemes.length > 0 && (
                <div className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {formData.step3.selectedThemes[0]}
                </div>
              )}
              {/* Generation date with icon */}
              <div className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-8 xl:px-12">
        {/* How does it work? and Key Insights Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* How does it work? Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">How does it work?</h2>
            </div>
            
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Collection</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We analyze relevant prompts across major AI platforms like Google and chatGPT.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Analysis</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We laverage AI to assess brand visibility and understand how your brand is perceived.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Key Insights</h2>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <CardHeader className="pb-6">
                <CardDescription className="text-blue-700 text-lg leading-relaxed">
                  Summary of your brand&apos;s AI search visibility performance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-8 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-2">ChatGPT (67%)</div>
                    <div className="text-sm text-blue-700">Lowest Visibility Platform</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-2">#3</div>
                    <div className="text-sm text-blue-700">Rank Among Competitors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-2">8.5/10</div>
                    <div className="text-sm text-blue-700">Technical GEO Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Brand AI Visibility Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Brand AI Visibility</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Overall performance metrics for your brand across AI search platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {/* Overall Mention Rate - Larger widget taking 2 columns */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full">
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm font-medium text-gray-600 tracking-wide">
                    Overall Mention Rate
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                    {brandVisibilityData.mentionRate}%
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                    Percentage of relevant queries mentioning your brand
                  </p>
                  <div className="flex items-center text-sm font-medium text-green-600 transition-colors duration-200">
                    <span className="mr-2 text-base">↗</span>
                    <span>Strong performance</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform-specific metrics - Each taking 1 column */}
            {platformData.map((platform) => (
              <div key={platform.name} className="lg:col-span-1">
                <PlatformCard platform={platform} />
              </div>
            ))}
          </div>

          {/* Share of Voice - Separate row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <MetricCard
              title="Share of Voice"
              value={brandVisibilityData.shareOfVoice}
              subtitle="Your brand's visibility compared to competitors"
              trend="up"
              trendValue="Above average"
            />
          </div>

        </div>

        {/* Competitor Analysis Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Competitor Analysis</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              How your brand ranks against competitors in AI search results
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Competition Rank Widget */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 tracking-tight">Mention Rate by Competitor</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Comparative mention rates across all analyzed brands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {competitorData.competitors.map((competitor, index) => (
                      <RankingItem
                        key={competitor.name}
                        position={index + 1}
                        name={competitor.name}
                        mentionRate={competitor.mentionRate}
                        isCurrentBrand={competitor.name === '굿네이버스'}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>

        {/* Mentioned Source Breakdown Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Mentioned Source Breakdown</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Analysis of where and how your brand is being mentioned
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 tracking-tight">Link Source Breakdown</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Distribution of mention sources across different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sourceBreakdownData.linkSources.map((source, index) => (
                    <ProgressBar
                      key={source.source}
                      label={source.source}
                      percentage={source.percentage}
                      color={[
                        'bg-blue-600',
                        'bg-green-600',
                        'bg-purple-600',
                        'bg-orange-600',
                        'bg-gray-600'
                      ][index % 5]}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 tracking-tight">Content Type Breakdown</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Types of content where your brand appears most frequently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sourceBreakdownData.contentTypes.map((content, index) => (
                    <ProgressBar
                      key={content.type}
                      label={content.type}
                      percentage={content.percentage}
                      color={[
                        'bg-indigo-600',
                        'bg-teal-600',
                        'bg-pink-600',
                        'bg-amber-600'
                      ][index % 4]}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}