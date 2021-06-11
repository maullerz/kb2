import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

// import KillmailService from 'api/KillmailService'
import * as SdeUtils from 'utils/SdeUtils'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'modules/entities/components/SummaryNavigation'

import GroupSummary from './GroupSummary'

const Group = () => {
  const shipID = Number(useParams().shipID)
  const { killsType } = useParams()
  const isLosses = killsType === 'losses'
  const isKills = killsType === 'kills'
  const [stats, setStats] = useState(null)

  if (!shipID) {
    return <Redirect to='/' />
  }

  async function getGroupStats() {
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
      console.error('getGroupStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (shipID) {
      setStats(null)
      getGroupStats()
    }
  }, [shipID])

  return (
    <PageLayout>
      <Fragment key='head'>
        <GroupSummary stats={stats} />
        <SummaryNavigation root={`/ship/${shipID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable shipID={shipID} isLosses={isLosses} isKills={isKills} />
      </Fragment>
    </PageLayout>
  )
}

export default Group
