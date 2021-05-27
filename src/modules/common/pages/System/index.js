import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import SystemSummary from './SystemSummary'
// import { HeaderPanel, Title } from './styles'

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

  if (!stats) {
    return null
  }

  return (
    <PageLayout>
      <Fragment key='head'>
        <SystemSummary stats={stats} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable systemID={systemID} />
      </Fragment>
    </PageLayout>
  )
}

export default System
