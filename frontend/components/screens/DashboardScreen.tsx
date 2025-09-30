/**
 * CloudProd.AI Dashboard Screen (SCR-08)
 * Platform overview with KPIs and guided onboarding
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '../../contexts/EnhancedNavigationContext';
import { useGuidelines } from '../../contexts/GuidelineContext';
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
import { PlatformLayout } from '../core/layouts/PlatformLayout';
import { cn } from '../ui/utils';
import { motion } from 'motion/react';
import { Folder, Clock } from 'lucide-react';
import { PlatformScreen } from '../../types/ScreenTypes';

export function DashboardScreen() {
  const { navigateTo } = useNavigation();
  const { copy, components, layout, motion: motionGuidelines } = useGuidelines();
  const dashboard = copy.platform.dashboard;

  const primaryQuickAction = useMemo(
    () => dashboard.quickActions.find((action: any) => action.id === 'create-project'),
    [dashboard.quickActions]
  );

  const handlePrimaryAction = () => {
    navigateTo((primaryQuickAction?.route ?? 'canvas') as any);
  };

  const getStatusVariant = (status: (typeof dashboard.projects)[number]['status']) => {
    switch (status) {
      case 'Deployed':
        return 'default' as const;
      case 'Building':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <PlatformLayout>
  <div className={cn(layout.platform.container, 'space-y-8')}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{dashboard.heading}</h1>
            <p className="text-muted-foreground mt-1">
              {dashboard.subheading}
            </p>
          </div>
          <Button 
            className={cn(components.primaryButton, components.primaryButtonSurface)}
            onClick={handlePrimaryAction}
          >
            {primaryQuickAction?.title ?? 'New Project'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboard.stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionGuidelines.durations.section,
                delay: motionGuidelines.getStagger(stat.delayIndex ?? index)
              }}
            >
              <Card className={cn(components.dashboardStatCard, stat.surfaceClass)}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
                  </div>
                  <div className={cn('p-3 rounded-xl shadow-lg', stat.iconWrapperClass)}>
                    <stat.icon className={cn('h-6 w-6', stat.iconClass)} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Projects</h2>
            <Button variant="outline" size="sm" onClick={() => navigateTo('dashboard')}>
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {dashboard.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: motionGuidelines.durations.element,
                  delay: 0.4 + motionGuidelines.getStagger(index)
                }}
              >
                <Card className={components.projectCard}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Folder className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {project.lastUpdated}
                          </span>
                          <span>{project.resources} resources</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={getStatusVariant(project.status)}>
                          {project.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{project.cost}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboard.quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: motionGuidelines.durations.element,
                  delay: 0.8 + motionGuidelines.getStagger(index)
                }}
              >
                <Card 
                  className={components.quickActionCard}
                  onClick={() => navigateTo(action.route as any)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn('p-2 rounded-lg', action.iconWrapperClass)}>
                      <action.icon className={cn('h-5 w-5', action.iconClass)} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}