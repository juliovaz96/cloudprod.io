import React, { useMemo, useState } from 'react';
import { PlatformLayout } from '../core/layouts/PlatformLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';
import { cn } from '../ui/utils';

interface DriftFinding {
  id: string;
  resource: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  evidence: string;
  lastSeen: string;
  remediation: string;
  autoFixAvailable: boolean;
}

const severityOrder: DriftFinding['severity'][] = ['critical', 'high', 'medium', 'low'];

const driftFindings: DriftFinding[] = [
  {
    id: 'sg-open-port',
    resource: 'aws_security_group.prod_web',
    severity: 'critical',
    evidence: 'Ingress rule allows 0.0.0.0/0 on port 22 discovered 14 minutes ago.',
    lastSeen: '14m ago',
    remediation: 'Restrict SSH to bastion CIDR 10.0.10.0/24 and regenerate guardrail policy.',
    autoFixAvailable: true
  },
  {
    id: 's3-public',
    resource: 'aws_s3_bucket.static_assets',
    severity: 'high',
    evidence: 'Bucket policy drift detected: public-read granted directly on bucket.',
    lastSeen: '32m ago',
    remediation: 'Reapply baseline module and invalidate CloudFront distribution.',
    autoFixAvailable: true
  },
  {
    id: 'asg-capacity',
    resource: 'aws_autoscaling_group.worker_pool',
    severity: 'medium',
    evidence: 'Desired capacity set to 12 (baseline 6) outside of scheduled scaling window.',
    lastSeen: '2h ago',
    remediation: 'Confirm workload burst. Suggested safe apply with progressive traffic shifting.',
    autoFixAvailable: false
  },
  {
    id: 'tag-missing',
    resource: 'aws_db_instance.payments',
    severity: 'low',
    evidence: 'Mandatory tags cost_center + compliance missing after manual modification.',
    lastSeen: '4h ago',
    remediation: 'Apply tag enforcement blueprint and audit IAM activity.',
    autoFixAvailable: true
  }
];

const severityStyles: Record<DriftFinding['severity'], { label: string; color: string }> = {
  critical: { label: 'Critical', color: 'bg-red-500/15 text-red-500' },
  high: { label: 'High', color: 'bg-orange-500/15 text-orange-500' },
  medium: { label: 'Medium', color: 'bg-amber-500/15 text-amber-600' },
  low: { label: 'Low', color: 'bg-emerald-500/15 text-emerald-500' }
};

