import React, { useMemo, useState } from 'react';
import { Code, GitBranch, Server } from 'lucide-react';
import { PlatformLayout } from '../core/layouts/PlatformLayout';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { StatusIndicator, StatusLevel } from '../ui/devops/StatusIndicator';
import { PolicyValidator } from '../ui/devops/PolicyValidator';
import { SecretManager } from '../ui/devops/SecretManager';
import { WorkflowTimeline } from '../ui/devops/WorkflowTimeline';
import { LogViewer } from '../ui/devops/LogViewer';
import { DiffViewer, type DiffLine } from '../ui/devops/DiffViewer';
import { Canvas } from '../ui/devops/Canvas';
import { useWorkspaces } from '../../contexts/WorkspacesContext';
import type { EnvironmentConfiguration } from '../../contexts/WorkspacesContext';
import { useRealtime } from '../../contexts/RealtimeContext';
import type { CollaboratorPresence } from '../../contexts/RealtimeContext';
import type { AgentIdentifier, AgentStatus, DriftSeverity, EnvironmentId } from '../../src/services/realtime/WebSocketClient';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../ui/utils';

const STATUS_PRIORITY: Record<StatusLevel, number> = {
  operational: 1,
  initialising: 2,
  maintenance: 3,
  degraded: 4,
  incident: 5,
  offline: 6
};

const STATUS_LABEL: Partial<Record<StatusLevel, string>> = {
  operational: 'Operational',
  degraded: 'Degraded',
  maintenance: 'Maintenance',
  incident: 'Incident',
  offline: 'Offline',
  initialising: 'Initialising'
};

const DIFF_SAMPLE: DiffLine[] = [
  { type: 'modified-header', content: '@@ infrastructure/main.tf @@', lineNumber: { left: 23, right: 23 } },
  { type: 'context', content: 'resource "aws_ecs_service" "api" {', lineNumber: { left: 23, right: 23 } },
  { type: 'removed', content: '  desired_count = 3', lineNumber: { left: 24, right: undefined } },
  { type: 'added', content: '  desired_count = var.desired_count', lineNumber: { left: undefined, right: 24 } },
  { type: 'context', content: '}', lineNumber: { left: 32, right: 32 } }
] ;

const AGENT_LABELS: Record<AgentIdentifier, string> = {
  'agent-orchestrator': 'Orchestrator',
  'agent-drift': 'Drift detector',
  'agent-secrets': 'Secrets manager'
};

const AGENT_ENTRIES = Object.entries(AGENT_LABELS) as Array<[AgentIdentifier, string]>;

const AGENT_STATUS_STYLES: Record<AgentStatus, string> = {
  online: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
  degraded: 'border-amber-500/60 bg-amber-500/10 text-amber-200',
  busy: 'border-sky-500/60 bg-sky-500/10 text-sky-200',
  offline: 'border-slate-700/70 bg-slate-900/40 text-slate-400'
};

const AGENT_STATUS_LABELS: Record<AgentStatus, string> = {
  online: 'Online',
  degraded: 'Degraded',
  busy: 'Busy',
  offline: 'Offline'
};

const DRIFT_SEVERITY_STYLES: Record<DriftSeverity, string> = {
  low: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200',
  medium: 'border-amber-500/60 bg-amber-500/10 text-amber-200',
  high: 'border-orange-500/60 bg-orange-500/10 text-orange-200',
  critical: 'border-rose-600/60 bg-rose-600/10 text-rose-200'
};

const DRIFT_SEVERITY_LABELS: Record<DriftSeverity, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical'
};

const toTitleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

function determineWorkspaceStatus(environments: EnvironmentConfiguration[]): StatusLevel {
  if (environments.length === 0) return 'initialising';
  return environments
    .map(environment => environment.status)
    .sort((a, b) => STATUS_PRIORITY[b] - STATUS_PRIORITY[a])[0];
}

function formatUsageLabel(label: string, used: number, limit: number) {
  return `${label} ${used}/${limit}`;
}

