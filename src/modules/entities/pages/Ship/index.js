import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import * as SdeUtils from 'utils/SdeUtils'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'modules/entities/components/SummaryNavigation'
import TopStats from 'modules/entities/components/TopStats'

import ShipSummary from './ShipSummary'

const Ship = () => {
  const shipID = Number(useParams().shipID)
  const { killsType } = useParams()
  const isLosses = killsType === 'losses'
  const isKills = killsType === 'kills'
  const [info, setInfo] = useState(null)
  const [stats, setStats] = useState(null)

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
      setInfo(data)
      const { data: monthly } = await KillmailService.getStatsMonthly({ shipID })
      setStats(monthly)
    } catch (e) {
      console.error('getShipStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (shipID) {
      setInfo(null)
      setStats(null)
      getShipStats()
    }
  }, [shipID])

  return (
    <PageLayout>
      <Fragment key='head'>
        <ShipSummary stats={info} />
        <SummaryNavigation root={`/ship/${shipID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable shipID={shipID} isLosses={isLosses} isKills={isKills} />
      </Fragment>
      {stats &&
        <Fragment key='stats'>
          {Object.keys(stats).map(key => (
            <TopStats
              forShip
              key={key}
              type={key}
              data={stats[key]}
            />
          ))}
        </Fragment>
      }
    </PageLayout>
  )
}

export default Ship
