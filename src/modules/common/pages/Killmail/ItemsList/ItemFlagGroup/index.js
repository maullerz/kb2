import React, { Fragment } from 'react'

import * as FormatUtils from 'utils/FormatUtils'

import ListItem from '../ListItem'
import { ItemGroup, ItemGroupTitle, GroupTotal } from './styles'

const ItemFlagGroup = ({ group, conts, prices, collapsed, isMobile }) => {
  // const { items, totalSum, ...rest } = group
  // console.log('group:', JSON.stringify({ ...rest, itemsCount: items.length }, null, 2))

  const containersInGroup = conts.filter(cont => cont.flag === group.id)

  return (
    <ItemGroup key={group.name}>
      <ItemGroupTitle isCollapsed={collapsed}>
        <h4>{group.name}</h4>

        {collapsed &&
          <div>
            Total: {FormatUtils.formatConditionally(group.totalSum, isMobile)}
          </div>
        }
      </ItemGroupTitle>

      {!collapsed && group.items.map((item, ix) => {
        const { type, destroyed, dropped, singleton } = item
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

      {!collapsed &&
        <GroupTotal>Total: {FormatUtils.formatRaw(group.totalSum)}</GroupTotal>
      }
    </ItemGroup>
  )
}

export default ItemFlagGroup
