'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    localStorage.clear();
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '24px',
          }}
        >
          <Result
            status="error"
            title="Something went wrong"
            subTitle={
              <div style={{ maxWidth: 500 }}>
                <p>We encountered an unexpected error. This might be due to:</p>
                <ul style={{ textAlign: 'left', marginTop: 16 }}>
                  <li>Incompatible cached data</li>
                  <li>Theme configuration issues</li>
                  <li>Browser storage conflicts</li>
                </ul>
                {this.state.error && (
                  <details style={{ marginTop: 16, textAlign: 'left' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 500 }}>
                      Error Details
                    </summary>
                    <pre
                      style={{
                        marginTop: 8,
                        padding: 12,
                        background: '#f1f5f9',
                        borderRadius: 4,
                        fontSize: 12,
                        overflow: 'auto',
                      }}
                    >
                      {this.state.error.message}
                    </pre>
                  </details>
                )}
              </div>
            }
            extra={[
              <Button key="reset" onClick={this.handleReset}>
                Try Again
              </Button>,
              <Button key="reload" type="primary" onClick={this.handleReload}>
                Clear Cache & Reload
              </Button>,
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
