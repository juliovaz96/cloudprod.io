/**
 * CloudProd.AI Platform Supplementary Types
 * Additional type definitions for platform state
 */

// Import Agent type from PlatformState to avoid circular dependency
export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  version: string;
  description: string;
  capabilities: string[];
  requirements: AgentRequirement[];
}

export type AgentType = 
  | 'detector' | 'architect' | 'iac' | 'policy' 
  | 'devops' | 'security' | 'cost' | 'custom';

// Run and execution types
export interface RunHistory {
  id: string;
  runId: string;
  timestamp: Date;
  status: string;
  duration: number;
  summary: string;
}

export interface RunMetadata {
  triggeredBy: string;
  reason: string;
  branch: string;
  commit: string;
  environment: string;
  tags: string[];
}

export interface Artifact {
  id: string;
  name: string;
  type: 'plan' | 'state' | 'log' | 'report';
  size: number;
  url: string;
  createdAt: Date;
}

// Health and monitoring types
export interface HealthCheck {
  path: string;
  method: 'GET' | 'POST' | 'HEAD';
  interval: number; // seconds
  timeout: number; // seconds
  retries: number;
  expectedStatus?: number;
}

export interface Vulnerability {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  fixedIn?: string;
  cve?: string;
}

// Configuration types
export interface ServiceConfig {
  name: string;
  type: string;
  image?: string;
  ports: PortConfig[];
  environment: Record<string, string>;
  resources: ResourceConfig;
  scaling: ScalingConfig;
}

export interface PortConfig {
  containerPort: number;
  servicePort?: number;
  protocol: 'tcp' | 'udp';
  name?: string;
}

export interface ResourceConfig {
  cpu: string; // e.g., "100m", "1"
  memory: string; // e.g., "128Mi", "1Gi"
  storage?: string;
}

export interface ScalingConfig {
  minReplicas: number;
  maxReplicas: number;
  targetCPU?: number; // percentage
  targetMemory?: number; // percentage
}

export interface EnvironmentConfig {
  name: string;
  type: 'development' | 'staging' | 'production' | 'testing';
  variables: Record<string, string>;
  secrets: string[];
  resources: EnvironmentResources;
}

export interface EnvironmentResources {
  compute: {
    cpu: string;
    memory: string;
  };
  storage: {
    type: 'ssd' | 'hdd';
    size: string;
  };
  network: {
    bandwidth: string;
    ingress: boolean;
  };
}

export interface SecretConfig {
  name: string;
  type: 'generic' | 'tls' | 'docker-registry' | 'service-account';
  data: Record<string, string>;
  metadata: Record<string, string>;
}

export interface PolicyConfig {
  name: string;
  type: 'security' | 'cost' | 'compliance' | 'performance';
  rules: PolicyRule[];
  enforcement: 'warn' | 'block';
  enabled: boolean;
}

export interface PolicyRule {
  id: string;
  condition: string;
  action: string;
  message: string;
}

export interface Blueprint {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  tags: string[];
  template: BlueprintTemplate;
  parameters: BlueprintParameter[];
}

export interface BlueprintTemplate {
  services: ServiceConfig[];
  environments: EnvironmentConfig[];
  policies: PolicyConfig[];
  metadata: Record<string, any>;
}

export interface BlueprintParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  default?: any;
  required: boolean;
  validation?: string; // regex pattern
}

// Canvas and visual editor types
export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export interface ClipboardData {
  type: 'nodes' | 'edges' | 'selection';
  data: any;
  timestamp: Date;
}

export interface CanvasHistory {
  id: string;
  type: 'add' | 'remove' | 'move' | 'edit';
  timestamp: Date;
  data: any;
  inverse: any; // for undo
}

export interface NodeStatus {
  health: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  uptime: number; // seconds
  lastCheck: Date;
  message?: string;
}

export interface NodeMetrics {
  cpu: number; // percentage
  memory: number; // percentage
  network: {
    in: number; // bytes/sec
    out: number; // bytes/sec
  };
  requests: number; // req/sec
  errors: number; // errors/sec
}

export interface EdgeData {
  label?: string;
  protocol?: string;
  bandwidth?: string;
  latency?: number; // ms
  encrypted?: boolean;
}

// Agent types
export interface MarketplaceAgent extends Agent {
  downloads: number;
  rating: number;
  reviews: AgentReview[];
  pricing: AgentPricing;
  publisher: AgentPublisher;
}

export interface AgentReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface AgentPricing {
  model: 'free' | 'usage' | 'subscription';
  price?: number;
  currency?: string;
  unit?: string; // per execution, per month, etc.
}

export interface AgentPublisher {
  id: string;
  name: string;
  verified: boolean;
  website?: string;
}

export interface AgentRequirement {
  type: 'platform' | 'permission' | 'resource';
  name: string;
  version?: string;
  optional: boolean;
}

export interface AgentTrigger {
  event: string;
  conditions: TriggerCondition[];
  enabled: boolean;
}

export interface TriggerCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less';
  value: any;
}

export interface AgentMetrics {
  executions: {
    total: number;
    success: number;
    failed: number;
  };
  performance: {
    avgDuration: number; // milliseconds
    avgCost?: number;
  };
  lastExecution?: {
    timestamp: Date;
    status: 'success' | 'failed';
    duration: number;
  };
}

// Workspace types
export interface WorkspaceMember {
  userId: string;
  role: 'admin' | 'developer' | 'viewer';
  addedAt: Date;
  addedBy: string;
}

export interface WorkspaceSettings {
  defaultEnvironment: string;
  autoApply: boolean;
  notifications: NotificationSettings;
  security: SecuritySettings;
  integrations: IntegrationSettings;
}

export interface NotificationSettings {
  email: boolean;
  slack?: SlackIntegration;
  discord?: DiscordIntegration;
  webhook?: WebhookIntegration;
}

export interface SlackIntegration {
  webhookUrl: string;
  channel: string;
  events: string[];
}

export interface DiscordIntegration {
  webhookUrl: string;
  channel: string;
  events: string[];
}

export interface WebhookIntegration {
  url: string;
  secret: string;
  events: string[];
}

export interface SecuritySettings {
  requireApproval: boolean;
  allowedIPs?: string[];
  mfaRequired: boolean;
  sessionTimeout: number; // minutes
}

export interface IntegrationSettings {
  github: GitHubIntegration;
  aws?: AWSIntegration;
  azure?: AzureIntegration;
  gcp?: GCPIntegration;
}

export interface GitHubIntegration {
  installationId: string;
  permissions: string[];
  webhookUrl: string;
}

export interface AWSIntegration {
  accessKeyId: string;
  region: string;
  assumeRole?: string;
}

export interface AzureIntegration {
  tenantId: string;
  clientId: string;
  subscriptionId: string;
}

export interface GCPIntegration {
  projectId: string;
  serviceAccountKey: string;
  region: string;
}

export interface EnvironmentStatus {
  state: 'active' | 'inactive' | 'deploying' | 'error';
  lastDeployment?: Date;
  version?: string;
  health: {
    status: 'healthy' | 'degraded' | 'unhealthy';
    checks: HealthCheckResult[];
  };
}

export interface HealthCheckResult {
  name: string;
  status: 'passing' | 'failing' | 'warning';
  message?: string;
  lastCheck: Date;
}

// Notification types
export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'destructive';
}