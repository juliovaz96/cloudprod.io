// Screen type definitions
export const SCREEN_CATEGORIES = {
  WEBSITE: 'website',
  PLATFORM: 'platform',
  AUTH: 'auth',
  CANVAS: 'canvas'
} as const;

// Website screens
export const WEBSITE_SCREENS = [
  'homepage',
  'product-overview',
  'use-cases',
  'faq',
  'community',
  'community-blog',
  'community-events',
  'blog-post',
  'event-detail',
  'events-calendar',
  'event-registration',
  'submit-event',
  'plans'
] as const;

// Platform screens
export const PLATFORM_SCREENS = [
  'dashboard',
  'project-overview',
  'project-detail',
  'environment-detail',
  'ai-copilot',
  'observability',
  'deployment-orchestration',
  'pipeline-builder',
  'iac-generator',
  'mobile-deployment',
  'settings'
] as const;

// Development flow screens
export const DEVELOPMENT_SCREENS = [
  'prompt-to-prototype',
  'canvas',
  'preview',
  'publish'
] as const;

// Authentication screens
export const AUTH_SCREENS = [
  'login',
  'pricing'
] as const;

// All protected screens requiring authentication
export const PROTECTED_SCREENS = [
  ...PLATFORM_SCREENS,
  ...DEVELOPMENT_SCREENS
] as const;

// Screen layout mapping
export const SCREEN_LAYOUTS = {
  // Website layout
  ...WEBSITE_SCREENS.reduce((acc, screen) => ({ ...acc, [screen]: 'website' }), {}),
  
  // Platform layout
  ...PLATFORM_SCREENS.reduce((acc, screen) => ({ ...acc, [screen]: 'platform' }), {}),
  
  // Development screens
  'prompt-to-prototype': 'platform',
  'preview': 'platform',
  'publish': 'platform',
  
  // Canvas uses special layout
  'canvas': 'canvas',
  
  // Auth layout
  ...AUTH_SCREENS.reduce((acc, screen) => ({ ...acc, [screen]: 'auth' }), {}),
  
  // Special screens
  'theme-demo': 'platform'
} as const;

// API endpoints (mock)
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  PROJECTS: '/api/projects',
  ENVIRONMENTS: '/api/environments',
  DEPLOYMENTS: '/api/deployments',
  METRICS: '/api/metrics',
  LOGS: '/api/logs'
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'c2p-theme',
  AUTH_TOKEN: 'c2p-auth-token',
  USER_PREFERENCES: 'c2p-user-preferences',
  CANVAS_STATE: 'c2p-canvas-state',
  RECENT_PROJECTS: 'c2p-recent-projects'
} as const;

// Design system constants
export const DESIGN_TOKENS = {
  COLORS: {
    PRIMARY: '#FF6B35',
    ACCENT: '#FACC15', 
    SUCCESS: '#22C55E',
    DESTRUCTIVE: '#EF4444',
    BACKGROUND_DARK: '#0D1117',
    CARD_DARK: '#111827'
  },
  SPACING: {
    SIDEBAR_WIDTH: '256px',
    SIDEBAR_WIDTH_COLLAPSED: '64px',
    HEADER_HEIGHT: '64px'
  },
  ANIMATION: {
    DURATION_FAST: '150ms',
    DURATION_NORMAL: '300ms',
    DURATION_SLOW: '500ms'
  }
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_CANVAS_V2: true,
  ENABLE_AI_COPILOT: true,
  ENABLE_MOBILE_DEPLOYMENT: true,
  ENABLE_ADVANCED_METRICS: true,
  ENABLE_THEME_DEMO: true
} as const;