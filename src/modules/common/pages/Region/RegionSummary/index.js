import React from 'react'
import { Link } from 'react-router-dom'

import { Root, InfoBlock, Row, Label, ImgRect } from './styles'

const RegionSummary = ({ stats }) => {
  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <ImgRect />
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
