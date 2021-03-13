import React from 'react'
import numeral from 'numeral'
// import { Link } from 'react-router-dom'

import * as SdeUtils from 'utils/SdeUtils'
import ItemIcon from 'components/icons/ItemIcon'

import {
  Root,
  Name,
  Digits,
  Count,
  Sum,
} from './styles'

// CHECK: https://zkillboard.com/kill/87028891/
const formatRaw = sum => numeral(sum).format('0,0')

const formatSum = sum => {
  if (sum === 0 || sum === 1 || !sum) {
    return sum || '0'
  }
  const sumStr = numeral(sum).format('0.00 a').toUpperCase()

  let result = <div>{sumStr}</div>
  if (sumStr.includes('m')) {
    result = <div>{sumStr}</div>
  } else if (sumStr.includes('b')) {
    result = <b>{sumStr}</b>
  } else if (sumStr.includes('t')) {
    result = <b>{sumStr}</b>
  }

  return result
}

const ListItem = ({ type, count, isDestroyed, inContainer, prices, singleton, isMobile }) => {
  const sum = singleton
    ? 1 * count
    : prices[type] * count

  const formattedSum = isMobile ? formatSum(sum) : formatRaw(sum)
  const formattedCount = isMobile ? formatSum(count) : formatRaw(count)
  const name = SdeUtils.getTypeName(type)

  return (
    <Root destroyed={isDestroyed} subItem={inContainer}>
      {inContainer &&
        <span>&mdash;</span>
      }

      <ItemIcon id={type} singleton={singleton} />

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
