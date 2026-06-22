'use client';

import React from 'react';
import './BarChart.css';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  height?: number;
  barWidth?: number;
  showAxis?: boolean;
  formatValue?: (value: number) => string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  barWidth = 32,
  showAxis = true,
  formatValue = (v) => v.toLocaleString(),
}) => {
  if (!data.length) return null;

  const width = data.length * (barWidth + 16) + 60;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.value));
  const gradientId = 'barGradient';

  const bars = data.map((d, i) => {
    const barH = (d.value / maxVal) * chartHeight;
    const x = padding.left + i * (barWidth + 16) + (chartWidth - data.length * (barWidth + 16)) / 2;
    const y = padding.top + chartHeight - barH;
    const color = d.color || '#d4a853';

    return (
      <g key={i}>
        <defs>
          <linearGradient id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={1} />
            <stop offset="100%" stopColor={color} stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <rect
          x={x}
          y={y}
          width={barWidth}
          height={barH}
          rx={barWidth / 2}
          ry={barWidth / 2}
          fill={`url(#barGrad${i})`}
          className="bar-chart-bar"
        />
        <title>{d.label}: {formatValue(d.value)}</title>
        {showAxis && (
          <>
            <text x={x + barWidth / 2} y={height - 6} textAnchor="middle" fill="var(--theme-text-secondary)" fontSize={10}>
              {d.label}
            </text>
            <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fill="var(--theme-text)" fontSize={10} fontWeight={600}>
              {formatValue(d.value)}
            </text>
          </>
        )}
      </g>
    );
  });

  return (
    <div className="super-bar-chart">
      <svg viewBox={`0 0 ${width} ${height}`} className="bar-chart-svg">
        {Array.from({ length: 4 }, (_, i) => {
          const y = padding.top + (chartHeight / 3) * i;
          return (
            <line
              key={i}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="var(--theme-border)"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.5}
            />
          );
        })}
        {bars}
      </svg>
    </div>
  );
};

export default BarChart;
