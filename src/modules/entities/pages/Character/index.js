import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import KillmailService from 'api/KillmailService'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'
import SummaryNavigation from 'modules/entities/components/SummaryNavigation'
import TopStats from 'modules/entities/components/TopStats'
import Ads from 'components/Ads'

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
      // const { data } = await KillmailService.getStats({ charID })
      // setStats(data)
      const [infoStats, monthlyStats] = await Promise.all([
        await KillmailService.getStats({ charID }),
        await KillmailService.getStatsMonthly({ charID }),
      ])
      const { data: info } = infoStats
      const { data: monthly } = monthlyStats
      setStats({ info, monthly })
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
      <Fragment key='ads'>
        <Ads type='list' />
      </Fragment>
      <Fragment key='head'>
        <CharacterSummary stats={stats?.info} />
        <SummaryNavigation root={`/character/${charID}`} />
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable charID={charID} isLosses={isLosses} isKills={isKills} />
      </Fragment>
      {stats && stats.monthly &&
        <Fragment key='stats'>
          {Object.keys(stats.monthly).map(key => (
            <TopStats key={key} type={key} data={stats.monthly[key]} />
          ))}
        </Fragment>
      }
    </PageLayout>
  )
}

export default Character
