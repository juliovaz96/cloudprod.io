import { 
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';
import { Button } from '../../ui/button';
import { ThemeToggle } from '../forms/ThemeToggle';
import { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { PLATFORM_SCREEN_CONFIGS } from './screen-config';

export function PlatformSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentScreen, navigate } = useNavigation();

  return (
    <div className={`bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                <img 
                  src="/logo/cloudprodai.png" 
                  alt="CloudProd.AI Logo" 
                  className="w-6 h-6 object-contain" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <span className="text-white font-bold text-sm font-mono hidden">CP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sidebar-foreground text-sm">CloudProd.AI</span>
                <span className="text-sidebar-foreground/70 text-xs">Platform</span>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 hover:bg-sidebar-accent"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Back to Website */}
      <div className="px-2 pb-2">
        <Button
          variant="ghost"
          onClick={() => navigate('home')}
          className={`w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            isCollapsed ? 'px-2' : ''
          }`}
        >
          <Home className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
          {!isCollapsed && <span>Back to Website</span>}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {PLATFORM_SCREEN_CONFIGS.map((item) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-10 px-3 transition-all duration-200 ${
                  isActive 
                    ? `bg-gradient-to-r ${item.gradient} text-white hover:opacity-90 shadow-lg` 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                } ${isCollapsed ? 'px-2' : ''}`}
                onClick={() => navigate(item.id)}
                title={isCollapsed ? item.label : item.description}
              >
                <Icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <ThemeToggle />
          {!isCollapsed && (
            <div className="text-xs text-sidebar-foreground opacity-60">
              Platform v2.1.0
            </div>
          )}
        </div>
      </div>
    </div>
  );
}