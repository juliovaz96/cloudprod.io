import type { Screen as ScreenType } from '../types/ScreenTypes';

export { NavigationProvider, useNavigation } from './EnhancedNavigationContext';
export type { NavigationContextValue } from './EnhancedNavigationContext';
export type { Screen } from '../types/ScreenTypes';

const formatScreenLabel = (screen: string) =>
  screen
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const SCREEN_LABELS: Partial<Record<ScreenType, string>> = {
  'home': 'Home',
  'features': 'Features',
  'solutions': 'Solutions',
  'pricing': 'Pricing',
  'docs': 'Documentation',
  'connect-github': 'Connect GitHub',
  'detect-stack': 'Detect Stack',
  'stack-configurator': 'Stack Configurator',
  'blueprint-select': 'Blueprint Selection',
  'secrets-wizard': 'Secrets Wizard',
  'pr-preview': 'PR Preview',
  'run-detail': 'Run Details',
  'drift-view': 'Drift Detection',
  'agent-console': 'Agent Console',
  'migration-wizard': 'Migration Wizard',
  'ai-agents': 'AI Agents',
  'workspaces': 'Workspaces',
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
  'auth': 'Sign In',
  'login': 'Login',
  'dashboard': 'Dashboard',
  'prompt-to-prototype': 'Prompt to Prototype',
  'canvas': 'Architecture Canvas',
  'preview': 'Preview',
  'publish': 'Publish',
  'project-overview': 'Project Overview',
  'project-detail': 'Project Details',
  'environment-detail': 'Environment Details',
  'ai-copilot': 'AI Copilot',
  'observability': 'Observability',
  'deployment-orchestration': 'Deployment Orchestration',
  'pipeline-builder': 'Pipeline Builder',
  'iac-generator': 'Infrastructure as Code',
  'mobile-deployment': 'Mobile Deployment Monitor',
  'settings': 'Settings',
  'theme-demo': 'Design System Showcase'
};

export const ALL_SCREENS = Object.keys(SCREEN_LABELS) as ScreenType[];

export function getScreenLabel(screen: ScreenType) {
  return SCREEN_LABELS[screen] ?? formatScreenLabel(screen);
}