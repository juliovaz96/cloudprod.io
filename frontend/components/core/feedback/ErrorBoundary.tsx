import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console and external service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In a real app, you would send this to your error reporting service
    this.logErrorToService(error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // Mock error logging service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // In production, send to your error tracking service
    console.log('Error logged to service:', errorData);
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportBug = () => {
    const errorData = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack
    };

    // Create mailto link with error details
    const subject = encodeURIComponent(`Bug Report - Error ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error Details:
- Error ID: ${errorData.errorId}
- Message: ${errorData.message}
- Time: ${new Date().toISOString()}

Please describe what you were doing when this error occurred:

[Your description here]

Technical Details:
${errorData.stack}
    `);
    
    window.open(`mailto:support@cloudprod.ai?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full p-8">
            <div className="text-center space-y-6">
              {/* Error Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </div>

              {/* Error Message */}
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-foreground">
                  Something went wrong
                </h1>
                <p className="text-muted-foreground">
                  We're sorry, but something unexpected happened. Our team has been notified.
                </p>
              </div>

              {/* Error ID */}
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Error ID: <code className="font-mono text-foreground">{this.state.errorId}</code>
                </p>
              </div>

              {/* Error Details (if enabled) */}
              {this.props.showErrorDetails && this.state.error && (
                <details className="text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    Technical Details
                  </summary>
                  <div className="mt-4 bg-muted rounded-lg p-4 text-sm font-mono overflow-auto">
                    <div className="space-y-2">
                      <div>
                        <strong>Error:</strong> {this.state.error.message}
                      </div>
                      {this.state.error.stack && (
                        <div>
                          <strong>Stack Trace:</strong>
                          <pre className="mt-1 text-xs overflow-auto">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}
                      {this.state.errorInfo?.componentStack && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="mt-1 text-xs overflow-auto">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleRetry}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
                
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
                
                <Button
                  variant="outline"
                  onClick={this.handleReportBug}
                  className="flex items-center gap-2"
                >
                  <Bug className="w-4 h-4" />
                  Report Bug
                </Button>
              </div>

              {/* Additional Help */}
              <div className="text-sm text-muted-foreground">
                <p>
                  If this problem persists, please{' '}
                  <a 
                    href="mailto:support@cloudprod.ai" 
                    className="text-primary hover:underline"
                  >
                    contact our support team
                  </a>
                  {' '}with the error ID above.
                </p>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  const handleError = (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by error handler:', error, errorInfo);
    
    // In a real app, send to error reporting service
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorInfo
    };
    
    console.log('Error logged:', errorData);
  };

  return { handleError };
}

// Higher-order component version
export function withErrorBoundary<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
  errorBoundaryConfig?: Omit<Props, 'children'>
) {
  const WithErrorBoundaryComponent = (props: T) => (
    <ErrorBoundary {...errorBoundaryConfig}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
}