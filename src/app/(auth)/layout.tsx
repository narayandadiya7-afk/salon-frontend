import React from 'react';
import './auth.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">WebaniX</div>
          <p className="auth-tagline">Modern Project Management</p>
        </div>
        {children}
      </div>
    </div>
  );
}
