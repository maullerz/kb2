import React from 'react'
import { Link } from 'react-router-dom'

import * as SdeUtils from 'utils/SdeUtils'

import { Root, InfoBlock, Row, Label, ImgRect } from './styles'

const QUALITY = 256

const getImgUrl = sunTypeID => {
  return `https://img.evetools.org/sdeimages/types/${sunTypeID}/render?size=${QUALITY}`
}

const SystemSummary = ({ stats }) => {
  const { sunTypeID, name, constellation, region, ss } = stats
  const ssStyle = { color: SdeUtils.getSSColor(ss) }

  // console.log('stats:', JSON.stringify(stats, null, 2))

  return (
    <Root>
      <ImgRect>
        <img width='100' height='100' src={getImgUrl(sunTypeID)} alt='system sun' />
      </ImgRect>

      <InfoBlock>
        <Row>
          <Label>System:</Label>
          <div>
            <Link to={`/system/${stats.id}`}>
              {name}
            </Link>
            &nbsp;
            <span style={ssStyle}>{ss}</span>
          </div>
        </Row>
        <Row>
          <Label>Constellation:</Label>
          <div>
            <Link to={`/constellation/${constellation.id}`}>
              {constellation.name}
            </Link>
          </div>
        </Row>
        <Row>
          <Label>Region:</Label>
          <div>
            <Link to={`/region/${region.id}`}>
              {region.name}
            </Link>
          </div>
        </Row>
      </InfoBlock>
    </Root>
  )
}

export default SystemSummary
