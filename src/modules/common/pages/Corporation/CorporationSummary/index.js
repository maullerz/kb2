import React from 'react'
import { Link } from 'react-router-dom'

import { getCorpUrl } from 'utils/KillmailUtils'

import { Root, InfoBlock, Row, Label, ImgRect } from './styles'

const CorporationSummary = ({ stats }) => {
  const { id, name } = stats

  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <ImgRect>
        <img width='100' height='100' src={getCorpUrl(id, 256)} alt='corporation logo' />
      </ImgRect>

      <InfoBlock>
        <Row>
          <Label>Corporation:</Label>
          <div>
            <Link to={`/corporation/${id}`}>
              {name}
            </Link>
          </div>
        </Row>
        <Row>
          <Label>Alliance:</Label>
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

export default CorporationSummary
