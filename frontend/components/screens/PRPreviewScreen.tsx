import React, { useMemo, useState } from 'react';
import { PlatformLayout } from '../core/layouts/PlatformLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';

interface ChangeSummaryItem {
  id: string;
  resource: string;
  action: 'create' | 'update' | 'delete';
  impact: string;
  risk: 'low' | 'medium' | 'high';
  costDelta?: string;
}

interface PolicyCheckResult {
  id: string;
  title: string;
  description: string;
  status: 'pass' | 'fail' | 'warning';
  remediation?: string;
}

const changeSummary: ChangeSummaryItem[] = [
  {
    id: 'aws_vpc.main',
    resource: 'aws_vpc.main',
    action: 'update',
    impact: 'Enable flow logs and tighten inbound rules',
    risk: 'medium',
    costDelta: '+$4.32/month'
  },
  {
    id: 'aws_ecs_service.api',
    resource: 'aws_ecs_service.api',
    action: 'update',
    impact: 'Scale desired count from 3 → 5 with new rolling policy',
    risk: 'high',
    costDelta: '+$62.70/month'
  },
  {
    id: 'aws_s3_bucket.logs',
    resource: 'aws_s3_bucket.logs',
    action: 'create',
    impact: 'Centralised audit log archive with lifecycle rules',
    risk: 'low',
    costDelta: '+$1.30/month'
  },
  {
    id: 'aws_iam_role.deploy',
    resource: 'aws_iam_role.deploy',
    action: 'update',
    impact: 'Scope down permissions to least privilege',
    risk: 'low'
  }
];

const policyChecks: PolicyCheckResult[] = [
  {
    id: 'policy.networking-001',
    title: 'Public ingress review',
    description: 'Ensure all public ingress rules have CIDR restrictions',
    status: 'pass'
  },
  {
    id: 'policy.security-014',
    title: 'IAM privilege escalation scan',
    description: 'Catch policies that allow iam:* or sts:AssumeRole on wildcard',
    status: 'warning',
    remediation: 'Detected wildcard on iam:CreateRole; proposed scoped policy attached'
  },
  {
    id: 'policy.cost-analytics-007',
    title: 'Cost anomaly prevention',
    description: 'Alert on changes that increase monthly bill >$100',
    status: 'fail',
    remediation: 'Increase in ECS desired count triggered alert. Review workload sizing before approving.'
  }
];

const diffChunks = [
  'resource "aws_ecs_service" "api" {\n  name            = "prod-api"\n  desired_count   = 5 # was 3\n  deployment_controller {\n    type = "CODE_DEPLOY"\n  }\n  network_configuration {\n    subnets         = ["subnet-123", "subnet-456"]\n    security_groups = [aws_security_group.api.id]\n  }\n}',
  'resource "aws_cloudwatch_log_group" "flow_logs" {\n  name              = "/aws/vpc/flow-logs"\n  retention_in_days = 30\n}\n\nresource "aws_iam_role_policy" "flow_logs" {\n  role   = aws_iam_role.flow_logs.id\n  policy = data.aws_iam_policy_document.flow_logs.json\n}',
  'module "guardrails" {\n  source  = "cloudprod/guardrails/aws"\n  version = "~> 2.4"\n\n  enable_network_controls = true\n  enable_log_archival     = true\n  tags = {\n    environment = "production"\n    service     = "platform"\n  }\n}'
];

const riskColorMap: Record<ChangeSummaryItem['risk'], { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  low: { label: 'Low', variant: 'secondary' },
  medium: { label: 'Medium', variant: 'default' },
  high: { label: 'High', variant: 'destructive' }
};

const policyStatusBadge: Record<PolicyCheckResult['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  pass: { label: 'Pass', variant: 'secondary' },
  warning: { label: 'Warning', variant: 'default' },
  fail: { label: 'Fail', variant: 'destructive' }
};

