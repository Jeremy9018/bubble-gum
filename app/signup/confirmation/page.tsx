'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getFormData } from '@/lib/storage';
import { FormData } from '@/lib/types';
import { TIME_SLOTS, getAvailableDates } from '@/lib/constants';

export default function ConfirmationPage() {
  const [formData, setFormData] = useState<Partial<FormData>>({});

  useEffect(() => {
    const data = getFormData();
    setFormData(data);
  }, []);

  const selectedDate = formData.step5?.preferredDate;
  const selectedTimeSlot = formData.step5?.preferredTimeSlot;

  const getDateLabel = (dateValue: string) => {
    const date = getAvailableDates().find(d => d.value === dateValue);
    return date?.label || dateValue;
  };

  const getTimeLabel = (timeValue: string) => {
    const time = TIME_SLOTS.find(t => t.value === timeValue);
    return time?.label || timeValue;
  };
  return (
    <div className="mx-auto max-w-3xl text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Main Message */}
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          🎉 Your GEO Report is Being Generated!
        </h1>
        <p className="text-lg text-gray-600 sm:text-xl">
          Thank you for your submission. We&apos;re analyzing your brand&apos;s visibility across major AI platforms.
        </p>
      </div>

      {/* Meeting Confirmation */}
      {selectedDate && selectedTimeSlot && (
        <div className="mb-8 rounded-lg bg-green-50 p-6 text-left">
          <div className="flex items-start">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v0M7 7h10M7 7l-4 4v10a2 2 0 002 2h10a2 2 0 002-2V11l-4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-900 mb-2">
                Meeting Scheduled! 📅
              </h2>
              <div className="text-green-800">
                <p className="mb-2">
                  <strong>Date:</strong> {getDateLabel(selectedDate)}
                </p>
                <p className="mb-3">
                  <strong>Time:</strong> {getTimeLabel(selectedTimeSlot)} (EST)
                </p>
                <p className="text-sm text-green-700">
                  You&apos;ll receive a calendar invite with meeting details within the next hour. 
                  Our GEO expert will walk you through your report and provide personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* What Happens Next */}
      <div className="mb-10 rounded-lg bg-blue-50 p-6 text-left">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          What happens next?
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Analysis in Progress</h3>
              <p className="text-sm text-gray-600">
                Our AI systems are analyzing your brand&apos;s presence across ChatGPT, Claude, Gemini, and other platforms.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Report Delivery</h3>
              <p className="text-sm text-gray-600">
                Your comprehensive GEO report will be delivered to your email within 24 hours.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Actionable Insights</h3>
              <p className="text-sm text-gray-600">
                Review detailed recommendations to improve your brand&apos;s AI search visibility and rankings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="mb-10 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Your report will include:
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-lg bg-blue-100 p-3">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Visibility Score</h3>
            <p className="text-xs text-gray-600">AI platform rankings</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-lg bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Competitor Analysis</h3>
            <p className="text-xs text-gray-600">Market positioning</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-lg bg-purple-100 p-3">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Optimization Tips</h3>
            <p className="text-xs text-gray-600">Action recommendations</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-lg bg-orange-100 p-3">
              <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">AI Responses</h3>
            <p className="text-xs text-gray-600">Real examples</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              Return Home
            </Button>
          </Link>
          <Link href="/signup/step-1">
            <Button size="lg">
              Generate Another Report
            </Button>
          </Link>
        </div>
        
        <p className="text-sm text-gray-500">
          Questions? Contact us at{' '}
          <a href="mailto:support@bubbleshare.com" className="text-blue-600 hover:text-blue-700">
            support@bubbleshare.com
          </a>
        </p>
      </div>

      {/* Social Sharing */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <p className="mb-4 text-sm font-medium text-gray-700">
          Share the word about GEO analysis:
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://twitter.com/intent/tweet?text=Just%20generated%20my%20free%20GEO%20report%20to%20see%20how%20my%20brand%20appears%20in%20AI%20search%20results.%20Check%20it%20out!"
            className="flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Tweet
          </a>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://yoursite.com"
            className="flex items-center rounded-md bg-blue-700 px-3 py-2 text-sm text-white hover:bg-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Share
          </a>
        </div>
      </div>
    </div>
  );
}