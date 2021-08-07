import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'modules/entities/components/SummaryNavigation'
import TopStats from 'modules/entities/components/TopStats'
import Ads from 'components/Ads'

import AllianceSummary from './AllianceSummary'

const statsOrder = ['corps', 'chars', 'ships', 'systems']

const Alliance = () => {
  const allyID = Number(useParams().allyID)
  const { killsType } = useParams()
  const isLosses = killsType === 'losses'
  const isKills = killsType === 'kills'
  const [stats, setStats] = useState(null)

  if (!allyID) {
    return <Redirect to='/' />
  }

  async function getAllianceStats() {
    try {
      const [infoStats, monthlyStats] = await Promise.all([
        await KillmailService.getStats({ allyID }),
        await KillmailService.getStatsMonthly({ allyID }),
      ])
      const { data: info } = infoStats
      const { data: monthly } = monthlyStats
      setStats({ info, monthly })
    } catch (e) {
      console.error('getAllianceStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (allyID) {
      setStats(null)
      getAllianceStats()
    }
  }, [allyID])

  return (
    <PageLayout>
      <Fragment key='ads'>
        <Ads type='list' />
      </Fragment>

      <Fragment key='head'>
        <AllianceSummary stats={stats?.info} />
        <SummaryNavigation root={`/alliance/${allyID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable allyID={allyID} isLosses={isLosses} isKills={isKills} />
      </Fragment>
      {stats && stats.monthly &&
        <Fragment key='stats'>
          {statsOrder.map(key => {
            const data = stats.monthly[key]
            if (!data) return null
            return (
              <TopStats key={key} type={key} data={stats.monthly[key]} />
            )
          })}
        </Fragment>
      }
    </PageLayout>
  )
}

export default Alliance
