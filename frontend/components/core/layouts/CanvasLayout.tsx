import { ReactNode } from 'react';
import { LoadingScreen } from '../feedback/LoadingScreen';
import { useNavigation } from '../../../contexts/NavigationContext';

interface CanvasLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  headerContent?: ReactNode;
}

export function CanvasLayout({ 
  children, 
  className = '',
  showHeader = false,
  headerContent
}: CanvasLayoutProps) {
  const { isLoading, loadingMessage } = useNavigation();

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="h-screen bg-background font-['Inter',sans-serif] overflow-hidden">
      {showHeader && headerContent && (
        <div className="border-b border-border bg-card">
          {headerContent}
        </div>
      )}
      
      <div className={`flex-1 h-full ${showHeader ? 'h-[calc(100vh-64px)]' : 'h-screen'} ${className}`}>
        {children}
      </div>
    </div>
  );
}