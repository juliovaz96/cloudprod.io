import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export type Screen = 
  | 'homepage'
  | 'product-overview'
  | 'use-cases'
  | 'faq'
  | 'community'
  | 'community-blog'
  | 'community-events'
  | 'blog-post'
  | 'event-detail'
  | 'events-calendar'
  | 'event-registration'
  | 'submit-event'
  | 'plans'
  | 'login' 
  | 'dashboard' 
  | 'prompt-to-prototype' 
  | 'canvas' 
  | 'preview' 
  | 'publish' 
  | 'project-overview'
  | 'pricing'
  | 'settings'
  | 'deployment-orchestration'
  | 'pipeline-builder'
  | 'iac-generator'
  | 'mobile-deployment'
  | 'project-detail'
  | 'environment-detail'
  | 'ai-copilot'
  | 'observability'
  | 'theme-demo';

interface NavigationHistoryEntry {
  screen: Screen;
  timestamp: number;
  data?: Record<string, any>;
}

interface NavigationContextType {
  currentScreen: Screen;
  history: NavigationHistoryEntry[];
  canGoBack: boolean;
  canGoForward: boolean;
  navigate: (screen: Screen, data?: Record<string, any>) => void;
  goBack: () => void;
  goForward: () => void;
  getBreadcrumbs: () => string[];
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  isLoading: boolean;
  loadingMessage: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
  initialScreen?: Screen;
}

const SCREEN_LABELS: Record<Screen, string> = {
  'homepage': 'Home',
  'product-overview': 'Product Overview',
  'use-cases': 'Use Cases',
  'faq': 'FAQ',
  'community': 'Community',
  'community-blog': 'Blog',
  'community-events': 'Events',
  'blog-post': 'Blog Post',
  'event-detail': 'Event Details',
  'events-calendar': 'Events Calendar',
  'event-registration': 'Event Registration',
  'submit-event': 'Submit Event',
  'plans': 'Plans',
  'login': 'Login',
  'dashboard': 'Dashboard', 
  'prompt-to-prototype': 'Prompt to Prototype',
  'canvas': 'Architecture Canvas',
  'preview': 'Preview',
  'publish': 'Publish',
  'project-overview': 'Project Overview',
  'pricing': 'Pricing',
  'settings': 'Settings',
  'deployment-orchestration': 'Deployment Orchestration',
  'pipeline-builder': 'Pipeline Builder',
  'iac-generator': 'Infrastructure as Code',
  'mobile-deployment': 'Mobile Deployment Monitor'
};

const PROTECTED_SCREENS: Screen[] = [
  'dashboard',
  'prompt-to-prototype', 
  'canvas',
  'preview',
  'publish',
  'project-overview',
  'settings',
  'deployment-orchestration',
  'pipeline-builder',
  'iac-generator',
  'mobile-deployment'
];

export function NavigationProvider({ children, initialScreen = 'homepage' }: NavigationProviderProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>(initialScreen);
  const [history, setHistory] = useState<NavigationHistoryEntry[]>([
    { screen: initialScreen, timestamp: Date.now() }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  // Analytics tracking
  const trackNavigation = useCallback((from: Screen, to: Screen, data?: Record<string, any>) => {
    // In a real app, this would send to analytics service
    console.log('Navigation:', { from, to, timestamp: Date.now(), data });
    
    // Track navigation timing
    const navigationTime = performance.now();
    console.log('Navigation timing:', navigationTime);
  }, []);

  const navigate = useCallback((screen: Screen, data?: Record<string, any>) => {
    // Check route protection - for demo purposes, auto-authenticate
    if (PROTECTED_SCREENS.includes(screen) && !isAuthenticated) {
      console.log(`Demo mode: Auto-authenticating for ${screen} access`);
      setIsAuthenticated(true); // Auto-authenticate for demo purposes
    }

    const previousScreen = currentScreen;
    
    // Start loading for navigation
    setIsLoading(true);
    setLoadingMessage(`Loading ${SCREEN_LABELS[screen]}...`);
    
    // Track the navigation
    trackNavigation(previousScreen, screen, data);
    
    // Create new history entry
    const newEntry: NavigationHistoryEntry = {
      screen,
      timestamp: Date.now(),
      data
    };

    // Update history immediately to avoid timeout issues
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), newEntry];
      return newHistory;
    });
    
    setHistoryIndex(prev => prev + 1);
    setCurrentScreen(screen);
    
    // Brief loading state for visual feedback
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  }, [currentScreen, historyIndex, isAuthenticated, trackNavigation]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const targetEntry = history[newIndex];
      
      setHistoryIndex(newIndex);
      setCurrentScreen(targetEntry.screen);
      
      trackNavigation(currentScreen, targetEntry.screen, { source: 'back_navigation' });
    }
  }, [historyIndex, history, currentScreen, trackNavigation]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const targetEntry = history[newIndex];
      
      setHistoryIndex(newIndex);
      setCurrentScreen(targetEntry.screen);
      
      trackNavigation(currentScreen, targetEntry.screen, { source: 'forward_navigation' });
    }
  }, [historyIndex, history, currentScreen, trackNavigation]);

  const getBreadcrumbs = useCallback(() => {
    // Generate breadcrumbs based on current navigation path
    const currentEntry = history[historyIndex];
    if (!currentEntry) return [SCREEN_LABELS[currentScreen]];

    // For now, simple breadcrumbs - in a real app this would be more sophisticated
    switch (currentEntry.screen) {
      case 'login':
      case 'pricing':
        return [SCREEN_LABELS[currentEntry.screen]];
      
      case 'dashboard':
        return ['Dashboard'];
      
      case 'prompt-to-prototype':
        return ['Dashboard', 'Prompt to Prototype'];
      
      case 'canvas':
        return ['Dashboard', 'Projects', 'Architecture Canvas'];
      
      case 'preview':
        return ['Dashboard', 'Projects', 'Architecture Canvas', 'Preview'];
      
      case 'publish':
        return ['Dashboard', 'Projects', 'Architecture Canvas', 'Publish'];
      
      case 'project-overview':
        return ['Dashboard', 'Project Overview'];
      
      case 'settings':
        return ['Dashboard', 'Settings'];
      
      default:
        return [SCREEN_LABELS[currentEntry.screen]];
    }
  }, [history, historyIndex, currentScreen]);

  const setAuthenticated = useCallback((auth: boolean) => {
    setIsAuthenticated(auth);
    
    // If user logs out, redirect to login
    if (!auth && PROTECTED_SCREENS.includes(currentScreen)) {
      navigate('login');
    }
  }, [currentScreen, navigate]);

  // Loading state management
  const startLoading = useCallback((message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Browser back/forward button support
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.screen) {
        setCurrentScreen(event.state.screen);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Push initial state
    window.history.replaceState({ screen: currentScreen }, '', '');

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentScreen]);

  // Update browser history when screen changes
  useEffect(() => {
    window.history.pushState({ screen: currentScreen }, '', '');
  }, [currentScreen]);

  // Keyboard shortcuts for navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + Left Arrow = Go back
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        goBack();
      }
      
      // Alt + Right Arrow = Go forward  
      if (event.altKey && event.key === 'ArrowRight') {
        event.preventDefault();
        goForward();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goBack, goForward]);

  const value: NavigationContextType = {
    currentScreen,
    history,
    canGoBack: historyIndex > 0,
    canGoForward: historyIndex < history.length - 1,
    navigate,
    goBack,
    goForward,
    getBreadcrumbs,
    isAuthenticated,
    setAuthenticated,
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}