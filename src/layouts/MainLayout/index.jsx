import React from 'react'
import cx from 'classnames'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { useTheme } from '@material-ui/core/styles'

// import AlertsDashboard from 'notifications/components/AlertsDashboard';
// import NotificationsDashboard from 'notifications/components/NotificationsDashboard';

// import Sidebar from './Sidebar';
// import Header from './Header';

import { Main, Wrapper, Workspace, Content } from './styles'

const MainLayout = ({ children }) => {
  const theme = useTheme()

  return (
    <Main className={cx(theme.light && 'light-theme')}>
      <Wrapper>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              EveTools Killboard (ETKB)
            </Typography>
          </Toolbar>
        </AppBar>

        <Workspace>
          {/* <Header /> */}
          <Content>
            {children}
          </Content>
        </Workspace>
      </Wrapper>

      {/* <NotificationsDashboard /> */}
      {/* <AlertsDashboard /> */}
    </Main>
  )
}

export default MainLayout
