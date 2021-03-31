import React, { Fragment } from 'react'
// import isEmpty from 'lodash/isEmpty'

import ListItem from '../ListItem'
// import { Digits, Count, Sum } from '../ListItem/styles'
import { ItemGroup, ItemGroupTitle } from './styles'

const ItemFlagGroup = ({ group, conts, prices, collapsed, isMobile }) => {
  const { items, ...rest } = group
  console.log('group:', JSON.stringify({ ...rest, itemsCount: items.length }, null, 2))

  const containersInGroup = conts.filter(cont => cont.flag === group.id)

  return (
    <ItemGroup key={group.name}>
      <ItemGroupTitle>
        <h4>{group.name}</h4>

        <div>Total: 60,234,345</div>
      </ItemGroupTitle>

      {!collapsed && group.items.map((item, ix) => {
        const { type, destroyed, dropped, singleton } = item
        if (ix === 0) {
          console.log('group.items[0]:', JSON.stringify(item, null, 2))
        }
        return (
          <Fragment key={`${type}-${ix}`}>
            {!!destroyed &&
              <ListItem isMobile={isMobile} type={type} count={destroyed} prices={prices} singleton={singleton} isDestroyed />
            }
            {!!dropped &&
              <ListItem isMobile={isMobile} type={type} count={dropped} prices={prices} singleton={singleton} />
            }
          </Fragment>
        )
      })}

      {!collapsed && containersInGroup.map((cont, ix) => {
        if (ix === 0) {
          console.log('cont.items[0]:', JSON.stringify(cont.items[0], null, 2))
        }
        // cont.items[0]: {
        //   "flag": 155,
        //   "type": 8263,
        //   "dropped": 1,
        //   "destroyed": 0,
        //   "sumDropped": 14439.69802190461,
        //   "sumDestroyed": 0
        // }
        return (
          <Fragment key={`${cont.type}-${ix}`}>
            <ListItem
              type={cont.type}
              count={1}
              prices={prices}
              isDestroyed={cont.isDestroyed}
              isMobile={isMobile}
            />
            {cont.items.map(item => {
              // const [, type, dropped, destroyed, singleton] = item
              return (
                <ListItem
                  inContainer
                  key={`${item.flag}-${item.type}`}
                  type={item.type}
                  count={item.dropped || item.destroyed}
                  prices={prices}
                  isDestroyed={cont.isDestroyed}
                  singleton={item.singleton}
                  isMobile={isMobile}
                />
              )
            })}
          </Fragment>
        )
      })}
    </ItemGroup>
  )
}

export default ItemFlagGroup
