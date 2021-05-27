import React from 'react'
import { Link } from 'react-router-dom'
import useMediaQuery from 'react-hook-media-query'

import { getCharUrl } from 'utils/KillmailUtils'
import { OrgIcon } from 'components'
import { PageImgRect } from 'components/primitives'

import { Root, InfoBlock, LogosBlock, Row, Label } from './styles'

// Maullerz
// http://localhost:4001/character/247755210

const CharacterSummary = ({ stats }) => {
  const isDesktop = useMediaQuery('(min-width: 401px)')
  const { id, name, corpID, allyID } = stats

  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <PageImgRect src={getCharUrl(id)} alt='character portrait' />

      <LogosBlock>
        <OrgIcon link corp={corpID} />
        <OrgIcon link ally={allyID} />
      </LogosBlock>

      <InfoBlock>
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
            </div>
          </Row>
        }
      </InfoBlock>
    </Root>
  )
}

export default CharacterSummary