export function PRPreviewScreen() {
  const { navigateTo } = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'summary' | 'diff' | 'policies'>('summary');
  const [autoChunkDiffs, setAutoChunkDiffs] = useState(true);
  const [prTitle, setPrTitle] = useState('feat: safely scale production API capacity');
  const [prDescription, setPrDescription] = useState(`## Summary\n- scale ecs api service to 5 tasks\n- enable vpc flow logs and guardrails module\n- scope down deployment role permissions`);
  const totalMonthlyDelta = useMemo(() => {
    return changeSummary
      .map(item => item.costDelta)
      .filter(Boolean)
      .reduce((acc, value) => {
        const numeric = Number(value!.replace(/[^0-9.-]/g, ''));
        return acc + numeric;
      }, 0);
  }, []);

  const handleCreatePR = () => {
    console.info('PR creation payload', {
      title: prTitle,
      description: prDescription,
      reviewers: ['sre@cloudprod.ai', 'finops@cloudprod.ai'],
      autoChunkDiffs
    });

    navigateTo('run-detail', { replace: false });
  };

  return (
    <PlatformLayout title="Pull Request Preview" className="bg-muted/20">
      <div className="mx-auto flex-1 space-y-6 px-8 py-6 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Change Summary</CardTitle>
              <CardDescription>Terraform plan grouped by resource impact with automated risk scoring.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead className="text-right">Monthly Delta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {changeSummary.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.resource}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="uppercase">
                          {item.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md whitespace-normal">{item.impact}</TableCell>
                      <TableCell>
                        <Badge variant={riskColorMap[item.risk].variant}>
                          {riskColorMap[item.risk].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.costDelta ?? '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="space-y-1">
                  <p>Total estimated monthly delta</p>
                  <p className="text-xs">Cost model from FinOps guardrails module</p>
                </div>
                <div className="text-right font-semibold text-foreground">
                  {totalMonthlyDelta >= 0 ? '+' : ''}${totalMonthlyDelta.toFixed(2)}/month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Risk & Cost Analysis</CardTitle>
              <CardDescription>Deployment guardrails summarise blast radius expectations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Service saturation</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="mt-1 h-2" />
                <p className="mt-2 text-xs text-muted-foreground">Auto-tuned by predictive workload model (p95 utilisation).</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Cost variance guardrail</span>
                  <span className="text-destructive">+12%</span>
                </div>
                <Progress value={12} className="mt-1 h-2" />
                <p className="mt-2 text-xs text-muted-foreground">Triggers FinOps review when exceeding +10% month-over-month.</p>
              </div>

              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm">
                <p className="font-medium text-foreground">Blast radius</p>
                <p className="mt-1 text-muted-foreground">Affects <span className="font-semibold text-foreground">1 ECS service</span> and <span className="font-semibold text-foreground">2 IAM roles</span>. No database migrations detected.</p>
              </div>

              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm">
                <p className="font-medium text-foreground">Rollback confidence</p>
                <p className="mt-1 text-muted-foreground">Last known healthy state captured in snapshot <span className="font-semibold text-foreground">run-7a9f</span>. Estimated rollback time <strong>2m 30s</strong>.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={value => setSelectedTab(value as typeof selectedTab)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="summary">Policy Validation</TabsTrigger>
            <TabsTrigger value="diff">Terraform Diff</TabsTrigger>
            <TabsTrigger value="policies">PR Workflow</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Policy validation results</CardTitle>
                <CardDescription>Guardrails executed across security, compliance, and cost domains.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {policyChecks.map(check => (
                  <div key={check.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{check.title}</p>
                        <p className="text-xs text-muted-foreground">{check.description}</p>
                      </div>
                      <Badge variant={policyStatusBadge[check.status].variant}>
                        {policyStatusBadge[check.status].label}
                      </Badge>
                    </div>
                    {check.remediation && (
                      <p className="mt-3 rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Suggested fix:</span> {check.remediation}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diff" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Terraform diff handling</CardTitle>
                  <CardDescription>Large plans are automatically chunked for reviewer focus.</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Auto-chunk diff</span>
                  <Switch checked={autoChunkDiffs} onCheckedChange={setAutoChunkDiffs} />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80 rounded-md border bg-black/90 p-4 font-mono text-xs text-emerald-100">
                  <div className="space-y-6">
                    {diffChunks.map((chunk, index) => (
                      <pre key={index} className="whitespace-pre-wrap leading-relaxed">
                        {chunk}
                      </pre>
                    ))}
                  </div>
                </ScrollArea>
                <p className="mt-3 text-xs text-muted-foreground">
                  Showing {diffChunks.length} of 12 chunks. Reviewer affinity learned from previous approvals prioritised networking changes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>PR creation workflow</CardTitle>
                <CardDescription>Pre-populated metadata with reviewer routing based on blast radius.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Pull request title</label>
                      <Input value={prTitle} onChange={event => setPrTitle(event.target.value)} placeholder="Summarise the change" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Base branch</label>
                      <Input value="main" readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Target environment</label>
                      <Input value="production" readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <Textarea value={prDescription} onChange={event => setPrDescription(event.target.value)} rows={10} className="min-h-[200px]" />
                    <p className="text-xs text-muted-foreground">Rendered as markdown in GitHub. Blueprint validation notes auto-appended.</p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant="secondary">Reviewers: sre@cloudprod.ai</Badge>
                  <Badge variant="secondary">Reviewers: finops@cloudprod.ai</Badge>
                  <Badge variant="secondary">Checklist: policy-gates</Badge>
                  <Badge variant="secondary">Safe-apply enabled</Badge>
                </div>

                <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Safe apply dry-run is scheduled</p>
                    <p className="text-xs text-muted-foreground">Post-merge automation will run apply with progressive traffic shifting.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => navigateTo('drift-view')}>Drift impact</Button>
                    <Button onClick={handleCreatePR}>Create Pull Request</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PlatformLayout>
  );
}
