import { 
  LayoutDashboard,
  FolderOpen, 
  Settings,
  Bot,
  BarChart3,
  Layers,
  GitBranch,
  Cloud,
  Monitor,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../ui/button';
import { ThemeToggle } from '../forms/ThemeToggle';
import { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';

const navigationItems = [
  {
    id: 'dashboard' as const,
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'project-detail' as const,
    label: 'Projects',
    icon: FolderOpen
  },
  {
    id: 'environment-detail' as const,
    label: 'Environments',
    icon: Cloud
  },
  {
    id: 'ai-copilot' as const,
    label: 'AI Copilot',
    icon: Bot
  },
  {
    id: 'observability' as const,
    label: 'Observability',
    icon: BarChart3
  },
  {
    id: 'canvas' as const,
    label: 'Canvas',
    icon: Layers,
    description: 'Visual architecture configurator'
  },
  {
    id: 'pipeline-builder' as const,
    label: 'Pipelines',
    icon: GitBranch
  },
  {
    id: 'deployment-orchestration' as const,
    label: 'Deployments',
    icon: Monitor
  },
  {
    id: 'settings' as const,
    label: 'Settings',
    icon: Settings
  }
];

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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-semibold text-sm">C2P</span>
              </div>
              <span className="font-semibold text-sidebar-foreground">C2PLabs.AI</span>
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

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-10 px-3 ${
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90' 
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