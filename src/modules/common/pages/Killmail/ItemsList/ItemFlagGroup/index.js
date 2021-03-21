import React, { Fragment } from 'react'
import isEmpty from 'lodash/isEmpty'

import ListItem from '../ListItem'
// import { Digits, Count, Sum } from '../ListItem/styles'
import { ItemGroup, ItemGroupTitle } from './styles'

const ItemFlagGroup = ({ group, conts, prices, collapsed, isMobile }) => {
  if (isEmpty(group) && isEmpty(conts)) return null

  // console.log('group:', JSON.stringify(group, null, 2))

  return (
    <ItemGroup key={group.name}>
      <ItemGroupTitle>
        <h4>{group.name}</h4>

        <div>Total: 60,234,345</div>
      </ItemGroupTitle>

      {!collapsed && group.items.map(item => {
        const { type, destroyed, dropped, singleton } = item
        return (
          <Fragment key={type}>
            {!!destroyed &&
              <ListItem isMobile={isMobile} type={type} count={destroyed} prices={prices} singleton={singleton} isDestroyed />
            }
            {!!dropped &&
              <ListItem isMobile={isMobile} type={type} count={dropped} prices={prices} singleton={singleton} />
            }
          </Fragment>
        )
      })}

      {!collapsed && conts}
    </ItemGroup>
  )
}

export default ItemFlagGroup
