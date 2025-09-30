import React, { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  BarChart3,
  Book,
  Cloud,
  Code,
  Cpu,
  FileText,
  Folder,
  Layers,
  Lightbulb,
  Plus,
  Rocket,
  Settings,
  Video
} from 'lucide-react';
import type { Screen } from './NavigationContext';

export type SpacingToken = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16;

const spacingScale: Record<SpacingToken, string> = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px'
};

export type FeatureHighlight = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  surfaceClass: string;
  iconClass: string;
};

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  surfaceClass: string;
  iconWrapperClass: string;
  iconClass: string;
  delayIndex?: number;
};

export type DashboardQuickAction = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconWrapperClass: string;
  iconClass: string;
  route: Screen;
};

export type DashboardProject = {
  id: string;
  name: string;
  status: 'Deployed' | 'Building' | 'Draft';
  lastUpdated: string;
  resources: number;
  cost: string;
};

export type QuickStartGuide = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconSurfaceClass: string;
  duration: string;
  route: Screen;
};

export type DocItemType = 'guide' | 'api' | 'video';

export type DocumentationItem = {
  id: string;
  title: string;
  type: DocItemType;
};

export type DocumentationCategory = {
  id: string;
  category: string;
  items: DocumentationItem[];
};

export type DocumentationTutorial = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'guide' | 'video';
  route: Screen;
};

type MarketingCopy = {
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    description: string;
    primaryCta: { label: string; route: Screen };
    secondaryCta: { label: string; route: Screen };
  };
  featuresIntro: {
    title: string;
    description: string;
  };
  featureHighlights: FeatureHighlight[];
  bottomCta: {
    title: string;
    description: string;
    primaryCta: { label: string; route: Screen };
    secondaryCta: { label: string; route: Screen };
  };
};

type PlatformCopy = {
  dashboard: {
    heading: string;
    subheading: string;
    stats: DashboardStat[];
    projects: DashboardProject[];
    quickActions: DashboardQuickAction[];
    emptyState: {
      title: string;
      description: string;
      cta: { label: string; route: Screen };
    };
  };
};

type DocumentationCopy = {
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    description: string;
    searchPlaceholder: string;
  };
  quickStart: QuickStartGuide[];
  categories: DocumentationCategory[];
  tutorials: DocumentationTutorial[];
  cta: {
    title: string;
    description: string;
    primaryCta: { label: string; route: Screen };
    secondaryCta: { label: string; route: Screen };
  };
};

export type GuidelineConfig = {
  tokens: {
    colors: {
      // Brand colors (logo-derived)
      brand: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      // Legacy compatibility
      primary: string;
      accent: string;
      success: string;
      surface: string;
    };
    gradients: {
      // Brand gradients
      heroBackground: string;
      primaryToAccent: string;
      mutedCard: string;
      // Feature-specific gradients
      featureAnalytics: string;
      featureAutomation: string;
      featureIntegration: string;
      featureSecurity: string;
      featurePerformance: string;
      featureMonitoring: string;
    };
  };
  layout: {
    page: string;
    marketing: {
      container: string;
      contentNarrow: string;
      heroSection: string;
      sectionPadding: string;
    };
    platform: {
      shell: string;
      body: string;
      header: string;
      content: string;
      container: string;
    };
  };
  typography: {
    heroTitle: string;
    heroHighlight: string;
    heroDescription: string;
    sectionTitle: string;
    sectionDescription: string;
  };
  components: {
    // Marketing components
    heroBadge: string;
    primaryButton: string;
    primaryButtonSurface: string;
    secondaryButton: string;
    featureCard: string;
    
    // Platform components  
    dashboardStatCard: string;
    projectCard: string;
    quickActionCard: string;
    documentationCard: string;
    documentationCategoryCard: string;
    documentationTutorialCard: string;
    searchInput: string;
    
    // UI component variants (Phase 3)
    button: {
      brand: string;
      brandOutline: string;
      feature: string;
      success: string;
      warning: string;
    };
    card: {
      feature: string;
      interactive: string;
      brand: string;
      elevated: string;
    };
    badge: {
      brand: string;
      feature: string;
      status: string;
    };
    input: {
      brand: string;
      feature: string;
    };
  };
  motion: {
    durations: {
      hero: number;
      section: number;
      element: number;
    };
    getStagger: (index: number, baseStep?: number) => number;
  };
  copy: {
    marketing: MarketingCopy;
    platform: PlatformCopy;
    documentation: DocumentationCopy;
  };
  utils: {
    getSpacing: (token: SpacingToken) => string;
  };
};

