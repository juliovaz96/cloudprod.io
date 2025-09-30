/**
 * CloudProd.AI Platform Navigation Architecture
 * Enhanced navigation system for the comprehensive platform
 */

import { Screen, ScreenMetadata, ScreenCategory, WorkflowType, PlatformScreen } from './ScreenTypes';

type ScreenRegistry = Record<PlatformScreen, ScreenMetadata> & Partial<Record<Screen, ScreenMetadata>>;

// Complete screen registry with metadata
export const SCREEN_REGISTRY: ScreenRegistry = {
  // Marketing Screens
  'home': {
    id: 'home',
    title: 'CloudProd.AI',
    description: 'AI-powered infrastructure as code platform',
    category: 'marketing',
    icon: 'home',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Home'],
  },
  'features': {
    id: 'features',
    title: 'Features',
    description: 'Platform capabilities and tools',
    category: 'marketing',
    icon: 'features',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Features'],
  },
  'solutions': {
    id: 'solutions',
    title: 'Solutions',
    description: 'Industry-specific solutions',
    category: 'marketing',
    icon: 'solutions',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Solutions'],
  },
  'pricing': {
    id: 'pricing',
    title: 'Pricing',
    description: 'Plans and pricing options',
    category: 'marketing',
    icon: 'pricing',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Pricing'],
  },
  'docs': {
    id: 'docs',
    title: 'Documentation',
    description: 'Platform documentation and guides',
    category: 'marketing',
    icon: 'book',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Documentation'],
  },

  // Auth Screens
  'login': {
    id: 'login',
    title: 'Sign In',
    description: 'Access your CloudProd.AI account',
    category: 'auth',
    icon: 'login',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Sign In'],
  },
  'signup': {
    id: 'signup',
    title: 'Sign Up',
    description: 'Create your CloudProd.AI account',
    category: 'auth',
    icon: 'signup',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Sign Up'],
  },
  'forgot-password': {
    id: 'forgot-password',
    title: 'Forgot Password',
    description: 'Reset your password',
    category: 'auth',
    icon: 'key',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Forgot Password'],
  },
  'reset-password': {
    id: 'reset-password',
    title: 'Reset Password',
    description: 'Set a new password',
    category: 'auth',
    icon: 'key',
    requiresAuth: false,
    requiresOnboarding: false,
    breadcrumbPath: ['Reset Password'],
  },

  // Platform Screens (14 core screens)
  'connect-github': {
    id: 'connect-github',
    title: 'Connect GitHub',
    description: 'Connect your GitHub repositories',
    category: 'onboarding',
    icon: 'github',
    requiresAuth: true,
    requiresOnboarding: false,
    breadcrumbPath: ['Onboarding', 'Connect GitHub'],
    quickActions: [
      { id: 'oauth', label: 'Connect with OAuth', icon: 'link', action: () => {} },
      { id: 'help', label: 'View Documentation', icon: 'help', action: () => {} }
    ],
    contextualHelp: [
      {
        id: 'oauth-tip',
        title: 'OAuth Security',
        description: 'We use OAuth for secure, read-only access to your repositories',
        type: 'info'
      }
    ]
  },
  'detect-stack': {
    id: 'detect-stack',
    title: 'Detect Stack',
    description: 'Automatically detect your application stack',
    category: 'onboarding',
    icon: 'search',
    requiresAuth: true,
    requiresOnboarding: false,
    breadcrumbPath: ['Onboarding', 'Detect Stack'],
    quickActions: [
      { id: 'rescan', label: 'Re-scan Repository', icon: 'refresh', action: () => {} },
      { id: 'manual', label: 'Manual Configuration', icon: 'edit', action: () => {} }
    ]
  },
  'stack-configurator': {
    id: 'stack-configurator',
    title: 'Stack Configurator',
    description: 'Configure your infrastructure visually',
    category: 'development',
    icon: 'layers',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Stack Configurator'],
    quickActions: [
      { id: 'save', label: 'Save Configuration', icon: 'save', shortcut: 'Ctrl+S', action: () => {} },
      { id: 'preview', label: 'Preview Changes', icon: 'eye', action: () => {} },
      { id: 'ai-assist', label: 'AI Assistant', icon: 'sparkles', shortcut: 'Ctrl+K', action: () => {} }
    ]
  },
  'blueprint-select': {
    id: 'blueprint-select',
    title: 'Blueprint Selection',
    description: 'Choose or customize infrastructure blueprints',
    category: 'development',
    icon: 'template',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Blueprint Selection'],
    quickActions: [
      { id: 'ai-recommend', label: 'AI Recommendations', icon: 'sparkles', action: () => {} },
      { id: 'custom', label: 'Custom Blueprint', icon: 'plus', action: () => {} }
    ]
  },
  'secrets-wizard': {
    id: 'secrets-wizard',
    title: 'Secrets Configuration',
    description: 'Manage environment secrets and variables',
    category: 'development',
    icon: 'lock',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Secrets'],
    quickActions: [
      { id: 'validate', label: 'Validate Secrets', icon: 'check', action: () => {} },
      { id: 'import', label: 'Import from File', icon: 'upload', action: () => {} }
    ]
  },
  'pr-preview': {
    id: 'pr-preview',
    title: 'PR Preview',
    description: 'Review changes before deployment',
    category: 'development',
    icon: 'git-pull-request',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'PR Preview'],
    quickActions: [
      { id: 'create-pr', label: 'Create Pull Request', icon: 'git-branch', action: () => {} },
      { id: 'policy-check', label: 'Run Policy Check', icon: 'shield', action: () => {} }
    ]
  },
  'run-detail': {
    id: 'run-detail',
    title: 'Run Details',
    description: 'Monitor deployment execution',
    category: 'monitoring',
    icon: 'activity',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Runs', 'Details'],
    quickActions: [
      { id: 'logs', label: 'View Logs', icon: 'terminal', action: () => {} },
      { id: 'rollback', label: 'Rollback', icon: 'undo', action: () => {} }
    ]
  },
  'dashboard': {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Platform overview and KPIs',
    category: 'monitoring',
    icon: 'dashboard',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Dashboard'],
    quickActions: [
      { id: 'new-project', label: 'New Project', icon: 'plus', shortcut: 'Ctrl+N', action: () => {} },
      { id: 'quick-deploy', label: 'Quick Deploy', icon: 'rocket', action: () => {} }
    ]
  },
  'drift-view': {
    id: 'drift-view',
    title: 'Drift Detection',
    description: 'Infrastructure drift monitoring and remediation',
    category: 'monitoring',
    icon: 'alert-triangle',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Drift Detection'],
    quickActions: [
      { id: 'scan', label: 'Scan for Drift', icon: 'scan', action: () => {} },
      { id: 'auto-fix', label: 'Auto-fix Issues', icon: 'wand', action: () => {} }
    ]
  },
  'agent-console': {
    id: 'agent-console',
    title: 'Agent Console',
    description: 'Manage automation agents',
    category: 'management',
    icon: 'bot',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Agent Console'],
    quickActions: [
      { id: 'deploy-agent', label: 'Deploy Agent', icon: 'play', action: () => {} },
      { id: 'agent-logs', label: 'View Agent Logs', icon: 'terminal', action: () => {} }
    ]
  },
  'migration-wizard': {
    id: 'migration-wizard',
    title: 'Migration Wizard',
    description: 'Migrate existing infrastructure',
    category: 'management',
    icon: 'move',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Migration Wizard'],
    quickActions: [
      { id: 'import', label: 'Import Configuration', icon: 'upload', action: () => {} },
      { id: 'validate', label: 'Validate Migration', icon: 'check', action: () => {} }
    ]
  },
  'project-overview': {
    id: 'project-overview',
    title: 'Projects',
    description: 'Portfolio of active infrastructure initiatives',
    category: 'management',
    icon: 'layout',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Projects']
  },
  'project-detail': {
    id: 'project-detail',
    title: 'Project Detail',
    description: 'Deep dive into a single infrastructure project',
    category: 'management',
    icon: 'layout-dashboard',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Projects', 'Detail']
  },
  'environment-detail': {
    id: 'environment-detail',
    title: 'Environment Detail',
    description: 'Inspect environment configuration and guardrails',
    category: 'management',
    icon: 'server',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Environments', 'Detail']
  },
  'ai-copilot': {
    id: 'ai-copilot',
    title: 'AI Copilot',
    description: 'Pair programming assistant for infrastructure changes',
    category: 'development',
    icon: 'sparkles',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'AI Copilot']
  },
  'observability': {
    id: 'observability',
    title: 'Observability',
    description: 'Unified metrics, traces, and logs',
    category: 'monitoring',
    icon: 'activity',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Observability']
  },
  'deployment-orchestration': {
    id: 'deployment-orchestration',
    title: 'Deployment Orchestration',
    description: 'Coordinate multi-environment rollouts',
    category: 'management',
    icon: 'workflow',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Deployment Orchestration']
  },
  'pipeline-builder': {
    id: 'pipeline-builder',
    title: 'Pipeline Builder',
    description: 'Design CI/CD pipelines for infrastructure code',
    category: 'development',
    icon: 'git-branch',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Pipeline Builder']
  },
  'iac-generator': {
    id: 'iac-generator',
    title: 'IaC Generator',
    description: 'Generate terraform and CDK modules with AI',
    category: 'development',
    icon: 'code',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'IaC Generator']
  },
  'mobile-deployment': {
    id: 'mobile-deployment',
    title: 'Mobile Deployment Monitor',
    description: 'Monitor infrastructure deployments on mobile devices',
    category: 'monitoring',
    icon: 'smartphone',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Mobile Deployment']
  },
  'settings': {
    id: 'settings',
    title: 'Settings',
    description: 'Platform configuration and preferences',
    category: 'settings',
    icon: 'settings',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Settings'],
    quickActions: [
      { id: 'invite', label: 'Invite Team Member', icon: 'user-plus', action: () => {} },
      { id: 'billing', label: 'Manage Billing', icon: 'credit-card', action: () => {} }
    ]
  },
  'ai-agents': {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Configure and manage AI agents',
    category: 'management',
    icon: 'sparkles',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'AI Agents'],
    quickActions: [
      { id: 'new-agent', label: 'Create Agent', icon: 'plus', action: () => {} },
      { id: 'agent-marketplace', label: 'Agent Marketplace', icon: 'store', action: () => {} }
    ]
  },
  'theme-demo': {
    id: 'theme-demo',
    title: 'Design System Showcase',
    description: 'Visualise brand tokens and component variants',
    category: 'management',
    icon: 'palette',
    requiresAuth: true,
    requiresOnboarding: false,
    breadcrumbPath: ['Platform', 'Design System']
  },
  'workspaces': {
    id: 'workspaces',
    title: 'Workspaces',
    description: 'Manage workspaces and environments',
    category: 'management',
    icon: 'folder',
    requiresAuth: true,
    requiresOnboarding: true,
    breadcrumbPath: ['Platform', 'Workspaces'],
    quickActions: [
      { id: 'new-workspace', label: 'New Workspace', icon: 'plus', action: () => {} },
      { id: 'sync-repos', label: 'Sync Repositories', icon: 'refresh', action: () => {} }
    ]
  }
};

