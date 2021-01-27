import React, { Fragment } from 'react'

import PageLayout from 'layouts/PageLayout'
import { HeaderPanel, Title } from './styles'

const Help = () => {
  return (
    <PageLayout>
      <Fragment key='title'>
        <HeaderPanel>
          <Title>Help</Title>
        </HeaderPanel>
      </Fragment>
      <Fragment key='content' />
    </PageLayout>
  )
}

export default Help
