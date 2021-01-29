import React from 'react'
import { useLocation } from 'react-router-dom'

import { Root, Title, Descr, StyledIcon } from './styles'

const NoContent = ({ title, descr, customIcon, className, iconSize, iconOpacity }) => {
  const location = useLocation()
  const tab = location.pathname.split('/').reverse()[0]
  const icon = tab === 'projects' ? 'details' : tab

  return (
    <Root className={className}>
      <StyledIcon icon={customIcon || icon} size={iconSize} opacity={iconOpacity} noWrapper custom={!!customIcon} />
      <Title>{title}</Title>
      <Descr>{descr}</Descr>
    </Root>
  )
}

export default NoContent