export function DriftViewScreen() {
  const { navigateTo } = useNavigation();
  const [activeSeverities, setActiveSeverities] = useState(() => new Set<DriftFinding['severity']>(severityOrder));
  const [autoFixMode, setAutoFixMode] = useState(true);
  const [showCanvasOverlay, setShowCanvasOverlay] = useState(true);

  const filteredFindings = useMemo(() => {
    return driftFindings.filter(finding => activeSeverities.has(finding.severity));
  }, [activeSeverities]);

  const criticalCount = filteredFindings.filter(item => item.severity === 'critical' || item.severity === 'high').length;

  const toggleSeverity = (severity: DriftFinding['severity']) => {
    setActiveSeverities(prev => {
      const next = new Set(prev);
      if (next.has(severity)) {
        next.delete(severity);
      } else {
        next.add(severity);
      }
      return next;
    });
  };

  const handleGenerateFix = () => {
    console.info('Generating automated remediation pull request', {
      findings: filteredFindings.map(finding => finding.id),
      safeApply: autoFixMode,
      overlay: showCanvasOverlay
    });
    navigateTo('pr-preview');
  };

  return (
    <PlatformLayout title="Drift Detection" className="bg-muted/20">
      <div className="mx-auto flex-1 space-y-6 px-8 py-6 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Drift inventory</CardTitle>
              <CardDescription>Real-time findings grouped by blast radius and remediation confidence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {severityOrder.map(severity => {
                  const isActive = activeSeverities.has(severity);
                  return (
                    <Button
                      key={severity}
                      variant={isActive ? 'default' : 'outline'}
                      onClick={() => toggleSeverity(severity)}
                      className={cn('h-9 px-4 text-sm capitalize',
                        !isActive && 'bg-transparent text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {severityStyles[severity].label}
                    </Button>
                  );
                })}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Evidence</TableHead>
                    <TableHead className="hidden md:table-cell">Last seen</TableHead>
                    <TableHead className="text-right">Automation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFindings.map(finding => (
                    <TableRow key={finding.id}>
                      <TableCell className="font-medium">{finding.resource}</TableCell>
                      <TableCell>
                        <span className={cn('rounded-full px-2 py-1 text-xs font-semibold', severityStyles[finding.severity].color)}>
                          {severityStyles[finding.severity].label}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xl whitespace-normal text-sm text-muted-foreground">
                        {finding.evidence}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{finding.lastSeen}</TableCell>
                      <TableCell className="text-right text-sm">
                        {finding.autoFixAvailable ? (
                          <Badge variant="secondary">Auto-fix ready</Badge>
                        ) : (
                          <Badge variant="outline">Manual review</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredFindings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                        No drift matches the current severity filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automation readiness</CardTitle>
              <CardDescription>Evaluate remediation backlog and auto-fix eligibility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
                <p className="font-semibold text-foreground">{criticalCount} high impact findings selected</p>
                <p className="mt-2 text-muted-foreground">Safe apply workflow required for critical drift. Canary plan will run in staging with 50% traffic shifting.</p>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Safe apply dry-run</p>
                  <p className="text-xs text-muted-foreground">Execute terraform plan + policy gates before remediation.</p>
                </div>
                <Switch checked={autoFixMode} onCheckedChange={setAutoFixMode} />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Canvas overlay</p>
                  <p className="text-xs text-muted-foreground">Highlight drifted resources directly on architecture canvas.</p>
                </div>
                <Switch checked={showCanvasOverlay} onCheckedChange={setShowCanvasOverlay} />
              </div>

              <Separator />

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Automated fixes generated</span>
                  <Badge variant="secondary">3 queued</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Evidence snapshots</span>
                  <Badge variant="secondary">Last 30m</Badge>
                </div>
              </div>

              <Button className="w-full" onClick={handleGenerateFix} disabled={filteredFindings.length === 0}>
                Generate fix pull request
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="canvas" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="canvas">Canvas integration</TabsTrigger>
            <TabsTrigger value="timeline">Evidence timeline</TabsTrigger>
            <TabsTrigger value="workflows">Remediation workflows</TabsTrigger>
          </TabsList>

          <TabsContent value="canvas">
            <Card>
              <CardHeader>
                <CardTitle>Architecture canvas overlay</CardTitle>
                <CardDescription>Nodes highlighted in real time to visualise configuration drift.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-dashed border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">Canvas snapshot · production environment</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {filteredFindings.slice(0, 6).map(finding => (
                      <div key={finding.id} className="rounded-lg border border-border bg-muted/40 p-3">
                        <p className="text-sm font-medium text-foreground">{finding.resource}</p>
                        <p className="text-xs text-muted-foreground">Highlighted as {severityStyles[finding.severity].label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Overlay preview simulated. Final view synchronises with CanvasScreen hotspots to guide remediation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Evidence timeline</CardTitle>
                <CardDescription>Event stream aggregated from CloudTrail, Config, and agent telemetry.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <div className="space-y-4 text-sm">
                    {driftFindings.map(finding => (
                      <div key={finding.id} className="border-l-2 border-border pl-4">
                        <p className="font-semibold text-foreground">{finding.lastSeen}</p>
                        <p className="text-muted-foreground">{finding.evidence}</p>
                        <p className="text-xs text-muted-foreground">Suggested remediation: {finding.remediation}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows">
            <Card>
              <CardHeader>
                <CardTitle>Remediation playbooks</CardTitle>
                <CardDescription>Sequenced workflows combining automation, approval, and communication.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4 text-sm">
                  <p className="font-semibold text-foreground">Critical drift escalation</p>
                  <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                    <li>Detect + snapshot infrastructure state.</li>
                    <li>Notify on-call SRE & security channel.</li>
                    <li>Run safe apply plan with manual approval gate.</li>
                    <li>Post-remediation, trigger drift verification policy set.</li>
                  </ul>
                </div>
                <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4 text-sm">
                  <p className="font-semibold text-foreground">Low-risk auto remediation</p>
                  <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                    <li>Batch tag or guardrail fixes into single PR.</li>
                    <li>Auto-assign FinOps approver if cost delta detected.</li>
                    <li>Merge upon green CI + drift re-scan confirmation.</li>
                    <li>Archive evidence to compliance data lake.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PlatformLayout>
  );
}
