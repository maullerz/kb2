import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'modules/entities/components/SummaryNavigation'
import Ads from 'components/Ads'

import FactionSummary from './FactionSummary'

const Faction = () => {
  const factionID = Number(useParams().factionID)
  const { killsType } = useParams()
  const isLosses = killsType === 'losses'
  const isKills = killsType === 'kills'
  const [stats, setStats] = useState(null)

  if (!factionID) {
    return <Redirect to='/' />
  }

  async function getFactionStats() {
    try {
      const { data } = await KillmailService.getStats({ factionID })
      setStats(data)
    } catch (e) {
      console.error('getFactionStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (factionID) {
      setStats(null)
      getFactionStats()
    }
  }, [factionID])

  return (
    <PageLayout>
      <Fragment key='ads'>
        <Ads type='list' />
      </Fragment>
      <Fragment key='head'>
        <FactionSummary stats={stats} />
        <SummaryNavigation root={`/faction/${factionID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable factionID={factionID} isLosses={isLosses} isKills={isKills} />
      </Fragment>
    </PageLayout>
  )
}

export default Faction
