import React from 'react'
import { Link } from 'react-router-dom'

import { getCharUrl } from 'utils/KillmailUtils'

import { Root, InfoBlock, Row, Label, ImgRect } from './styles'

const CharacterSummary = ({ stats }) => {
  const { id, name, corpID, allyID } = stats

  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <ImgRect>
        <img width='100' height='100' src={getCharUrl(id)} alt='character portrait' />
      </ImgRect>

      <InfoBlock>
        <Row>
          <Label>Character:</Label>
          <div>
            <Link to={`/character/${id}`}>
              {name}
            </Link>
          </div>
        </Row>
        {corpID &&
          <Row>
            <Label>Corporation:</Label>
            <div>
              <Link to={`/corporation/${0}`}>
                corp name
              </Link>
            </div>
          </Row>
        }
        {allyID &&
          <Row>
            <Label>Alliance:</Label>
            <div>
              <Link to={`/alliance/${0}`}>
                ally name
              </Link>
            </div>
          </Row>
        }
      </InfoBlock>
    </Root>
  )
}

export default CharacterSummary
