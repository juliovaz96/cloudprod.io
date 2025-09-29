import { ReactNode } from 'react';
import { LoadingScreen } from '../feedback/LoadingScreen';
import { useNavigation } from '../../../contexts/NavigationContext';

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({ 
  children, 
  className = '',
  title,
  subtitle
}: AuthLayoutProps) {
  const { isLoading, loadingMessage } = useNavigation();

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        {(title || subtitle) && (
          <div className="text-center">
            {title && (
              <h1 className="text-3xl font-semibold text-foreground">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={`bg-card border border-border rounded-lg p-8 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}