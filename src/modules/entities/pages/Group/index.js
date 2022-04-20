import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

import KillmailService from 'api/KillmailService'
import * as SdeUtils from 'utils/SdeUtils'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'modules/entities/components/SummaryNavigation'
import TopStats from 'modules/entities/components/TopStats'
import Ads from 'components/Ads'

import GroupSummary from './GroupSummary'

const Group = () => {
  const groupID = Number(useParams().groupID)
  const { killsType } = useParams()
  const isLosses = killsType === 'losses'
  const isKills = killsType === 'kills'
  const [info, setInfo] = useState(null)
  const [stats, setStats] = useState(null)

  if (!groupID) {
    return <Redirect to='/' />
  }

  async function getGroupStats() {
    try {
      // const { data } = await KillmailService.getStats({ groupID })
      const data = SdeUtils.getShipGroupInfo(groupID)
      // console.json('group data:', data)

      // Abyssal Hazards
      if (groupID === 1971) {
        // only 47465 - Unstable Abyssal Depths applicable
        data.types = [{ id: '47465', name: 'Unstable Abyssal Depths' }]
      }

      setInfo(data)
      const { data: monthly } = await KillmailService.getStatsMonthly({ groupID })
      setStats(monthly)
      ReactTooltip.rebuild()
    } catch (e) {
      console.error('getGroupStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (groupID) {
      setInfo(null)
      setStats(null)
      getGroupStats()
    }

    return () => {
      ReactTooltip.hide()
    }
  }, [groupID])

  return (
    <PageLayout>
      <Fragment key='ads'>
        <Ads type='group' />
      </Fragment>
      <Fragment key='head'>
        <GroupSummary stats={info} />
        <SummaryNavigation root={`/group/${groupID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable groupID={groupID} isLosses={isLosses} isKills={isKills} />
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

export default Group
