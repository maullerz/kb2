import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'components/SummaryNavigation'

import AllianceSummary from './AllianceSummary'

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
      const { data } = await KillmailService.getStats({ allyID })
      setStats(data)
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
      <Fragment key='head'>
        <AllianceSummary stats={stats} />
        <SummaryNavigation root={`/alliance/${allyID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable allyID={allyID} isLosses={isLosses} isKills={isKills} />
      </Fragment>
    </PageLayout>
  )
}

export default Alliance
