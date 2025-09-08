import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-purple-900 text-white shadow-lg shadow-purple-900/25 hover:shadow-xl hover:shadow-purple-900/40 focus-visible:ring-purple-900 hover:bg-purple-800',
      secondary: 'bg-white text-purple-900 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 focus-visible:ring-purple-500 shadow-sm hover:shadow-md',
      outline: 'border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-500 shadow-sm hover:shadow-md',
      ghost: 'text-purple-900 hover:bg-purple-50 hover:text-purple-700 focus-visible:ring-purple-500'
    };
    
    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-xl',
      md: 'h-11 px-6 text-sm rounded-xl',
      lg: 'h-12 px-8 text-base rounded-2xl'
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };