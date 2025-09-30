/**
 * CloudProd.AI Platform State Management Architecture
 * Comprehensive state definitions for the platform
 */

import { PlatformScreen, Screen, WorkflowType, BreadcrumbItem, QuickAction } from './ScreenTypes';
import {
  Agent, AgentType, RunHistory, RunMetadata, Artifact, HealthCheck, Vulnerability,
  ServiceConfig, EnvironmentConfig, SecretConfig, PolicyConfig, Blueprint,
  Viewport, ClipboardData, CanvasHistory, NodeStatus, NodeMetrics, EdgeData,
  MarketplaceAgent, AgentRequirement, AgentTrigger, AgentMetrics,
  WorkspaceMember, WorkspaceSettings, EnvironmentStatus, NotificationAction
} from './SupplementaryTypes';

// Core platform state interface
export interface PlatformState {
  // Authentication and user state
  auth: {
    isAuthenticated: boolean;
    user?: User;
    permissions: Permission[];
    subscription?: Subscription;
  };

  // GitHub integration state
  github: {
    connected: boolean;
    installationId?: string;
    repositories: Repository[];
    selectedRepo?: Repository;
    branches: Branch[];
    selectedBranch?: string;
    accessToken?: string;
  };

  // Stack detection and configuration
  stack: {
    detected: DetectedStack[];
    configuration: StackConfig;
    canvas: CanvasState;
    isDirty: boolean;
    lastSaved?: Date;
    autoSave: boolean;
  };

  // Deployment runs and execution
  runs: {
    active: Run[];
    history: RunHistory[];
    logs: Record<string, LogEntry[]>;
    currentRun?: Run;
  };

  // Infrastructure drift monitoring
  drift: {
    alerts: DriftAlert[];
    severity: DriftSeverity;
    autoFix: boolean;
    lastScan?: Date;
    scanInProgress: boolean;
  };

  // AI agents management
  agents: {
    available: Agent[];
    configured: AgentConfig[];
    status: Record<string, AgentStatus>;
    marketplace: MarketplaceAgent[];
  };

  // Workspaces and environments
  workspaces: {
    current?: Workspace;
    available: Workspace[];
    environments: Environment[];
    quotas: WorkspaceQuota;
  };

  // Application navigation state
  navigation: {
    currentScreen: Screen;
    currentWorkflow?: WorkflowType;
    breadcrumb: BreadcrumbItem[];
    sidebarCollapsed: boolean;
    quickActions: QuickAction[];
  };

  // UI and interaction state
  ui: {
    theme: 'light' | 'dark' | 'system';
    notifications: Notification[];
    modals: ModalState[];
    loading: LoadingState[];
    errors: ErrorState[];
  };
}

// User and authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 'admin' | 'developer' | 'viewer';

export interface Permission {
  resource: string;
  actions: string[];
  scope?: string;
}

export interface Subscription {
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodEnd: Date;
  features: string[];
}

// GitHub integration types
export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  private: boolean;
  defaultBranch: string;
  url: string;
  language?: string;
  topics: string[];
}

export interface Branch {
  name: string;
  sha: string;
  protected: boolean;
}

// Stack detection and configuration types
export interface DetectedStack {
  type: StackType;
  version?: string;
  files: string[];
  services: DetectedService[];
  dependencies: Dependency[];
  confidence: number;
}

export type StackType = 
  | 'nodejs' | 'python' | 'java' | 'dotnet' | 'go' | 'rust'
  | 'react' | 'vue' | 'angular' | 'nextjs' | 'nuxt'
  | 'docker' | 'kubernetes' | 'terraform' | 'pulumi';

export interface DetectedService {
  name: string;
  type: ServiceType;
  port?: number;
  protocol: 'http' | 'https' | 'tcp' | 'udp';
  environment: Record<string, string>;
  healthCheck?: HealthCheck;
}

export type ServiceType = 
  | 'web' | 'api' | 'database' | 'cache' | 'queue' 
  | 'storage' | 'auth' | 'monitoring' | 'ci-cd';

export interface Dependency {
  name: string;
  version: string;
  type: 'production' | 'development' | 'peer';
  vulnerabilities?: Vulnerability[];
}

export interface StackConfig {
  services: ServiceConfig[];
  environments: EnvironmentConfig[];
  secrets: SecretConfig[];
  policies: PolicyConfig[];
  blueprint?: Blueprint;
}

