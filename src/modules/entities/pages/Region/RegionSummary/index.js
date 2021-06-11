import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

// import { PageImgRect } from 'components/primitives'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const RegionSummary = ({ stats }) => {
  // console.log('stats:', JSON.stringify(stats, null, 2))
  return (
    <SummaryLayout>
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Region:</Label>
            <div>
              <Link to={`/region/${stats.id}`}>
                {stats.name}
              </Link>
            </div>
          </Row>
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default RegionSummary
