'use client';

import React from 'react';
import './AreaChart.css';

interface DataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
  gradientId?: string;
  showGrid?: boolean;
  showAxis?: boolean;
  formatValue?: (value: number) => string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  height = 200,
  color = '#d4a853',
  gradientId = 'areaGradient',
  showGrid = true,
  showAxis = true,
  formatValue = (v) => v.toLocaleString(),
}) => {
  if (!data.length) return null;

  const width = 600;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const range = maxVal - minVal || 1;

  const xScale = (i: number) => padding.left + (i / (data.length - 1)) * chartWidth;
  const yScale = (v: number) => padding.top + chartHeight - ((v - minVal) / range) * chartHeight;

  const points = data.map((d, i) => `${xScale(i)},${yScale(d.value)}`).join(' ');

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.value)}`).join(' ');
  const areaPath = `${linePath} L${xScale(data.length - 1)},${padding.top + chartHeight} L${xScale(0)},${padding.top + chartHeight} Z`;

  const gridLines = showGrid
    ? Array.from({ length: 5 }, (_, i) => {
        const y = padding.top + (chartHeight / 4) * i;
        return <line key={i} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--theme-border)" strokeWidth={1} strokeDasharray="4 4" opacity={0.5} />;
      })
    : null;

  const yLabels = showGrid
    ? Array.from({ length: 5 }, (_, i) => {
        const val = maxVal - (range / 4) * i;
        const y = padding.top + (chartHeight / 4) * i;
        return (
          <text key={i} x={padding.left - 8} y={y + 4} textAnchor="end" fill="var(--theme-text-secondary)" fontSize={11}>
            {formatValue(Math.round(val))}
          </text>
        );
      })
    : null;

  return (
    <div className="super-area-chart">
      <svg viewBox={`0 0 ${width} ${height}`} className="area-chart-svg">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>

        {gridLines}
        {yLabels}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {data.map((d, i) => (
          <g key={i}>
            <circle cx={xScale(i)} cy={yScale(d.value)} r={3.5} fill={color} stroke="var(--theme-surface)" strokeWidth={2} className="area-chart-dot" />
            <title>{d.label}: {formatValue(d.value)}</title>
          </g>
        ))}

        {showAxis && data.map((d, i) => (
          <text key={i} x={xScale(i)} y={height - 6} textAnchor="middle" fill="var(--theme-text-secondary)" fontSize={10}>
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default AreaChart;
