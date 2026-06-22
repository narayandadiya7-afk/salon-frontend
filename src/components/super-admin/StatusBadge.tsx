'use client';

import React from 'react';
import './StatusBadge.css';

export interface StatusBadgeProps {
  status: 'active' | 'suspended' | 'trial' | 'pending' | 'cancelled' | 'expired' | 'resolved' | 'open' | 'urgent' | 'high' | 'medium' | 'low' | 'closed' | string;
  text?: string;
}

const colorMap: Record<string, string> = {
  active: '#10b981',
  suspended: '#f59e0b',
  trial: '#3b82f6',
  pending: '#eab308',
  cancelled: '#ef4444',
  expired: '#6b7280',
  resolved: '#10b981',
  open: '#3b82f6',
  urgent: '#ef4444',
  high: '#f59e0b',
  medium: '#3b82f6',
  low: '#6b7280',
  closed: '#6b7280',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  const color = colorMap[status.toLowerCase()] || '#6b7280';
  const label = text || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className="status-badge" style={{ '--badge-color': color } as React.CSSProperties}>
      <span className="status-badge-dot" style={{ background: color }} />
      <span className="status-badge-text">{label}</span>
    </span>
  );
};

export default StatusBadge;
