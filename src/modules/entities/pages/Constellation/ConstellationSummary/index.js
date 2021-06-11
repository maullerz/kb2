import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const ConstellationSummary = ({ stats }) => {
  return (
    <SummaryLayout>
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Constellation:</Label>
            <div>
              <Link to={`/constellation/${stats.id}`}>
                {stats.name}
              </Link>
            </div>
          </Row>
          <Row>
            <Label>Region:</Label>
            <div>
              <Link to={`/region/${stats.region?.id}`}>
                {stats.region?.name}
              </Link>
            </div>
          </Row>
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default ConstellationSummary
