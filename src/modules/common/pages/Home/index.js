import React, { Fragment } from 'react'

import OldPageLayout from 'layouts/OldPageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import { HeaderPanel, Title } from './styles'

const Home = () => {
  return (
    <OldPageLayout>
      <Fragment key='title'>
        <HeaderPanel>
          <Title>EveTools Killboard</Title>
        </HeaderPanel>
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable />
      </Fragment>
    </OldPageLayout>
  )
}

export default Home
