'use client';

import React, { useEffect } from 'react';

type WindowResizeProps = {
  onResize: () => void;
};

const WindowResize: React.FC<WindowResizeProps> = ({ onResize }) => {
  useEffect(() => {
    const handleResize = () => {
      onResize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onResize]);

  return null;
};

export default WindowResize;
