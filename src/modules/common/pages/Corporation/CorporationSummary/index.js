import React from 'react'
import { Link } from 'react-router-dom'

import { getCorpUrl } from 'utils/KillmailUtils'
import { PageImgRect } from 'components/primitives'

import { Root, InfoBlock, Row, Label } from './styles'

const CorporationSummary = ({ stats }) => {
  const { id, name, allyID } = stats

  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <PageImgRect src={getCorpUrl(id, 256)} alt='corporation logo' />

      <InfoBlock>
        <Row>
          <Label>Corporation:</Label>
          <div>
            <Link to={`/corporation/${id}`}>
              {name}
            </Link>
          </div>
        </Row>
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

export default CorporationSummary
