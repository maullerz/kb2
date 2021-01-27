import React from 'react'
import cx from 'classnames'
import { AppBar, Toolbar, Typography, IconButton, Container, Card, Fab, Zoom, useScrollTrigger } from '@material-ui/core'
import { Menu as MenuIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons'
import { useTheme, makeStyles } from '@material-ui/core/styles'

import { Main, Wrapper, Workspace, Content } from './styles'

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

const MainLayout = props => {
  const theme = useTheme()
  const { children } = props

  return (
    <Main className={cx(theme.light && 'light-theme')}>

      <AppBar position='static' style={{ background: '#1B1C21' }}>
        <Container maxWidth='lg' disableGutters>

          <Toolbar variant='dense' id='back-to-top-anchor'>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              EveTools Killboard
            </Typography>
          </Toolbar>

        </Container>
      </AppBar>

      <Container maxWidth='lg' disableGutters>

        {false && (
          <>
            <Container maxWidth='lg'>
              <Card elevation={3}>
                <Typography component='div' style={{ height: '30vh' }}>Dat is Container</Typography>
              </Card>
            </Container>

            <Container maxWidth='xl'>
              <Typography component='div' style={{ backgroundColor: '#888', height: '30vh' }}>Dat is Container</Typography>
            </Container>
          </>
        )}

        <Container maxWidth='xl' disableGutters style={{ background: 'var(--mainLayoutWorkspaceBackground)' }}>
          <Content>
            {children}
          </Content>
        </Container>

        {false && (
          <Wrapper>
            <Workspace>
              {/* <Header /> */}
              <Content>
                {children}
              </Content>
            </Workspace>
          </Wrapper>
        )}
      </Container>

      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Main>
  )
}

export default MainLayout
