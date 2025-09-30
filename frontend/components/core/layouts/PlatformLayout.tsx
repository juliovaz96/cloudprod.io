import { ReactNode } from 'react';
import { PlatformSidebar } from '../navigation/PlatformSidebar';
import { BreadcrumbNav } from '../navigation/BreadcrumbNav';
import { LoadingScreen } from '../feedback/LoadingScreen';
import { useNavigation } from '../../../contexts/NavigationContext';
import { useGuidelines } from '../../../contexts/GuidelineContext';
import { cn } from '../../ui/utils';

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
  const { layout } = useGuidelines();

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className={layout.platform.shell}>
      <div className={layout.platform.body}>
        {showSidebar && <PlatformSidebar />}
        
        <div className={cn(layout.platform.content, className)}>
          {showBreadcrumbs && (
            <div className={layout.platform.header}>
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