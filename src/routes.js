import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MainLayout from 'layouts/MainLayout'
import Help from 'modules/common/pages/Help'

const MainRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path='/help' component={Help} />
        <Redirect from='*' to='/help' />
      </Switch>
    </MainLayout>
  )
}

export default MainRoutes
