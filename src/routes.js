import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MainLayout from 'layouts/MainLayout'
import Home from 'modules/common/pages/Home'
import Killmail from 'modules/common/pages/Killmail'

import System from 'modules/entities/pages/System'
import Constellation from 'modules/entities/pages/Constellation'
import Region from 'modules/entities/pages/Region'
import Character from 'modules/entities/pages/Character'
import Corporation from 'modules/entities/pages/Corporation'
import Faction from 'modules/entities/pages/Faction'
import Alliance from 'modules/entities/pages/Alliance'
import Ship from 'modules/entities/pages/Ship'
import Group from 'modules/entities/pages/Group'

import Preset from 'modules/entities/pages/Preset'

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
        <Route path='/system/:systemID' component={System} exact />
        <Route path='/constellation/:constellationID' component={Constellation} exact />
        <Route path='/region/:regionID' component={Region} exact />

        <Route path='/character/:charID' component={Character} exact />
        <Route path='/character/:charID/:killsType' component={Character} exact />
        <Route path='/corporation/:corpID' component={Corporation} exact />
        <Route path='/corporation/:corpID/:killsType' component={Corporation} exact />
        <Route path='/alliance/:allyID' component={Alliance} exact />
        <Route path='/alliance/:allyID/:killsType' component={Alliance} exact />
        <Route path='/faction/:factionID' component={Faction} exact />
        <Route path='/faction/:factionID/:killsType' component={Faction} exact />

        <Route path='/ship/:shipID' component={Ship} exact />
        <Route path='/ship/:shipID/:killsType' component={Ship} exact />
        <Route path='/group/:groupID' component={Group} exact />
        <Route path='/group/:groupID/:killsType' component={Group} exact />

        <Route path='/preset/:type' component={Preset} exact />

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
