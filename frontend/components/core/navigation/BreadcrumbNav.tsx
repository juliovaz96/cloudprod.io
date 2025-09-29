import { ChevronRight, Home } from 'lucide-react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { Button } from '../../ui/button';

export function BreadcrumbNav() {
  const { getBreadcrumbs, navigate, currentScreen } = useNavigation();
  const breadcrumbs = getBreadcrumbs();

  if (currentScreen === 'login' || currentScreen === 'pricing') {
    return null;
  }

  const goToDashboard = () => navigate('dashboard');

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <Button
        variant="ghost"
        size="sm"
        onClick={goToDashboard}
        className="h-auto p-1 text-muted-foreground hover:text-foreground hover:bg-secondary"
        aria-label="Go to Dashboard"
      >
        <Home className="w-4 h-4" />
      </Button>
      
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
          <span 
            className={`${
              index === breadcrumbs.length - 1 
                ? 'text-foreground font-medium' 
                : 'text-muted-foreground hover:text-foreground cursor-pointer'
            }`}
          >
            {crumb}
          </span>
        </div>
      ))}
    </nav>
  );
}