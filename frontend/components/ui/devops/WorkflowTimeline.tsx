import React from 'react';
import { CheckCircle2, Circle, PauseCircle, PlayCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { Badge } from '../badge';
import { Progress } from '../progress';
import { cn } from '../utils';

export type TimelineStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export type TimelineStep = {
  id: string;
  name: string;
  description?: string;
  status: TimelineStatus;
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
};

export type WorkflowTimelineProps = {
  steps: TimelineStep[];
  title?: string;
  className?: string;
};

const STATUS_ICON: Record<TimelineStatus, React.ElementType> = {
  pending: Circle,
  running: PlayCircle,
  completed: CheckCircle2,
  failed: XCircle,
  skipped: PauseCircle
};

const STATUS_BADGES: Record<TimelineStatus, string> = {
  pending: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
  running: 'bg-sky-500/10 text-sky-200 border-sky-500/20',
  completed: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20',
  failed: 'bg-rose-500/10 text-rose-200 border-rose-500/20',
  skipped: 'bg-amber-500/10 text-amber-200 border-amber-500/20'
};

export function WorkflowTimeline({ steps, title = 'Deployment Workflow', className }: WorkflowTimelineProps) {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const percent = steps.length === 0 ? 0 : Math.round((completedSteps / steps.length) * 100);

  return (
    <Card className={cn('border border-border/60 bg-slate-950/70 text-slate-100', className)}>
      <CardHeader className="border-b border-border/40 bg-black/30">
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-slate-200">
          {title}
        </CardTitle>
        <CardDescription className="text-xs text-slate-400">
          Tracks real-time workflow execution from repository trigger through production deployment.
        </CardDescription>
        <Progress value={percent} className="mt-3 h-2 bg-slate-800" />
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <ol className="relative space-y-4 border-l border-slate-800 pl-6">
          {steps.map((step, index) => {
            const Icon = STATUS_ICON[step.status];
            return (
              <li key={step.id} className="relative">
                <span className="absolute -left-[31px] flex size-7 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="rounded-lg border border-slate-800/70 bg-slate-900/80 p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{index + 1}. {step.name}</p>
                      {step.description && <p className="text-xs text-slate-400">{step.description}</p>}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge variant="outline" className={cn('border', STATUS_BADGES[step.status])}>
                        {step.status.toUpperCase()}
                      </Badge>
                      {step.durationMs && (
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                          {(step.durationMs / 1000).toFixed(1)}s
                        </span>
                      )}
                      {step.startedAt && (
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                          Started {step.startedAt}
                        </span>
                      )}
                      {step.completedAt && (
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                          Completed {step.completedAt}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
