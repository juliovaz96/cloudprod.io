/**
 * CloudProd.AI Settings Screen (SCR-12)
 * Team management, integrations, and platform configuration
 */

import React, { useState } from 'react';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { StatusIndicator, StatusType } from '../ui/status-indicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll-area';

// Mock settings data
const mockTeamMembers = [
  { id: 1, name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', status: 'active', lastActive: '2 hours ago' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah.wilson@company.com', role: 'Developer', status: 'active', lastActive: '1 day ago' },
  { id: 3, name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Developer', status: 'active', lastActive: '3 days ago' },
  { id: 4, name: 'Lisa Rodriguez', email: 'lisa.rodriguez@company.com', role: 'Viewer', status: 'pending', lastActive: 'Never' }
];

const mockIntegrations = [
  { id: 'github', name: 'GitHub', description: 'Source code repository integration', connected: true, status: 'success' as StatusType },
  { id: 'aws', name: 'AWS', description: 'Amazon Web Services cloud provider', connected: true, status: 'success' as StatusType },
  { id: 'slack', name: 'Slack', description: 'Team communication and notifications', connected: false, status: 'pending' as StatusType },
  { id: 'datadog', name: 'Datadog', description: 'Infrastructure monitoring and logging', connected: false, status: 'pending' as StatusType },
  { id: 'pagerduty', name: 'PagerDuty', description: 'Incident response and alerting', connected: true, status: 'warning' as StatusType }
];

const mockSecrets = [
  { id: 1, key: 'DATABASE_URL', environment: 'production', lastUpdated: '2025-09-25', type: 'Database Connection' },
  { id: 2, key: 'API_SECRET_KEY', environment: 'production', lastUpdated: '2025-09-20', type: 'API Key' },
  { id: 3, key: 'JWT_SECRET', environment: 'staging', lastUpdated: '2025-09-18', type: 'Authentication' },
  { id: 4, key: 'STRIPE_SECRET_KEY', environment: 'production', lastUpdated: '2025-09-15', type: 'Payment Gateway' }
];

const mockAuditLogs = [
  { id: 1, action: 'User Invited', user: 'john.doe@company.com', target: 'lisa.rodriguez@company.com', timestamp: '2025-09-29 14:30:00' },
  { id: 2, action: 'Secret Updated', user: 'sarah.wilson@company.com', target: 'DATABASE_URL', timestamp: '2025-09-25 09:15:00' },
  { id: 3, action: 'Integration Connected', user: 'mike.chen@company.com', target: 'AWS', timestamp: '2025-09-24 16:45:00' },
  { id: 4, action: 'Role Changed', user: 'john.doe@company.com', target: 'mike.chen@company.com (Developer)', timestamp: '2025-09-23 11:20:00' }
];

export function SettingsScreen() {
  const { navigateTo } = useNavigation();
  const [selectedTab, setSelectedTab] = useState('team');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Developer');
  const [newSecret, setNewSecret] = useState({ key: '', value: '', environment: 'production' });
  
  // Team management handlers
  const handleInviteUser = () => {
    if (inviteEmail) {
      alert(`Invitation sent to ${inviteEmail} with ${inviteRole} role`);
      setInviteEmail('');
    }
  };

  const handleRemoveUser = (userId: number) => {
    alert(`User removed from team (ID: ${userId})`);
  };

  const handleChangeRole = (userId: number, newRole: string) => {
    alert(`User role changed to ${newRole} (ID: ${userId})`);
  };

  // Integration handlers
  const handleConnectIntegration = (integrationId: string) => {
    alert(`Connecting ${integrationId} integration...`);
  };

  const handleDisconnectIntegration = (integrationId: string) => {
    alert(`Disconnecting ${integrationId} integration...`);
  };

  // Secret management handlers
  const handleAddSecret = () => {
    if (newSecret.key && newSecret.value) {
      alert(`Secret ${newSecret.key} added to ${newSecret.environment}`);
      setNewSecret({ key: '', value: '', environment: 'production' });
    }
  };

  const handleDeleteSecret = (secretId: number) => {
    alert(`Secret deleted (ID: ${secretId})`);
  };

  const getIntegrationIcon = (id: string) => {
    const icons: { [key: string]: string } = {
      github: '🐙',
      aws: '☁️',
      slack: '💬',
      datadog: '🐕',
      pagerduty: '🚨'
    };
    return icons[id] || '🔗';
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Admin': return 'default';
      case 'Developer': return 'secondary';
      case 'Viewer': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="flex-1 p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Platform Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage team, integrations, secrets, and platform configuration
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigateTo('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="secrets">Secrets</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Members */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage team access and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTeamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getRoleBadgeVariant(member.role)}>
                            {member.role}
                          </Badge>
                          <StatusIndicator 
                            status={member.status === 'active' ? 'success' : 'pending'} 
                            size="sm" 
                          />
                          <Button variant="outline" size="sm" onClick={() => handleChangeRole(member.id, 'Admin')}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleRemoveUser(member.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Invite New User */}
            <Card>
              <CardHeader>
                <CardTitle>Invite Team Member</CardTitle>
                <CardDescription>Send an invitation to join your team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Developer">Developer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <Button onClick={handleInviteUser} className="w-full">
                  Send Invitation
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Integrations</CardTitle>
              <CardDescription>Connect external services and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockIntegrations.map((integration) => (
                  <div key={integration.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getIntegrationIcon(integration.id)}</span>
                        <div>
                          <h4 className="font-semibold">{integration.name}</h4>
                          <StatusIndicator status={integration.status} size="sm" />
                        </div>
                      </div>
                      <Badge variant={integration.connected ? 'default' : 'outline'}>
                        {integration.connected ? 'Connected' : 'Not Connected'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {integration.description}
                    </p>
                    {integration.connected ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnectIntegration(integration.id)}
                        className="w-full"
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleConnectIntegration(integration.id)}
                        className="w-full"
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secrets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Secrets List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Environment Secrets</CardTitle>
                  <CardDescription>Secure configuration and API keys</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockSecrets.map((secret) => (
                      <div key={secret.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold font-mono text-sm">{secret.key}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {secret.environment}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {secret.type} • Updated {secret.lastUpdated}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSecret(secret.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add New Secret */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Secret</CardTitle>
                <CardDescription>Store sensitive configuration securely</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="secret-key">Secret Key</Label>
                  <Input
                    id="secret-key"
                    placeholder="API_KEY"
                    value={newSecret.key}
                    onChange={(e) => setNewSecret(prev => ({ ...prev, key: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secret-value">Secret Value</Label>
                  <Input
                    id="secret-value"
                    type="password"
                    placeholder="Enter secret value"
                    value={newSecret.value}
                    onChange={(e) => setNewSecret(prev => ({ ...prev, value: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secret-env">Environment</Label>
                  <select
                    id="secret-env"
                    value={newSecret.environment}
                    onChange={(e) => setNewSecret(prev => ({ ...prev, environment: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="production">Production</option>
                    <option value="staging">Staging</option>
                    <option value="development">Development</option>
                  </select>
                </div>
                <Button onClick={handleAddSecret} className="w-full">
                  Add Secret
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subscription Info */}
            <Card>
              <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>Your billing and usage information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Plan:</span>
                  <Badge variant="default">Professional</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Monthly Cost:</span>
                  <span className="font-semibold">$99/month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Next Billing:</span>
                  <span>October 29, 2025</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Members:</span>
                    <span>4/10 included</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Monthly Deployments:</span>
                    <span>147/500 included</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Build Minutes:</span>
                    <span>2,340/5,000 included</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>

            {/* Usage Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>This month's platform usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Deployments</span>
                      <span>147/500</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '29%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Build Minutes</span>
                      <span>2,340/5,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '47%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage</span>
                      <span>12.5GB/50GB</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>Security and activity monitoring for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {mockAuditLogs.map((log) => (
                    <div key={log.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{log.action}</span>
                          <span className="text-sm text-muted-foreground">by {log.user}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Target: {log.target}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {log.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}