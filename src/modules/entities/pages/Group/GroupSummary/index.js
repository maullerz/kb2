import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getRenderUrl } from 'utils/KillmailUtils'
// import { PageImgRect } from 'components/primitives'
import SummaryLayout from 'layouts/SummaryLayout'

import { Row, Label } from './styles'

const GroupSummary = ({ stats }) => {
  const { id, name, groupID, groupName } = stats || {}

  // console.log('stats:', JSON.stringify(stats, null, 2))
  return (
    <SummaryLayout>
      {stats &&
        <Fragment key='info'>
          <Row>
            <Label>Group:</Label>
            <div>
              <Link to={`/group/${id}`}>
                {name}
              </Link>
            </div>
          </Row>
          {groupID &&
            <Row>
              <Label>Group:</Label>
              <div>
                {groupName}
                {/*
                  <Link to={`/group/${groupID}`}>
                    {groupName}
                  </Link>
                */}
              </div>
            </Row>
          }
        </Fragment>
      }
    </SummaryLayout>
  )
}

export default GroupSummary
