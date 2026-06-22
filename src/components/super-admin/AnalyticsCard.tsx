'use client';

import React from 'react';
import { Card, Typography, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './AnalyticsCard.css';

const { Text } = Typography;

interface AnalyticsCardProps {
  title: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  iconBg?: string;
  sparklineData?: number[];
  color?: string;
  prefix?: string;
  suffix?: string;
}

const MiniSparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  if (!data.length) return null;
  const w = 80;
  const h = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const px = (i: number) => (i / (data.length - 1)) * w;
  const py = (v: number) => h - ((v - min) / range) * h;
  const d = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i)},${py(v)}`).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="analytics-sparkline">
      <defs>
        <linearGradient id={`sparkGrad-${Math.random()}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#sparkGrad-${Math.random()})`} />
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  trend,
  trendLabel = 'vs last month',
  icon,
  iconBg,
  sparklineData,
  color = '#d4a853',
  prefix,
  suffix,
}) => {
  const isUp = trend !== undefined && trend >= 0;
  const trendColor = isUp ? '#10b981' : '#ef4444';

  return (
    <Card className="analytics-card" variant="borderless" style={{ '--card-accent': color } as React.CSSProperties}>
      <div className="analytics-card-inner">
        <div className="analytics-card-top">
          <div className="analytics-icon-wrap" style={{ background: iconBg || `${color}15` }}>
            {icon}
          </div>
          {sparklineData && <MiniSparkline data={sparklineData} color={color} />}
        </div>
        <div className="analytics-value-wrap">
          <Text className="analytics-value">
            {prefix}{value}{suffix}
          </Text>
        </div>
        <Text className="analytics-label">{title}</Text>
        {trend !== undefined && (
          <div className="analytics-trend">
            <Space size={4}>
              {isUp ? (
                <ArrowUpOutlined style={{ color: trendColor, fontSize: 12 }} />
              ) : (
                <ArrowDownOutlined style={{ color: trendColor, fontSize: 12 }} />
              )}
              <Text style={{ color: trendColor, fontSize: 13, fontWeight: 600 }}>
                {isUp ? '+' : ''}{trend}%
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>{trendLabel}</Text>
            </Space>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AnalyticsCard;
