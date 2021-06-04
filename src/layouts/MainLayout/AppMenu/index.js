import React, { useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Menu as MenuIcon } from '@material-ui/icons'
// import { Link } from 'react-router-dom'

import history from 'services/routerHistory'

import { StyledMenu, StyledMenuItem } from './styles'

const menuAnchorOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
}
const menuTransformOrigin = {
  vertical: -5,
  horizontal: 'right',
}

const LINKS = [
  { text: '+5b kills', to: '/preset/5b' },
  { text: '+10b kills', to: '/preset/10b' },
  // { text: '', to: '' },
  // { text: '', to: '' },
]

const MenuItem = ({ text, to, onClose }) => {
  const handleClick = useCallback(() => {
    onClose()
    history.push(to)
  }, [])

  return (
    <StyledMenuItem onClick={handleClick}>
      {text}
    </StyledMenuItem>
  )
}

const AppMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton edge='start' color='inherit' aria-label='app-menu' aria-haspopup='true' onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <StyledMenu
        id='app-menu'
        // keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={menuAnchorOrigin}
        transformOrigin={menuTransformOrigin}
        getContentAnchorEl={null}
      >
        <StyledMenuItem disabled>
          Filter Presets:
        </StyledMenuItem>
        {LINKS.map(({ text, to }) => (
          <MenuItem
            key={text}
            text={text}
            to={to}
            onClose={handleClose}
          />
        ))}
      </StyledMenu>
    </div>
  )
}

export default AppMenu
