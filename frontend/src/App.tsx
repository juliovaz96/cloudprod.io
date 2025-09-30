import React from 'react';
import { NavigationProvider } from '../contexts/NavigationContext';
import { ThemeProvider } from './providers/ThemeProvider';
import { GuidelineProvider } from '../contexts/GuidelineContext';
import { useNavigation } from '../contexts/NavigationContext';
import {
  HomeScreen,
  FeaturesScreen,
  SolutionsScreen,
  PricingScreen,
  DocsScreen,
  AuthScreen,
  DashboardScreen,
  CanvasScreen,
  SettingsScreen,
  WorkspacesScreen,
  BlueprintSelectScreen
} from '../components/screens';
import { WorkspacesProvider } from '../contexts/WorkspacesContext';
import { RealtimeProvider } from '../contexts/RealtimeContext';

function AppContent() {
  const { currentScreen } = useNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'features':
        return <FeaturesScreen />;
      case 'solutions':
        return <SolutionsScreen />;
      case 'pricing':
        return <PricingScreen />;
      case 'docs':
        return <DocsScreen />;
      case 'auth':
      case 'login':
        return <AuthScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'workspaces':
        return <WorkspacesScreen />;
      case 'blueprint-select':
        return <BlueprintSelectScreen />;
      case 'canvas':
        return <CanvasScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'product-overview':
      case 'use-cases':
      case 'faq':
      case 'community':
      case 'community-blog':
      case 'community-events':
      case 'blog-post':
      case 'event-detail':
      case 'events-calendar':
      case 'event-registration':
      case 'submit-event':
        return <HomeScreen />;
      case 'plans':
        return <PricingScreen />;
      case 'prompt-to-prototype':
      case 'preview':
      case 'publish':
      case 'project-overview':
      case 'project-detail':
      case 'environment-detail':
      case 'ai-copilot':
      case 'observability':
      case 'deployment-orchestration':
      case 'pipeline-builder':
      case 'iac-generator':
      case 'mobile-deployment':
      case 'theme-demo':
        return <DashboardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return <>{renderScreen()}</>;
}

function App() {
  return (
    <GuidelineProvider>
      <ThemeProvider>
        <NavigationProvider>
          <RealtimeProvider>
            <WorkspacesProvider>
              <AppContent />
            </WorkspacesProvider>
          </RealtimeProvider>
        </NavigationProvider>
      </ThemeProvider>
    </GuidelineProvider>
  );
}

export default App;