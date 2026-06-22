'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import './StatCard.css';

const { Text } = Typography;

interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color = '#d4a853' }) => {
  return (
    <Card className="super-stat-card" variant="borderless">
      <div className="super-stat-card-inner">
        <div className="super-stat-card-icon" style={{ color }}>
          {icon}
        </div>
        <div className="super-stat-card-info">
          <Text className="super-stat-card-value">{value}</Text>
          <Text className="super-stat-card-label">{label}</Text>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
