import React from 'react'
import { NavLink } from 'react-router-dom'

import { Root } from './styles'

const activeStyle = {
  color: 'white',
  // textDecoration: 'underline',
}

const SummaryNavigation = ({ root }) => {
  if (!root) return <Root />

  return (
    <Root>
      <NavLink to={`${root}`} exact activeStyle={activeStyle}>
        Overview
      </NavLink>
      <NavLink to={`${root}/kills`} activeStyle={activeStyle}>
        Kills
      </NavLink>
      <NavLink to={`${root}/losses`} activeStyle={activeStyle}>
        Losses
      </NavLink>
    </Root>
  )
}

export default SummaryNavigation
