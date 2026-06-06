'use client';

import React, { FC, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import style from './reset.module.css';
import Text from '../../context/language-context';

interface FilterResetComponentProps {
  onResetFilters: () => void;
  venueDetails?: boolean;
  text?: string[];
  TextToHover?: string;
}

const FilterResetComponent: FC<FilterResetComponentProps> = ({
  onResetFilters,
  venueDetails = false,
  text = [],
  TextToHover = '',
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleResetClick = () => {
    onResetFilters();
  };

  return (
    <div className={style.tooltipContainer}>
      {venueDetails ? (
        <div>{TextToHover}...</div>
      ) : (
        <div>
          <ReloadOutlined
            className={style.resetIcon}
            onClick={handleResetClick}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          />
        </div>
      )}
      {isTooltipVisible && !venueDetails && (
        <div className={style.tooltipText}>
          {Text({ tid: 'Reset', def: 'Reset' })}
        </div>
      )}
      {venueDetails && (
        <div className={style.tooltipText1}>
          {text.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterResetComponent;
