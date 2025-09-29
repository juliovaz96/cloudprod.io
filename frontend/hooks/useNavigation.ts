import { useNavigation as useNavigationContext } from '../contexts/NavigationContext';
import { useCallback } from 'react';
import type { Screen } from '../contexts/NavigationContext';

/**
 * Enhanced navigation hook with additional utilities and analytics
 */
export function useNavigation() {
  const navigation = useNavigationContext();

  // Quick navigation methods
  const goToDashboard = useCallback(() => {
    navigation.navigate('dashboard');
  }, [navigation]);

  const goToCanvas = useCallback((projectId?: string) => {
    navigation.navigate('canvas', { projectId });
  }, [navigation]);

  const goToPreview = useCallback((from?: Screen) => {
    navigation.navigate('preview', { from });
  }, [navigation]);

  const goToPublish = useCallback((from?: Screen) => {
    navigation.navigate('publish', { from });
  }, [navigation]);

  const goToLogin = useCallback(() => {
    navigation.navigate('login');
  }, [navigation]);

  const goToPricing = useCallback(() => {
    navigation.navigate('pricing');
  }, [navigation]);

  // Authentication helpers
  const login = useCallback(() => {
    navigation.setAuthenticated(true);
    navigation.navigate('dashboard');
  }, [navigation]);

  const logout = useCallback(() => {
    navigation.setAuthenticated(false);
    // Navigation to login is handled automatically in the context
  }, [navigation]);

  // Navigation guards
  const navigateIfAuthenticated = useCallback((screen: Screen, data?: Record<string, any>) => {
    if (navigation.isAuthenticated) {
      navigation.navigate(screen, data);
    } else {
      console.warn('Navigation blocked: User not authenticated');
      navigation.navigate('login');
    }
  }, [navigation]);

  // Analytics helpers
  const trackUserAction = useCallback((action: string, screen: Screen, data?: Record<string, any>) => {
    console.log('User action:', {
      action,
      screen,
      timestamp: Date.now(),
      data,
      userId: navigation.isAuthenticated ? 'authenticated_user' : 'anonymous'
    });
  }, [navigation.isAuthenticated]);

  // Navigation timing
  const measureNavigationTime = useCallback((targetScreen: Screen) => {
    const startTime = performance.now();
    
    navigation.navigate(targetScreen);
    
    // In a real app, you'd measure when the screen actually renders
    setTimeout(() => {
      const endTime = performance.now();
      console.log(`Navigation to ${targetScreen} took ${endTime - startTime}ms`);
    }, 0);
  }, [navigation]);

  return {
    // Core navigation context
    ...navigation,
    
    // Quick navigation methods
    goToDashboard,
    goToCanvas,
    goToPreview,
    goToPublish,
    goToLogin,
    goToPricing,
    
    // Authentication
    login,
    logout,
    
    // Enhanced navigation
    navigateIfAuthenticated,
    measureNavigationTime,
    
    // Analytics
    trackUserAction,
    
    // Utility methods
    isOnScreen: (screen: Screen) => navigation.currentScreen === screen,
    getNavigationState: () => ({
      current: navigation.currentScreen,
      history: navigation.history,
      index: navigation.history.length - 1,
      canGoBack: navigation.canGoBack,
      canGoForward: navigation.canGoForward
    })
  };
}