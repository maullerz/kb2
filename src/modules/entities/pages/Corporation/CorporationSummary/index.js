import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getCorpUrl } from 'utils/KillmailUtils'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label, Ticker } from './styles'

const CorporationSummary = ({ stats }) => {
  const { id, name, ticker, ceoID, ceoName, allyID } = stats || {}
  const links = id && { type: 'corp', id, name }

  return (
    <SummaryLayout
      imgProps={id && { src: getCorpUrl(id, 256), alt: 'corporation logo' }}
      links={links}
    >
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Corp:</Label>
            <div>
              <Link to={`/corporation/${id}`}>
                {name}
              </Link>
              <Ticker> [{ticker}]</Ticker>
            </div>
          </Row>
          {ceoID && ceoName &&
            <Row>
              <Label>CEO:</Label>
              <div>
                <Link to={`/character/${ceoID}`}>
                  {ceoName}
                </Link>
              </div>
            </Row>
          }
          {allyID &&
            <Row>
              <Label>Alliance:</Label>
              <div>
                <Link to={`/alliance/${allyID}`}>
                  {stats.allyName}
                </Link>
                {stats.allyTicker &&
                  <Ticker> [{stats.allyTicker}]</Ticker>
                }
              </div>
            </Row>
          }
          <Row>
            <Label>Members:</Label>
            <div>
              {stats.members}
            </div>
          </Row>
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default CorporationSummary
