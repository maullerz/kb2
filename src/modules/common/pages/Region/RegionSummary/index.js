import React from 'react'
import { Link } from 'react-router-dom'

import { PageImgRect } from 'components/primitives'

import { Root, InfoBlock, Row, Label } from './styles'

const RegionSummary = ({ stats }) => {
  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <PageImgRect />
      <InfoBlock>
        <Row>
          <Label>Region:</Label>
          <div>
            <Link to={`/region/${stats.id}`}>
              {stats.name}
            </Link>
          </div>
        </Row>
      </InfoBlock>
    </Root>
  )
}

export default RegionSummary
