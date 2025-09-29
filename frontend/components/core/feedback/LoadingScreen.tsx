import { useState, useEffect } from 'react';
import { Loader2, Layers } from 'lucide-react';
import { cn } from '../../ui/utils';

interface LoadingScreenProps {
  type?: 'full' | 'skeleton' | 'inline' | 'minimal';
  message?: string;
  progress?: number;
  showLogo?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingScreen({ 
  type = 'full', 
  message = 'Loading...', 
  progress,
  showLogo = true,
  className,
  size = 'md'
}: LoadingScreenProps) {
  const [dots, setDots] = useState('');

  // Animated dots for loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  if (type === 'inline') {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
        <span className="text-muted-foreground">{message}{dots}</span>
      </div>
    );
  }

  if (type === 'minimal') {
    return (
      <div className={cn("flex items-center justify-center p-4", className)}>
        <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className={cn("min-h-screen bg-background p-6", className)}>
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-muted rounded-lg w-48 mb-4 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-96 animate-pulse"></div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6">
              <div className="h-12 w-12 bg-muted rounded-xl mb-4 animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-full mb-1 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="fixed bottom-6 right-6">
          <div className="bg-card border border-border rounded-xl p-4 flex items-center space-x-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-foreground">{message}{dots}</span>
          </div>
        </div>
      </div>
    );
  }

  // Full screen loading
  return (
    <div className={cn(
      "min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden",
      className
    )}>
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-primary/8 to-accent/4 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Logo */}
        {showLogo && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Layers className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">C2PLabs.AI</span>
          </div>
        )}

        {/* Loading spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-border rounded-full"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <p className="text-lg text-foreground font-medium">{message}{dots}</p>
          
          {/* Progress bar */}
          {progress !== undefined && (
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              ></div>
            </div>
          )}
          
          {progress !== undefined && (
            <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
          )}
        </div>

        {/* Additional loading states */}
        <div className="flex space-x-2 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Specialized loading components for different use cases
export function ScreenLoader({ message = "Loading screen..." }: { message?: string }) {
  return <LoadingScreen type="skeleton" message={message} />;
}

export function InlineLoader({ message = "Loading...", size = 'md' }: { message?: string; size?: 'sm' | 'md' | 'lg' }) {
  return <LoadingScreen type="inline" message={message} size={size} />;
}

export function MinimalLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <LoadingScreen type="minimal" size={size} />;
}

// Loading spinner with custom styling
export function Spinner({ 
  className, 
  size = 'md' 
}: { 
  className?: string; 
  size?: 'sm' | 'md' | 'lg' 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <Loader2 className={cn(
      "animate-spin text-primary", 
      sizeClasses[size], 
      className
    )} />
  );
}

// Progress indicator component
export function ProgressIndicator({ 
  progress, 
  message, 
  className 
}: { 
  progress: number; 
  message?: string; 
  className?: string; 
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {message && (
        <p className="text-sm text-muted-foreground">{message}</p>
      )}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        ></div>
      </div>
      <p className="text-xs text-muted-foreground/70 text-right">{Math.round(progress)}%</p>
    </div>
  );
}