type GuidelineProviderProps = PropsWithChildren<{
  value?: DeepPartial<GuidelineConfig>;
}>;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends (...args: any[]) => any
    ? T[K]
    : T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

const defaultGuidelines: GuidelineConfig = {
  tokens: {
    colors: {
      // Brand colors (logo-derived)
      brand: {
        primary: 'text-orange-500', // CloudProd Orange
        secondary: 'text-amber-500', // CloudProd Amber
        tertiary: 'text-sky-500', // CloudProd Blue
      },
      // Legacy compatibility
      primary: 'text-primary',
      accent: 'text-accent',
      success: 'text-green-500',
      surface: 'bg-card'
    },
    gradients: {
      // Brand gradients
      heroBackground: 'bg-gradient-to-br from-orange-500/5 via-background to-amber-500/5',
      primaryToAccent: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
      mutedCard: 'bg-gradient-to-br from-background to-muted/20',
      // Feature-specific gradients (logo-aligned)
      featureAnalytics: 'bg-gradient-to-r from-orange-500 to-amber-500',
      featureAutomation: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      featureIntegration: 'bg-gradient-to-r from-green-500 to-emerald-500',
      featureSecurity: 'bg-gradient-to-r from-red-500 to-orange-500',
      featurePerformance: 'bg-gradient-to-r from-purple-500 to-violet-500',
      featureMonitoring: 'bg-gradient-to-r from-indigo-500 to-blue-500',
    }
  },
  layout: {
    page: 'min-h-screen bg-background font-sans text-foreground',
    marketing: {
      container: 'container mx-auto px-6',
      contentNarrow: 'max-w-4xl mx-auto text-center',
      heroSection: 'relative overflow-hidden',
      sectionPadding: 'py-20 lg:py-32'
    },
    platform: {
      shell: 'min-h-screen bg-background font-sans',
      body: 'flex h-screen',
      header: 'border-b border-border bg-card/80 backdrop-blur',
      content: 'flex-1 flex flex-col overflow-hidden',
      container: 'mx-auto w-full max-w-6xl px-6 py-8'
    }
  },
  typography: {
    heroTitle: 'text-5xl lg:text-7xl font-semibold mb-6',
    heroHighlight: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
    heroDescription: 'text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed',
    sectionTitle: 'text-3xl lg:text-4xl font-semibold mb-4',
    sectionDescription: 'text-muted-foreground text-lg max-w-2xl mx-auto'
  },
  components: {
    // Marketing components
    heroBadge: 'bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-sm text-orange-500',
    primaryButton: 'text-lg px-8 py-6 h-auto group shadow-lg hover:shadow-xl transition-all duration-300 border-0',
    primaryButtonSurface: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
    secondaryButton: 'text-lg px-8 py-6 h-auto border-2 hover:bg-orange-500/5 hover:border-orange-500/50 transition-all duration-300',
    featureCard: 'p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/40 rounded-2xl bg-card/80 backdrop-blur',
    
    // Platform components
    dashboardStatCard: 'p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/40 rounded-2xl bg-card/90 backdrop-blur',
    projectCard: 'p-6 hover:shadow-lg transition-shadow cursor-pointer rounded-2xl border border-border/40 bg-card/90 backdrop-blur',
    quickActionCard: 'p-6 hover:shadow-lg transition-shadow cursor-pointer rounded-2xl border border-border/40 bg-card/90 backdrop-blur',
    documentationCard: 'p-6 h-full rounded-2xl border border-border/40 bg-card/90 backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg',
    documentationCategoryCard: 'p-6 h-full rounded-2xl border border-border/30 bg-card/95 backdrop-blur shadow-sm',
    documentationTutorialCard: 'p-6 h-full rounded-2xl border border-border/40 bg-card/90 backdrop-blur transition-shadow hover:shadow-lg',
    searchInput: 'pl-10 h-12 text-lg',
    
    // UI component variants (Phase 3 - Logo-aligned)
    button: {
      brand: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 focus-visible:ring-orange-500/40',
      brandOutline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus-visible:ring-orange-500/40',
      feature: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600',
      success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600',
      warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
    },
    card: {
      feature: 'border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/30',
      interactive: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer',
      brand: 'border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10',
      elevated: 'shadow-lg border-border/30 bg-card/95 backdrop-blur'
    },
    badge: {
      brand: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      feature: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      status: 'bg-green-500/10 text-green-500 border-green-500/20'
    },
    input: {
      brand: 'border-orange-500/30 focus:border-orange-500 focus:ring-orange-500/20',
      feature: 'border-blue-500/30 focus:border-blue-500 focus:ring-blue-500/20'
    }
  },
  motion: {
    durations: {
      hero: 0.8,
      section: 0.6,
      element: 0.4
    },
    getStagger: (index: number, baseStep = 0.1) => Number((index * baseStep).toFixed(2))
  },
  copy: {
    marketing: {
      hero: {
        badge: '✨ From Prompt to Production',
        titleLead: 'Infrastructure Made',
        titleHighlight: 'Intelligent',
        description:
          'Transform your ideas into production-ready cloud infrastructure using AI-powered architecture design, visual canvas editing, and automated deployment pipelines.',
        primaryCta: {
          label: 'Start Building Free',
          route: 'auth'
        },
        secondaryCta: {
          label: 'Explore Features',
          route: 'features'
        }
      },
      featuresIntro: {
        title: 'Revolutionize Your Infrastructure Workflow',
        description: 'From natural language prompts to deployed infrastructure in minutes, not weeks.'
      },
      featureHighlights: [
        {
          id: 'ai-powered-design',
          title: 'AI-Powered Design',
          description: 'Describe your infrastructure needs in plain English and watch our AI generate production-ready architectures.',
          icon: Cpu,
          surfaceClass: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
          iconClass: 'bg-gradient-to-r from-blue-500 to-indigo-600'
        },
        {
          id: 'visual-canvas',
          title: 'Visual Canvas',
          description: 'Edit and refine your infrastructure using our intuitive drag-and-drop visual canvas interface.',
          icon: Layers,
          surfaceClass: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
          iconClass: 'bg-gradient-to-r from-purple-500 to-pink-600'
        },
        {
          id: 'one-click-deploy',
          title: 'One-Click Deploy',
          description: 'Deploy your infrastructure to AWS, Azure, or GCP with a single click using generated Terraform code.',
          icon: Cloud,
          surfaceClass: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
          iconClass: 'bg-gradient-to-r from-green-500 to-emerald-600'
        }
      ],
      bottomCta: {
        title: 'Ready to Transform Your Infrastructure?',
        description: 'Join thousands of developers and platform teams accelerating their deployment workflows with CloudProd.AI.',
        primaryCta: {
          label: 'Get Started Free',
          route: 'auth'
        },
        secondaryCta: {
          label: 'View Pricing',
          route: 'pricing'
        }
      }
    },
    platform: {
      dashboard: {
        heading: 'Dashboard',
        subheading: "Welcome back! Here's what's happening with your infrastructure.",
        stats: [
          {
            id: 'active-projects',
            label: 'Active Projects',
            value: '12',
            icon: Folder,
            surfaceClass: 'bg-card/90 backdrop-blur border border-border/40',
            iconWrapperClass: 'bg-gradient-to-r from-primary to-accent',
            iconClass: 'text-white',
            delayIndex: 0
          },
          {
            id: 'deployed-resources',
            label: 'Deployed Resources',
            value: '847',
            icon: Cloud,
            surfaceClass: 'bg-card/90 backdrop-blur border border-border/40',
            iconWrapperClass: 'bg-gradient-to-r from-primary to-accent',
            iconClass: 'text-white',
            delayIndex: 1
          },
          {
            id: 'cost',
            label: 'Monthly Cost',
            value: '$1,247',
            icon: BarChart3,
            surfaceClass: 'bg-card/90 backdrop-blur border border-border/40',
            iconWrapperClass: 'bg-gradient-to-r from-primary to-accent',
            iconClass: 'text-white',
            delayIndex: 2
          },
          {
            id: 'uptime',
            label: 'Uptime',
            value: '99.9%',
            icon: Activity,
            surfaceClass: 'bg-card/90 backdrop-blur border border-border/40',
            iconWrapperClass: 'bg-gradient-to-r from-primary to-accent',
            iconClass: 'text-white',
            delayIndex: 3
          }
        ],
        projects: [
          {
            id: 'ecommerce-platform',
            name: 'E-commerce Platform',
            status: 'Deployed',
            lastUpdated: '2 hours ago',
            resources: 12,
            cost: '$245/month'
          },
          {
            id: 'analytics-pipeline',
            name: 'Analytics Pipeline',
            status: 'Building',
            lastUpdated: '5 minutes ago',
            resources: 8,
            cost: '$89/month'
          },
          {
            id: 'ml-cluster',
            name: 'ML Training Cluster',
            status: 'Draft',
            lastUpdated: '1 day ago',
            resources: 6,
            cost: '$0/month'
          }
        ],
        quickActions: [
          {
            id: 'create-project',
            title: 'Create Project',
            description: 'Start with AI or canvas',
            icon: Plus,
            iconWrapperClass: 'bg-green-100 dark:bg-green-900/30',
            iconClass: 'text-green-600 dark:text-green-400',
            route: 'canvas'
          },
          {
            id: 'view-analytics',
            title: 'View Analytics',
            description: 'Cost and performance metrics',
            icon: BarChart3,
            iconWrapperClass: 'bg-blue-100 dark:bg-blue-900/30',
            iconClass: 'text-blue-600 dark:text-blue-400',
            route: 'dashboard'
          },
          {
            id: 'manage-settings',
            title: 'Manage Settings',
            description: 'Account and preferences',
            icon: Settings,
            iconWrapperClass: 'bg-purple-100 dark:bg-purple-900/30',
            iconClass: 'text-purple-600 dark:text-purple-300',
            route: 'settings'
          }
        ],
        emptyState: {
          title: 'No projects yet',
          description: 'Create your first project to see AI-generated infrastructure plans and deployment insights here.',
          cta: {
            label: 'Create Project',
            route: 'canvas'
          }
        }
      }
    },
    documentation: {
      hero: {
        badge: '📚 Documentation & Guides',
        titleLead: 'Everything You Need',
        titleHighlight: 'to Build Better',
        description:
          'Comprehensive guides, tutorials, and API references to help you master AI-powered infrastructure development.',
        searchPlaceholder: 'Search documentation...'
      },
      quickStart: [
        {
          id: 'getting-started',
          title: 'Getting Started',
          description: 'Set up your first infrastructure project in five minutes.',
          icon: Rocket,
          iconSurfaceClass: 'bg-gradient-to-r from-green-500 to-green-600',
          duration: '5 min',
          route: 'docs'
        },
        {
          id: 'prompt-guide',
          title: 'AI Prompt Guide',
          description: 'Write effective prompts for architecture planning and reviews.',
          icon: Lightbulb,
          iconSurfaceClass: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
          duration: '10 min',
          route: 'docs'
        },
        {
          id: 'visual-canvas',
          title: 'Visual Canvas',
          description: 'Master the drag-and-drop interface for rapid iteration.',
          icon: Code,
          iconSurfaceClass: 'bg-gradient-to-r from-blue-500 to-blue-600',
          duration: '15 min',
          route: 'docs'
        }
      ],
      categories: [
        {
          id: 'fundamentals',
          category: 'Fundamentals',
          items: [
            { id: 'intro', title: 'Introduction to CloudProd.AI', type: 'guide' },
            { id: 'concepts', title: 'Core Concepts', type: 'guide' },
            { id: 'patterns', title: 'Architecture Patterns', type: 'guide' },
            { id: 'best-practices', title: 'Best Practices', type: 'guide' }
          ]
        },
        {
          id: 'ai-features',
          category: 'AI Features',
          items: [
            { id: 'prompt-engineering', title: 'Prompt Engineering', type: 'guide' },
            { id: 'architecture-generation', title: 'Architecture Generation', type: 'guide' },
            { id: 'code-generation', title: 'Code Generation', type: 'guide' },
            { id: 'optimization', title: 'Optimization Suggestions', type: 'guide' }
          ]
        },
        {
          id: 'providers',
          category: 'Cloud Providers',
          items: [
            { id: 'aws', title: 'AWS Integration', type: 'guide' },
            { id: 'azure', title: 'Azure Integration', type: 'guide' },
            { id: 'gcp', title: 'Google Cloud Integration', type: 'guide' },
            { id: 'multi-cloud', title: 'Multi-Cloud Strategies', type: 'guide' }
          ]
        },
        {
          id: 'api-reference',
          category: 'API Reference',
          items: [
            { id: 'rest-api', title: 'REST API', type: 'api' },
            { id: 'graphql', title: 'GraphQL API', type: 'api' },
            { id: 'webhooks', title: 'Webhooks', type: 'api' },
            { id: 'sdks', title: 'SDKs', type: 'api' }
          ]
        }
      ],
      tutorials: [
        {
          id: 'microservices',
          title: 'Build a Microservices Architecture',
          description: 'Step-by-step guide to creating a scalable microservices setup.',
          duration: '30 min',
          difficulty: 'Intermediate',
          type: 'video',
          route: 'docs'
        },
        {
          id: 'cicd',
          title: 'CI/CD Pipeline Setup',
          description: 'Automate your deployment workflow with integrated pipelines.',
          duration: '25 min',
          difficulty: 'Advanced',
          type: 'guide',
          route: 'docs'
        },
        {
          id: 'multi-cloud',
          title: 'Multi-Cloud Deployment',
          description: 'Deploy the same application across multiple cloud providers.',
          duration: '45 min',
          difficulty: 'Advanced',
          type: 'video',
          route: 'docs'
        }
      ],
      cta: {
        title: 'Ready to Start Building?',
        description: 'Put your knowledge into practice and create your first infrastructure project.',
        primaryCta: {
          label: 'Get Started Free',
          route: 'auth'
        },
        secondaryCta: {
          label: 'Explore Features',
          route: 'features'
        }
      }
    }
  },
  utils: {
    getSpacing: (token: SpacingToken) => spacingScale[token]
  }
};

