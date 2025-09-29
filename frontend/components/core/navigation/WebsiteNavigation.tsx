import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { ChevronDown, ExternalLink, Calendar, BookOpen, MessageCircle } from 'lucide-react';
import { useNavigation } from '../../../contexts/NavigationContext';

export function WebsiteNavigation() {
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const { currentScreen, navigate } = useNavigation();
  
  const navigationItems = [
    { id: 'product-overview' as const, label: 'Product Overview' },
    { id: 'use-cases' as const, label: 'Use Cases' },
    { id: 'faq' as const, label: 'FAQ' },
    { id: 'plans' as const, label: 'Plans' }
  ];

  const communityItems = [
    { 
      id: 'community-blog' as const, 
      label: 'Blog', 
      icon: <BookOpen className="w-4 h-4" />,
      description: 'Latest insights and tutorials'
    },
    { 
      id: 'community-events' as const, 
      label: 'Events', 
      icon: <Calendar className="w-4 h-4" />,
      description: 'Webinars, meetups, and workshops'
    },
    { 
      id: 'discord' as const, 
      label: 'Discord', 
      icon: <MessageCircle className="w-4 h-4" />,
      description: 'Join our developer community',
      external: true,
      href: 'https://discord.gg/c2plabs' // Placeholder URL
    }
  ];

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-background border-b border-border">
      {/* Logo */}
      <div className="flex items-center">
        <button 
          onClick={() => navigate('homepage')}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-mono text-sm font-semibold">C2</span>
          </div>
          <span className="text-foreground font-semibold text-lg">C2PLabs.AI</span>
        </button>
      </div>

      {/* Navigation Items */}
      <div className="hidden md:flex items-center space-x-8">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`transition-colors hover:text-primary ${
              currentScreen === item.id 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            {item.label}
          </button>
        ))}
        
        {/* Community Mega Menu */}
        <div 
          className="relative"
          onMouseEnter={() => setIsCommunityOpen(true)}
          onMouseLeave={() => setIsCommunityOpen(false)}
        >
          <button
            className={`flex items-center space-x-1 transition-colors hover:text-primary ${
              currentScreen?.startsWith('community') 
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
                  <div key={item.id}>
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
                          navigate(item.id);
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
          onClick={() => navigate('login')}
          className="border-border text-muted-foreground hover:border-primary hover:text-primary bg-transparent"
        >
          Login
        </Button>
        <Button
          onClick={() => navigate('login')}
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