import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { Href } from 'components'
import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import { HeaderPanel, Title } from './styles'

const Home = () => {
  const history = useHistory()

  function handleGotoKillmail(km) {
    history.push(`/kill/${km._id}`)
  }

  return (
    <PageLayout>
      <Fragment key='title'>
        <HeaderPanel>
          <Title>Alpha version - Under Development</Title>
          <Title>
            discuss in&nbsp;
            <Href link='https://discord.gg/HyPnAU7'>
              Discord
            </Href>
          </Title>
        </HeaderPanel>
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable onRowClick={handleGotoKillmail} />
      </Fragment>
    </PageLayout>
  )
}

export default Home
