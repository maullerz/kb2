import React from 'react'
import { Link } from 'react-router-dom'

import { PageImgRect } from 'components/primitives'

import { Root, InfoBlock, Row, Label } from './styles'

const ConstellationSummary = ({ stats }) => {
  return (
    <Root>
      <PageImgRect />
      <InfoBlock>
        <Row>
          <Label>Constellation:</Label>
          <div>
            <Link to={`/constellation/${stats.id}`}>
              {stats.name}
            </Link>
          </div>
        </Row>
        <Row>
          <Label>Region:</Label>
          <div>
            <Link to={`/region/${stats.region?.id}`}>
              {stats.region?.name}
            </Link>
          </div>
        </Row>
      </InfoBlock>
    </Root>
  )
}

export default ConstellationSummary