// Canvas and visual editor types
export interface CanvasState {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  viewport: Viewport;
  selectedNodes: string[];
  clipboard?: ClipboardData;
  history: CanvasHistory[];
  historyIndex: number;
}

export interface CanvasNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: NodeData;
  style?: Record<string, any>;
}

export type NodeType = 
  | 'service' | 'database' | 'storage' | 'network'
  | 'security' | 'monitoring' | 'ci-cd' | 'custom';

export interface NodeData {
  label: string;
  icon?: string;
  config: Record<string, any>;
  status?: NodeStatus;
  metrics?: NodeMetrics;
}

export interface CanvasEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  data?: EdgeData;
}

export type EdgeType = 'connection' | 'dependency' | 'data-flow';

// Run execution and monitoring types
export interface Run {
  id: string;
  status: RunStatus;
  type: RunType;
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  stages: RunStage[];
  metadata: RunMetadata;
}

export type RunStatus = 
  | 'pending' | 'running' | 'success' | 'failed' 
  | 'cancelled' | 'paused' | 'warning';

export type RunType = 
  | 'plan' | 'apply' | 'destroy' | 'import' 
  | 'drift-check' | 'policy-check';

export interface RunStage {
  name: string;
  status: RunStatus;
  startedAt: Date;
  completedAt?: Date;
  logs: LogEntry[];
  artifacts?: Artifact[];
}

export interface LogEntry {
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  source?: string;
  metadata?: Record<string, any>;
}

// Drift detection types
export interface DriftAlert {
  id: string;
  resource: string;
  type: DriftType;
  severity: DriftSeverity;
  description: string;
  detectedAt: Date;
  currentValue: any;
  expectedValue: any;
  autoFixable: boolean;
  fixPR?: string;
}

export type DriftType = 
  | 'configuration' | 'scale' | 'version' | 'policy' | 'security';

export type DriftSeverity = 'low' | 'medium' | 'high' | 'critical';

// AI agents types (imported from SupplementaryTypes)

export interface AgentConfig {
  agentId: string;
  enabled: boolean;
  scope: AgentScope;
  settings: Record<string, any>;
  triggers: AgentTrigger[];
}

export interface AgentScope {
  workspaces?: string[];
  environments?: string[];
  repositories?: string[];
}

export interface AgentStatus {
  state: 'active' | 'idle' | 'error' | 'disabled';
  lastRun?: Date;
  nextRun?: Date;
  metrics: AgentMetrics;
}

// Workspace and environment types
export interface Workspace {
  id: string;
  name: string;
  description?: string;
  repositories: string[];
  environments: string[];
  members: WorkspaceMember[];
  settings: WorkspaceSettings;
}

export interface Environment {
  id: string;
  name: string;
  type: EnvironmentType;
  workspaceId: string;
  config: EnvironmentConfig;
  secrets: SecretConfig[];
  status: EnvironmentStatus;
}

export type EnvironmentType = 'development' | 'staging' | 'production' | 'testing';

export interface WorkspaceQuota {
  repositories: { used: number; limit: number };
  environments: { used: number; limit: number };
  runs: { used: number; limit: number };
  storage: { used: number; limit: number }; // in MB
}

// UI state types
export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  actions?: NotificationAction[];
  dismissible: boolean;
  autoClose?: number; // milliseconds
  createdAt: Date;
}

export interface ModalState {
  id: string;
  type: string;
  props: Record<string, any>;
  isOpen: boolean;
}

export interface LoadingState {
  key: string;
  message?: string;
  progress?: number;
}

export interface ErrorState {
  id: string;
  message: string;
  details?: any;
  timestamp: Date;
  resolved: boolean;
}

// Additional helper types (BreadcrumbItem and QuickAction imported from ScreenTypes)

// Type guards and utilities
export function isAuthenticated(state: PlatformState): boolean {
  return state.auth.isAuthenticated && !!state.auth.user;
}

export function hasPermission(state: PlatformState, resource: string, action: string): boolean {
  return state.auth.permissions.some(
    perm => perm.resource === resource && perm.actions.includes(action)
  );
}

export function getCurrentWorkspace(state: PlatformState): Workspace | undefined {
  return state.workspaces.current;
}

export function getActiveRuns(state: PlatformState): Run[] {
  return state.runs.active.filter(run => 
    ['pending', 'running', 'paused'].includes(run.status)
  );
}

export function getCriticalDrifts(state: PlatformState): DriftAlert[] {
  return state.drift.alerts.filter(alert => 
    ['high', 'critical'].includes(alert.severity)
  );
}