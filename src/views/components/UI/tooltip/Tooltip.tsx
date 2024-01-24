import { Tooltip as TooltipAntd } from 'antd'
import React, { memo } from 'react'
import { bgLight } from 'scss/_variables'
import './tooltip.scss'

type Props = {
  title: string
  children: React.ReactNode
}

function Tooltip({ title, children }: Props) {
  return (
    <div className='tooltip-antd'>
      <TooltipAntd
        title={<div className='tooltip-antd__title'>{title}</div>}
        color={bgLight}
        key={title}
        className='tooltip-antd__tooltip'
      >
        {children}
      </TooltipAntd>
    </div>
  )
}

export default memo(Tooltip)