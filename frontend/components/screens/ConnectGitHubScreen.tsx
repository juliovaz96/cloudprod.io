/**
 * CloudProd.AI Connect GitHub Screen (SCR-01)
 * OAuth integration and repository selection
 */

import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { StatusIndicator } from '../ui/status-indicator';
import { Repository } from '../../types/PlatformState';

interface GitHubConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  repositories: Repository[];
  selectedRepo?: Repository;
  searchQuery: string;
  error?: string;
}

export function ConnectGitHubScreen() {
  const { navigateTo, nextStep } = useNavigation();
  const [state, setState] = useState<GitHubConnectionState>({
    isConnected: false,
    isConnecting: false,
    repositories: [],
    searchQuery: '',
  });

  // Mock repositories data
  const mockRepositories: Repository[] = [
    {
      id: '1',
      name: 'web-application',
      fullName: 'myorg/web-application',
      description: 'Main web application built with React and Node.js',
      private: false,
      defaultBranch: 'main',
      url: 'https://github.com/myorg/web-application',
      language: 'TypeScript',
      topics: ['react', 'nodejs', 'web', 'frontend']
    },
    {
      id: '2',
      name: 'api-service',
      fullName: 'myorg/api-service',
      description: 'REST API service for the web application',
      private: true,
      defaultBranch: 'main',
      url: 'https://github.com/myorg/api-service',
      language: 'Python',
      topics: ['api', 'python', 'fastapi', 'backend']
    },
    {
      id: '3',
      name: 'data-pipeline',
      fullName: 'myorg/data-pipeline',
      description: 'ETL pipeline for processing application data',
      private: true,
      defaultBranch: 'main',
      url: 'https://github.com/myorg/data-pipeline',
      language: 'Python',
      topics: ['etl', 'data', 'pipeline', 'airflow']
    }
  ];

  const handleConnectGitHub = async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: undefined }));
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful connection
      setState(prev => ({
        ...prev,
        isConnected: true,
        isConnecting: false,
        repositories: mockRepositories
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: 'Failed to connect to GitHub. Please try again.'
      }));
    }
  };

  const handleSelectRepository = (repo: Repository) => {
    setState(prev => ({ ...prev, selectedRepo: repo }));
  };

  const handleContinue = () => {
    if (state.selectedRepo) {
      // Store selected repository and proceed to next step
      nextStep();
    }
  };

  const filteredRepositories = state.repositories.filter(repo =>
    repo.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    repo.description?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    repo.topics.some(topic => topic.toLowerCase().includes(state.searchQuery.toLowerCase()))
  );

  // Not connected state
  if (!state.isConnected) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700">
              <span className="text-3xl">📱</span>
            </div>
            <CardTitle className="text-2xl">Connect Your GitHub Account</CardTitle>
            <CardDescription className="text-lg">
              Connect your GitHub repositories to get started with CloudProd.AI. We'll analyze your code and help you deploy your applications.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                🔒 What we access
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Read your public and private repositories</li>
                <li>• Analyze code structure and dependencies</li>
                <li>• Read repository metadata and topics</li>
                <li>• Access to commit history (for deployment tracking)</li>
              </ul>
            </div>
            
            {state.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {state.error}
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleConnectGitHub}
                disabled={state.isConnecting}
                className="w-full bg-gray-900 hover:bg-gray-800"
              >
                {state.isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Connecting to GitHub...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    Connect with GitHub OAuth
                  </div>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('dashboard')}
                className="w-full"
              >
                Skip for Now
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              By connecting, you agree to CloudProd.AI accessing your GitHub repositories for deployment purposes only.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Connected state - repository selection
  return (
    <div className="flex-1 p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <StatusIndicator status="success" size="md" />
          <h1 className="text-3xl font-bold">GitHub Connected Successfully</h1>
        </div>
        <p className="text-muted-foreground">
          Select a repository to get started with CloudProd.AI deployment
        </p>
      </div>

      <div className="space-y-6">
        {/* Search repositories */}
        <Card>
          <CardHeader>
            <CardTitle>Search Repositories</CardTitle>
            <CardDescription>
              Find and select the repository you want to deploy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search repositories by name, description, or topic..."
              value={state.searchQuery}
              onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Repository list */}
        <Card>
          <CardHeader>
            <CardTitle>Available Repositories ({filteredRepositories.length})</CardTitle>
            <CardDescription>
              Choose the repository you want to analyze and deploy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredRepositories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No repositories found matching your search.
              </div>
            ) : (
              filteredRepositories.map((repo) => (
                <div
                  key={repo.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                    state.selectedRepo?.id === repo.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => handleSelectRepository(repo)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{repo.name}</h3>
                        {repo.private && (
                          <Badge variant="outline" className="text-xs">
                            Private
                          </Badge>
                        )}
                        {repo.language && (
                          <Badge variant="secondary" className="text-xs">
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {repo.description || 'No description available'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>📋 {repo.fullName}</span>
                        <span>•</span>
                        <span>🌿 {repo.defaultBranch}</span>
                      </div>
                      
                      {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {repo.topics.slice(0, 4).map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {repo.topics.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{repo.topics.length - 4} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {state.selectedRepo?.id === repo.id && (
                      <div className="ml-4">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Continue button */}
        {state.selectedRepo && (
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => navigateTo('dashboard')}>
              Back to Dashboard
            </Button>
            
            <Button 
              onClick={handleContinue}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            >
              Continue with {state.selectedRepo.name} →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}