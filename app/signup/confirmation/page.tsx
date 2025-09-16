'use client';

import { useEffect, useState } from 'react';
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
          Your GEO Report is Being Generated.
        </h1>
        <p className="text-lg text-gray-600 sm:text-xl">
        You will receive a confirmation email with the meeting invitation shortly.
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
                Our AI systems are analyzing your brand&apos;s presence across ChatGPT, Gemini, and other platforms.
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
                Your comprehensive GEO report will be delivered with suggestions during the meeting.
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



    </div>
  );
}