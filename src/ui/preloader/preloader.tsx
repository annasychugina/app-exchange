import React from 'react';
import s from './preloader.module.css';

export const Preloader: React.FC = () => {
  return (
    <svg version="1.1" x="0" y="0" className={s.svg} viewBox="0 0 100 100">
      <circle className={s.circle} cx="50" cy="50" r="44" />
    </svg>
  );
};
