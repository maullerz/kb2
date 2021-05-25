import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import CorporationSummary from './CorporationSummary'

const Corporation = () => {
  const corpID = Number(useParams().corpID)
  const [stats, setStats] = useState(null)

  if (!corpID) {
    return <Redirect to='/' />
  }

  async function getCorporationStats() {
    try {
      const { data } = await KillmailService.getStats({ corpID })
      setStats(data)
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

  if (!stats) {
    return null
  }

  return (
    <PageLayout>
      <Fragment key='head'>
        <CorporationSummary stats={stats} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable corpID={corpID} />
      </Fragment>
    </PageLayout>
  )
}

export default Corporation
