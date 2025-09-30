/**
 * CloudProd.AI KPI Widget Component
 * Dashboard metrics display with trend indicators
 */

import React from 'react';
import { cn } from './utils';
import { StatusIndicator, StatusType } from './status-indicator';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface KPIWidgetProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  status?: StatusType;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export function KPIWidget({
  title,
  value,
  change,
  changeLabel,
  status,
  icon,
  trend,
  loading = false,
  className,
  onClick
}: KPIWidgetProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↗</span>;
      case 'down':
        return <span className="text-red-500">↘</span>;
      case 'stable':
        return <span className="text-gray-500">→</span>;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card 
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        onClick && 'cursor-pointer hover:scale-105',
        loading && 'animate-pulse',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          {status && <StatusIndicator status={status} size="sm" showPulse={false} />}
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">
            {loading ? (
              <div className="h-8 w-20 bg-muted rounded animate-pulse" />
            ) : (
              value
            )}
          </div>
          
          {(change !== undefined || trend) && (
            <div className={cn('flex items-center gap-1 text-xs', getTrendColor())}>
              {getTrendIcon()}
              {change !== undefined && (
                <span>
                  {change > 0 ? '+' : ''}{change}
                  {changeLabel && ` ${changeLabel}`}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// KPI Grid component for dashboard layout
interface KPIGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export function KPIGrid({ children, columns = 4, className }: KPIGridProps) {
  return (
    <div 
      className={cn(
        'grid gap-4',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}

// Specialized KPI widgets for common metrics
export function ProjectsKPI({ count, activeCount, onClick }: { 
  count: number; 
  activeCount: number; 
  onClick?: () => void; 
}) {
  return (
    <KPIWidget
      title="Projects"
      value={count}
      change={activeCount}
      changeLabel="active"
      status={activeCount > 0 ? 'success' : 'paused'}
      icon="📁"
      onClick={onClick}
    />
  );
}

export function RunsKPI({ count, successRate, onClick }: { 
  count: number; 
  successRate: number; 
  onClick?: () => void; 
}) {
  return (
    <KPIWidget
      title="Deployments"
      value={count}
      change={successRate}
      changeLabel="% success"
      status={successRate >= 95 ? 'success' : successRate >= 80 ? 'warning' : 'failed'}
      icon="🚀"
      trend={successRate >= 95 ? 'up' : successRate >= 80 ? 'stable' : 'down'}
      onClick={onClick}
    />
  );
}

export function EnvironmentsKPI({ count, healthyCount, onClick }: { 
  count: number; 
  healthyCount: number; 
  onClick?: () => void; 
}) {
  return (
    <KPIWidget
      title="Environments"
      value={count}
      change={healthyCount}
      changeLabel="healthy"
      status={healthyCount === count ? 'success' : 'warning'}
      icon="🌍"
      onClick={onClick}
    />
  );
}

export function DriftAlertsKPI({ count, criticalCount, onClick }: { 
  count: number; 
  criticalCount: number; 
  onClick?: () => void; 
}) {
  return (
    <KPIWidget
      title="Drift Alerts"
      value={count}
      change={criticalCount}
      changeLabel="critical"
      status={criticalCount > 0 ? 'drift' : count > 0 ? 'warning' : 'success'}
      icon="⚡"
      onClick={onClick}
    />
  );
}