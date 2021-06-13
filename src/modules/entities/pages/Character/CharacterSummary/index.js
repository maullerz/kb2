import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@react-hook/media-query'

import { getCharUrl } from 'utils/KillmailUtils'
import { OrgIcon } from 'components'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label, Ticker } from './styles'

const CharacterSummary = ({ stats }) => {
  const isDesktop = useMediaQuery('(min-width: 401px)')
  const { id, name, corpID, allyID } = stats || {}
  const links = id && { type: 'char', id }

  return (
    <SummaryLayout
      imgProps={id && { src: getCharUrl(id), alt: 'char portrait' }}
      links={links}
    >
      {stats &&
        <Fragment key='logos'>
          <OrgIcon link corp={corpID} />
          <OrgIcon link ally={allyID} />
        </Fragment>
      }
      {stats &&
        <Fragment key='info'>
          <Row>
            {isDesktop && <Label>Character:</Label>}
            <div>
              <Link to={`/character/${id}`}>
                {name}
              </Link>
            </div>
          </Row>
          {corpID &&
            <Row>
              {isDesktop && <Label>Corporation:</Label>}
              <div>
                <Link to={`/corporation/${corpID}`}>
                  {stats.corpName}
                </Link>
                {stats.corpTicker &&
                  <Ticker> [{stats.corpTicker}]</Ticker>
                }
              </div>
            </Row>
          }
          {allyID &&
            <Row>
              {isDesktop && <Label>Alliance:</Label>}
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
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default CharacterSummary
