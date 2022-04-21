import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize, isEmpty } from 'lodash'

import * as SdeUtils from 'utils/SdeUtils'
// import * as FormatUtils from 'utils/FormatUtils'
import { CharIcon, ItemIcon, OrgIcon } from 'components'

// import ExtendedStatRow from './ExtendedStatRow'
import { Root, Header, Item, Row, Column, Name, Total, GreyColor } from './styles'

const TopStats = ({ type, data }) => { // , forShip
  if (isEmpty(data)) return null

  const header = `Top ${capitalize(type)}`

  function renderItem(itemData) {
    const { id, total, ...rest } = itemData
    if (type === 'corps') {
      return (
        <Link to={`/corporation/${id}`} key={id}>
          <Item>
            <Row>
              <OrgIcon corp={id} mini />
              <Name>
                {rest.name}
              </Name>
            </Row>
            <Total>{total}</Total>
          </Item>
        </Link>
      )
    }
    // if (type === 'chars' && forShip) {
    //   return <ExtendedStatRow type={type} data={itemData} />
    // } //  && !forShip
    if (type === 'chars') {
      return (
        <Link to={`/character/${id}`} key={id}>
          <Item>
            <Row>
              <CharIcon id={id} mini />
              {rest.corp && <OrgIcon corp={rest.corp} mini />}
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
    if (type === 'lost') {
      return (
        <Link to={`/ship/${id}`} key={id}>
          <Item isLost>
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
      <Header>
        {header}
      </Header>
      {data.map(item => renderItem(item))}
    </Root>
  )
}

export default TopStats
