'use client';

/*
 * hoverToggle.tsx
 * Hover toggle section - commonly used throughout the application
 */
import classNames from 'classnames';
import { useState, useEffect, useRef, ReactNode, HTMLAttributes } from 'react';
import styles from './hoverToggle.module.css';

type HoverToggleProps = {
  children?: ReactNode;
  className?: string;
  position?: string;
  isHover?: boolean;
  profile?: boolean;
  trigger?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const HoverToggle = (props: HoverToggleProps) => {
  const {
    children,
    className,
    position = 'bottom',
    isHover = true,
    profile,
    trigger,
  } = props;

  const [isHidden, setIsHidden] = useState(true);
  const myDivRef = useRef<HTMLDivElement>(null);
  const hiddenDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (isHidden && hiddenDivRef.current) {
        const s = hiddenDivRef.current.style;
        s.display = 'block';
        s.color = 'black';
        s.backgroundColor = 'white';
        s.position = 'absolute';
        s.borderRadius = '0.2rem';
        s.zIndex = '2';
      }
    };

    const handleMouseLeave = () => {
      if (isHidden && hiddenDivRef.current) {
        hiddenDivRef.current.style.display = 'none';
      }
    };

    const handleClick = () => {
      setIsHidden((prev) => !prev);
      if (hiddenDivRef.current) {
        hiddenDivRef.current.style.display = isHidden ? 'block' : 'none';
        hiddenDivRef.current.style.color = 'black';
        hiddenDivRef.current.style.backgroundColor = 'white';
        hiddenDivRef.current.style.position = 'absolute';
        hiddenDivRef.current.style.borderRadius = '0.2rem';
        hiddenDivRef.current.style.zIndex = '2';
      }
    };

    const handleBodyClick = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        setIsHidden(true);
        if (hiddenDivRef.current) {
          hiddenDivRef.current.style.display = 'none';
        }
      }
    };

    const el = myDivRef.current;
    if (isHover) {
      el?.addEventListener('mouseenter', handleMouseEnter);
      el?.addEventListener('mouseleave', handleMouseLeave);
    }
    el?.addEventListener('click', handleClick);
    document.body.addEventListener('click', handleBodyClick);

    return () => {
      el?.removeEventListener('mouseenter', handleMouseEnter);
      el?.removeEventListener('mouseleave', handleMouseLeave);
      el?.removeEventListener('click', handleClick);
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [isHidden, isHover]);

  return (
    <div className="relative">
      <span ref={myDivRef} className={profile ? 'profile' : 'myDIV'}>
        {trigger}
      </span>
      <div
        ref={hiddenDivRef}
        className={classNames(styles.hide, className, styles[position])}
      >
        {children}
      </div>
    </div>
  );
};

export default HoverToggle;