// Workflow definitions
export const WORKFLOW_DEFINITIONS: Record<WorkflowType, {
  name: string;
  description: string;
  screens: PlatformScreen[];
  icon: string;
}> = {
  'onboarding': {
    name: 'Platform Onboarding',
    description: 'Initial setup and configuration',
    screens: ['connect-github', 'detect-stack', 'stack-configurator', 'blueprint-select', 'secrets-wizard'],
    icon: 'compass'
  },
  'deployment': {
    name: 'Deployment Workflow',
    description: 'Deploy and manage infrastructure',
    screens: ['stack-configurator', 'blueprint-select', 'pr-preview', 'run-detail'],
    icon: 'rocket'
  },
  'monitoring': {
    name: 'Monitoring & Alerts',
    description: 'Observe infrastructure and respond to issues',
    screens: ['dashboard', 'run-detail', 'drift-view', 'agent-console'],
    icon: 'monitor'
  },
  'management': {
    name: 'Platform Management',
    description: 'Configure and administer the platform',
    screens: ['settings', 'ai-agents', 'workspaces', 'migration-wizard'],
    icon: 'settings'
  }
};

// Navigation utilities
export function getScreensByCategory(category: ScreenCategory): ScreenMetadata[] {
  return Object.values(SCREEN_REGISTRY).filter(screen => screen.category === category);
}

