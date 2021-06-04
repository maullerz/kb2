import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'components/SummaryNavigation'

import ConstellationSummary from './ConstellationSummary'

const Constellation = () => {
  const constellationID = Number(useParams().constellationID)
  const [stats, setStats] = useState(null)

  // console.log('constellationID:', constellationID)

  if (!constellationID) {
    return <Redirect to='/' />
  }

  async function getConstellationStats() {
    try {
      const { data } = await KillmailService.getStats({ constellationID })
      setStats(data)
    } catch (e) {
      console.error('getConstellationStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (constellationID) {
      setStats(null)
      getConstellationStats()
    }
  }, [constellationID])

  return (
    <PageLayout>
      <Fragment key='head'>
        <ConstellationSummary stats={stats} />
        <SummaryNavigation />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable constellationID={constellationID} />
      </Fragment>
    </PageLayout>
  )
}

export default Constellation
