import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getAllyUrl } from 'utils/KillmailUtils'
// import { PageImgRect } from 'components/primitives'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label, Ticker } from './styles'

const AllianceSummary = ({ stats }) => {
  const { id, name, ticker, executorID, executorName } = stats || {}

  // console.log('stats:', JSON.stringify(stats, null, 2))
  return (
    <SummaryLayout imgProps={{ src: getAllyUrl(id, 256), alt: 'ally logo' }}>
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Alliance:</Label>
            <div>
              <Link to={`/alliance/${id}`}>
                {name}
              </Link>
              <Ticker> [{ticker}]</Ticker>
            </div>
          </Row>
          {executorID && executorName &&
            <Row>
              <Label>Executor:</Label>
              <div>
                <Link to={`/corporation/${executorID}`}>
                  {executorName}
                </Link>
              </div>
            </Row>
          }
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default AllianceSummary
