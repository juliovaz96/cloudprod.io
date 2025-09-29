import { Screen } from '../../../contexts/NavigationContext';
import { 
  SCREEN_LAYOUTS, 
  WEBSITE_SCREENS, 
  PLATFORM_SCREENS, 
  AUTH_SCREENS, 
  PROTECTED_SCREENS,
  DEVELOPMENT_SCREENS
} from './constants';

// Get layout type for a screen
export function getScreenLayout(screen: Screen): 'website' | 'platform' | 'canvas' | 'auth' {
  return SCREEN_LAYOUTS[screen] || 'platform';
}

// Check if screen is protected
export function isProtectedScreen(screen: Screen): boolean {
  return PROTECTED_SCREENS.includes(screen as any);
}

// Check screen category
export function isWebsiteScreen(screen: Screen): boolean {
  return WEBSITE_SCREENS.includes(screen as any);
}

export function isPlatformScreen(screen: Screen): boolean {
  return PLATFORM_SCREENS.includes(screen as any);
}

export function isAuthScreen(screen: Screen): boolean {
  return AUTH_SCREENS.includes(screen as any);
}

export function isDevelopmentScreen(screen: Screen): boolean {
  return DEVELOPMENT_SCREENS.includes(screen as any);
}

export function isCanvasScreen(screen: Screen): boolean {
  return screen === 'canvas';
}

// Get screen title
export function getScreenTitle(screen: Screen): string {
  const titles: Record<Screen, string> = {
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
    'mobile-deployment': 'Mobile Deployment Monitor',
    'project-detail': 'Project Details',
    'environment-detail': 'Environment Details',
    'ai-copilot': 'AI Copilot',
    'observability': 'Observability',
    'theme-demo': 'Theme Demo'
  };

  return titles[screen] || screen;
}

// Get screen description
export function getScreenDescription(screen: Screen): string {
  const descriptions: Record<Screen, string> = {
    'homepage': 'Welcome to C2PLabs.AI',
    'product-overview': 'Explore our features and capabilities',
    'use-cases': 'See how C2PLabs.AI can help your team',
    'faq': 'Frequently asked questions',
    'community': 'Join our developer community',
    'community-blog': 'Latest insights and tutorials',
    'community-events': 'Webinars, meetups, and workshops',
    'blog-post': 'Read our latest blog post',
    'event-detail': 'Event information and registration',
    'events-calendar': 'Upcoming events and webinars',
    'event-registration': 'Register for an event',
    'submit-event': 'Submit your event to our calendar',
    'plans': 'Choose the right plan for your team',
    'login': 'Sign in to your account',
    'dashboard': 'Overview of your projects and metrics',
    'prompt-to-prototype': 'Generate prototypes from natural language',
    'canvas': 'Visual architecture configurator',
    'preview': 'Preview your infrastructure before deployment',
    'publish': 'Deploy your infrastructure to the cloud',
    'project-overview': 'Manage your projects and teams',
    'pricing': 'Flexible pricing for teams of all sizes',
    'settings': 'Account and platform settings',
    'deployment-orchestration': 'Orchestrate and monitor deployments',
    'pipeline-builder': 'Build and manage CI/CD pipelines',
    'iac-generator': 'Generate infrastructure as code',
    'mobile-deployment': 'Monitor mobile deployments',
    'project-detail': 'Project details and configuration',
    'environment-detail': 'Environment details and status',
    'ai-copilot': 'AI-powered infrastructure assistance',
    'observability': 'Logs, metrics, and distributed tracing',
    'theme-demo': 'Design system and component showcase'
  };

  return descriptions[screen] || '';
}

// Navigation path helpers
export function getScreenPath(screen: Screen): string {
  // In a real router, this would return the actual path
  return `/${screen}`;
}

export function getScreenBreadcrumbs(screen: Screen): string[] {
  // Enhanced breadcrumb logic based on screen relationships
  const breadcrumbMap: Record<Screen, string[]> = {
    'homepage': ['Home'],
    'product-overview': ['Product Overview'],
    'use-cases': ['Use Cases'],
    'faq': ['FAQ'],
    'community': ['Community'],
    'community-blog': ['Community', 'Blog'],
    'community-events': ['Community', 'Events'],
    'blog-post': ['Community', 'Blog', 'Post'],
    'event-detail': ['Community', 'Events', 'Event'],
    'events-calendar': ['Community', 'Events Calendar'],
    'event-registration': ['Community', 'Events', 'Register'],
    'submit-event': ['Community', 'Submit Event'],
    'plans': ['Plans'],
    'login': ['Login'],
    'dashboard': ['Dashboard'],
    'prompt-to-prototype': ['Dashboard', 'Prompt to Prototype'],
    'canvas': ['Dashboard', 'Architecture Canvas'],
    'preview': ['Dashboard', 'Architecture Canvas', 'Preview'],
    'publish': ['Dashboard', 'Architecture Canvas', 'Publish'],
    'project-overview': ['Dashboard', 'Projects'],
    'project-detail': ['Dashboard', 'Projects', 'Project'],
    'environment-detail': ['Dashboard', 'Projects', 'Environment'],
    'ai-copilot': ['Dashboard', 'AI Copilot'],
    'observability': ['Dashboard', 'Observability'],
    'pricing': ['Pricing'],
    'settings': ['Dashboard', 'Settings'],
    'deployment-orchestration': ['Dashboard', 'Deployments'],
    'pipeline-builder': ['Dashboard', 'Pipelines'],
    'iac-generator': ['Dashboard', 'Infrastructure'],
    'mobile-deployment': ['Dashboard', 'Mobile Deployment'],
    'theme-demo': ['Dashboard', 'Theme Demo']
  };

  return breadcrumbMap[screen] || [getScreenTitle(screen)];
}