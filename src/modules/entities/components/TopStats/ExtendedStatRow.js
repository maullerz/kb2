import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize, isEmpty } from 'lodash'

import * as SdeUtils from 'utils/SdeUtils'
import * as FormatUtils from 'utils/FormatUtils'
import { CharIcon, ItemIcon, OrgIcon } from 'components'

import { Root, Header, Item, Row, Column, Name, Total, GreyColor } from './styles'

const ExtendedStatRow = ({ type, data, forShip }) => {
  const { id, total, ...rest } = data
  return (
    <Link to={`/character/${id}`} key={id}>
      <Item>
        <Column>
          <Row>
            <CharIcon id={id} mini />
            <Name>
              {rest.name}
            </Name>
            <Total>{total}</Total>
          </Row>
          <Row>
            Avg Dmg Perc:
            <Name>
              {FormatUtils.dmgPercent(rest.avgCoef)}
            </Name>
          </Row>
          <Item>
            AvgDmg: {rest.avgDmg}
          </Item>
        </Column>
      </Item>
    </Link>
  )
}

export default ExtendedStatRow
