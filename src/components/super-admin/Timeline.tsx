'use client';

import React from 'react';
import { Typography } from 'antd';
import './Timeline.css';

const { Text } = Typography;

interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

interface TimelineProps {
  events: TimelineEvent[];
}

const typeColors: Record<string, string> = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  default: '#6b7280',
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="super-timeline">
      {events.map((event, i) => (
        <div key={i} className="timeline-item">
          <div className="timeline-dot-wrap">
            <span className="timeline-dot" style={{ borderColor: typeColors[event.type || 'default'] }}>
              <span className="timeline-dot-inner" style={{ background: typeColors[event.type || 'default'] }} />
            </span>
            {i < events.length - 1 && <span className="timeline-line" />}
          </div>
          <div className="timeline-content">
            <div className="timeline-header">
              <Text className="timeline-title">{event.title}</Text>
              <Text className="timeline-time">{event.time}</Text>
            </div>
            {event.description && (
              <Text className="timeline-desc">{event.description}</Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
