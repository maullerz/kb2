import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
// import { useMediaQuery } from '@react-hook/media-query'

import ItemIcon from 'components/icons/ItemIcon'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label, ItemCont } from './styles'

const GroupSummary = ({ stats }) => {
  const isDesktop = false // useMediaQuery('(min-width: 401px)')
  const { id, name, types } = stats || {}
  const links = id && { type: 'group', id, name }

  return (
    <SummaryLayout links={links}>
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
              <ItemCont key={type.id} isDesktop={isDesktop}>
                <ItemIcon id={type.id} tooltip link />
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
