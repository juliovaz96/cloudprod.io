import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { 
  ChevronDown, ExternalLink, Calendar, BookOpen, MessageCircle,
  Github, Twitter
} from 'lucide-react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { WEBSITE_SCREEN_CONFIGS } from './screen-config';

export function WebsiteNavigation() {
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const { currentScreen, navigate } = useNavigation();
  
  const navigationItems = WEBSITE_SCREEN_CONFIGS.filter(screen => 
    ['features', 'solutions', 'pricing', 'docs'].includes(screen.id)
  );

  const communityItems = [
    { 
      key: 'docs',
      screen: 'docs' as const,
      label: 'Documentation', 
      icon: <BookOpen className="w-4 h-4" />,
      description: 'Guides, tutorials, and API reference'
    },
    { 
      key: 'community-github',
      label: 'GitHub', 
      icon: <Github className="w-4 h-4" />,
      description: 'Open source projects and examples',
      external: true,
      href: 'https://github.com/cloudprodai'
    },
    { 
      key: 'community-discord',
      label: 'Discord', 
      icon: <MessageCircle className="w-4 h-4" />,
      description: 'Join our developer community',
      external: true,
      href: 'https://discord.gg/cloudprodai'
    },
    { 
      key: 'community-twitter',
      label: 'Twitter', 
      icon: <Twitter className="w-4 h-4" />,
      description: 'Follow us for updates and news',
      external: true,
      href: 'https://twitter.com/cloudprodai'
    }
  ];

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-background border-b border-border">
      {/* Logo */}
      <div className="flex items-center">
        <button 
          onClick={() => navigate('home')}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
            <img 
              src="/logo/cloudprodai.png" 
              alt="CloudProd.AI Logo" 
              className="w-6 h-6 object-contain" 
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <span className="text-white font-bold text-sm font-mono hidden">CP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-bold text-lg tracking-tight">CloudProd.AI</span>
            <span className="text-muted-foreground text-xs font-medium">Infrastructure Intelligence</span>
          </div>
        </button>
      </div>

      {/* Navigation Items */}
      <div className="hidden md:flex items-center space-x-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? `${item.color} bg-gradient-to-r ${item.gradient} bg-opacity-10 border border-current border-opacity-20` 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
        
        {/* Community Mega Menu */}
        <div 
          className="relative"
          onMouseEnter={() => setIsCommunityOpen(true)}
          onMouseLeave={() => setIsCommunityOpen(false)}
        >
          <button
            className={`flex items-center space-x-1 transition-colors hover:text-primary ${
              currentScreen === 'docs' 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            <span>Community</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
              isCommunityOpen ? 'rotate-180' : ''
            }`} />
          </button>
          
          {/* Mega Menu Dropdown */}
          <div className={`absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-xl shadow-2xl transition-all duration-200 z-50 ${
            isCommunityOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
          }`}>
            <div className="p-6">
              <div className="space-y-4">
                {communityItems.map((item) => (
                  <div key={item.key}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.label}
                            </h3>
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          if ('screen' in item && item.screen) navigate(item.screen);
                          setIsCommunityOpen(false);
                        }}
                        className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors group text-left"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.label}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Button */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate('auth')}
          className="border-border text-muted-foreground hover:border-primary hover:text-primary bg-transparent"
        >
          Login
        </Button>
        <Button
          onClick={() => navigate('auth')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Get Started Free
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-primary"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </nav>
  );
}