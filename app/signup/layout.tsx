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
                <span className="ml-2 text-sm text-gray-500">
                  GEO Report
                </span>
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