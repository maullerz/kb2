import React from 'react'
import { Tooltip as MuiTooltip } from '@material-ui/core'

import { IconWrapper, TooltipText } from './styles'

const Icon = () => (
  <svg width='14' height='14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='7' cy='7' r='7' fill='#73778C' />
    <path d='M6.869 11.594a.766.766 0 100-1.532.766.766 0 000 1.532zM7.38 2.917h-.766a2.292 2.292 0 00-2.297 2.297v.255h1.02v-.255a1.276 1.276 0 011.277-1.276h.765a1.276 1.276 0 010 2.552H6.36v2.297h1.02V7.51a2.297 2.297 0 100-4.594z' fill='#fff' fillOpacity='.87' />
  </svg>
)

const Tooltip = ({ text }) => {
  return (
    <MuiTooltip
      arrow
      title={(
        <TooltipText>
          {text}
        </TooltipText>
      )}
    >
      <IconWrapper><Icon /></IconWrapper>
    </MuiTooltip>
  )
}

export default Tooltip
