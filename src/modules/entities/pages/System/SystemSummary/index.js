import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import * as SdeUtils from 'utils/SdeUtils'
// import { PageImgRect } from 'components/primitives'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const QUALITY = 256

const getImgUrl = sunTypeID => {
  return `https://img.evetools.org/sdeimages/types/${sunTypeID}/render?size=${QUALITY}`
}

const SystemSummary = ({ stats }) => {
  const { id, name, sunTypeID, constellation, region, ss } = stats || {}
  const ssStyle = ss && { color: SdeUtils.getSSColor(ss) }
  const links = id && { type: 'system', id, name, region: region.name }

  return (
    <SummaryLayout
      imgProps={{ src: getImgUrl(sunTypeID), alt: 'system sun' }}
      links={links}
    >
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>System:</Label>
            <div>
              <Link to={`/system/${id}`}>
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
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default SystemSummary
