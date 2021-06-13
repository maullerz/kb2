import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import * as SdeUtils from 'utils/SdeUtils'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const ConstellationSummary = ({ stats }) => {
  const { id, name, region } = stats || {}
  const links = id && { type: 'constellation', id, name, region: region.name }

  function renderWhClass() {
    const isWH = SdeUtils.isWH(region.whClassID)
    if (!isWH) return null
    const className = SdeUtils.getClassName(region.whClassID)
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
    <SummaryLayout links={links} noImage>
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Constellation:</Label>
            <div>
              <Link to={`/constellation/${id}`}>
                {name}
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
          {renderWhClass()}
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default ConstellationSummary
