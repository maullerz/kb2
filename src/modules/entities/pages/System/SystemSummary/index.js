import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import * as SdeUtils from 'utils/SdeUtils'
// import { PageImgRect } from 'components/primitives'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const QUALITY = 256
// const BASE = 'https://images.evetech.net'
const BASE = 'https://img.evetools.org/sdeimages'

const noWrap = { whiteSpace: 'nowrap' }

const getImgUrl = (sunTypeID, systemID) => {
  if (!sunTypeID) {
    if (systemID >= 32000000) {
      // Unstable Abyssal Depths icon
      return `${BASE}/types/47465/icon?size=${QUALITY}`
    }
    return ''
  }
  return `${BASE}/types/${sunTypeID}/render?size=${QUALITY}`
}

const SystemSummary = ({ stats }) => {
  const { id, name, sunTypeID, constellation, region, ss, whClassID, neighbors } = stats || {}
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
          {neighbors &&
            <Row>
              <Label>Adjacent:</Label>
              <div>
                {neighbors.map((sys, ix) => {
                  const ssStyleAdj = { color: SdeUtils.getSSColor(sys.ss) }
                  return (
                    <span key={sys.id}>
                      <Link style={noWrap} to={`/system/${sys.id}`}>
                        {sys.name}
                        &nbsp;
                        <span style={ssStyleAdj}>{sys.ss}</span>
                      </Link>
                      {ix < neighbors.length - 1 && ', '}
                    </span>
                  )
                })}
              </div>
            </Row>
          }
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default SystemSummary
