import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import * as SdeUtils from 'utils/SdeUtils'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const RegionSummary = ({ stats }) => {
  const { id, name, whClassID } = stats || {}
  const links = id && { type: 'region', id, name }

  function renderWhClass() {
    const isWH = SdeUtils.isWH(whClassID)
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
    <SummaryLayout links={links} noImage>
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Region:</Label>
            <div>
              <Link to={`/region/${id}`}>
                {name}
              </Link>
            </div>
          </Row>
          {renderWhClass()}
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default RegionSummary
