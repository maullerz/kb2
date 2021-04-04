import React, { Fragment } from 'react'

import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import { HeaderPanel, Title } from './styles'

const Home = () => {
  return (
    <PageLayout>
      <Fragment key='title'>
        <HeaderPanel>
          <Title>Alpha version - In Development...</Title>
        </HeaderPanel>
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable />
      </Fragment>
    </PageLayout>
  )
}

export default Home
