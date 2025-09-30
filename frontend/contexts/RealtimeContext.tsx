import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import type { PropsWithChildren } from 'react';
import type { LogEntry } from '../components/ui/devops/LogViewer';
import {
  realtimeClient,
  type LogEvent,
  type DriftAlertEvent,
  type AgentStatusEvent,
  type CollaboratorEvent,
  type EnvironmentId,
  type AgentIdentifier,
  type AgentStatus,
  type DriftSeverity,
  type DriftResource,
  type CollaboratorStatus,
  type CollaboratorDelta
} from '../src/services/realtime/WebSocketClient';

const MAX_LOGS_PER_ENVIRONMENT = 200;
const MAX_DRIFT_ALERTS = 50;

export type DriftAlert = {
  id: string;
  environmentId: EnvironmentId;
  severity: DriftSeverity;
  resource: DriftResource;
  description: string;
  timestamp: number;
};

export type AgentStatusSnapshot = {
  status: AgentStatus;
  latencyMs: number;
  updatedAt: number;
};

export type CollaboratorPresence = {
  id: string;
  environmentId: EnvironmentId;
  name: string;
  avatarUrl?: string;
  status: CollaboratorStatus;
  lastDelta: CollaboratorDelta;
  lastActivity: number;
};

type LogsState = Partial<Record<EnvironmentId, LogEntry[]>>;
type AgentState = Partial<Record<AgentIdentifier, AgentStatusSnapshot>>;
type CollaboratorState = Partial<Record<EnvironmentId, CollaboratorPresence[]>>;

type RealtimeState = {
  isConnected: boolean;
  logs: LogsState;
  driftAlerts: DriftAlert[];
  agentStatuses: AgentState;
  collaborators: CollaboratorState;
};

type Action =
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'LOG_EVENT'; environmentId: EnvironmentId; entry: LogEntry }
  | { type: 'DRIFT_ALERT'; alert: DriftAlert }
  | { type: 'AGENT_STATUS'; agentId: AgentIdentifier; status: AgentStatusSnapshot }
  | { type: 'COLLABORATOR_EVENT'; environmentId: EnvironmentId; collaborator: CollaboratorPresence; delta: CollaboratorDelta }
  | { type: 'CLEAR_LOGS'; environmentId: EnvironmentId };

const initialState: RealtimeState = {
  isConnected: false,
  logs: {},
  driftAlerts: [],
  agentStatuses: {},
  collaborators: {}
};

function realtimeReducer(state: RealtimeState, action: Action): RealtimeState {
  switch (action.type) {
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };
    case 'LOG_EVENT': {
      const existing = state.logs[action.environmentId] ?? [];
      const next = [...existing, action.entry].slice(-MAX_LOGS_PER_ENVIRONMENT);
      return {
        ...state,
        logs: {
          ...state.logs,
          [action.environmentId]: next
        }
      };
    }
    case 'DRIFT_ALERT': {
      const nextAlerts = [...state.driftAlerts, action.alert].slice(-MAX_DRIFT_ALERTS);
      return {
        ...state,
        driftAlerts: nextAlerts
      };
    }
    case 'AGENT_STATUS':
      return {
        ...state,
        agentStatuses: {
          ...state.agentStatuses,
          [action.agentId]: action.status
        }
      };
    case 'COLLABORATOR_EVENT': {
      const current = state.collaborators[action.environmentId] ?? [];
      const filtered = current.filter(collaborator => collaborator.id !== action.collaborator.id);

      if (action.delta === 'left') {
        return {
          ...state,
          collaborators: {
            ...state.collaborators,
            [action.environmentId]: filtered
          }
        };
      }

      return {
        ...state,
        collaborators: {
          ...state.collaborators,
          [action.environmentId]: [...filtered, action.collaborator]
        }
      };
    }
    case 'CLEAR_LOGS': {
      if (!state.logs[action.environmentId]) return state;
      const nextLogs: LogsState = { ...state.logs };
      delete nextLogs[action.environmentId];

      return {
        ...state,
        logs: nextLogs
      };
    }
    default:
      return state;
  }
}

type RealtimeContextValue = {
  isConnected: boolean;
  logsByEnvironment: LogsState;
  driftAlerts: DriftAlert[];
  agentStatuses: AgentState;
  collaborators: CollaboratorState;
  clearEnvironmentLogs: (environmentId: EnvironmentId) => void;
};

const RealtimeContext = createContext<RealtimeContextValue | undefined>(undefined);

export function RealtimeProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(realtimeReducer, initialState);

  useEffect(() => {
    realtimeClient.connect();
    dispatch({ type: 'SET_CONNECTED', payload: true });

    const unsubscribeLog = realtimeClient.on('log', (event: LogEvent) => {
      dispatch({
        type: 'LOG_EVENT',
        environmentId: event.environmentId as EnvironmentId,
        entry: event.entry
      });
    });

    const unsubscribeDrift = realtimeClient.on('drift-alert', (event: DriftAlertEvent) => {
      dispatch({
        type: 'DRIFT_ALERT',
        alert: {
          id: event.alert.id,
          environmentId: event.environmentId as EnvironmentId,
          severity: event.alert.severity,
          resource: event.alert.resource,
          description: event.alert.description,
          timestamp: event.timestamp
        }
      });
    });

    const unsubscribeAgent = realtimeClient.on('agent-status', (event: AgentStatusEvent) => {
      dispatch({
        type: 'AGENT_STATUS',
        agentId: event.agentId as AgentIdentifier,
        status: {
          status: event.status,
          latencyMs: event.latencyMs,
          updatedAt: event.timestamp
        }
      });
    });

    const unsubscribeCollaborator = realtimeClient.on('collaborator', (event: CollaboratorEvent) => {
      dispatch({
        type: 'COLLABORATOR_EVENT',
        environmentId: event.environmentId as EnvironmentId,
        collaborator: {
          id: event.collaborator.id,
          environmentId: event.environmentId as EnvironmentId,
          name: event.collaborator.name,
          avatarUrl: event.collaborator.avatarUrl,
          status: event.collaborator.status,
          lastDelta: event.delta,
          lastActivity: event.timestamp
        },
        delta: event.delta
      });
    });

    return () => {
      unsubscribeLog();
      unsubscribeDrift();
      unsubscribeAgent();
      unsubscribeCollaborator();
      realtimeClient.disconnect();
      dispatch({ type: 'SET_CONNECTED', payload: false });
    };
  }, []);

  const clearEnvironmentLogs = useCallback((environmentId: EnvironmentId) => {
    dispatch({ type: 'CLEAR_LOGS', environmentId });
  }, []);

  const value = useMemo<RealtimeContextValue>(
    () => ({
      isConnected: state.isConnected,
      logsByEnvironment: state.logs,
      driftAlerts: state.driftAlerts,
      agentStatuses: state.agentStatuses,
      collaborators: state.collaborators,
      clearEnvironmentLogs
    }),
    [state.isConnected, state.logs, state.driftAlerts, state.agentStatuses, state.collaborators, clearEnvironmentLogs]
  );

  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>;
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}
