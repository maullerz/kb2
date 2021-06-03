import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'components/SummaryNavigation'

import CharacterSummary from './CharacterSummary'

const Character = () => {
  const charID = Number(useParams().charID)
  const { killsType } = useParams()
  const isLosses = killsType === 'losses'
  const isKills = killsType === 'kills'
  const [stats, setStats] = useState(null)

  if (!charID) {
    return <Redirect to='/' />
  }

  async function getCharacterStats() {
    try {
      const { data } = await KillmailService.getStats({ charID })
      setStats(data)
    } catch (e) {
      console.error('getCharacterStats:', e.message || e)
    }
  }

  useEffect(() => {
    if (charID) {
      setStats(null)
      getCharacterStats()
    }
  }, [charID])

  return (
    <PageLayout>
      <Fragment key='head'>
        <CharacterSummary stats={stats} />
        <SummaryNavigation root={`/character/${charID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable charID={charID} isLosses={isLosses} isKills={isKills} />
      </Fragment>
    </PageLayout>
  )
}

export default Character
