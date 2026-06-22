'use client';

import React from 'react';
import { Card, Switch, Typography, Tag, Space } from 'antd';
import './ToggleCard.css';

const { Text } = Typography;

interface ToggleCardProps {
  title: string;
  description: string;
  category?: string;
  enabled: boolean;
  onChange?: (checked: boolean) => void;
  enabledCount?: number;
  totalCount?: number;
  color?: string;
}

const ToggleCard: React.FC<ToggleCardProps> = ({
  title,
  description,
  category,
  enabled,
  onChange,
  enabledCount,
  totalCount,
  color = '#d4a853',
}) => {
  return (
    <Card className="super-toggle-card" variant="borderless" style={{ '--toggle-color': color } as React.CSSProperties}>
      <div className="toggle-card-inner">
        <div className="toggle-card-info">
          <div className="toggle-card-top">
            <Text className="toggle-card-title">{title}</Text>
            <Switch checked={enabled} onChange={onChange} className="toggle-card-switch" />
          </div>
          <Text className="toggle-card-desc">{description}</Text>
          <Space size={6} className="toggle-card-meta">
            {category && (
              <Tag className="toggle-card-category" color="default">{category}</Tag>
            )}
            {enabledCount !== undefined && totalCount !== undefined && (
              <Text className="toggle-card-count">
                {enabledCount} of {totalCount} tenants
              </Text>
            )}
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default ToggleCard;
