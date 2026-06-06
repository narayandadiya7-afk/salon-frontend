'use client';

// CircularProgressBar.tsx
import React, { useEffect, useState } from 'react';

interface CircularProgressBarProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  textSize?: number;
  textColor?: string;
  onComplete?: () => void;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size = 150,
  strokeWidth = 10,
  progress = 0,
  color = '#3498db',
  backgroundColor = '#e0e0e0',
  showText = true,
  textSize = 20,
  textColor = '#000',
  onComplete,
}) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (progress === 100 && onComplete) {
      onComplete();
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [progress, onComplete]);

  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const circleStyle: React.CSSProperties = {
    fill: 'none',
    strokeWidth: `${strokeWidth}px`,
  };

  const progressStyle: React.CSSProperties = {
    ...circleStyle,
    stroke: color,
    strokeLinecap: 'round',
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
    strokeDasharray: `${circumference}`,
    strokeDashoffset: `${circumference - (progress / 100) * circumference}`,
    transition: 'stroke-dashoffset 0.5s ease-in-out',
  };

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: `${textSize}px`,
    color: textColor,
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{ ...circleStyle, stroke: backgroundColor }}
        />
        <circle cx={size / 2} cy={size / 2} r={radius} style={progressStyle} />
      </svg>
      {showText && !completed && (
        <div style={textStyle}>{progress}%</div>
      )}
    </div>
  );
};

export default CircularProgressBar;
