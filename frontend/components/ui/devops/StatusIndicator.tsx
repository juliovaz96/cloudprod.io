import React from 'react';
import { Activity, AlertTriangle, CheckCircle2, CircleSlash2, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { cn } from '../utils';

export type StatusLevel = 'operational' | 'degraded' | 'maintenance' | 'incident' | 'offline' | 'initialising';

export type StatusIndicatorProps = {
  level: StatusLevel;
  label?: string;
  latencyMs?: number;
  lastUpdated?: string;
  pulse?: boolean;
  description?: string;
  className?: string;
};

type StatusConfig = {
  icon: React.ElementType;
  tone: string;
  bg: string;
  badge: string;
  ariaLabel: string;
};

const STATUS_MAP: Record<StatusLevel, StatusConfig> = {
  operational: {
    icon: CheckCircle2,
    tone: 'text-emerald-500',
    bg: 'bg-emerald-500/15',
    badge: 'Operational',
    ariaLabel: 'Operational status'
  },
  degraded: {
    icon: Activity,
    tone: 'text-amber-500',
    bg: 'bg-amber-500/15',
    badge: 'Performance degradation',
    ariaLabel: 'Degraded status'
  },
  maintenance: {
    icon: Loader2,
    tone: 'text-sky-500',
    bg: 'bg-sky-500/15',
    badge: 'Scheduled maintenance',
    ariaLabel: 'Maintenance window'
  },
  incident: {
    icon: AlertTriangle,
    tone: 'text-red-500',
    bg: 'bg-red-500/15',
    badge: 'Incident detected',
    ariaLabel: 'Incident status'
  },
  offline: {
    icon: CircleSlash2,
    tone: 'text-slate-500',
    bg: 'bg-slate-500/15',
    badge: 'Offline',
    ariaLabel: 'Offline status'
  },
  initialising: {
    icon: Loader2,
    tone: 'text-purple-500',
    bg: 'bg-purple-500/15',
    badge: 'Initialising',
    ariaLabel: 'Initialising status'
  }
};

export function StatusIndicator({
  level,
  label,
  latencyMs,
  lastUpdated,
  pulse = level === 'operational',
  description,
  className
}: StatusIndicatorProps) {
  const config = STATUS_MAP[level];
  const Icon = config.icon;

  const content = (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium transition-colors',
        config.bg,
        className
      )}
      role="status"
      aria-label={config.ariaLabel}
    >
      <span
        className={cn(
          'relative flex size-2.5 rounded-full',
          config.tone
        )}
      >
        <span
          className={cn(
            'absolute inset-0 rounded-full bg-current opacity-75',
            pulse && 'animate-ping'
          )}
        />
        <span className="relative inline-flex size-2.5 rounded-full bg-current" />
      </span>
      <Icon className={cn('size-4 shrink-0', config.tone)} aria-hidden />
      <span className="text-foreground/90">
        {label ?? config.badge}
      </span>
      {typeof latencyMs === 'number' && (
        <span className="rounded-full bg-background/60 px-2 py-0.5 text-xs text-muted-foreground">
          {latencyMs.toFixed(0)}ms latency
        </span>
      )}
    </div>
  );

  if (!description && !lastUpdated) {
    return content;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent className="space-y-1">
        {description && <p className="font-medium text-sm text-white/90">{description}</p>}
        {lastUpdated && <p className="text-xs text-white/80">Updated {lastUpdated}</p>}
      </TooltipContent>
    </Tooltip>
  );
}
