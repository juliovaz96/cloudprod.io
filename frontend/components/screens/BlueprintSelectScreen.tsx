import React, { useMemo, useState } from 'react';
import { PlatformLayout } from '../core/layouts/PlatformLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';
import { cn } from '../ui/utils';

interface BlueprintOption {
  id: string;
  name: string;
  description: string;
  score: number;
  costEstimate: string;
  complianceStatus: 'certified' | 'needs-review' | 'customised';
  validated: boolean;
  changeImpact: string[];
}

const blueprintOptions: BlueprintOption[] = [
  {
    id: 'cdk-fargate-ha',
    name: 'AWS Fargate · High Availability',
    description: 'Managed container platform with auto-scaling and guardrail policies.',
    score: 92,
    costEstimate: '$1.42/hr',
    complianceStatus: 'certified',
    validated: true,
    changeImpact: ['ECS service', 'Application Load Balancer', 'WAF managed rules']
  },
  {
    id: 'eks-platform',
    name: 'EKS Platform Core',
    description: 'Production grade Kubernetes with GitOps, cluster autoscaler, and observability.',
    score: 87,
    costEstimate: '$2.83/hr',
    complianceStatus: 'needs-review',
    validated: false,
    changeImpact: ['EKS cluster', 'IAM OIDC provider', 'Prometheus stack']
  },
  {
    id: 'serverless-app',
    name: 'Serverless Web Tier',
    description: 'CloudFront + Lambda@Edge + DynamoDB with automated CI/CD pipelines.',
    score: 78,
    costEstimate: '$0.65/hr',
    complianceStatus: 'customised',
    validated: true,
    changeImpact: ['Lambda functions', 'API Gateway stage', 'DynamoDB tables']
  }
];

const complianceBadge: Record<BlueprintOption['complianceStatus'], { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  certified: { label: 'Certified', variant: 'secondary' },
  'needs-review': { label: 'Needs review', variant: 'default' },
  customised: { label: 'Customised', variant: 'outline' }
};

export function BlueprintSelectScreen() {
  const { navigateTo } = useNavigation();
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('cdk-fargate-ha');
  const [enableOverrides, setEnableOverrides] = useState(false);
  const [aiOverridePrompt, setAiOverridePrompt] = useState('Optimise for latency sensitive workloads and enable zero-downtime deploys.');

  const selectedBlueprint = useMemo(
    () => blueprintOptions.find(option => option.id === selectedBlueprintId) ?? blueprintOptions[0],
    [selectedBlueprintId]
  );

  return (
    <PlatformLayout title="Blueprint Selection" className="bg-muted/20">
      <div className="mx-auto flex-1 space-y-6 px-8 py-6 max-w-7xl">
        <Tabs value={selectedBlueprintId} onValueChange={setSelectedBlueprintId} className="space-y-4">
          <TabsList className="flex w-full flex-wrap gap-2">
            {blueprintOptions.map(option => (
              <TabsTrigger key={option.id} value={option.id} className="flex-1 min-w-[200px]">
                {option.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {blueprintOptions.map(option => (
            <TabsContent key={option.id} value={option.id} className="space-y-4">
              <Card className={cn('border-2', option.id === selectedBlueprintId ? 'border-primary/70 shadow-lg' : 'border-border')}>
                <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle>{option.name}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Score {option.score}</Badge>
                    <Badge variant={complianceBadge[option.complianceStatus].variant}>
                      {complianceBadge[option.complianceStatus].label}
                    </Badge>
                    <Badge variant="outline">{option.costEstimate}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <p className="font-semibold text-foreground">Change impact</p>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
                        {option.changeImpact.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <p className="font-semibold text-foreground">Validation</p>
                      <p className="mt-2 text-muted-foreground">
                        {option.validated
                          ? 'Static analysis, policy gates, and integration tests completed 18 hours ago.'
                          : 'Pending validation. Trigger test plan before promoting to Secrets Wizard.'}
                      </p>
                    </div>
                  </div>

                  <Accordion type="single" collapsible defaultValue="controls">
                    <AccordionItem value="controls">
                      <AccordionTrigger>Override capabilities</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-4">
                            <div>
                              <p className="text-sm font-medium text-foreground">Enable AI override assistant</p>
                              <p className="text-xs text-muted-foreground">Let the assistant rewrite blueprint inputs with your guardrails.</p>
                            </div>
                            <Switch checked={enableOverrides} onCheckedChange={setEnableOverrides} />
                          </div>

                          {enableOverrides && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-foreground">Override prompt</label>
                              <Textarea
                                value={aiOverridePrompt}
                                onChange={event => setAiOverridePrompt(event.target.value)}
                                rows={4}
                                className="min-h-[120px]"
                              />
                              <p className="text-xs text-muted-foreground">AI assistant will simulate guardrails and produce a diff preview before apply.</p>
                            </div>
                          )}

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-foreground">Region affinity</label>
                              <Input defaultValue="us-east-1" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-foreground">Observability pack</label>
                              <Input defaultValue="enterprise" />
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="validation">
                      <AccordionTrigger>Template validation report</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-sm">
                          <div className="rounded-lg border border-border bg-muted/40 p-3">
                            <p className="font-semibold text-foreground">Static analysis</p>
                            <p className="text-muted-foreground">No policy violations detected. Drift guardrail applied for networking resources.</p>
                          </div>
                          <div className="rounded-lg border border-border bg-muted/40 p-3">
                            <p className="font-semibold text-foreground">Scaling simulations</p>
                            <p className="text-muted-foreground">Capacity planning validated at 5x traffic with 17% buffer.</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Advanced configuration</CardTitle>
            <CardDescription>Fine tune variables before handing off to the Secrets Wizard.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Environment</label>
              <Input defaultValue="production" readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Change window</label>
              <Input defaultValue="Saturday 22:00 UTC" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Notes for review</label>
              <Textarea rows={5} placeholder="Document any manual overrides or business context" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">Blueprint ready for secrets validation</p>
                <p className="text-xs text-muted-foreground">Secrets Wizard will validate KMS policies and synchronise with Vault.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigateTo('pr-preview')}>Preview plan</Button>
                <Button onClick={() => navigateTo('secrets-wizard')}>Continue to Secrets Wizard</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlatformLayout>
  );
}
