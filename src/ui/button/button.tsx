import React from 'react';
import cn from 'classnames';

import s from './button.module.css';

type Props = {
  title?: string;
  disabled?: boolean;
  className?: string;
  children: any;
  onClick: () => void;
  hasLoader?: boolean;
  type?: string;
};

export const Button: React.FC<Props> = ({
  type = 'button',
  hasLoader = false,
  disabled = false,
  className,
  title,
  onClick,
  children,
}: Props): React.ReactElement => (
  <button className={cn(s.button, className)} disabled={disabled} onClick={onClick} title={title} aria-label={title}>
    {hasLoader ? (
      <svg width={15} height={15} version="1.1" x="0" y="0" className={s.loader} viewBox="0 0 100 100">
        <circle className={s.circle} cx="50" cy="50" r="44" />
      </svg>
    ) : (
      children
    )}
  </button>
);
