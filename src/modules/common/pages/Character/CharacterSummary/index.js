import React from 'react'
import { Link } from 'react-router-dom'

import { getCharUrl } from 'utils/KillmailUtils'
import * as SdeUtils from 'utils/SdeUtils'

import { Root, InfoBlock, Row, Label, ImgRect } from './styles'

const QUALITY = 256

const getImgUrl = charID => {
  return getCharUrl(charID, QUALITY)
}

const CharacterSummary = ({ stats }) => {
  const { id, name } = stats

  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <ImgRect>
        <img width='100' height='100' src={getImgUrl(id)} alt='character portrait' />
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
        <Row>
          <Label>Corporation:</Label>
          <div>
            <Link to={`/corporation/${0}`}>
              corp name
            </Link>
          </div>
        </Row>
        <Row>
          <Label>Region:</Label>
          <div>
            <Link to={`/alliance/${0}`}>
              ally name
            </Link>
          </div>
        </Row>
      </InfoBlock>
    </Root>
  )
}

export default CharacterSummary
