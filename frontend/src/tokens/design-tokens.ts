/**
 * CloudProd.AI Design System Tokens
 * Centralized design tokens for consistent theming
 */

export const tokens = {
  colors: {
    // Logo-derived brand colors
    brand: {
      primary: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#ff6b35', // CloudProd Orange (from logo)
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
      },
      secondary: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#797875ff', // CloudProd Amber (from logo)
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      tertiary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9', // CloudProd Blue (complementary)
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
    },
    // Legacy primary (mapped to brand.primary for compatibility)
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#ff6b35', // Main brand color
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    semantic: {
      success: '#22c55e',
      'success-foreground': '#ffffff',
      warning: '#facc15',
      'warning-foreground': '#1f2937',
      error: '#ef4444',
      'error-foreground': '#ffffff',
      info: '#3b82f6',
      'info-foreground': '#ffffff',
    },
    // Feature-specific color system (logo-aligned)
    features: {
      analytics: {
        primary: '#ff6b35', // Brand orange
        secondary: '#facc15', // Brand amber
        gradient: 'from-orange-500 to-amber-500',
      },
      automation: {
        primary: '#3b82f6', // Blue
        secondary: '#06b6d4', // Cyan
        gradient: 'from-blue-500 to-cyan-500',
      },
      integration: {
        primary: '#22c55e', // Green
        secondary: '#10b981', // Emerald
        gradient: 'from-green-500 to-emerald-500',
      },
      security: {
        primary: '#ef4444', // Red
        secondary: '#f97316', // Orange-red
        gradient: 'from-red-500 to-orange-500',
      },
      performance: {
        primary: '#8b5cf6', // Purple
        secondary: '#a855f7', // Violet
        gradient: 'from-purple-500 to-violet-500',
      },
      monitoring: {
        primary: '#6366f1', // Indigo
        secondary: '#3b82f7', // Blue
        gradient: 'from-indigo-500 to-blue-500',
      },
    },
    // DevOps workflow color system
    workflow: {
      pending: {
        primary: '#f59e0b', // Amber
        secondary: '#fbbf24',
        gradient: 'from-amber-500 to-yellow-500',
        foreground: '#ffffff',
        background: '#fffbeb',
      },
      running: {
        primary: '#3b82f6', // Blue
        secondary: '#60a5fa',
        gradient: 'from-blue-500 to-indigo-500',
        foreground: '#ffffff',
        background: '#eff6ff',
      },
      success: {
        primary: '#22c55e', // Green
        secondary: '#4ade80',
        gradient: 'from-green-500 to-emerald-500',
        foreground: '#ffffff',
        background: '#f0fdf4',
      },
      failed: {
        primary: '#ef4444', // Red
        secondary: '#f87171',
        gradient: 'from-red-500 to-rose-500',
        foreground: '#ffffff',
        background: '#fef2f2',
      },
      warning: {
        primary: '#f97316', // Orange
        secondary: '#fb923c',
        gradient: 'from-orange-500 to-amber-500',
        foreground: '#ffffff',
        background: '#fff7ed',
      },
      drift: {
        primary: '#8b5cf6', // Purple
        secondary: '#a78bfa',
        gradient: 'from-purple-500 to-violet-500',
        foreground: '#ffffff',
        background: '#faf5ff',
      },
      paused: {
        primary: '#6b7280', // Gray
        secondary: '#9ca3af',
        gradient: 'from-gray-500 to-slate-500',
        foreground: '#ffffff',
        background: '#f9fafb',
      },
      cancelled: {
        primary: '#64748b', // Slate
        secondary: '#94a3b8',
        gradient: 'from-slate-500 to-gray-500',
        foreground: '#ffffff',
        background: '#f8fafc',
      },
    },
    // Platform screen-specific colors
    screens: {
      github: {
        primary: '#24292f', // GitHub dark
        secondary: '#656d76',
        accent: '#238636', // GitHub green
      },
      stack: {
        primary: '#ff6b35', // Brand orange
        secondary: '#fb923c',
        accent: '#ea580c',
      },
      canvas: {
        primary: '#6366f1', // Indigo
        secondary: '#818cf8',
        accent: '#4f46e5',
      },
      secrets: {
        primary: '#dc2626', // Red
        secondary: '#ef4444',
        accent: '#b91c1c',
      },
      agents: {
        primary: '#059669', // Emerald
        secondary: '#10b981',
        accent: '#047857',
      },
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',     // 4px
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
    '2xl': '1.5rem',   // 24px
    full: '9999px',
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

// Helper function to get nested token values
export function getToken(path: string): string {
  const keys = path.split('.');
  let value: any = tokens;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value || path;
}

// Generate CSS custom properties from tokens
export function generateCSSVariables() {
  const cssVars: Record<string, string> = {};
  
  function processTokens(obj: any, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const cssKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        processTokens(value, cssKey);
      } else {
        cssVars[`--${cssKey}`] = String(value);
      }
    }
  }
  
  processTokens(tokens);
  return cssVars;
}