/**
 * CloudProd.AI Detect Stack Screen (SCR-02)
 * Automatic stack detection and analysis
 */

import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { StatusIndicator } from '../ui/status-indicator';
import { DetectedStack, DetectedService } from '../../types/PlatformState';

interface StackDetectionState {
  isScanning: boolean;
  isComplete: boolean;
  progress: number;
  detectedStacks: DetectedStack[];
  selectedStack?: DetectedStack;
  exportJson?: string;
  error?: string;
}

export function DetectStackScreen() {
  const { navigateTo, nextStep, previousStep } = useNavigation();
  const [state, setState] = useState<StackDetectionState>({
    isScanning: true,
    isComplete: false,
    progress: 0,
    detectedStacks: [],
  });

  // Mock stack detection results
  const mockDetectedStacks: DetectedStack[] = [
    {
      type: 'nextjs',
      version: '14.0.0',
      files: ['package.json', 'next.config.js', 'app/layout.tsx', 'app/page.tsx'],
      services: [
        {
          name: 'web-frontend',
          type: 'web',
          port: 3000,
          protocol: 'http',
          environment: {
            NODE_ENV: 'production',
            PORT: '3000',
            NEXT_PUBLIC_API_URL: '/api'
          },
          healthCheck: {
            path: '/api/health',
            method: 'GET',
            interval: 30,
            timeout: 5,
            retries: 3,
            expectedStatus: 200
          }
        }
      ],
      dependencies: [
        { name: 'react', version: '18.2.0', type: 'production' },
        { name: 'next', version: '14.0.0', type: 'production' },
        { name: 'typescript', version: '5.0.0', type: 'development' }
      ],
      confidence: 0.95
    },
    {
      type: 'nodejs',
      version: '18.0.0',
      files: ['package.json', 'server.js', 'routes/', 'middleware/'],
      services: [
        {
          name: 'api-backend',
          type: 'api',
          port: 8000,
          protocol: 'http',
          environment: {
            NODE_ENV: 'production',
            PORT: '8000',
            DATABASE_URL: 'postgresql://...'
          },
          healthCheck: {
            path: '/health',
            method: 'GET',
            interval: 30,
            timeout: 5,
            retries: 3
          }
        }
      ],
      dependencies: [
        { name: 'express', version: '4.18.0', type: 'production' },
        { name: 'cors', version: '2.8.5', type: 'production' },
        { name: 'dotenv', version: '16.0.0', type: 'production' }
      ],
      confidence: 0.88
    },
    {
      type: 'docker',
      files: ['Dockerfile', 'docker-compose.yml', '.dockerignore'],
      services: [
        {
          name: 'postgres-db',
          type: 'database',
          port: 5432,
          protocol: 'tcp',
          environment: {
            POSTGRES_DB: 'appdb',
            POSTGRES_USER: 'appuser',
            POSTGRES_PASSWORD: '${DB_PASSWORD}'
          }
        }
      ],
      dependencies: [
        { name: 'postgres', version: '15.0', type: 'production' }
      ],
      confidence: 0.92
    }
  ];

  // Simulate stack detection process
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isScanning) {
      interval = setInterval(() => {
        setState(prev => {
          const newProgress = prev.progress + 10;
          
          if (newProgress >= 100) {
            // Detection complete
            const exportData = {
              repository: 'myorg/web-application',
              detectedAt: new Date().toISOString(),
              stacks: mockDetectedStacks,
              summary: {
                totalServices: mockDetectedStacks.reduce((acc, stack) => acc + stack.services.length, 0),
                primaryStack: mockDetectedStacks[0].type,
                confidence: Math.max(...mockDetectedStacks.map(s => s.confidence))
              }
            };
            
            return {
              ...prev,
              isScanning: false,
              isComplete: true,
              progress: 100,
              detectedStacks: mockDetectedStacks,
              selectedStack: mockDetectedStacks[0],
              exportJson: JSON.stringify(exportData, null, 2)
            };
          }
          
          return { ...prev, progress: newProgress };
        });
      }, 200);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isScanning]);

  const handleSelectStack = (stack: DetectedStack) => {
    setState(prev => ({ ...prev, selectedStack: stack }));
  };

  const handleExportJson = () => {
    if (state.exportJson) {
      const blob = new Blob([state.exportJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'detected-stack.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopyJson = async () => {
    if (state.exportJson) {
      await navigator.clipboard.writeText(state.exportJson);
    }
  };

  const handleRescan = () => {
    setState({
      isScanning: true,
      isComplete: false,
      progress: 0,
      detectedStacks: [],
      selectedStack: undefined,
      exportJson: undefined
    });
  };

  // Scanning state
  if (state.isScanning) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
            </div>
            <CardTitle className="text-2xl">Analyzing Your Repository</CardTitle>
            <CardDescription className="text-lg">
              We're scanning your code to detect the technology stack and services
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Detection Progress</span>
                <span>{state.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${state.progress}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <StatusIndicator status="success" size="sm" showPulse={false} />
                <span>Scanning package.json and dependencies</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicator status={state.progress > 30 ? "success" : "pending"} size="sm" showPulse={state.progress <= 30} />
                <span>Analyzing Docker configuration</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicator status={state.progress > 60 ? "success" : "pending"} size="sm" showPulse={state.progress > 30 && state.progress <= 60} />
                <span>Detecting services and ports</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicator status={state.progress > 90 ? "success" : "pending"} size="sm" showPulse={state.progress > 60 && state.progress <= 90} />
                <span>Generating deployment configuration</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Detection complete
  return (
    <div className="flex-1 p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <StatusIndicator status="success" size="md" />
          <h1 className="text-3xl font-bold">Stack Detection Complete</h1>
        </div>
        <p className="text-muted-foreground">
          We found {state.detectedStacks.length} technology stacks and {state.detectedStacks.reduce((acc, stack) => acc + stack.services.length, 0)} services in your repository
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stack selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detected Technology Stacks</CardTitle>
              <CardDescription>
                Select a stack to view detailed service configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.detectedStacks.map((stack, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                    state.selectedStack === stack 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => handleSelectStack(stack)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {stack.type === 'nextjs' && '⚛️'}
                        {stack.type === 'nodejs' && '🟢'}
                        {stack.type === 'docker' && '🐳'}
                      </div>
                      <div>
                        <h3 className="font-semibold capitalize">{stack.type}</h3>
                        {stack.version && (
                          <p className="text-sm text-muted-foreground">v{stack.version}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={stack.confidence > 0.9 ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {Math.round(stack.confidence * 100)}% confidence
                      </Badge>
                      {state.selectedStack === stack && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">{stack.services.length} services:</span>
                      <span className="ml-2 text-muted-foreground">
                        {stack.services.map(s => s.name).join(', ')}
                      </span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">{stack.files.length} files detected:</span>
                      <span className="ml-2 text-muted-foreground">
                        {stack.files.slice(0, 3).join(', ')}
                        {stack.files.length > 3 && ` +${stack.files.length - 3} more`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selected stack details */}
          {state.selectedStack && (
            <Card>
              <CardHeader>
                <CardTitle>Service Configuration</CardTitle>
                <CardDescription>
                  Detected services for {state.selectedStack.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.selectedStack.services.map((service, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {service.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {service.protocol}:{service.port}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Environment Variables:</span>
                        <div className="mt-1 space-y-1">
                          {Object.entries(service.environment).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 text-xs font-mono bg-muted p-2 rounded">
                              <span className="text-blue-600">{key}</span>
                              <span>=</span>
                              <span className="text-green-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {service.healthCheck && (
                        <div>
                          <span className="font-medium">Health Check:</span>
                          <div className="mt-1 text-xs font-mono bg-muted p-2 rounded">
                            {service.healthCheck.method} {service.healthCheck.path} (every {service.healthCheck.interval}s)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Configuration</CardTitle>
              <CardDescription>
                Export the detected stack configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleCopyJson}
                variant="outline" 
                className="w-full"
              >
                📋 Copy JSON
              </Button>
              
              <Button 
                onClick={handleExportJson}
                variant="outline" 
                className="w-full"
              >
                💾 Download JSON
              </Button>
              
              <Button 
                onClick={handleRescan}
                variant="outline" 
                className="w-full"
              >
                🔄 Re-scan Repository
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Continue with stack configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                disabled={!state.selectedStack}
              >
                Configure Stack →
              </Button>
              
              <Button 
                onClick={previousStep}
                variant="outline" 
                className="w-full"
              >
                ← Back to GitHub
              </Button>
              
              <Button 
                onClick={() => navigateTo('dashboard')}
                variant="ghost" 
                className="w-full"
              >
                Save & Exit to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}