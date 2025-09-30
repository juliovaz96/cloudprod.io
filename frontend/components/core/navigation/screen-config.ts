/**
 * Screen Configuration - Icons, Colors, and Metadata
 */
import {
  Home,
  Sparkles,
  Building2,
  DollarSign,
  FileText,
  LogIn,
  LayoutDashboard,
  Layers,
  Settings,
  Github,
  Search,
  LayoutTemplate,
  KeyRound,
  GitPullRequest,
  Activity,
  AlertTriangle,
  Bot,
  Brain,
  Route,
  Folder,
  Workflow
} from 'lucide-react';
import type { Screen } from '../../../contexts/NavigationContext';
import { getScreenLabel } from '../../../contexts/NavigationContext';
import {
  WEBSITE_SCREENS,
  PLATFORM_SCREENS,
  DEVELOPMENT_SCREENS,
  PROTECTED_SCREENS,
  AUTH_SCREENS,
} from '../../shared/utils/constants';

export interface ScreenConfig {
  id: Screen;
  label: string;
  icon: typeof Home;
  description?: string;
  color: string;
  gradient: string;
  isProtected: boolean;
  category: 'website' | 'platform';
}

const SCREEN_CONFIGS: Partial<Record<Screen, ScreenConfig>> = {
  home: {
    id: 'home',
    label: 'Home',
    icon: Home,
    description: 'Welcome to CloudProd.AI',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    isProtected: false,
    category: 'website'
  },
  features: {
    id: 'features',
    label: 'Features',
    icon: Sparkles,
    description: 'Explore our platform capabilities',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    isProtected: false,
    category: 'website'
  },
  solutions: {
    id: 'solutions',
    label: 'Solutions',
    icon: Building2,
    description: 'Industry-specific solutions',
    color: 'text-green-600',
    gradient: 'from-green-500 to-green-600',
    isProtected: false,
    category: 'website'
  },
  pricing: {
    id: 'pricing',
    label: 'Pricing',
    icon: DollarSign,
    description: 'Simple, transparent pricing',
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-600',
    isProtected: false,
    category: 'website'
  },
  docs: {
    id: 'docs',
    label: 'Documentation',
    icon: FileText,
    description: 'Guides, tutorials, and API reference',
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-indigo-600',
    isProtected: false,
    category: 'website'
  },
  auth: {
    id: 'auth',
    label: 'Sign In',
    icon: LogIn,
    description: 'Access your account',
    color: 'text-gray-600',
    gradient: 'from-gray-500 to-gray-600',
    isProtected: false,
    category: 'website'
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Project overview and management',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    isProtected: true,
    category: 'platform'
  },
  'connect-github': {
    id: 'connect-github',
    label: 'Connect GitHub',
    icon: Github,
    description: 'Link repositories and installations',
    color: 'text-slate-600',
    gradient: 'from-slate-600 to-slate-800',
    isProtected: true,
    category: 'platform'
  },
  'detect-stack': {
    id: 'detect-stack',
    label: 'Detect Stack',
    icon: Search,
    description: 'Auto-discover services and runtimes',
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
    isProtected: true,
    category: 'platform'
  },
  canvas: {
    id: 'canvas',
    label: 'Architecture Canvas',
    icon: Layers,
    description: 'Visual infrastructure design',
    color: 'text-primary',
    gradient: 'from-primary to-accent',
    isProtected: true,
    category: 'platform'
  },
  'stack-configurator': {
    id: 'stack-configurator',
    label: 'Stack Configurator',
    icon: Workflow,
    description: 'Compose infrastructure blueprints',
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-purple-600',
    isProtected: true,
    category: 'platform'
  },
  'blueprint-select': {
    id: 'blueprint-select',
    label: 'Blueprint Select',
    icon: LayoutTemplate,
    description: 'AI recommended deployment templates',
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-amber-500',
    isProtected: true,
    category: 'platform'
  },
  'secrets-wizard': {
    id: 'secrets-wizard',
    label: 'Secrets Wizard',
    icon: KeyRound,
    description: 'Validate and manage sensitive values',
    color: 'text-teal-600',
    gradient: 'from-teal-500 to-cyan-500',
    isProtected: true,
    category: 'platform'
  },
  'pr-preview': {
    id: 'pr-preview',
    label: 'PR Preview',
    icon: GitPullRequest,
    description: 'Review change sets and policy checks',
    color: 'text-sky-600',
    gradient: 'from-sky-500 to-blue-600',
    isProtected: true,
    category: 'platform'
  },
  'run-detail': {
    id: 'run-detail',
    label: 'Run Detail',
    icon: Activity,
    description: 'Live deployment telemetry and logs',
    color: 'text-rose-600',
    gradient: 'from-rose-500 to-pink-600',
    isProtected: true,
    category: 'platform'
  },
  'drift-view': {
    id: 'drift-view',
    label: 'Drift View',
    icon: AlertTriangle,
    description: 'Detect and remediate configuration drift',
    color: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-600',
    isProtected: true,
    category: 'platform'
  },
  'agent-console': {
    id: 'agent-console',
    label: 'Agent Console',
    icon: Bot,
    description: 'Observe and orchestrate platform agents',
    color: 'text-slate-600',
    gradient: 'from-slate-500 to-gray-700',
    isProtected: true,
    category: 'platform'
  },
  'ai-agents': {
    id: 'ai-agents',
    label: 'AI Agents',
    icon: Brain,
    description: 'Configure autonomous infrastructure agents',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-fuchsia-500',
    isProtected: true,
    category: 'platform'
  },
  'migration-wizard': {
    id: 'migration-wizard',
    label: 'Migration Wizard',
    icon: Route,
    description: 'Guide legacy workloads into IaC workflows',
    color: 'text-green-600',
    gradient: 'from-green-500 to-lime-500',
    isProtected: true,
    category: 'platform'
  },
  'workspaces': {
    id: 'workspaces',
    label: 'Workspaces',
    icon: Folder,
    description: 'Organize environments and teams',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-indigo-600',
    isProtected: true,
    category: 'platform'
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Account and preferences',
    color: 'text-gray-600',
    gradient: 'from-gray-500 to-gray-600',
    isProtected: true,
    category: 'platform'
  }
};

