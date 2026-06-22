'use client';

import React from 'react';
import './DonutChart.css';

interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  size?: number;
  innerRadius?: number;
  centerText?: string;
  centerSubtext?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  innerRadius = 65,
  centerText,
  centerSubtext,
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = size / 2;
  const strokeWidth = radius - innerRadius;
  const circumference = 2 * Math.PI * innerRadius;

  let cumulative = 0;

  const segments = data.map((d, i) => {
    const percentage = d.value / total;
    const offset = cumulative * circumference;
    const length = percentage * circumference;
    cumulative += percentage;
    const rotation = -90 + (i === 0 ? 0 : data.slice(0, i).reduce((s, x) => s + (x.value / total) * 360, 0));

    return (
      <circle
        key={i}
        cx={radius}
        cy={radius}
        r={innerRadius}
        fill="none"
        stroke={d.color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${length} ${circumference - length}`}
        strokeDashoffset={-offset}
        transform={`rotate(${rotation} ${radius} ${radius})`}
        className="donut-segment"
      />
    );
  });

  return (
    <div className="super-donut-chart">
      <svg viewBox={`0 0 ${size} ${size}`} className="donut-chart-svg">
        <circle cx={radius} cy={radius} r={innerRadius} fill="none" stroke="var(--theme-border)" strokeWidth={strokeWidth} opacity={0.3} />
        {segments}
        {centerText && (
          <text x={radius} y={radius - (centerSubtext ? 8 : 0)} textAnchor="middle" fill="var(--theme-text)" fontSize={22} fontWeight={700} fontFamily="var(--font-mono, monospace)">
            {centerText}
          </text>
        )}
        {centerSubtext && (
          <text x={radius} y={radius + 16} textAnchor="middle" fill="var(--theme-text-secondary)" fontSize={12}>
            {centerSubtext}
          </text>
        )}
      </svg>
      <div className="donut-legend">
        {data.map((d, i) => (
          <div key={i} className="donut-legend-item">
            <span className="donut-legend-dot" style={{ background: d.color }} />
            <span className="donut-legend-label">{d.label}</span>
            <span className="donut-legend-value">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
