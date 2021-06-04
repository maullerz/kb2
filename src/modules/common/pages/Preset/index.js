import React, { Fragment } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import PageLayout from 'layouts/PageLayout'
import KillmailsTable from 'modules/common/components/KillmailsTable'

import { Header } from './styles'

const PRESET_TYPES = ['5b', '10b', 'bigkills', 'citadels', 'capitals', 'supers', 'freighters', 'rorquals']

function getTypeDescr(type) {
  switch (type) {
    case '5b':
      return 'Kills > 5b'
    case '10b':
      return 'Kills > 10b'
    default:
      return type
  }
}

const Preset = () => {
  const type = useParams().type.toLowerCase()

  if (!PRESET_TYPES.includes(type)) {
    return <Redirect to='/' />
  }

  return (
    <PageLayout>
      <Fragment key='head'>
        <Header>
          {getTypeDescr(type)}
        </Header>
      </Fragment>
      <Fragment key='content'>
        <KillmailsTable type={type} />
      </Fragment>
    </PageLayout>
  )
}

export default Preset
