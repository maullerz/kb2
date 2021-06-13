import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import * as SdeUtils from 'utils/SdeUtils'
// import { PageImgRect } from 'components/primitives'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const QUALITY = 256

const getImgUrl = (sunTypeID, systemID) => {
  if (!sunTypeID) {
    if (systemID >= 32000000) {
      // Unstable Abyssal Depths icon
      return `https://img.evetools.org/sdeimages/types/47465/icon?size=${QUALITY}`
    }
    return ''
  }
  return `https://img.evetools.org/sdeimages/types/${sunTypeID}/render?size=${QUALITY}`
}

const SystemSummary = ({ stats }) => {
  const { id, name, sunTypeID, constellation, region, ss, whClassID } = stats || {}
  const isWH = SdeUtils.isWH(whClassID)
  const links = id && { type: 'system', id, name, region: region.name, isWH }
  const ssStyle = ss && { color: SdeUtils.getSSColor(ss) }

  function renderWhClass() {
    if (!isWH) return null
    const className = SdeUtils.getClassName(whClassID)
    return (
      <Row>
        <Label>WH Class:</Label>
        <div>
          {className}
        </div>
      </Row>
    )
  }

  return (
    <SummaryLayout
      imgProps={id && { src: getImgUrl(sunTypeID, id), alt: 'system sun' }}
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
          {renderWhClass()}
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
