import { render, fireEvent, screen, act } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import {
  NavigationProvider,
  useNavigation,
  SCREEN_LABELS,
  ALL_SCREENS,
  getScreenLabel
} from '../NavigationContext';

function TestHarness() {
  const navigation = useNavigation();

  return (
    <div>
      <div data-testid="current-screen">{navigation.currentScreen}</div>
      <div data-testid="history-length">{navigation.history.length}</div>
      <div data-testid="is-authenticated">{navigation.isAuthenticated ? 'yes' : 'no'}</div>
      <div data-testid="is-loading">{navigation.isLoading ? 'loading' : 'idle'}</div>
      <div data-testid="loading-message">{navigation.loadingMessage}</div>
      <button type="button" onClick={() => navigation.navigate('features')}>
        go-features
      </button>
      <button type="button" onClick={() => navigation.navigate('dashboard')}>
        go-dashboard
      </button>
      <button type="button" onClick={() => navigation.goBack()}>
        go-back
      </button>
      <button type="button" onClick={() => navigation.goForward()}>
        go-forward
      </button>
    </div>
  );
}

describe('NavigationContext', () => {
  it('should render the test harness', () => {
    render(
      <NavigationProvider>
        <TestHarness />
      </NavigationProvider>
    );
    
    expect(screen.getByTestId('current-screen')).toBeInTheDocument();
    expect(screen.getByTestId('history-length')).toBeInTheDocument();
  });

  it('should have initial state', () => {
    render(
      <NavigationProvider>
        <TestHarness />
      </NavigationProvider>
    );
    
    expect(screen.getByTestId('current-screen')).toHaveTextContent('home');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('no');
  });
});
