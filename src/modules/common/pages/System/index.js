import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'components/SummaryNavigation'

import SystemSummary from './SystemSummary'

const System = () => {
  const systemID = Number(useParams().systemID)
  const [stats, setStats] = useState(null)

  // console.log('SYSTEM:', systemID)

  if (!systemID) {
    return <Redirect to='/' />
  }

  async function getSystemStats() {
    try {
      const { data } = await KillmailService.getStats({ systemID })
      setStats(data)
    } catch (e) {
      console.error('getSystemStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (systemID) {
      setStats(null)
      getSystemStats()
    }
  }, [systemID])

  return (
    <PageLayout>
      <Fragment key='head'>
        <SystemSummary stats={stats} />
        <SummaryNavigation />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable systemID={systemID} />
      </Fragment>
    </PageLayout>
  )
}

export default System
