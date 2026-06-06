'use client';

// avatar.tsx
import styles from './avatar.module.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

type TProps = {
  name: string;
};

const Avatar = (props: TProps) => {
  const firstChar = props.name ? props.name.charAt(0).toUpperCase() : '';
  const bgColor = getRandomColor();

  return (
    <div className={styles.avatar} style={{ backgroundColor: bgColor }}>
      {firstChar}
    </div>
  );
};

export default Avatar;
