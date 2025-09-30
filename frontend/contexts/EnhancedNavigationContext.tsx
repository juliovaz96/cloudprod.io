/**
 * CloudProd.AI Enhanced Navigation Context
 * Comprehensive navigation management for the platform
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { Screen, PlatformScreen, WorkflowType, NavigationState, BreadcrumbItem, QuickAction, ScreenMetadata, ScreenCategory } from '../types/ScreenTypes';
import { 
  SCREEN_REGISTRY, 
  WORKFLOW_DEFINITIONS,
  getNextScreenInWorkflow,
  getPreviousScreenInWorkflow,
  getWorkflowProgress 
} from '../types/NavigationArchitecture';
import { PROTECTED_SCREENS } from '../components/shared/utils/constants';

const DEFAULT_SCREEN_CATEGORY: ScreenCategory = 'marketing';

function formatScreenTitle(screen: Screen): string {
  return screen
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function createFallbackMetadata(screen: Screen): ScreenMetadata {
  return {
    id: screen,
    title: formatScreenTitle(screen),
    description: '',
    category: DEFAULT_SCREEN_CATEGORY,
    icon: 'screen',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: [formatScreenTitle(screen)],
  };
}

function getScreenMetadata(screen: Screen): ScreenMetadata {
  return SCREEN_REGISTRY[screen] ?? createFallbackMetadata(screen);
}

// Enhanced navigation context interface
export interface NavigationContextValue extends NavigationState {
  history: Screen[];
  historyIndex: number;
  isLoading: boolean;
  loadingMessage: string;
  isAuthenticated: boolean;
  canGoBack: boolean;
  canGoForward: boolean;

  // Navigation actions
  navigate: (screen: Screen, data?: Record<string, any>) => void;
  navigateTo: (screen: Screen, options?: NavigationOptions) => void;
  navigateToWorkflow: (workflow: WorkflowType, startScreen?: PlatformScreen) => void;
  goBack: () => void;
  goForward: () => void;
  
  // Workflow management
  nextStep: () => void;
  previousStep: () => void;
  completeWorkflow: () => void;
  exitWorkflow: () => void;
  
  // UI state management
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  addQuickAction: (action: QuickAction) => void;
  removeQuickAction: (actionId: string) => void;

  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setAuthenticated: (auth: boolean) => void;
  
  // Breadcrumb management
  updateBreadcrumb: (items: BreadcrumbItem[]) => void;
  getBreadcrumbs: () => string[];
  
  // Utility functions
  canNavigateBack: () => boolean;
  canNavigateForward: () => boolean;
  isInWorkflow: () => boolean;
  getWorkflowProgress: () => { current: number; total: number; percentage: number } | null;
}

interface NavigationOptions {
  replace?: boolean;
  preserveWorkflow?: boolean;
  resetBreadcrumb?: boolean;
}

// Navigation action types
type NavigationAction =
  | { type: 'NAVIGATE_TO'; payload: { screen: Screen; options?: NavigationOptions } }
  | { type: 'START_WORKFLOW'; payload: { workflow: WorkflowType; startScreen?: PlatformScreen } }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'COMPLETE_WORKFLOW' }
  | { type: 'EXIT_WORKFLOW' }
  | { type: 'GO_BACK' }
  | { type: 'GO_FORWARD' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_COLLAPSED'; payload: boolean }
  | { type: 'ADD_QUICK_ACTION'; payload: QuickAction }
  | { type: 'REMOVE_QUICK_ACTION'; payload: string }
  | { type: 'UPDATE_BREADCRUMB'; payload: BreadcrumbItem[] }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean; message?: string } }
  | { type: 'SET_AUTHENTICATED'; payload: boolean };

// Enhanced navigation state with history
interface EnhancedNavigationState extends NavigationState {
  history: Screen[];
  historyIndex: number;
  isLoading: boolean;
  loadingMessage: string;
  isAuthenticated: boolean;
}

// Initial state
const initialState: EnhancedNavigationState = {
  currentScreen: 'home',
  currentWorkflow: undefined,
  breadcrumb: [{ label: 'Home', screen: 'home', isActive: true }],
  quickActions: [],
  contextualHelp: [],
  sidebarCollapsed: false,
  history: ['home'],
  historyIndex: 0,
  isLoading: false,
  loadingMessage: 'Loading...',
  isAuthenticated: false,
};

// Navigation reducer
function navigationReducer(state: EnhancedNavigationState, action: NavigationAction): EnhancedNavigationState {
  switch (action.type) {
    case 'NAVIGATE_TO': {
      const { screen, options = {} } = action.payload;
      const screenMeta = getScreenMetadata(screen);

      // Update history
      let newHistory = [...state.history];
      let newHistoryIndex = state.historyIndex;
      
      if (!options.replace) {
        // Add to history
        newHistory = [...newHistory.slice(0, newHistoryIndex + 1), screen];
        newHistoryIndex = newHistory.length - 1;
      } else {
        // Replace current entry
        newHistory[newHistoryIndex] = screen;
      }

      // Update breadcrumb
      let newBreadcrumb: BreadcrumbItem[];
      if (options.resetBreadcrumb || !screenMeta.breadcrumbPath) {
        newBreadcrumb = [{ label: screenMeta.title, screen, isActive: true }];
      } else {
        newBreadcrumb = screenMeta.breadcrumbPath.map((label, index) => ({
          label,
          screen: index === screenMeta.breadcrumbPath.length - 1 ? screen : undefined,
          isActive: index === screenMeta.breadcrumbPath.length - 1
        }));
      }

      // Preserve or reset workflow
      const newWorkflow = options.preserveWorkflow ? state.currentWorkflow : undefined;

      return {
        ...state,
        currentScreen: screen,
        currentWorkflow: newWorkflow,
        breadcrumb: newBreadcrumb,
        quickActions: screenMeta.quickActions || [],
        contextualHelp: screenMeta.contextualHelp || [],
        history: newHistory,
        historyIndex: newHistoryIndex,
      };
    }

    case 'START_WORKFLOW': {
      const { workflow, startScreen } = action.payload;
      const workflowDef = WORKFLOW_DEFINITIONS[workflow];
      
      if (!workflowDef) {
        console.warn(`Unknown workflow: ${workflow}`);
        return state;
      }

      const firstScreen = startScreen || workflowDef.screens[0];
      const screenMeta = SCREEN_REGISTRY[firstScreen];

      return {
        ...state,
        currentScreen: firstScreen,
        currentWorkflow: workflow,
        breadcrumb: [
          { label: workflowDef.name, isActive: false },
          { label: screenMeta.title, screen: firstScreen, isActive: true }
        ],
        quickActions: screenMeta.quickActions || [],
        contextualHelp: screenMeta.contextualHelp || [],
      };
    }

    case 'NEXT_STEP': {
      if (!state.currentWorkflow) return state;
      
      const nextScreen = getNextScreenInWorkflow(state.currentScreen as PlatformScreen, state.currentWorkflow);
      if (!nextScreen) return state;

  const screenMeta = getScreenMetadata(nextScreen);
      const workflowDef = WORKFLOW_DEFINITIONS[state.currentWorkflow];

      return {
        ...state,
        currentScreen: nextScreen,
        breadcrumb: [
          { label: workflowDef.name, isActive: false },
          { label: screenMeta.title, screen: nextScreen, isActive: true }
        ],
        quickActions: screenMeta.quickActions || [],
        contextualHelp: screenMeta.contextualHelp || [],
      };
    }

    case 'PREVIOUS_STEP': {
      if (!state.currentWorkflow) return state;
      
      const prevScreen = getPreviousScreenInWorkflow(state.currentScreen as PlatformScreen, state.currentWorkflow);
      if (!prevScreen) return state;

  const screenMeta = getScreenMetadata(prevScreen);
      const workflowDef = WORKFLOW_DEFINITIONS[state.currentWorkflow];

      return {
        ...state,
        currentScreen: prevScreen,
        breadcrumb: [
          { label: workflowDef.name, isActive: false },
          { label: screenMeta.title, screen: prevScreen, isActive: true }
        ],
        quickActions: screenMeta.quickActions || [],
        contextualHelp: screenMeta.contextualHelp || [],
      };
    }

    case 'COMPLETE_WORKFLOW':
    case 'EXIT_WORKFLOW': {
      // Navigate to dashboard after completing or exiting workflow
  const dashboardMeta = getScreenMetadata('dashboard');
      return {
        ...state,
        currentScreen: 'dashboard',
        currentWorkflow: undefined,
        breadcrumb: [{ label: dashboardMeta.title, screen: 'dashboard', isActive: true }],
        quickActions: dashboardMeta.quickActions || [],
        contextualHelp: dashboardMeta.contextualHelp || [],
      };
    }

    case 'GO_BACK': {
      if (state.historyIndex <= 0) return state;
      
      const newIndex = state.historyIndex - 1;
      const screen = state.history[newIndex];
  const screenMeta = getScreenMetadata(screen);

      return {
        ...state,
        currentScreen: screen,
        historyIndex: newIndex,
        breadcrumb: screenMeta.breadcrumbPath?.map((label, index) => ({
          label,
          screen: index === screenMeta.breadcrumbPath!.length - 1 ? screen : undefined,
          isActive: index === screenMeta.breadcrumbPath!.length - 1
        })) || [{ label: screenMeta.title, screen, isActive: true }],
        quickActions: screenMeta.quickActions || [],
        contextualHelp: screenMeta.contextualHelp || [],
      };
    }

    case 'GO_FORWARD': {
      if (state.historyIndex >= state.history.length - 1) return state;
      
      const newIndex = state.historyIndex + 1;
      const screen = state.history[newIndex];
  const screenMeta = getScreenMetadata(screen);

      return {
        ...state,
        currentScreen: screen,
        historyIndex: newIndex,
        breadcrumb: screenMeta.breadcrumbPath?.map((label, index) => ({
          label,
          screen: index === screenMeta.breadcrumbPath!.length - 1 ? screen : undefined,
          isActive: index === screenMeta.breadcrumbPath!.length - 1
        })) || [{ label: screenMeta.title, screen, isActive: true }],
        quickActions: screenMeta.quickActions || [],
        contextualHelp: screenMeta.contextualHelp || [],
      };
    }

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };

    case 'SET_SIDEBAR_COLLAPSED':
      return { ...state, sidebarCollapsed: action.payload };

    case 'ADD_QUICK_ACTION':
      return {
        ...state,
        quickActions: [...state.quickActions, action.payload]
      };

    case 'REMOVE_QUICK_ACTION':
      return {
        ...state,
        quickActions: state.quickActions.filter(quickAction => quickAction.id !== action.payload)
      };

    case 'UPDATE_BREADCRUMB':
      return { ...state, breadcrumb: action.payload };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loadingMessage: action.payload.message ?? state.loadingMessage,
      };

    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };

    default:
      return state;
  }
}

// Create context
const NavigationContext = createContext<NavigationContextValue | null>(null);

// Navigation provider component
interface NavigationProviderProps {
  children: React.ReactNode;
  initialScreen?: Screen;
}

export function NavigationProvider({ children, initialScreen = 'home' }: NavigationProviderProps) {
  const [state, dispatch] = useReducer(navigationReducer, {
    ...initialState,
    currentScreen: initialScreen,
  });
  const loadingTimeoutRef = useRef<number | null>(null);

  // Navigation functions
  const navigateTo = useCallback((screen: Screen, options?: NavigationOptions) => {
    const screenMeta = getScreenMetadata(screen);

    dispatch({
      type: 'SET_LOADING',
      payload: {
        isLoading: true,
        message: `Loading ${screenMeta.title}...`,
      },
    });

  const isProtected = (PROTECTED_SCREENS as readonly string[]).includes(screen);

    if ((screenMeta.requiresAuth || isProtected) && !state.isAuthenticated) {
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    }

    dispatch({ type: 'NAVIGATE_TO', payload: { screen, options } });

    if (loadingTimeoutRef.current !== null && typeof window !== 'undefined') {
      window.clearTimeout(loadingTimeoutRef.current);
    }

    if (typeof window !== 'undefined') {
      loadingTimeoutRef.current = window.setTimeout(() => {
        dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
      }, 80);
    } else {
      dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
    }
  }, [state.isAuthenticated]);

  const navigate = useCallback((screen: Screen, _data?: Record<string, any>) => {
    navigateTo(screen);
  }, [navigateTo]);

  const navigateToWorkflow = useCallback((workflow: WorkflowType, startScreen?: PlatformScreen) => {
    dispatch({ type: 'START_WORKFLOW', payload: { workflow, startScreen } });
  }, []);

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' });
  }, []);

  const goForward = useCallback(() => {
    dispatch({ type: 'GO_FORWARD' });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const previousStep = useCallback(() => {
    dispatch({ type: 'PREVIOUS_STEP' });
  }, []);

  const completeWorkflow = useCallback(() => {
    dispatch({ type: 'COMPLETE_WORKFLOW' });
  }, []);

  const exitWorkflow = useCallback(() => {
    dispatch({ type: 'EXIT_WORKFLOW' });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: collapsed });
  }, []);

  const addQuickAction = useCallback((action: QuickAction) => {
    dispatch({ type: 'ADD_QUICK_ACTION', payload: action });
  }, []);

  const removeQuickAction = useCallback((actionId: string) => {
    dispatch({ type: 'REMOVE_QUICK_ACTION', payload: actionId });
  }, []);

  const updateBreadcrumb = useCallback((items: BreadcrumbItem[]) => {
    dispatch({ type: 'UPDATE_BREADCRUMB', payload: items });
  }, []);

  const startLoading = useCallback((message?: string) => {
    dispatch({ type: 'SET_LOADING', payload: { isLoading: true, message } });
  }, []);

  const stopLoading = useCallback(() => {
    dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
  }, []);

  const setAuthenticated = useCallback((auth: boolean) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: auth });
  }, []);

  // Utility functions
  const canNavigateBack = useCallback(() => state.historyIndex > 0, [state.historyIndex]);
  const canNavigateForward = useCallback(() => state.historyIndex < state.history.length - 1, [state.historyIndex, state.history.length]);

  const canGoBackValue = canNavigateBack();
  const canGoForwardValue = canNavigateForward();
  
  const getWorkflowProgressValue = useCallback(() => {
    if (!state.currentWorkflow) return null;
    return getWorkflowProgress(state.currentScreen as PlatformScreen, state.currentWorkflow);
  }, [state.currentScreen, state.currentWorkflow]);

  const isInWorkflow = useCallback(() => !!state.currentWorkflow, [state.currentWorkflow]);

  const getBreadcrumbs = useCallback(() => state.breadcrumb.map(item => item.label), [state.breadcrumb]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            goBack();
            break;
          case 'ArrowRight':
            event.preventDefault();
            goForward();
            break;
          case '\\':
            event.preventDefault();
            toggleSidebar();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goBack, goForward, toggleSidebar]);

  const contextValue: NavigationContextValue = {
    ...state,
    navigate,
    navigateTo,
    navigateToWorkflow,
    goBack,
    goForward,
    nextStep,
    previousStep,
    completeWorkflow,
    exitWorkflow,
    toggleSidebar,
    setSidebarCollapsed,
    addQuickAction,
    removeQuickAction,
    startLoading,
    stopLoading,
    setAuthenticated,
    updateBreadcrumb,
    getBreadcrumbs,
    canGoBack: canGoBackValue,
    canGoForward: canGoForwardValue,
    canNavigateBack,
    canNavigateForward,
    getWorkflowProgress: getWorkflowProgressValue,
    isInWorkflow,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

// Hook to use navigation context
export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

// Export context for direct access if needed
export { NavigationContext };