const GuidelineContext = createContext<GuidelineConfig | undefined>(undefined);

function deepMergeGuidelines<T>(base: T, overrides?: DeepPartial<T>): T {
  if (!overrides) {
    // Ensure we always return a shallow copy to avoid mutating the base reference downstream
    if (Array.isArray(base)) {
      return [...(base as unknown[])] as unknown as T;
    }
    if (base && typeof base === 'object') {
      return { ...(base as Record<string, unknown>) } as T;
    }
    return base;
  }

  if (Array.isArray(base)) {
    if (Array.isArray(overrides)) {
      return [...(overrides as unknown[])] as unknown as T;
    }
    return [...(base as unknown[])] as unknown as T;
  }

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  Object.entries(overrides).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    const baseValue = (base as Record<string, unknown>)[key];

    if (Array.isArray(value)) {
      result[key] = [...value];
      return;
    }

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMergeGuidelines(baseValue, value as DeepPartial<typeof baseValue>);
      return;
    }

    result[key] = value as unknown;
  });

  return result as T;
}

export function GuidelineProvider({ children, value }: GuidelineProviderProps) {
  const mergedValue = useMemo(() => deepMergeGuidelines(defaultGuidelines, value), [value]);

  return <GuidelineContext.Provider value={mergedValue}>{children}</GuidelineContext.Provider>;
}

export function useGuidelines() {
  const context = useContext(GuidelineContext);
  if (!context) {
    throw new Error('useGuidelines must be used within a GuidelineProvider');
  }
  return context;
}

export { defaultGuidelines };
