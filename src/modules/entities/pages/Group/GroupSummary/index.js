import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
// import { useMediaQuery } from '@react-hook/media-query'

import ItemIcon from 'components/icons/ItemIcon'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label, ItemCont } from './styles'

const GroupSummary = ({ stats }) => {
  const isDesktop = false // useMediaQuery('(min-width: 401px)')
  const { id, name, types } = stats || {}

  // console.log('stats:', JSON.stringify(stats, null, 2))
  return (
    <SummaryLayout>
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Group:</Label>
            <div>
              <Link to={`/group/${id}`}>
                {name}
              </Link>
            </div>
          </Row>
        </Fragment>
      }
      {types && types.length > 0 &&
        <Fragment key='items'>
          {types.map(type => {
            return (
              <ItemCont isDesktop={isDesktop}>
                <ItemIcon key={type.id} id={type.id} tooltip link />
                {isDesktop && type.name}
              </ItemCont>
            )
            // return <ItemIcon key={type.id} id={type.id} tooltip link />
          })}
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default GroupSummary
