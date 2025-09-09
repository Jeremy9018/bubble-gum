'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { FormProvider } from '@/contexts/FormContext';
import { Progress } from '@/components/ui/Progress';
import { getCurrentStep } from '@/lib/utils';

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  BubbleShare
                </h1>
                <div className="ml-2 flex items-center group relative">
                  <span className="text-sm text-gray-500">
                    GEO Report
                  </span>
                  <div className="ml-2 relative">
                    <svg 
                      className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help transition-colors duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    
                    {/* Tooltip content */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-96 max-w-sm">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-3">How does it work?</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                          <div className="text-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Data Collection</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              We analyze relevant prompts across major AI platforms like Google and chatGPT.
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">AI Analysis</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              We laverage AI to assess brand visibility and understand how your brand is perceived.
                            </p>
                          </div>
                        </div>
                        
                        {/* Tooltip arrow */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Free Analysis
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <SignupProgress />
          </div>

          {/* Form Content */}
          <div className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 bg-white border-t">
          <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>© 2025 BubbleShare. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-700">Privacy Policy</a>
                <a href="#" className="hover:text-gray-700">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </FormProvider>
  );
}

function SignupProgress() {
  const pathname = usePathname();
  const currentStep = getCurrentStep(pathname);

  return <Progress currentStep={currentStep} />;
}