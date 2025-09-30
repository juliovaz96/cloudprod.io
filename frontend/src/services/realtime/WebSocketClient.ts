type EventHandler<T> = (payload: T) => void;

export type RealtimeEventType =
  | 'log'
  | 'drift-alert'
  | 'agent-status'
  | 'collaborator';

const LOG_LEVELS = ['info', 'debug', 'warn', 'error'] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

const DRIFT_SEVERITIES = ['low', 'medium', 'high', 'critical'] as const;
export type DriftSeverity = (typeof DRIFT_SEVERITIES)[number];

const AGENT_STATUSES = ['online', 'offline', 'degraded', 'busy'] as const;
export type AgentStatus = (typeof AGENT_STATUSES)[number];

const AGENT_IDENTIFIERS = ['agent-orchestrator', 'agent-drift', 'agent-secrets'] as const;
export type AgentIdentifier = (typeof AGENT_IDENTIFIERS)[number];

const COLLABORATOR_STATUSES = ['editing', 'viewing'] as const;
export type CollaboratorStatus = (typeof COLLABORATOR_STATUSES)[number];

const COLLABORATOR_NAMES = ['Alex', 'Priya', 'Miguel', 'Chen', 'Sara'] as const;

const COLLABORATOR_DELTAS = ['joined', 'left', 'updated'] as const;
export type CollaboratorDelta = (typeof COLLABORATOR_DELTAS)[number];

const ENVIRONMENTS = ['retail-edge-dev', 'retail-edge-qa', 'retail-edge-prod'] as const;
export type EnvironmentId = (typeof ENVIRONMENTS)[number];

const DRIFT_RESOURCES = ['ecs-service', 'iam-role', 's3-bucket', 'waf-policy'] as const;
export type DriftResource = (typeof DRIFT_RESOURCES)[number];

const LOG_MESSAGES = [
  'Live event: infrastructure telemetry update',
  'Deploy pipeline finished successfully.',
  'Secrets rotation completed.',
  'Policy evaluation scheduled.',
  'Drift scan triggered from change window.'
] as const;

const pick = <T,>(values: readonly T[]): T =>
  values[Math.floor(Math.random() * values.length)];

interface BaseEvent {
  type: RealtimeEventType;
  timestamp: number;
}

export interface LogEvent extends BaseEvent {
  type: 'log';
  environmentId: EnvironmentId;
  entry: {
    id: string;
    timestamp: string;
    level: LogLevel;
    message: string;
    source?: string;
  };
}

export interface DriftAlertEvent extends BaseEvent {
  type: 'drift-alert';
  environmentId: EnvironmentId;
  alert: {
    id: string;
    severity: DriftSeverity;
    resource: DriftResource;
    description: string;
  };
}

export interface AgentStatusEvent extends BaseEvent {
  type: 'agent-status';
  agentId: AgentIdentifier;
  status: AgentStatus;
  latencyMs: number;
}

export interface CollaboratorEvent extends BaseEvent {
  type: 'collaborator';
  environmentId: EnvironmentId;
  collaborator: {
    id: string;
    name: string;
    avatarUrl?: string;
    status: CollaboratorStatus;
  };
  delta: CollaboratorDelta;
}

export type RealtimeEvent =
  | LogEvent
  | DriftAlertEvent
  | AgentStatusEvent
  | CollaboratorEvent;

export class WebSocketClient {
  private listeners: Map<RealtimeEventType, Set<EventHandler<RealtimeEvent>>> = new Map();
  private isConnected = false;
  private simulator?: ReturnType<typeof setInterval>;

  constructor(private readonly url: string) {}

  connect() {
    if (this.isConnected) return;
    this.isConnected = true;
    this.startSimulator();
  }

  disconnect() {
    if (!this.isConnected) return;
    this.isConnected = false;

    if (this.simulator) {
      clearInterval(this.simulator);
      this.simulator = undefined;
    }

    this.listeners.clear();
  }

  on<T extends RealtimeEvent>(event: T['type'], handler: EventHandler<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    const handlers = this.listeners.get(event)!;
    handlers.add(handler as EventHandler<RealtimeEvent>);

    return () => {
      handlers.delete(handler as EventHandler<RealtimeEvent>);
      if (handlers.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  private emit(event: RealtimeEvent) {
    const handlers = this.listeners.get(event.type);
    handlers?.forEach(handler => handler(event));
  }

  private startSimulator() {
    if (this.simulator) {
      clearInterval(this.simulator);
    }

    this.simulator = setInterval(() => {
      if (!this.isConnected) {
        return;
      }

      const timestamp = Date.now();
      const environmentId = pick(ENVIRONMENTS);

      this.emit({
        type: 'log',
        timestamp,
        environmentId,
        entry: {
          id: `log-${timestamp}`,
          timestamp: new Date(timestamp).toLocaleTimeString(),
          level: pick(LOG_LEVELS),
          message: pick(LOG_MESSAGES),
          source: 'realtime-stream'
        }
      });

      if (Math.random() > 0.65) {
        this.emit({
          type: 'drift-alert',
          timestamp,
          environmentId,
          alert: {
            id: `drift-${timestamp}`,
            severity: pick(DRIFT_SEVERITIES),
            resource: pick(DRIFT_RESOURCES),
            description: 'Detected configuration drift between desired and actual state.'
          }
        });
      }

      AGENT_IDENTIFIERS.forEach(agentId => {
        this.emit({
          type: 'agent-status',
          timestamp,
          agentId,
          status: pick(AGENT_STATUSES),
          latencyMs: Math.round(200 + Math.random() * 900)
        });
      });

      if (Math.random() > 0.7) {
        const collaboratorName = pick(COLLABORATOR_NAMES);
        this.emit({
          type: 'collaborator',
          timestamp,
          environmentId,
          collaborator: {
            id: `user-${Math.floor(Math.random() * 1000)}`,
            name: collaboratorName,
            avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${collaboratorName}`,
            status: pick(COLLABORATOR_STATUSES)
          },
          delta: pick(COLLABORATOR_DELTAS)
        });
      }
    }, 3000);
  }
}

export const realtimeClient = new WebSocketClient('wss://realtime.cloudprod.local');