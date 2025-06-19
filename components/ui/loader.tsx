import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, RotateCw, Circle } from 'lucide-react';

export interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'normal' | 'fast';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bounce' | 'icon';
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'white';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

const speedClasses = {
  slow: 'animate-[spin_2s_linear_infinite]',
  normal: 'animate-[spin_1s_linear_infinite]',
  fast: 'animate-[spin_0.5s_linear_infinite]'
};

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  muted: 'text-muted-foreground',
  white: 'text-white'
};

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  speed = 'normal',
  variant = 'spinner',
  color = 'primary',
  className,
  text,
  fullScreen = false,
}) => {
  const renderVariant = () => {
    const baseClasses = cn(
      sizeClasses[size],
      colorClasses[color]
    );

    switch (variant) {
      case 'spinner':
        return (
          <Loader2
            className={cn(baseClasses, speedClasses[speed])}
          />
        );

      case 'icon':
        return (
          <RotateCw
            className={cn(baseClasses, speedClasses[speed])}
          />
        );

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={cn(
                  'rounded-full',
                  size === 'xs' ? 'w-1 h-1' :
                    size === 'sm' ? 'w-1.5 h-1.5' :
                      size === 'md' ? 'w-2 h-2' :
                        size === 'lg' ? 'w-3 h-3' : 'w-4 h-4',
                  colorClasses[color] === 'text-white' ? 'bg-white' : 'bg-current',
                  speed === 'slow' ? 'animate-[bounce_1.5s_infinite]' :
                    speed === 'normal' ? 'animate-[bounce_1s_infinite]' : 'animate-[bounce_0.5s_infinite]'
                )}
                style={{
                  animationDelay: `${index * (speed === 'slow' ? 0.3 : speed === 'normal' ? 0.2 : 0.1)}s`
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div
            className={cn(
              'rounded-full border-2 border-current',
              baseClasses,
              speed === 'slow' ? 'animate-[pulse_2s_infinite]' :
                speed === 'normal' ? 'animate-[pulse_1s_infinite]' : 'animate-[pulse_0.5s_infinite]'
            )}
          />
        );

      case 'bounce':
        return (
          <div
            className={cn(
              'rounded-full bg-current',
              baseClasses,
              speed === 'slow' ? 'animate-[bounce_1.5s_infinite]' :
                speed === 'normal' ? 'animate-[bounce_1s_infinite]' : 'animate-[bounce_0.5s_infinite]'
            )}
          />
        );

      default:
        return (
          <Loader2
            className={cn(baseClasses, speedClasses[speed])}
          />
        );
    }
  };

  const loaderContent = (
    <div className={cn(
      'flex flex-col items-center justify-center gap-3',
      fullScreen && 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50',
      className
    )}>
      {renderVariant()}
      {text && (
        <p className={cn(
          'font-medium',
          textSizeClasses[size],
          colorClasses[color]
        )}>
          {text}
        </p>
      )}
    </div>
  );

  return loaderContent;
};

export default Loader;