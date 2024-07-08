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

// Failed Sort by Sum - http://localhost:4001/kill/93337849

const ListItem = ({ type, count, isDestroyed, inContainer, prices, totalSum, singleton, isMobile }) => {
  let sum
  if (!prices && !totalSum && process.env.NODE_ENV === 'development') {
    console.warn('ListItem without prices:', { type, count, isDestroyed, inContainer, prices, totalSum, singleton, isMobile })
  }

  if (totalSum) {
    sum = totalSum
  } else {
    sum = singleton
      ? 1 * count
      : (prices ? prices[type] : 1) * count
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

      {/*
      <Name>
        {singleton ? `${name} (Copy)` : name}
      </Name>
      */}
      <Name>
        <a href={`https://db.evetools.org/type/${type}`} target='_blank' rel='noopener'>
          {singleton ? `${name} (Copy)` : name}
        </a>
      </Name>
      <Digits>
        <Count>{formattedCount}</Count>
        <Sum sum={isMobile && sum}>{formattedSum}</Sum>
      </Digits>
    </Root>
  )
}

export default React.memo(ListItem)
