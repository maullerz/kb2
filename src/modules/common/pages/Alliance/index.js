import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import AllianceSummary from './AllianceSummary'

const Alliance = () => {
  const allyID = Number(useParams().allyID)
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

  if (!stats) {
    return null
  }

  return (
    <PageLayout>
      <Fragment key='head'>
        <AllianceSummary stats={stats} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable allyID={allyID} />
      </Fragment>
    </PageLayout>
  )
}

export default Alliance