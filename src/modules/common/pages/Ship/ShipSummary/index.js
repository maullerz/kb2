import React from 'react'
import { Link } from 'react-router-dom'

import { getRenderUrl } from 'utils/KillmailUtils'
import { PageImgRect } from 'components/primitives'

import { Root, InfoBlock, Row, Label } from './styles'

const ShipSummary = ({ stats }) => {
  const { id, name, groupID, groupName } = stats

  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <PageImgRect src={getRenderUrl(id)} alt='ship type' />

      <InfoBlock>
        <Row>
          <Label>Ship:</Label>
          <div>
            <Link to={`/ship/${id}`}>
              {name}
            </Link>
          </div>
        </Row>
        {groupID &&
          <Row>
            <Label>Group:</Label>
            <div>
              {groupName}
              {/*
                <Link to={`/group/${groupID}`}>
                  {groupName}
                </Link>
              */}
            </div>
          </Row>
        }
      </InfoBlock>
    </Root>
  )
}

export default ShipSummary
