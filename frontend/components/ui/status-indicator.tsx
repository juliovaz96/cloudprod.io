/**
 * CloudProd.AI Platform Status Indicator Component
 * Real-time status display with workflow colors
 */

import React from 'react';
import { cn } from './utils';
import { tokens } from '../../src/tokens/design-tokens';

export type StatusType = 'pending' | 'running' | 'success' | 'failed' | 'warning' | 'drift' | 'paused' | 'cancelled';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  showPulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig = {
  pending: {
    colors: tokens.colors.workflow.pending,
    icon: '⏳',
    pulse: true
  },
  running: {
    colors: tokens.colors.workflow.running,
    icon: '⚡',
    pulse: true
  },
  success: {
    colors: tokens.colors.workflow.success,
    icon: '✓',
    pulse: false
  },
  failed: {
    colors: tokens.colors.workflow.failed,
    icon: '✗',
    pulse: false
  },
  warning: {
    colors: tokens.colors.workflow.warning,
    icon: '⚠',
    pulse: true
  },
  drift: {
    colors: tokens.colors.workflow.drift,
    icon: '⚡',
    pulse: true
  },
  paused: {
    colors: tokens.colors.workflow.paused,
    icon: '⏸',
    pulse: false
  },
  cancelled: {
    colors: tokens.colors.workflow.cancelled,
    icon: '⏹',
    pulse: false
  }
};

const sizeClasses = {
  sm: 'h-2 w-2 text-xs',
  md: 'h-3 w-3 text-sm',
  lg: 'h-4 w-4 text-base'
};

export function StatusIndicator({ 
  status, 
  label, 
  showPulse = true, 
  size = 'md', 
  className 
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const shouldPulse = showPulse && config.pulse;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex items-center justify-center">
        <div 
          className={cn(
            'rounded-full flex items-center justify-center font-medium',
            sizeClasses[size],
            shouldPulse && 'animate-pulse'
          )}
          style={{ 
            backgroundColor: config.colors.primary,
            color: config.colors.foreground
          }}
        >
          <span className="text-[0.6em]">{config.icon}</span>
        </div>
        
        {shouldPulse && (
          <div 
            className={cn('absolute rounded-full animate-ping', sizeClasses[size])}
            style={{ backgroundColor: `${config.colors.primary}40` }}
          />
        )}
      </div>
      
      {label && (
        <span 
          className={cn(
            'font-medium capitalize',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base'
          )}
          style={{ color: config.colors.primary }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// Status Badge for more prominent display
interface StatusBadgeProps extends StatusIndicatorProps {
  count?: number;
}

export function StatusBadge({ status, label, count, size = 'md', className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <div 
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium',
        size === 'sm' && 'text-xs px-2 py-0.5',
        size === 'md' && 'text-sm px-3 py-1',
        size === 'lg' && 'text-base px-4 py-2',
        className
      )}
      style={{ 
        backgroundColor: config.colors.background,
        color: config.colors.primary,
        border: `1px solid ${config.colors.primary}30`
      }}
    >
      <StatusIndicator status={status} size={size} showPulse={false} />
      <span>{label || status}</span>
      {count !== undefined && (
        <span 
          className="px-1.5 py-0.5 rounded-full text-xs font-bold"
          style={{ 
            backgroundColor: config.colors.primary,
            color: config.colors.foreground
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}