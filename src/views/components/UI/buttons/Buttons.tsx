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

const RenderButton = ({
  type,
  size,
  shape,
  onClick,
  className,
  color,
  styles,
  danger,
  disabled,
  children,
}: BtnProps & { type: 'primary' | 'default' | 'link' }) => (
  <Button
    type={type}
    size={size}
    shape={shape}
    onClick={onClick}
    className={className}
    style={{ color: color, ...styles }}
    danger={danger}
    disabled={disabled ? true : false}
  >
    <span className={`${className}--label`}>{children}</span>
  </Button>
);

export function BtnPrimary(props: BtnProps) {
  return props.tooltip ? (
    <Tooltip title={props.tooltip}>
      <RenderButton type="primary" className="buttons__btn-primary" {...props} />
    </Tooltip>
  ) : (
    <RenderButton type="primary" className="buttons__btn-primary" {...props} />
  );
}

export function BtnDefault(props: BtnProps) {
  return props.tooltip ? (
    <Tooltip title={props.tooltip}>
      <RenderButton type="default" className="buttons__btn-default" {...props} />
    </Tooltip>
  ) : (
    <RenderButton type="default" className="buttons__btn-default" {...props} />
  );
}

export function BtnLink(props: BtnProps) {
  return props.tooltip ? (
    <Tooltip title={props.tooltip}>
      <RenderButton type="link" className="buttons__btn-link" {...props} />
    </Tooltip>
  ) : (
    <RenderButton type="link" className="buttons__btn-link" {...props} />
  );
}
