import React, { Fragment } from 'react'

import { Href } from 'components'
import OldPageLayout from 'layouts/OldPageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import { HeaderPanel, Title } from './styles'

const Home = () => {
  return (
    <OldPageLayout>
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
        <KillmailsTable />
      </Fragment>
    </OldPageLayout>
  )
}

export default Home
