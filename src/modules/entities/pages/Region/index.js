import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'modules/entities/components/SummaryNavigation'
import Ads from 'components/Ads'

import RegionSummary from './RegionSummary'
// import { HeaderPanel, Title } from './styles'

const Region = () => {
  const regionID = Number(useParams().regionID)
  const [stats, setStats] = useState(null)

  // console.log('regionID:', regionID)

  if (!regionID) {
    return <Redirect to='/' />
  }

  async function getRegionStats() {
    try {
      const { data } = await KillmailService.getStats({ regionID })
      setStats(data)
    } catch (e) {
      console.error('getRegionStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (regionID) {
      setStats(null)
      getRegionStats()
    }
  }, [regionID])

  return (
    <PageLayout>
      <Fragment key='ads'>
        <Ads type='list' />
      </Fragment>
      <Fragment key='head'>
        <RegionSummary stats={stats} />
        <SummaryNavigation />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable regionID={regionID} />
      </Fragment>
    </PageLayout>
  )
}

export default Region
