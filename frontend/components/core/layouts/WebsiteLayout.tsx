import { ReactNode } from 'react';
import { WebsiteNavigation } from '../navigation/WebsiteNavigation';
import { WebsiteFooter } from '../navigation/WebsiteFooter';
import { LoadingScreen } from '../feedback/LoadingScreen';
import { useNavigation } from '../../../contexts/NavigationContext';

interface WebsiteLayoutProps {
  children: ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
}

export function WebsiteLayout({ 
  children, 
  className = '',
  showNavigation = true,
  showFooter = true
}: WebsiteLayoutProps) {
  const { isLoading, loadingMessage } = useNavigation();

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      {showNavigation && <WebsiteNavigation />}
      
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      {showFooter && <WebsiteFooter />}
    </div>
  );
}