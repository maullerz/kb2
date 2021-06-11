import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import SummaryLayout from 'layouts/SummaryLayout'
import { getAllyUrl } from 'utils/KillmailUtils'

import { Row, Label, Ticker } from './styles'

const AllianceSummary = ({ stats }) => {
  const { id, name, ticker, execID, execName, execTicker } = stats || {}
  const links = id && { type: 'ally', id, name }

  return (
    <SummaryLayout
      imgProps={{ src: getAllyUrl(id, 256), alt: 'ally logo' }}
      links={links}
    >
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
          {execID && execName &&
            <Row>
              <Label>Executor:</Label>
              <div>
                <Link to={`/corporation/${execID}`}>
                  {execName}
                </Link>
                {execTicker &&
                  <Ticker> [{execTicker}]</Ticker>
                }
              </div>
            </Row>
          }
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default AllianceSummary