export function WorkspacesScreen() {
  const { workspaces, activeWorkspaceId, setActiveWorkspace, assignRepository, updateEnvironmentConfig } = useWorkspaces();
  const { isConnected, logsByEnvironment, driftAlerts, agentStatuses, collaborators, clearEnvironmentLogs } = useRealtime();
  const activeWorkspace = useMemo(() => workspaces.find(workspace => workspace.id === activeWorkspaceId) ?? workspaces[0], [workspaces, activeWorkspaceId]);
  const [repositoryInput, setRepositoryInput] = useState(activeWorkspace?.repository ?? '');
  const [activeEnvironmentId, setActiveEnvironmentId] = useState(activeWorkspace?.environments[0]?.id ?? '');

  React.useEffect(() => {
    setRepositoryInput(activeWorkspace?.repository ?? '');
    setActiveEnvironmentId(activeWorkspace?.environments[0]?.id ?? '');
  }, [activeWorkspace]);

  const activeEnvironment = useMemo(
    () => activeWorkspace?.environments.find(environment => environment.id === activeEnvironmentId) ?? activeWorkspace?.environments[0],
    [activeWorkspace, activeEnvironmentId]
  );

  const handleRepositorySave = () => {
    if (!activeWorkspace) return;
    assignRepository(activeWorkspace.id, repositoryInput);
  };

  const canvasNodes = useMemo(() => {
    if (!activeEnvironment) return [];
    return [
      {
        id: `${activeEnvironment.id}-ingress`,
        label: 'Ingress',
        subtitle: `${activeEnvironment.region} · CloudFront`,
        status: 'operational' as StatusLevel,
        position: { x: 120, y: 80 }
      },
      {
        id: `${activeEnvironment.id}-service`,
        label: 'Service',
        subtitle: activeEnvironment.stack,
        status: activeEnvironment.status,
        position: { x: 320, y: 180 }
      },
      {
        id: `${activeEnvironment.id}-data`,
        label: 'Data Layer',
        subtitle: 'Aurora + Redis',
        status: 'operational' as StatusLevel,
        position: { x: 520, y: 100 }
      }
    ];
  }, [activeEnvironment]);

  const canvasEdges = useMemo(() => {
    if (!activeEnvironment) return [];
    return [
      { id: `${activeEnvironment.id}-edge`, from: `${activeEnvironment.id}-ingress`, to: `${activeEnvironment.id}-service`, label: 'HTTPS', status: 'active' as const },
      { id: `${activeEnvironment.id}-db`, from: `${activeEnvironment.id}-service`, to: `${activeEnvironment.id}-data`, label: 'SQL + cache', status: 'active' as const }
    ];
  }, [activeEnvironment]);

  return (
  <PlatformLayout title="Workspaces" className="bg-muted/10">
      <div className="mx-auto flex-1 space-y-6 px-6 py-6 xl:max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
          <Card className="border border-border/60 bg-card/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base">Workspaces</CardTitle>
              <CardDescription>Switch between teams and deploy targets.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[360px]">
                <div className="space-y-3 pr-2">
                  {workspaces.map(workspace => {
                    const status = determineWorkspaceStatus(workspace.environments);
                    return (
                      <button
                        key={workspace.id}
                        type="button"
                        onClick={() => setActiveWorkspace(workspace.id)}
                        className={cn(
                          'w-full rounded-xl border px-4 py-3 text-left transition-all hover:border-primary/40',
                          workspace.id === activeWorkspace?.id ? 'border-primary/60 bg-primary/5 shadow-inner' : 'border-border/50 bg-background/60'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground">{workspace.name}</p>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {STATUS_LABEL[status] ?? status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{workspace.description}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <GitBranch className="size-3" aria-hidden />
                          {workspace.repository ?? 'No repository assigned'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {activeWorkspace && (
              <Card className="border border-border/60 bg-card/80 backdrop-blur">
                <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <CardTitle className="text-lg">{activeWorkspace.name}</CardTitle>
                    <CardDescription>Configure repository routing and environment guardrails.</CardDescription>
                  </div>
                  <StatusIndicator
                    level={determineWorkspaceStatus(activeWorkspace.environments)}
                    label={`Workspace ${STATUS_LABEL[determineWorkspaceStatus(activeWorkspace.environments)] ?? ''}`}
                    lastUpdated="moments ago"
                    description="Aggregated from environment health checks"
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Repository assignment</label>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                        <Input value={repositoryInput} onChange={event => setRepositoryInput(event.target.value)} placeholder="org/repository" />
                        <Button onClick={handleRepositorySave} disabled={!repositoryInput.trim()}>
                          Update repository
                        </Button>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Link GitHub repositories to enable blueprint planning and pull request previews.</p>
                    </div>
                    <div className="rounded-xl border border-border/40 bg-muted/30 p-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                        <Code className="size-4" aria-hidden />Usage & quota
                      </div>
                      <div className="mt-3 space-y-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Deployments</p>
                          <Progress value={(activeWorkspace.quota.deploymentsUsed / activeWorkspace.quota.deploymentsLimit) * 100} className="mt-1" />
                          <p className="mt-1 text-[11px] uppercase text-muted-foreground">{formatUsageLabel('Used', activeWorkspace.quota.deploymentsUsed, activeWorkspace.quota.deploymentsLimit)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Credits</p>
                          <Progress value={(activeWorkspace.quota.creditsUsed / activeWorkspace.quota.creditsLimit) * 100} className="mt-1" />
                          <p className="mt-1 text-[11px] uppercase text-muted-foreground">{formatUsageLabel('Consumed', activeWorkspace.quota.creditsUsed, activeWorkspace.quota.creditsLimit)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Agents</p>
                          <Progress value={(activeWorkspace.quota.agentsConnected / activeWorkspace.quota.agentsLimit) * 100} className="mt-1" />
                          <p className="mt-1 text-[11px] uppercase text-muted-foreground">{formatUsageLabel('Connected', activeWorkspace.quota.agentsConnected, activeWorkspace.quota.agentsLimit)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeWorkspace && activeWorkspace.environments.length > 0 && activeEnvironment && (
              <Tabs value={activeEnvironment.id} onValueChange={setActiveEnvironmentId} className="space-y-4">
                <TabsList className="flex w-full flex-wrap gap-2">
                  {activeWorkspace.environments.map(environment => (
                    <TabsTrigger key={environment.id} value={environment.id} className="flex-1 min-w-[160px]">
                      {environment.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {activeWorkspace.environments.map(environment => {
                  const environmentId = environment.id as EnvironmentId;
                  const realtimeLogEntries = logsByEnvironment[environmentId] ?? [];
                  const combinedLogs = [...environment.logs, ...realtimeLogEntries];
                  const recentDriftAlerts = driftAlerts
                    .filter(alert => alert.environmentId === environmentId)
                    .slice(-3)
                    .reverse();
                  const activeCollaborators = (collaborators[environmentId] ?? []) as CollaboratorPresence[];
                  const hasRealtimeLogs = realtimeLogEntries.length > 0;

                  return (
                    <TabsContent key={environment.id} value={environment.id} className="space-y-5">
                      <div className="grid gap-5 xl:grid-cols-[2fr,1fr]">
                        <div className="space-y-5">
                          <Card className="border border-border/60 bg-card/80">
                            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                              <div>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <Server className="size-5 text-primary" aria-hidden />
                                  {environment.name}
                                </CardTitle>
                                <CardDescription>
                                  {environment.stack} · Branch {environment.gitBranch}
                                </CardDescription>
                              </div>
                              <StatusIndicator
                                level={environment.status}
                                label={STATUS_LABEL[environment.status] ?? environment.status}
                                lastUpdated={environment.lastDeployment}
                                description={`Last deployment ${environment.lastDeployment}`}
                              />
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-muted-foreground">
                              <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                                  <p className="text-xs uppercase text-muted-foreground">Region</p>
                                  <p className="mt-1 text-sm font-semibold text-foreground">{environment.region}</p>
                                </div>
                                <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                                  <p className="text-xs uppercase text-muted-foreground">CPU consumption</p>
                                  <Progress value={environment.usage.cpu} className="mt-2" />
                                  <p className="mt-1 text-[11px] text-muted-foreground">{environment.usage.cpu}%</p>
                                </div>
                                <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                                  <p className="text-xs uppercase text-muted-foreground">Compliance score</p>
                                  <Progress value={environment.usage.complianceScore} className="mt-2" />
                                  <p className="mt-1 text-[11px] text-muted-foreground">{environment.usage.complianceScore}%</p>
                                </div>
                              </div>
                              <Separator />
                              <DiffViewer lines={DIFF_SAMPLE as unknown as any} title="Upcoming plan diff" />
                            </CardContent>
                          </Card>

                          <PolicyValidator checks={environment.policyChecks} />
                          <SecretManager
                            secrets={environment.secrets}
                            onSecretUpdate={(secretKey, value) => {
                              updateEnvironmentConfig(activeWorkspace.id, environment.id, {
                                secrets: environment.secrets.map(secret =>
                                  secret.key === secretKey ? { ...secret, value } : secret
                                )
                              });
                            }}
                          />
                          <WorkflowTimeline steps={environment.workflow} />
                        </div>

                        <div className="space-y-4">
                          <Canvas nodes={canvasNodes} edges={canvasEdges} />
                          <Card className="border border-border/60 bg-card/80">
                            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <CardTitle className="text-base">Realtime activity</CardTitle>
                                <CardDescription>Streaming telemetry for {environment.name}</CardDescription>
                              </div>
                              <div className="flex flex-wrap items-center justify-end gap-2">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide',
                                    isConnected ? 'border-emerald-500/60 text-emerald-300' : 'border-rose-500/60 text-rose-300'
                                  )}
                                >
                                  {isConnected ? 'Realtime connected' : 'Realtime offline'}
                                </Badge>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => clearEnvironmentLogs(environmentId)}
                                  disabled={!hasRealtimeLogs}
                                  className="text-xs"
                                >
                                  Clear live logs
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-4 text-xs text-muted-foreground">
                                <div>
                                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide">Agent health</p>
                                  <div className="flex flex-wrap gap-2">
                                    {AGENT_ENTRIES.map(([agentId, label]) => {
                                      const snapshot = agentStatuses[agentId];
                                      return (
                                        <Badge
                                          key={agentId}
                                          variant="outline"
                                          className={cn(
                                            'border px-2 py-1 text-[11px] font-medium',
                                            snapshot
                                              ? AGENT_STATUS_STYLES[snapshot.status]
                                              : 'border-slate-700/70 bg-slate-900/40 text-slate-400'
                                          )}
                                        >
                                          {label}
                                          {snapshot
                                            ? ` · ${AGENT_STATUS_LABELS[snapshot.status]} · ${snapshot.latencyMs}ms`
                                            : ' · awaiting signal'}
                                        </Badge>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div>
                                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide">Collaborators</p>
                                  {activeCollaborators.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                      {activeCollaborators.map(collaborator => (
                                        <div
                                          key={collaborator.id}
                                          className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-2 py-1.5"
                                        >
                                          <Avatar className="size-8 border border-border/50">
                                            <AvatarImage src={collaborator.avatarUrl} alt={collaborator.name} />
                                            <AvatarFallback>{collaborator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                          </Avatar>
                                          <div className="space-y-0.5">
                                            <p className="text-xs font-medium text-foreground">{collaborator.name}</p>
                                            <p className="text-[11px] text-muted-foreground">
                                              {toTitleCase(collaborator.status)} · {toTitleCase(collaborator.lastDelta)} ·{' '}
                                              {new Date(collaborator.lastActivity).toLocaleTimeString()}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[11px] text-muted-foreground/80">No active collaborators right now.</p>
                                  )}
                                </div>

                                <div>
                                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide">Recent drift alerts</p>
                                  {recentDriftAlerts.length > 0 ? (
                                    <div className="space-y-2">
                                      {recentDriftAlerts.map(alert => (
                                        <div
                                          key={alert.id}
                                          className={cn('rounded-lg border px-3 py-2', DRIFT_SEVERITY_STYLES[alert.severity])}
                                        >
                                          <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wide">
                                            <span>{DRIFT_SEVERITY_LABELS[alert.severity]}</span>
                                            <time>{new Date(alert.timestamp).toLocaleTimeString()}</time>
                                          </div>
                                          <p className="mt-1 text-xs font-medium text-foreground">{alert.resource}</p>
                                          <p className="text-[11px] text-muted-foreground">{alert.description}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[11px] text-muted-foreground/80">No drift detected in the last window.</p>
                                  )}
                                </div>
                              </div>

                              <LogViewer entries={combinedLogs} className="border border-border/60" />
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
