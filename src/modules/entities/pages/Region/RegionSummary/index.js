import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const RegionSummary = ({ stats }) => {
  const { id, name } = stats || {}
  const links = id && { type: 'region', id, name }
  return (
    <SummaryLayout links={links} noImage>
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Region:</Label>
            <div>
              <Link to={`/region/${id}`}>
                {name}
              </Link>
            </div>
          </Row>
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default RegionSummary
