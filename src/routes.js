import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MainLayout from 'layouts/MainLayout'
import Home from 'modules/common/pages/Home'

const MainRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path='/' component={Home} />
        <Redirect from='*' to='/' />
      </Switch>
    </MainLayout>
  )
}

export default MainRoutes
