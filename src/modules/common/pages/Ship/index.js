import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

// import KillmailService from 'api/KillmailService'
import * as SdeUtils from 'utils/SdeUtils'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import ShipSummary from './ShipSummary'

const Ship = () => {
  const shipID = Number(useParams().shipID)
  const [stats, setStats] = useState(null)

  // console.log('SHIP:', shipID)

  if (!shipID) {
    return <Redirect to='/' />
  }

  async function getShipStats() {
    try {
      // const { data } = await KillmailService.getStats({ shipID })
      const typeInfo = SdeUtils.getTypeInfo(shipID)
      const data = {
        ...typeInfo,
        id: shipID,
        groupName: SdeUtils.getGroupName(shipID),
      }
      setStats(data)
    } catch (e) {
      console.error('getShipStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (shipID) {
      setStats(null)
      getShipStats()
    }
  }, [shipID])

  return (
    <PageLayout>
      <Fragment key='head'>
        <ShipSummary stats={stats} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable shipID={shipID} />
      </Fragment>
    </PageLayout>
  )
}

export default Ship
