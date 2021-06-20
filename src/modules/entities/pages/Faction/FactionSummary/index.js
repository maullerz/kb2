import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getCorpUrl } from 'utils/KillmailUtils'
import * as SdeUtils from 'utils/SdeUtils'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label, Ticker } from './styles'

// TODO:
// descr, short,

const FactionSummary = ({ stats }) => {
  const { id, name, system, corp, militia, corpID, militiaCorporationID } = stats || {}
  const links = id && { type: 'faction', id, name }

  let ssStyle
  if (system) {
    ssStyle = { color: SdeUtils.getSSColor(system.ss) }
  }

  return (
    <SummaryLayout
      imgProps={id && { src: getCorpUrl(id, 256), alt: 'faction logo' }}
      links={links}
    >
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Faction:</Label>
            <div>
              <Link to={`/faction/${id}`}>
                {name}
              </Link>
            </div>
          </Row>
          {corp &&
            <Row>
              <Label>Executor:</Label>
              <Link to={`/corporation/${corpID}`}>
                {corp.name}
              </Link>
              <Ticker>&nbsp;[{corp.ticker}]</Ticker>
            </Row>
          }
          {militia &&
            <Row>
              <Label>Militia:</Label>
              <Link to={`/corporation/${militiaCorporationID}`}>
                {militia.name}
              </Link>
              <Ticker>&nbsp;[{militia.ticker}]</Ticker>
            </Row>
          }
          {system && system.name &&
            <Row>
              <Label>System:</Label>
              <div>
                <Link to={`/system/${system.id}`}>
                  {system.name}
                  &nbsp;
                  <span style={ssStyle}>{system.ss}</span>
                </Link>
                &nbsp;/&nbsp;
                <Link to={`/region/${system.region.id}`}>
                  {system.region.name}
                </Link>
              </div>
            </Row>
          }
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default FactionSummary
