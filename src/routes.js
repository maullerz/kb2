import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MainLayout from 'layouts/MainLayout'
// import Home from 'modules/common/pages/Home'
import Killmail from 'modules/common/pages/Killmail'

const Home = () => (
  <div>
    <br />
    <br />
    <h1>Home Stub</h1>
    <br />
    <br />
  </div>
)

const MainRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/kill/:killmailID' component={Killmail} exact />
        <Redirect from='*' to='/' />
      </Switch>
    </MainLayout>
  )
}

export default MainRoutes
