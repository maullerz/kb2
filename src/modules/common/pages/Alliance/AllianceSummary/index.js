import React from 'react'
import { Link } from 'react-router-dom'

import { getAllyUrl } from 'utils/KillmailUtils'

import { Root, InfoBlock, Row, Label, ImgRect } from './styles'

const AllianceSummary = ({ stats }) => {
  const { id, name } = stats

  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <ImgRect>
        <img width='100' height='100' src={getAllyUrl(id, 256)} alt='corporation logo' />
      </ImgRect>

      <InfoBlock>
        <Row>
          <Label>Alliance:</Label>
          <div>
            <Link to={`/alliance/${id}`}>
              {name}
            </Link>
          </div>
        </Row>
      </InfoBlock>
    </Root>
  )
}

export default AllianceSummary
