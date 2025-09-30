/**
 * CloudProd.AI Run Detail Screen (SCR-07)
 * Live deployment monitoring with log streaming and timeline visualization
 */

import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { StatusIndicator } from '../ui/status-indicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

// Define the status type
type RunStatus = 'running' | 'pending' | 'success' | 'failed' | 'cancelled';

// Mock run data for demonstration
const mockRunData = {
  id: 'run-abc123',
  status: 'running' as RunStatus,
  progress: 65,
  startTime: '2025-09-29T10:30:00Z',
  duration: '4m 32s',
  commit: {
    hash: '7a9f8c2',
    message: 'feat: add new payment gateway integration',
    author: 'john.doe@company.com',
    branch: 'feature/payment-gateway'
  },
  environment: 'production',
  runner: {
    id: 'runner-xyz789',
    name: 'production-runner-01',
    status: 'success' as const,
    region: 'us-east-1',
    resources: {
      cpu: '2 vCPU',
      memory: '4 GB RAM',
      storage: '20 GB SSD'
    }
  },
  phases: [
    { id: 'plan', name: 'Plan', status: 'success' as const, duration: '45s', startTime: '10:30:00' },
    { id: 'policy', name: 'Policy Check', status: 'success' as const, duration: '12s', startTime: '10:30:45' },
    { id: 'apply', name: 'Apply Changes', status: 'running' as const, duration: '3m 35s', startTime: '10:30:57' },
    { id: 'verify', name: 'Verification', status: 'pending' as const, duration: null, startTime: null }
  ],
  metrics: {
    resourcesCreated: 15,
    resourcesModified: 3,
    resourcesDestroyed: 0,
    costImpact: '+$12.50/month'
  }
};

// Live log streaming simulation
const logMessages = [
  { timestamp: '10:30:00', level: 'info', source: 'terraform', message: 'Initializing Terraform...' },
  { timestamp: '10:30:15', level: 'info', source: 'terraform', message: 'Planning infrastructure changes...' },
  { timestamp: '10:30:45', level: 'info', source: 'policy', message: 'Running security policy checks...' },
  { timestamp: '10:30:57', level: 'info', source: 'terraform', message: 'Applying infrastructure changes...' },
  { timestamp: '10:31:30', level: 'info', source: 'aws', message: 'Creating VPC vpc-abc123...' },
  { timestamp: '10:32:15', level: 'info', source: 'aws', message: 'Creating security group sg-def456...' },
  { timestamp: '10:33:00', level: 'warning', source: 'aws', message: 'Security group rule already exists, skipping...' },
  { timestamp: '10:33:45', level: 'info', source: 'aws', message: 'Creating ECS cluster prod-cluster...' },
  { timestamp: '10:34:30', level: 'info', source: 'terraform', message: 'Still creating... [3m45s elapsed]' }
];