export function getWorkflowScreens(workflow: WorkflowType): ScreenMetadata[] {
  const screens = WORKFLOW_DEFINITIONS[workflow]?.screens || [];
  return screens.map(screenId => SCREEN_REGISTRY[screenId]).filter(Boolean);
}

export function getNextScreenInWorkflow(currentScreen: PlatformScreen, workflow: WorkflowType): PlatformScreen | null {
  const screens = WORKFLOW_DEFINITIONS[workflow]?.screens || [];
  const currentIndex = screens.indexOf(currentScreen);
  return currentIndex >= 0 && currentIndex < screens.length - 1 ? screens[currentIndex + 1] : null;
}

export function getPreviousScreenInWorkflow(currentScreen: PlatformScreen, workflow: WorkflowType): PlatformScreen | null {
  const screens = WORKFLOW_DEFINITIONS[workflow]?.screens || [];
  const currentIndex = screens.indexOf(currentScreen);
  return currentIndex > 0 ? screens[currentIndex - 1] : null;
}

export function getWorkflowProgress(currentScreen: PlatformScreen, workflow: WorkflowType): {
  current: number;
  total: number;
  percentage: number;
} {
  const screens = WORKFLOW_DEFINITIONS[workflow]?.screens || [];
  const currentIndex = screens.indexOf(currentScreen);
  return {
    current: currentIndex >= 0 ? currentIndex + 1 : 0,
    total: screens.length,
    percentage: currentIndex >= 0 ? ((currentIndex + 1) / screens.length) * 100 : 0
  };
}