import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'modules/entities/components/SummaryNavigation'
import TopStats from 'modules/entities/components/TopStats'
import Ads from 'components/Ads'

import CorporationSummary from './CorporationSummary'

const Corporation = () => {
  const corpID = Number(useParams().corpID)
  const { killsType } = useParams()
  const isLosses = killsType === 'losses'
  const isKills = killsType === 'kills'
  const [stats, setStats] = useState(null)

  if (!corpID) {
    return <Redirect to='/' />
  }

  async function getCorporationStats() {
    try {
      const [infoStats, monthlyStats] = await Promise.all([
        await KillmailService.getStats({ corpID }),
        await KillmailService.getStatsMonthly({ corpID }),
      ])
      const { data: info } = infoStats
      const { data: monthly } = monthlyStats
      setStats({ info, monthly })
    } catch (e) {
      console.error('getCorporationStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (corpID) {
      setStats(null)
      getCorporationStats()
    }
  }, [corpID])

  return (
    <PageLayout>
      <Fragment key='ads'>
        <Ads type='corp' />
      </Fragment>
      <Fragment key='head'>
        <CorporationSummary stats={stats?.info} />
        <SummaryNavigation root={`/corporation/${corpID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable corpID={corpID} isLosses={isLosses} isKills={isKills} />
      </Fragment>
      {stats && stats.monthly &&
        <Fragment key='stats'>
          {Object.keys(stats.monthly).map(key => (
            <TopStats key={key} type={key} data={stats.monthly[key]} />
          ))}
        </Fragment>
      }
    </PageLayout>
  )
}

export default Corporation
