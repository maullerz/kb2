import React from 'react'

import * as SdeUtils from 'utils/SdeUtils'
import * as FormatUtils from 'utils/FormatUtils'
import ItemIcon from 'components/icons/ItemIcon'

import {
  Root,
  Name,
  Digits,
  Count,
  Sum,
} from './styles'

const ListItem = ({ type, count, isDestroyed, inContainer, prices, totalSum, singleton, isMobile }) => {
  let sum
  if (totalSum) {
    sum = totalSum
  } else {
    sum = singleton
      ? 1 * count
      : prices[type] * count
  }
  const name = SdeUtils.getTypeName(type)

  const formattedSum = FormatUtils.formatConditionally(sum, isMobile)
  const formattedCount = FormatUtils.formatConditionally(count, isMobile)

  return (
    <Root destroyed={isDestroyed} subItem={inContainer}>
      {inContainer &&
        <span>&mdash;</span>
      }

      <ItemIcon id={type} singleton={singleton} mini />

      <Name>
        {singleton ? `${name} (Copy)` : name}
      </Name>
      {/*
        TODO: db.evetools.org
        <Name>
          <Link to={`/db/type/${type}`}>
            {singleton ? `${name} (Copy)` : name}
          </Link>
        </Name>
      */}
      <Digits>
        <Count>{formattedCount}</Count>
        <Sum>{formattedSum}</Sum>
      </Digits>
    </Root>
  )
}

export default React.memo(ListItem)
