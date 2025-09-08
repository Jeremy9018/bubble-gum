import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <div className="h-5 w-5 text-purple-900">
                {icon}
              </div>
            </div>
          )}
          
          <input
            className={cn(
              'flex h-11 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-500 hover:border-purple-300 hover:shadow-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-11',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20 hover:border-red-400',
              className
            )}
            ref={ref}
            id={inputId}
            {...props}
          />
          
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={cn(
            'mt-2 text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };