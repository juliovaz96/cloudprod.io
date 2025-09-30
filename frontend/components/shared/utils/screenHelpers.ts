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
  const layout = SCREEN_LAYOUTS[screen as keyof typeof SCREEN_LAYOUTS];
  return (layout as 'website' | 'platform' | 'canvas' | 'auth' | undefined) || 'platform';
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
  const titles: Partial<Record<Screen, string>> = {
    'home': 'Home',
    'features': 'Features',
    'solutions': 'Solutions',
    'docs': 'Documentation',
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
    'pricing': 'Pricing',
    'login': 'Login',
    'auth': 'Sign In',
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

  return titles[screen] || screen;
}

// Get screen description
export function getScreenDescription(screen: Screen): string {
  const descriptions: Partial<Record<Screen, string>> = {
    'home': 'Welcome to CloudProd.AI',
    'features': 'Explore our AI capabilities',
    'solutions': 'Tailored solutions for modern teams',
    'docs': 'Documentation and integration guides',
    'product-overview': 'Explore our features and capabilities',
    'use-cases': 'See how CloudProd.AI can help your team',
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
    'pricing': 'Flexible pricing for teams of all sizes',
    'login': 'Sign in to your account',
    'auth': 'Enter your credentials to access the platform',
    'dashboard': 'Overview of your projects and metrics',
    'prompt-to-prototype': 'Generate prototypes from natural language',
    'canvas': 'Visual architecture configurator',
    'preview': 'Preview your infrastructure before deployment',
    'publish': 'Deploy your infrastructure to the cloud',
    'project-overview': 'Manage your projects and teams',
    'project-detail': 'Project details and configuration',
    'environment-detail': 'Environment details and status',
    'ai-copilot': 'AI-powered infrastructure assistance',
    'observability': 'Logs, metrics, and distributed tracing',
    'deployment-orchestration': 'Orchestrate and monitor deployments',
    'pipeline-builder': 'Build and manage CI/CD pipelines',
    'iac-generator': 'Generate infrastructure as code',
    'mobile-deployment': 'Monitor mobile deployments',
    'settings': 'Account and platform settings',
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
  const breadcrumbMap: Partial<Record<Screen, string[]>> = {
    'home': ['Home'],
    'features': ['Features'],
    'solutions': ['Solutions'],
    'docs': ['Documentation'],
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
    'pricing': ['Pricing'],
    'login': ['Login'],
    'auth': ['Sign In'],
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
    'deployment-orchestration': ['Dashboard', 'Deployments'],
    'pipeline-builder': ['Dashboard', 'Pipelines'],
    'iac-generator': ['Dashboard', 'Infrastructure'],
    'mobile-deployment': ['Dashboard', 'Mobile Deployment'],
    'settings': ['Dashboard', 'Settings'],
    'theme-demo': ['Dashboard', 'Theme Demo']
  };

  return breadcrumbMap[screen] || [getScreenTitle(screen)];
}