const WEBSITE_SCREEN_SET = new Set<Screen>([...(WEBSITE_SCREENS as unknown as Screen[]), ...(AUTH_SCREENS as unknown as Screen[])]);
const PLATFORM_SCREEN_SET = new Set<Screen>(PLATFORM_SCREENS as unknown as Screen[]);
const DEVELOPMENT_SCREEN_SET = new Set<Screen>(DEVELOPMENT_SCREENS as unknown as Screen[]);
const PROTECTED_SCREEN_SET = new Set<Screen>(PROTECTED_SCREENS as unknown as Screen[]);

function createFallbackConfig(screen: Screen): ScreenConfig {
  const label = getScreenLabel(screen);
  const isPlatform = PLATFORM_SCREEN_SET.has(screen) || DEVELOPMENT_SCREEN_SET.has(screen);
  const category: ScreenConfig['category'] = isPlatform ? 'platform' : 'website';
  const isProtected = PROTECTED_SCREEN_SET.has(screen);

  const { color, gradient } = category === 'platform'
    ? { color: 'text-primary', gradient: 'from-primary to-accent' }
    : { color: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' };

  const icon = (() => {
    if (screen === 'auth' || screen === 'login') {
      return LogIn;
    }

    if (screen === 'pricing' || screen === 'plans') {
      return DollarSign;
    }

    if (screen === 'docs' || screen === 'faq' || screen.includes('community')) {
      return FileText;
    }

    if (screen === 'product-overview' || screen === 'use-cases') {
      return Sparkles;
    }

    if (screen === 'canvas' || screen === 'prompt-to-prototype') {
      return Layers;
    }

    if (isPlatform) {
      return LayoutDashboard;
    }

    return Home;
  })();

  return {
    id: screen,
    label,
    icon,
    description: undefined,
    color,
    gradient,
    isProtected,
    category,
  };
}

export function getScreenConfig(screen: Screen): ScreenConfig {
  return SCREEN_CONFIGS[screen] ?? createFallbackConfig(screen);
}

export function getScreenIcon(screen: Screen) {
  return getScreenConfig(screen).icon;
}

export function getScreenColor(screen: Screen) {
  return getScreenConfig(screen).color;
}

export function getScreenGradient(screen: Screen) {
  return getScreenConfig(screen).gradient;
}

export function isProtectedScreen(screen: Screen): boolean {
  return getScreenConfig(screen).isProtected;
}

const uniqueWebsiteScreens = Array.from(new Set([...WEBSITE_SCREEN_SET])) as Screen[];
const uniquePlatformScreens = Array.from(new Set([...PLATFORM_SCREEN_SET, ...DEVELOPMENT_SCREEN_SET])) as Screen[];

export const WEBSITE_SCREEN_CONFIGS = uniqueWebsiteScreens.map(getScreenConfig);
export const PLATFORM_SCREEN_CONFIGS = uniquePlatformScreens.map(getScreenConfig);