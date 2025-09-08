'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  error,
  searchable = false,
  disabled = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (searchable && searchRef.current) {
        searchRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, searchable]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div ref={selectRef} className="relative">
        <div
          className={cn(
            'flex h-11 w-full cursor-pointer items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="select-options"
        >
          <div className="flex items-center truncate">
            {selectedOption?.icon && (
              <span className="mr-2">{selectedOption.icon}</span>
            )}
            <span className={cn(
              selectedOption ? 'text-gray-900' : 'text-gray-500'
            )}>
              {selectedOption?.label || placeholder}
            </span>
          </div>
          
          <svg
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && (
          <div id="select-options" className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border-2 border-gray-200 bg-white py-2 shadow-xl shadow-gray-200/50" role="listbox">
            {searchable && (
              <div className="px-2 py-2">
                <input
                  ref={searchRef}
                  type="text"
                  className="h-8 w-full rounded-lg border-2 border-gray-200 px-3 text-sm transition-all duration-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer items-center px-4 py-3 text-sm transition-colors duration-150 hover:bg-purple-50 hover:text-purple-700',
                    value === option.value && 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-900 font-medium'
                  )}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.icon && (
                    <span className="mr-2">{option.icon}</span>
                  )}
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export { Select };