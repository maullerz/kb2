import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton, Container, Fab, Zoom, useScrollTrigger } from '@material-ui/core'
import { Menu as MenuIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons'
import { useTheme, makeStyles } from '@material-ui/core/styles'

import Footer from 'modules/common/components/Footer'

// Wrapper, Workspace,
import { Main, Content } from './styles'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

function ScrollTop(props) {
  const { children } = props
  const classes = useStyles()
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    // target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

const darkStyle = { background: '#1B1C21' }

const MainLayout = props => {
  const theme = useTheme()
  const { children } = props

  return (
    <Main className={cx(theme.light && 'light-theme')}>

      <AppBar position='static' style={darkStyle}>
        <Container maxWidth='lg' disableGutters>

          <Toolbar variant='dense' id='back-to-top-anchor'>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Link to='/'>
              <Typography variant='h6' color='inherit'>
                EveTools Killboard (Alpha)
              </Typography>
            </Link>
          </Toolbar>

        </Container>
      </AppBar>

      <Container maxWidth='lg' disableGutters>

        <Container maxWidth='xl' disableGutters style={{ background: 'var(--mainLayoutWorkspaceBackground)' }}>
          <Content>
            {children}
          </Content>
        </Container>

      </Container>

      <Container maxWidth='lg' disableGutters>
        <Footer />
      </Container>

      <ScrollTop {...props}>
        <Fab color='primary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Main>
  )
}

export default MainLayout
