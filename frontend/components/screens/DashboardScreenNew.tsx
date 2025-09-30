/**
 * CloudProd.AI Dashboard Screen (SCR-08)
 * Platform overview with KPIs and guided onboarding
 */

import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  KPIGrid, 
  ProjectsKPI, 
  RunsKPI, 
  EnvironmentsKPI, 
  DriftAlertsKPI 
} from '../ui/kpi-widget';
import { StatusIndicator } from '../ui/status-indicator';
import { PlatformScreen } from '../../types/ScreenTypes';

// Mock data for demonstration - in real app this would come from API/state
interface DashboardData {
  projects: { total: number; active: number };
  runs: { total: number; successRate: number; recent: RecentRun[] };
  environments: { total: number; healthy: number };
  drift: { total: number; critical: number };
  onboarding: {
    completed: boolean;
    currentStep?: PlatformScreen;
    completedSteps: PlatformScreen[];
  };
}

interface RecentRun {
  id: string;
  projectName: string;
  status: 'success' | 'failed' | 'running' | 'pending';
  duration: string;
  timestamp: Date;
}

export function DashboardScreenNew() {
  const { navigateTo, navigateToWorkflow } = useNavigation();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData({
        projects: { total: 12, active: 8 },
        runs: { 
          total: 156, 
          successRate: 94,
          recent: [
            {
              id: '1',
              projectName: 'web-app-prod',
              status: 'success',
              duration: '2m 34s',
              timestamp: new Date(Date.now() - 300000)
            },
            {
              id: '2',
              projectName: 'api-service',
              status: 'running',
              duration: '1m 12s',
              timestamp: new Date(Date.now() - 120000)
            },
            {
              id: '3',
              projectName: 'data-pipeline',
              status: 'failed',
              duration: '45s',
              timestamp: new Date(Date.now() - 900000)
            }
          ]
        },
        environments: { total: 24, healthy: 22 },
        drift: { total: 3, critical: 1 },
        onboarding: {
          completed: false,
          currentStep: 'connect-github',
          completedSteps: []
        }
      });
      setLoading(false);
    };

    loadData();
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-project':
        navigateToWorkflow('onboarding', 'connect-github');
        break;
      case 'view-runs':
        navigateTo('run-detail');
        break;
      case 'view-drift':
        navigateTo('drift-view');
        break;
      case 'quick-deploy':
        navigateTo('stack-configurator');
        break;
      default:
        console.log(`Quick action: ${action}`);
    }
  };

  // Empty state for new users
  if (!loading && data?.onboarding && !data.onboarding.completed && data.projects.total === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500">
              <span className="text-3xl">🚀</span>
            </div>
            <CardTitle className="text-2xl">Welcome to CloudProd.AI!</CardTitle>
            <CardDescription className="text-lg">
              Let's get you started with your first project. We'll guide you through connecting your repository and setting up your infrastructure.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-2 text-2xl">📱</div>
                  <h3 className="font-semibold">Connect GitHub</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Link your repositories
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-2 text-2xl">🔍</div>
                  <h3 className="font-semibold">Detect Stack</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Analyze your code
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-2 text-2xl">⚡</div>
                  <h3 className="font-semibold">Deploy</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Launch your app
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => handleQuickAction('new-project')}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              >
                Start Your First Project
              </Button>
              <Button variant="outline" onClick={() => navigateTo('docs')}>
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
        
        <KPIGrid>
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 w-20 bg-muted rounded" />
                  <div className="h-8 w-16 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </KPIGrid>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Platform Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your infrastructure and deployments
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => handleQuickAction('new-project')}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          >
            New Project
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleQuickAction('quick-deploy')}
          >
            Quick Deploy
          </Button>
        </div>
      </div>

      {/* KPI Widgets */}
      <KPIGrid>
        <ProjectsKPI
          count={data.projects.total}
          activeCount={data.projects.active}
          onClick={() => navigateTo('workspaces')}
        />
        <RunsKPI
          count={data.runs.total}
          successRate={data.runs.successRate}
          onClick={() => handleQuickAction('view-runs')}
        />
        <EnvironmentsKPI
          count={data.environments.total}
          healthyCount={data.environments.healthy}
          onClick={() => navigateTo('workspaces')}
        />
        <DriftAlertsKPI
          count={data.drift.total}
          criticalCount={data.drift.critical}
          onClick={() => handleQuickAction('view-drift')}
        />
      </KPIGrid>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
            <CardDescription>
              Latest deployment runs and their status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.runs.recent.map((run) => (
              <div key={run.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <StatusIndicator status={run.status} size="sm" />
                  <div>
                    <p className="font-medium">{run.projectName}</p>
                    <p className="text-sm text-muted-foreground">
                      {run.timestamp.toLocaleTimeString()} • {run.duration}
                    </p>
                  </div>
                </div>
                <Badge variant={run.status === 'success' ? 'default' : 'destructive'}>
                  {run.status}
                </Badge>
              </div>
            ))}
            
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => handleQuickAction('view-runs')}
            >
              View All Runs →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-auto p-4"
              onClick={() => navigateToWorkflow('onboarding', 'connect-github')}
            >
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span>🔗</span>
                  <span className="font-medium">Connect New Repository</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Add a GitHub repository to your workspace
                </p>
              </div>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start h-auto p-4"
              onClick={() => navigateTo('stack-configurator')}
            >
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span>⚙️</span>
                  <span className="font-medium">Configure Infrastructure</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Design and deploy your application stack
                </p>
              </div>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start h-auto p-4"
              onClick={() => navigateTo('ai-agents')}
            >
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span>🤖</span>
                  <span className="font-medium">Manage AI Agents</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure automated agents and policies
                </p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}