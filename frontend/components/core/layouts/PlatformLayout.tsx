import { ReactNode } from 'react';
import { PlatformSidebar } from '../navigation/PlatformSidebar';
import { BreadcrumbNav } from '../navigation/BreadcrumbNav';
import { LoadingScreen } from '../feedback/LoadingScreen';
import { useNavigation } from '../../../contexts/NavigationContext';

interface PlatformLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
  showSidebar?: boolean;
  showBreadcrumbs?: boolean;
}

export function PlatformLayout({ 
  children, 
  title, 
  className = '',
  showSidebar = true,
  showBreadcrumbs = true
}: PlatformLayoutProps) {
  const { isLoading, loadingMessage } = useNavigation();

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <div className="flex h-screen">
        {showSidebar && <PlatformSidebar />}
        
        <div className={`flex-1 flex flex-col overflow-hidden ${className}`}>
          {showBreadcrumbs && (
            <div className="border-b border-border bg-card">
              <div className="px-6 py-4">
                <BreadcrumbNav />
                {title && (
                  <h1 className="mt-2 text-2xl font-semibold text-foreground">
                    {title}
                  </h1>
                )}
              </div>
            </div>
          )}
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}