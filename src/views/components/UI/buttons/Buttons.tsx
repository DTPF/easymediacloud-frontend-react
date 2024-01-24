import { Button } from 'antd'
import React from 'react'
import './buttons.scss'

type BtnProps = {
  children: React.ReactNode
  size?: 'small' | 'middle' | 'large'
  shape?: 'circle' | 'round'
  color?: string
  onClick?: () => void,
}

export function BtnPrimary({ children, size = 'middle', shape, color, onClick }: BtnProps) {
  return (
    <Button
      type='primary'
      size={size}
      shape={shape}
      onClick={onClick}
      className='buttons__btn-primary'
      style={{ color: color }}
    >
      <span className='buttons__btn-primary--label'>{children}</span>
    </Button>
  )
}

export function BtnDefault({ children, size = 'middle', shape, color, onClick }: BtnProps) {
  return (
    <Button
      type='default'
      size={size}
      shape={shape}
      onClick={onClick}
      className='buttons__btn-default'
      style={{ color: color }}
    >
     <span className='buttons__btn-default--label'>{children}</span>
    </Button>
  )
}

export function BtnLink({ children, size = 'middle', shape, color, onClick }: BtnProps) {
  return (
    <Button
      type='link'
      size={size}
      shape={shape}
      onClick={onClick}
      className='buttons__btn-link'
      style={{ color: color }}
    >
       <span className='buttons__btn-link--label'>{children}</span>
    </Button>
  )
}