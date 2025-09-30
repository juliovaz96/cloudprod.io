/**
 * CloudProd.AI Platform Types Index
 * Central export for all platform type definitions
 */

// Core screen and navigation types
export * from './ScreenTypes';
export * from './NavigationArchitecture';

// Platform state management
export * from './PlatformState';
export * from './SupplementaryTypes';

// Enhanced navigation context
export { NavigationProvider, useNavigation, NavigationContext } from '../contexts/EnhancedNavigationContext';

// Re-export design tokens
export { tokens } from '../src/tokens/design-tokens';

// Type utilities and guards
export {
  isAuthenticated,
  hasPermission,
  getCurrentWorkspace,
  getActiveRuns,
  getCriticalDrifts
} from './PlatformState';

export {
  getScreensByCategory,
  getWorkflowScreens,
  getNextScreenInWorkflow,
  getPreviousScreenInWorkflow,
  getWorkflowProgress
} from './NavigationArchitecture';