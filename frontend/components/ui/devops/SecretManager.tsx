import React, { useMemo, useState } from 'react';
import { Eye, EyeOff, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { Input } from '../input';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../utils';

export type SecretStatus = 'valid' | 'missing' | 'rotation-required';

export type SecretField = {
  key: string;
  label: string;
  value?: string;
  status: SecretStatus;
  lastRotated?: string;
  managedBy?: 'cloudprod' | 'user';
  description?: string;
};

export type SecretManagerProps = {
  secrets: SecretField[];
  onSecretUpdate?: (secretKey: string, value: string) => void;
  onRotate?: (secretKey: string) => void;
  title?: string;
  className?: string;
};

const STATUS_BADGE: Record<SecretStatus, string> = {
  valid: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  missing: 'bg-rose-500/10 text-rose-200 border-rose-500/20',
  'rotation-required': 'bg-amber-500/10 text-amber-200 border-amber-500/20'
};

export function SecretManager({
  secrets,
  onSecretUpdate,
  onRotate,
  title = 'Secret Manager',
  className
}: SecretManagerProps) {
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());

  const managedByFilter = useMemo(() => {
    const values = new Set(secrets.map(secret => secret.managedBy ?? 'user'));
    return Array.from(values);
  }, [secrets]);

  const toggleVisibility = (secretKey: string) => {
    setVisibleSecrets(prev => {
      const next = new Set(prev);
      if (next.has(secretKey)) {
        next.delete(secretKey);
      } else {
        next.add(secretKey);
      }
      return next;
    });
  };

  return (
    <Card className={cn('border border-border/60 bg-slate-950/70 text-slate-200', className)}>
      <CardHeader className="border-b border-border/40 bg-black/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold uppercase tracking-wide">{title}</CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Values are encrypted at rest and synced to Vault. Rotations trigger drift checks automatically.
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-slate-700/80 text-slate-300">
            {secrets.length} secrets
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {managedByFilter.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            {managedByFilter.map(filter => (
              <Badge key={filter} variant="outline" className="border-slate-700/70 text-slate-300">
                Managed by {filter === 'cloudprod' ? 'CloudProd.AI' : 'Team'}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {secrets.map(secret => {
            const isVisible = visibleSecrets.has(secret.key);
            return (
              <div
                key={secret.key}
                className="space-y-2 rounded-xl border border-slate-800/60 bg-slate-900/80 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{secret.label}</p>
                    <p className="text-xs text-slate-400">{secret.description ?? secret.key}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="outline" className={cn('border', STATUS_BADGE[secret.status])}>
                      {secret.status === 'rotation-required' ? 'Rotation required' : secret.status === 'missing' ? 'Missing' : 'Healthy'}
                    </Badge>
                    {secret.lastRotated && (
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                        Last rotated {secret.lastRotated}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Input
                      type={isVisible ? 'text' : 'password'}
                      value={secret.value ?? ''}
                      onChange={event => onSecretUpdate?.(secret.key, event.target.value)}
                      placeholder="••••••"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                      onClick={() => toggleVisibility(secret.key)}
                    >
                      {isVisible ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
                      <span className="sr-only">Toggle secret visibility</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="bg-white/5 text-slate-300 hover:bg-white/10"
                      onClick={() => onRotate?.(secret.key)}
                      disabled={!onRotate}
                    >
                      <RefreshCcw className="mr-2 size-3" aria-hidden />Rotate
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
