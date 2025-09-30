import { ReactNode } from 'react';
import { WebsiteNavigation } from '../navigation/WebsiteNavigation';
import { WebsiteFooter } from '../navigation/WebsiteFooter';
import { LoadingScreen } from '../feedback/LoadingScreen';
import { useNavigation } from '../../../contexts/NavigationContext';
import { useGuidelines } from '../../../contexts/GuidelineContext';
import { cn } from '../../ui/utils';

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
  const { layout } = useGuidelines();

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className={layout.page}>
      {showNavigation && <WebsiteNavigation />}
      
      <main className={cn('flex-1', className)}>
        {children}
      </main>
      
      {showFooter && <WebsiteFooter />}
    </div>
  );
}