import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  showValue?: boolean;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showValue = false,
  className,
  variant = 'default',
  size = 'md',
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  return (
    <div className="space-y-1 w-full">
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', className)}>
        <div
          className={cn(
            'transition-all duration-500 ease-in-out rounded-full',
            variantClasses[variant],
            sizeClasses[size]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <p className="text-xs text-muted-foreground text-right">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;