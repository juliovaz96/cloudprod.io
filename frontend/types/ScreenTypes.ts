/**
 * CloudProd.AI Platform Screen Type System
 * Comprehensive type definitions for all platform screens
 */

import {
  WEBSITE_SCREENS,
  PLATFORM_SCREENS,
  DEVELOPMENT_SCREENS,
  AUTH_SCREENS
} from '../components/shared/utils/constants';

export type PlatformScreen = typeof PLATFORM_SCREENS[number];

export type MarketingScreen = typeof WEBSITE_SCREENS[number];
export type DevelopmentScreen = typeof DEVELOPMENT_SCREENS[number];

export type AuthScreen =
  | typeof AUTH_SCREENS[number]
  | 'signup'
  | 'forgot-password'
  | 'reset-password';

export type Screen =
  | MarketingScreen
  | PlatformScreen
  | DevelopmentScreen
  | AuthScreen;

// Screen categories for navigation organization
export type ScreenCategory = 
  | 'marketing'     // Public-facing screens
  | 'auth'          // Authentication flows
  | 'onboarding'    // Initial setup (connect-github, detect-stack, etc.)
  | 'development'   // Core development workflow
  | 'monitoring'    // Observability and alerts
  | 'management'    // Platform administration
  | 'settings';     // Configuration and preferences

// Screen metadata for enhanced navigation
export interface ScreenMetadata {
  id: Screen;
  title: string;
  description: string;
  category: ScreenCategory;
  icon: string;
  requiresAuth: boolean;
  requiresOnboarding: boolean;
  breadcrumbPath: string[];
  quickActions?: QuickAction[];
  contextualHelp?: HelpItem[];
}

// Navigation context types
export interface NavigationState {
  currentScreen: Screen;
  currentWorkflow?: WorkflowType;
  breadcrumb: BreadcrumbItem[];
  quickActions: QuickAction[];
  contextualHelp: HelpItem[];
  sidebarCollapsed: boolean;
}

export type WorkflowType = 
  | 'onboarding'    // Initial setup flow
  | 'deployment'    // Deploy and manage infrastructure
  | 'monitoring'    // Observe and alert on changes
  | 'management';   // Configure and administer

export interface BreadcrumbItem {
  label: string;
  screen?: Screen;
  href?: string;
  isActive: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  action: () => void;
  disabled?: boolean;
}

export interface HelpItem {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'warning' | 'info';
  actionLabel?: string;
  action?: () => void;
}

// Screen routing configuration
export interface ScreenRoute {
  path: string;
  screen: Screen;
  component: string;
  layout?: 'marketing' | 'auth' | 'platform';
  guards?: RouteGuard[];
}

export type RouteGuard = 
  | 'authenticated'      // Must be logged in
  | 'onboarded'         // Must have completed onboarding
  | 'github-connected'  // Must have GitHub connected
  | 'workspace-selected'; // Must have selected workspace

// Workflow progression tracking
export interface WorkflowProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: Screen[];
  nextStep?: Screen;
  canSkip: boolean;
  canGoBack: boolean;
}

// Screen state management
export interface ScreenState {
  isLoading: boolean;
  error?: Error;
  data?: unknown;
  isDirty: boolean;
  lastSaved?: Date;
  autoSave: boolean;
}

// Platform-specific screen props
export interface PlatformScreenProps {
  screen: PlatformScreen;
  navigation: NavigationState;
  workflow?: WorkflowProgress;
  state: ScreenState;
  onNavigate: (screen: Screen) => void;
  onStateChange: (state: Partial<ScreenState>) => void;
}