export function RunDetailScreen() {
  const { navigateTo } = useNavigation();
  const [currentRun, setCurrentRun] = useState(mockRunData);
  const [logs, setLogs] = useState<typeof logMessages>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Simulate live log streaming
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const nextMessageIndex = logs.length;
      if (nextMessageIndex < logMessages.length) {
        setLogs(prev => [...prev, logMessages[nextMessageIndex]]);
      } else {
        setIsStreaming(false);
      }
    }, 2000); // New log every 2 seconds

    return () => clearInterval(interval);
  }, [logs.length, isStreaming]);

  // Simulate run progress
  useEffect(() => {
    if (currentRun.status !== 'running') return;

    const interval = setInterval(() => {
      setCurrentRun(prev => ({
        ...prev,
        progress: Math.min(prev.progress + Math.random() * 5, 95)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [currentRun.status]);

  const handleRollback = () => {
    setCurrentRun(prev => ({
      ...prev,
      status: 'pending' as const,
      progress: 0
    }));
    alert('Rollback initiated. This would revert the deployment to the previous stable state.');
  };

  const handleCancel = () => {
    setCurrentRun(prev => ({
      ...prev,
      status: 'cancelled' as const
    }));
    setIsStreaming(false);
  };

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case 'success': return '✓';
      case 'running': return '⟳';
      case 'failed': return '✗';
      case 'pending': return '○';
      default: return '○';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex-1 p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <StatusIndicator status={currentRun.status} size="md" />
            <h1 className="text-3xl font-bold">Run #{currentRun.id}</h1>
            <Badge variant={currentRun.status === 'running' ? 'default' : 'secondary'}>
              {currentRun.environment}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {currentRun.commit.message} • {currentRun.commit.hash} • {currentRun.commit.author}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Started {new Date(currentRun.startTime).toLocaleTimeString()} • Duration: {currentRun.duration}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRollback} disabled={currentRun.status === 'pending'}>
            🔄 Rollback
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={currentRun.status !== 'running'}>
            Cancel Run
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      {currentRun.status === 'running' && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Deployment Progress</span>
              <span>{Math.round(currentRun.progress)}%</span>
            </div>
            <Progress value={currentRun.progress} className="h-2" />
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="logs">Live Logs</TabsTrigger>
          <TabsTrigger value="runner">Runner Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deployment Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Deployment Impact</CardTitle>
                <CardDescription>Resource changes and cost impact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Resources Created:</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      +{currentRun.metrics.resourcesCreated}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Resources Modified:</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      ~{currentRun.metrics.resourcesModified}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Resources Destroyed:</span>
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      -{currentRun.metrics.resourcesDestroyed}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Impact:</span>
                    <Badge variant="outline">{currentRun.metrics.costImpact}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commit Information */}
            <Card>
              <CardHeader>
                <CardTitle>Commit Details</CardTitle>
                <CardDescription>Source code changes being deployed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Branch:</span>
                    <Badge variant="outline">{currentRun.commit.branch}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Commit:</span>
                    <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                      {currentRun.commit.hash}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Author:</span>
                    <span>{currentRun.commit.author}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-1">Message:</p>
                  <p className="text-sm text-muted-foreground">{currentRun.commit.message}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Timeline</CardTitle>
              <CardDescription>Plan → Policy → Apply → Verify workflow phases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentRun.phases.map((phase, index) => (
                  <div key={phase.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-muted">
                      <span className="text-sm">{getPhaseIcon(phase.status)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{phase.name}</h4>
                          <StatusIndicator status={phase.status} size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {phase.duration && `${phase.duration}`}
                          {phase.startTime && ` • Started ${phase.startTime}`}
                        </div>
                      </div>
                      {index < currentRun.phases.length - 1 && (
                        <div className="ml-4 mt-2 mb-2 h-8 w-px bg-muted" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live Deployment Logs</span>
                <div className="flex items-center gap-2">
                  <StatusIndicator 
                    status={isStreaming ? 'running' : 'success'} 
                    size="sm" 
                    showPulse={isStreaming}
                  />
                  <span className="text-sm text-muted-foreground">
                    {isStreaming ? 'Streaming live' : 'Stream ended'}
                  </span>
                </div>
              </CardTitle>
              <CardDescription>Real-time deployment logs with &lt;2s latency</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full border rounded-lg p-4 bg-slate-950 text-slate-50">
                <div className="space-y-1 font-mono text-sm">
                  {logs.map((log, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="text-slate-400 min-w-16">{log.timestamp}</span>
                      <span className={`min-w-20 ${getLogLevelColor(log.level)} uppercase`}>
                        {log.level}
                      </span>
                      <span className="text-cyan-300 min-w-24">[{log.source}]</span>
                      <span className="text-slate-100">{log.message}</span>
                    </div>
                  ))}
                  {isStreaming && (
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-slate-400 text-xs">Waiting for new logs...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="runner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Runner Information</CardTitle>
              <CardDescription>Infrastructure runner executing this deployment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Runner Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Runner ID:</span>
                        <code className="text-xs font-mono">{currentRun.runner.id}</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span>{currentRun.runner.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <StatusIndicator status={currentRun.runner.status} size="sm" />
                      </div>
                      <div className="flex justify-between">
                        <span>Region:</span>
                        <Badge variant="outline">{currentRun.runner.region}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Resource Allocation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>CPU:</span>
                        <span>{currentRun.runner.resources.cpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Memory:</span>
                        <span>{currentRun.runner.resources.memory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage:</span>
                        <span>{currentRun.runner.resources.storage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}