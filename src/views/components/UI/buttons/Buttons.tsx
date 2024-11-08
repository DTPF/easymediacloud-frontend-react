import { Button } from 'antd';
import React from 'react';
import './buttons.scss';
import Tooltip from '../tooltip/Tooltip';

type BtnProps = {
  children: React.ReactNode;
  size?: 'small' | 'middle' | 'large';
  shape?: 'circle' | 'round' | 'default';
  color?: string;
  onClick?: () => void;
  danger?: boolean;
  styles?: React.CSSProperties;
  className?: string;
  tooltip?: string;
  disabled?: boolean | undefined;
};

export function BtnPrimary({
  children,
  size = 'middle',
  shape,
  color,
  onClick,
  danger = false,
  styles,
  className,
  tooltip = '',
  disabled = false,
  ...props
}: BtnProps) {
  return (
    <Tooltip title={tooltip}>
      <Button
        type="primary"
        size={size}
        shape={shape}
        onClick={onClick}
        className={`buttons__btn-primary ${className}`}
        style={{ color: color, ...styles }}
        danger={danger}
        disabled={disabled ? true : false}
        {...props}
      >
        <span className="buttons__btn-primary--label">{children}</span>
      </Button>
    </Tooltip>
  );
}

export function BtnDefault({
  children,
  size = 'middle',
  shape,
  color,
  onClick,
  danger = false,
  styles,
  className,
  tooltip = '',
  disabled = false,
  ...props
}: BtnProps) {
  return (
    <Tooltip title={tooltip}>
      <Button
        type="default"
        size={size}
        shape={shape}
        onClick={onClick}
        className={`buttons__btn-default ${className}`}
        style={{ color: color, ...styles }}
        danger={danger}
        disabled={disabled ? true : false}
        {...props}
      >
        <span className="buttons__btn-default--label">{children}</span>
      </Button>
    </Tooltip>
  );
}

export function BtnLink({
  children,
  size = 'middle',
  shape,
  color,
  onClick,
  danger = false,
  styles,
  className,
  tooltip = '',
  disabled = false,
  ...props
}: BtnProps) {
  return (
    <Tooltip title={tooltip}>
      <Button
        type="link"
        size={size}
        shape={shape}
        onClick={onClick}
        className={`buttons__btn-link ${className}`}
        style={{ color: color, ...styles }}
        danger={danger}
        disabled={disabled ? true : false}
        {...props}
      >
        <span className="buttons__btn-link--label">{children}</span>
      </Button>
    </Tooltip>
  );
}
