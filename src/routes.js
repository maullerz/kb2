import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MainLayout from 'layouts/MainLayout'
import Home from 'modules/common/pages/Home'
import Killmail from 'modules/common/pages/Killmail'

// import Orders from 'modules/market/pages/Orders'
// import CallbackRoute from 'modules/market/pages/CallbackRoute'

// const Home = () => (
//   <div>
//     <br />
//     <br />
//     <h1>Home Stub</h1>
//     <br />
//     <br />
//   </div>
// )

const MainRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/kill/:killmailID' component={Killmail} exact />
        {/*
        <Route path='/orders' component={Orders} />
        <Route path='/callback' component={CallbackRoute} />
        */}
        <Redirect from='*' to='/' />
      </Switch>
    </MainLayout>
  )
}

export default MainRoutes
