import React, { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { StatusLevel } from '../components/ui/devops/StatusIndicator';
import type { PolicyCheck } from '../components/ui/devops/PolicyValidator';
import type { SecretField } from '../components/ui/devops/SecretManager';
import type { LogEntry } from '../components/ui/devops/LogViewer';
import type { TimelineStep } from '../components/ui/devops/WorkflowTimeline';

export type EnvironmentTier = 'development' | 'qa' | 'production';

export type EnvironmentConfiguration = {
  id: string;
  name: string;
  tier: EnvironmentTier;
  status: StatusLevel;
  region: string;
  stack: string;
  lastDeployment?: string;
  gitBranch: string;
  policyChecks: PolicyCheck[];
  secrets: SecretField[];
  logs: LogEntry[];
  workflow: TimelineStep[];
  usage: {
    cpu: number;
    memory: number;
    complianceScore: number;
  };
};

export type WorkspaceQuota = {
  deploymentsUsed: number;
  deploymentsLimit: number;
  creditsUsed: number;
  creditsLimit: number;
  agentsConnected: number;
  agentsLimit: number;
};

export type Workspace = {
  id: string;
  name: string;
  description: string;
  repository?: string;
  environments: EnvironmentConfiguration[];
  quota: WorkspaceQuota;
};

export type WorkspacesContextValue = {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  setActiveWorkspace: (workspaceId: string) => void;
  assignRepository: (workspaceId: string, repository: string) => void;
  updateEnvironmentConfig: (workspaceId: string, environmentId: string, updates: Partial<EnvironmentConfiguration>) => void;
};

const WorkspacesContext = createContext<WorkspacesContextValue | undefined>(undefined);

const INITIAL_WORKSPACES: Workspace[] = [
  {
    id: 'retail-edge',
    name: 'Retail Edge Platform',
    description: 'POS modernization and real-time inventory pipelines.',
    repository: 'cloudprod/retail-edge-infra',
    quota: {
      deploymentsUsed: 12,
      deploymentsLimit: 24,
      creditsUsed: 420,
      creditsLimit: 1200,
      agentsConnected: 6,
      agentsLimit: 12
    },
    environments: []
  },
  {
    id: 'ai-lab',
    name: 'AI Research Lab',
    description: 'GPU intensive environment for experimentation and models.',
    repository: 'cloudprod/ai-lab-infra',
    quota: {
      deploymentsUsed: 9,
      deploymentsLimit: 36,
      creditsUsed: 880,
      creditsLimit: 2000,
      agentsConnected: 9,
      agentsLimit: 18
    },
    environments: []
  }
];

const attachEnvironmentData = (workspace: Workspace): Workspace => ({
  ...workspace,
  environments:
    workspace.environments.length > 0
      ? workspace.environments
      : [
          {
            id: `${workspace.id}-dev`,
            name: 'Development',
            tier: 'development',
            status: 'operational',
            region: 'us-east-1',
            stack: 'Fargate + Aurora Serverless',
            gitBranch: 'main',
            lastDeployment: '32 minutes ago',
            policyChecks: [
              {
                id: 'policy-iam-least-privilege',
                name: 'IAM least privilege',
                description: 'Ensures new roles are scoped to workspace resources only.',
                severity: 'high',
                status: 'pass',
                lastEvaluated: '12 mins ago',
                docLink: 'https://policy.cloudprod.ai/iam-least-privilege'
              },
              {
                id: 'policy-s3-encryption',
                name: 'S3 encryption enforced',
                description: 'Buckets must enforce TLS and server-side encryption.',
                severity: 'medium',
                status: 'pass',
                lastEvaluated: '12 mins ago'
              }
            ],
            secrets: [
              {
                key: 'DATABASE_URL',
                label: 'Database URL',
                status: 'valid',
                managedBy: 'cloudprod',
                lastRotated: '2 days ago',
                value: 'postgres://db.internal:5432/app'
              },
              {
                key: 'STRIPE_API_KEY',
                label: 'Stripe API key',
                status: 'rotation-required',
                managedBy: 'user',
                lastRotated: '72 days ago',
                value: 'sk_live_***'
              }
            ],
            workflow: [
              {
                id: 'step-plan',
                name: 'Generate plan',
                description: 'AI plan generation from blueprint overrides.',
                status: 'completed',
                durationMs: 3200,
                startedAt: '21:02',
                completedAt: '21:02'
              },
              {
                id: 'step-validate',
                name: 'Policy validation',
                status: 'completed',
                durationMs: 1800,
                startedAt: '21:02',
                completedAt: '21:03'
              },
              {
                id: 'step-pr',
                name: 'Pull request update',
                status: 'running',
                startedAt: '21:03'
              },
              {
                id: 'step-apply',
                name: 'Apply to development',
                status: 'pending'
              }
            ],
            logs: [
              {
                id: 'log-1',
                timestamp: '21:02:11',
                level: 'info',
                message: 'Starting blueprint override: low-latency profile',
                source: 'planner'
              },
              {
                id: 'log-2',
                timestamp: '21:02:23',
                level: 'debug',
                message: 'Synthesised 32 resources (12 existing, 20 new)',
                source: 'iac-engine'
              },
              {
                id: 'log-3',
                timestamp: '21:02:49',
                level: 'warn',
                message: 'Detected drift on ecs-service production; scheduling remediation',
                source: 'drift-detector'
              }
            ],
            usage: {
              cpu: 46,
              memory: 58,
              complianceScore: 97
            }
          },
          {
            id: `${workspace.id}-qa`,
            name: 'QA',
            tier: 'qa',
            status: 'maintenance',
            region: 'us-west-2',
            stack: 'EKS + ArgoCD',
            gitBranch: 'release-candidate',
            lastDeployment: '4 hours ago',
            policyChecks: [
              {
                id: 'policy-network-egress',
                name: 'Network egress controls',
                description: 'Restrict egress to approved CIDRs.',
                severity: 'high',
                status: 'warn',
                lastEvaluated: '45 mins ago',
                autoRemediation: true
              }
            ],
            secrets: [
              {
                key: 'QA_WEBHOOK',
                label: 'QA webhook token',
                status: 'valid',
                managedBy: 'user',
                lastRotated: '9 days ago',
                value: 'whk_***'
              }
            ],
            workflow: [
              {
                id: 'step-qa-plan',
                name: 'Generate plan',
                status: 'completed',
                durationMs: 2600
              },
              {
                id: 'step-qa-validate',
                name: 'Policy validation',
                status: 'failed',
                durationMs: 900,
                description: 'Network egress policy requires review',
                completedAt: '20:10'
              }
            ],
            logs: [
              {
                id: 'qa-log-1',
                timestamp: '20:10:34',
                level: 'error',
                message: 'Policy validation failed: egress CIDR list out of date',
                source: 'policy-engine'
              }
            ],
            usage: {
              cpu: 35,
              memory: 44,
              complianceScore: 84
            }
          },
          {
            id: `${workspace.id}-prod`,
            name: 'Production',
            tier: 'production',
            status: 'operational',
            region: 'eu-central-1',
            stack: 'ECS + Aurora Multi-Region',
            gitBranch: 'main',
            lastDeployment: '2 days ago',
            policyChecks: [
              {
                id: 'policy-guardduty',
                name: 'GuardDuty enabled',
                description: 'GuardDuty must remain enabled across accounts.',
                severity: 'critical',
                status: 'pass',
                lastEvaluated: '5 mins ago'
              }
            ],
            secrets: [
              {
                key: 'PROD_AUTH_TOKEN',
                label: 'Production auth token',
                status: 'valid',
                managedBy: 'cloudprod',
                lastRotated: '10 hours ago',
                value: 'auth_prod_***'
              }
            ],
            workflow: [
              {
                id: 'prod-approval',
                name: 'Change advisory approval',
                status: 'pending'
              },
              {
                id: 'prod-deploy',
                name: 'Blue/green deploy',
                status: 'pending'
              }
            ],
            logs: [
              {
                id: 'prod-log-1',
                timestamp: '10:08:11',
                level: 'info',
                message: 'No drift detected in last scan window',
                source: 'drift-detector'
              }
            ],
            usage: {
              cpu: 67,
              memory: 74,
              complianceScore: 99
            }
          }
        ]
});

export function WorkspacesProvider({ children }: PropsWithChildren) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => INITIAL_WORKSPACES.map(attachEnvironmentData));
  const [activeWorkspaceId, setActiveWorkspaceId] = useState(workspaces[0]?.id ?? '');

  const assignRepository = (workspaceId: string, repository: string) => {
    setWorkspaces(prev =>
      prev.map(workspace =>
        workspace.id === workspaceId ? { ...workspace, repository } : workspace
      )
    );
  };

  const updateEnvironmentConfig = (workspaceId: string, environmentId: string, updates: Partial<EnvironmentConfiguration>) => {
    setWorkspaces(prev =>
      prev.map(workspace => {
        if (workspace.id !== workspaceId) return workspace;
        return {
          ...workspace,
          environments: workspace.environments.map(environment =>
            environment.id === environmentId ? { ...environment, ...updates } : environment
          )
        };
      })
    );
  };

  const value = useMemo<WorkspacesContextValue>(
    () => ({
      workspaces,
      activeWorkspaceId,
      setActiveWorkspace: setActiveWorkspaceId,
      assignRepository,
      updateEnvironmentConfig
    }),
    [workspaces, activeWorkspaceId]
  );

  return <WorkspacesContext.Provider value={value}>{children}</WorkspacesContext.Provider>;
}

export function useWorkspaces() {
  const context = useContext(WorkspacesContext);
  if (!context) {
    throw new Error('useWorkspaces must be used within a WorkspacesProvider');
  }
  return context;
}
