import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize, isEmpty } from 'lodash'

import * as SdeUtils from 'utils/SdeUtils'
import { CharIcon, ItemIcon, OrgIcon } from 'components'

import { Root, Header, Item, Row, Column, Name, Total, GreyColor } from './styles'

function getHeader(type) {
  switch (type) {
    case 'ships':
      return 'Top Ships'
    default:
      return `Top ${capitalize(type)}`
  }
}

const TopStats = ({ type, header, data }) => {
  if (isEmpty(data)) return null

  function renderItem({ id, total, ...rest }) {
    if (type === 'chars') {
      return (
        <Link to={`/character/${id}`} key={id}>
          <Item>
            <Row>
              <CharIcon id={id} mini />
              <Name>
                {rest.name}
              </Name>
            </Row>
            <Total>{total}</Total>
          </Item>
        </Link>
      )
    }
    if (type === 'ships') {
      return (
        <Link to={`/ship/${id}`} key={id}>
          <Item>
            <Row>
              <ItemIcon id={id} mini />
              <Name>
                {SdeUtils.getTypeName(id)}
              </Name>
            </Row>
            <Total>{total}</Total>
          </Item>
        </Link>
      )
    }
    // <ItemIcon id={id} link mini border={false} />
    // &nbsp;&nbsp;
    if (type === 'systems') {
      const ssStyle = { color: SdeUtils.getSSColor(rest.ss) }
      return (
        <Link to={`/system/${id}`} key={id}>
          <Item>
            <Column>
              <div>
                {rest.name}
                &nbsp;
                {rest.whClassID
                  ? <span style={ssStyle}>{`C${rest.whClassID}`}</span>
                  : <span style={ssStyle}>{rest.ss}</span>
                }
              </div>
              <GreyColor>
                {rest.region}
              </GreyColor>
            </Column>
            <Total>{total}</Total>
          </Item>
        </Link>
      )
    }

    return null
  }

  return (
    <Root>
      <Header>{header || getHeader(type)}</Header>
      {data.map(item => renderItem(item))}
    </Root>
  )
}

export default TopStats
