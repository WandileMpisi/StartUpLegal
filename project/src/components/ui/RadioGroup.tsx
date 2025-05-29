import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, name, value, onChange, className, error, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">{option.label}</span>
          </label>
        ))}
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;