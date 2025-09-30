import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, ExternalLink, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { Badge } from '../badge';
import { Button } from '../button';
import { cn } from '../utils';

export type PolicyStatus = 'pass' | 'warn' | 'fail';
export type PolicySeverity = 'low' | 'medium' | 'high' | 'critical';

export type PolicyCheck = {
  id: string;
  name: string;
  description: string;
  status: PolicyStatus;
  severity: PolicySeverity;
  docLink?: string;
  autoRemediation?: boolean;
  lastEvaluated?: string;
};

export type PolicyValidatorProps = {
  checks: PolicyCheck[];
  title?: string;
  onRemediate?: (check: PolicyCheck) => void;
  className?: string;
};

const STATUS_META: Record<PolicyStatus, { label: string; className: string; icon: React.ElementType }> = {
  pass: {
    label: 'Pass',
    className: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    icon: ShieldCheck
  },
  warn: {
    label: 'Warning',
    className: 'border-amber-500/20 bg-amber-500/10 text-amber-200',
    icon: ShieldAlert
  },
  fail: {
    label: 'Failed',
    className: 'border-rose-500/20 bg-rose-500/10 text-rose-200',
    icon: ShieldX
  }
};

const SEVERITY_BADGE: Record<PolicySeverity, string> = {
  low: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-200 border-amber-500/20',
  high: 'bg-orange-500/10 text-orange-200 border-orange-500/20',
  critical: 'bg-rose-600/20 text-rose-200 border-rose-500/30'
};

export function PolicyValidator({ checks, title = 'Policy Validation', onRemediate, className }: PolicyValidatorProps) {
  return (
    <Card className={cn('border border-border/60 bg-slate-950/70 text-slate-100', className)}>
      <CardHeader className="border-b border-border/40 bg-black/30">
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-slate-200">
          {title}
        </CardTitle>
        <CardDescription className="text-xs text-slate-400">
          Validation runs automatically on PR creation and before each deployment window.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {checks.map(check => {
          const StatusIcon = STATUS_META[check.status].icon;
          return (
            <div
              key={check.id}
              className="grid gap-3 rounded-xl border border-slate-800/60 bg-slate-900/80 p-4 md:grid-cols-[auto,1fr,auto]"
            >
              <div className="flex items-center gap-3">
                <span className={cn('flex size-9 items-center justify-center rounded-full border', STATUS_META[check.status].className)}>
                  <StatusIcon className="size-4" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">{check.name}</h3>
                  <p className="text-xs text-slate-400">{check.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <Badge variant="outline" className={cn('border', SEVERITY_BADGE[check.severity])}>
                  Severity: {check.severity.toUpperCase()}
                </Badge>
                <Badge variant="outline" className={cn('border', STATUS_META[check.status].className)}>
                  {STATUS_META[check.status].label}
                </Badge>
                {check.lastEvaluated && (
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px]">Evaluated {check.lastEvaluated}</span>
                )}
                {check.docLink && (
                  <a
                    className="inline-flex items-center gap-1 text-[11px] text-blue-300 hover:text-blue-200"
                    href={check.docLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 justify-end">
                {check.autoRemediation && (
                  <Badge className="bg-purple-500/15 text-purple-200">
                    <Wand2 className="mr-1 size-3" aria-hidden />Auto remediation available
                  </Badge>
                )}
                {onRemediate && check.status !== 'pass' && (
                  <Button size="sm" variant="secondary" onClick={() => onRemediate(check)}>
                    Create remediation task
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
