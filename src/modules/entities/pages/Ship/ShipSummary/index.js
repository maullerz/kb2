import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getRenderUrl } from 'utils/KillmailUtils'
// import { PageImgRect } from 'components/primitives'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const ShipSummary = ({ stats }) => {
  const { id, name, groupID, groupName } = stats || {}
  const links = id && { type: 'ship', id, name }

  return (
    <SummaryLayout
      imgProps={id && { src: getRenderUrl(id), alt: 'ship type' }}
      links={links}
    >
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Ship:</Label>
            <div>
              {/* <Link to={`/ship/${id}`}>
                {name}
              </Link> */}
              <a href={`https://db.evetools.org/type/${id}`} target='_blank' rel='noopener'>
                {name}
              </a>
            </div>
          </Row>
          {groupID &&
            <Row>
              <Label>Group:</Label>
              <div>
                <Link to={`/group/${groupID}`}>
                  {groupName}
                </Link>
              </div>
            </Row>
          }
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default ShipSummary
