import React, { useState } from 'react'
import useMediaQuery from 'react-hook-media-query'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import * as SdeUtils from 'utils/SdeUtils'
import * as FormatUtils from 'utils/FormatUtils'

// import Collapsible from './Collapsible'
import ListItem from './ListItem'
import ItemFlagGroup from './ItemFlagGroup'
import SortableColumn from './SortableColumn'
import { Digits, Count, Sum } from './ListItem/styles'
import { Root, Header, SortHeader, ItemGroup, ItemGroupTitle, TotalRow } from './styles'

// CHECK: http://localhost:3000/kill/87028891/

const colorRed = { color: 'var(--colorRed)' }
const colorGreen = { color: 'var(--colorGreen)' }

function getSortedList({ field, order }, list) {
  switch (field) {
    case 'type':
      return list.sort((a, b) => {
        const nameA = SdeUtils.getTypeName(a.type)
        const nameB = SdeUtils.getTypeName(b.type)
        return order === 'DESC'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA)
      })
    case 'count':
      return list.sort((a, b) => {
        return order === 'ASC'
          ? a.count - b.count
          : b.count - a.count
      })
    case 'sum':
      return list.sort((a, b) => {
        return order === 'ASC'
          ? a.sum - b.sum
          : b.sum - a.sum
      })
    default:
      return list
  }
}

const ItemsList = ({ kmData }) => {
  // TODO: useReducer
  const [collapsed, setCollapsed] = useState(false)
  const [sortBy, setSortBy] = useState(null)
  const [orderedItems, setOrderedItems] = useState(null)
  const { vict, prices } = kmData
  // const { cnts = [] } = vict
  const isMobile = useMediaQuery('(max-width: 767px)')

  // console.log('vict:', JSON.stringify(vict, null, 2))

  // const items = SdeUtils.parseKillmailItems(vict, prices)
  const items = kmData.parsedItems
  // const { high, med, low, rig, sub, subHold, ...rest } = items
  // const isCargoEmpty = !Object.keys(rest).map(slotKey => slotKey).includes('Cargo')

  function handleSortBy(field) {
    let newSortBy
    if (sortBy && sortBy.field === field) {
      if (sortBy.order === 'ASC') {
        newSortBy = null
      } else {
        newSortBy = { field, order: 'ASC' }
      }
    } else {
      newSortBy = { field, order: 'DESC' }
    }
    if (newSortBy) {
      const newOrderedItems = getSortedList(newSortBy, items.rawList)
      setOrderedItems(newOrderedItems)
    } else {
      setOrderedItems(null)
    }
    setSortBy(newSortBy)
  }

  function handleToggleCollapsed() {
    setCollapsed(!collapsed)
  }

  function renderGrouped() {
    // items.conts.forEach(cont => {
    //   const { items: tmp, ...rest } = cont
    //   console.log('cont:', JSON.stringify({ ...rest, itemsCount: tmp.length }, null, 2))
    // })
    return items.flagGroupsArray.map((element, ix) => {
      let group = element
      if (typeof element === 'string') {
        group = items.flagGroups[element]
      }
      return (
        <ItemFlagGroup
          key={`${group.id}-${ix}`}
          group={group}
          conts={items.conts}
          prices={prices}
          collapsed={collapsed}
          isMobile={isMobile}
        />
      )
    })
  }

  function renderOrdered() {
    // const orderedItems = getSortedList(sortBy, items.rawList)
    console.log('orderedItems:', orderedItems.slice(0, 5))
    return orderedItems.map(item => {
      const { type, count, sum, singleton, isDestroyed } = item
      // const { type, dropped, destroyed, sumDestroyed, sumDropped, singleton } = item
      // const isDestroyed = sumDestroyed > 0
      // if (isDestroyed && sumDropped > 0) {
      //   console.error('============= NEED TWO LIST ITEMS ==============')
      // }
      // const sum = isDestroyed ? sumDestroyed : sumDropped
      // const count = isDestroyed ? sumDestroyed : sumDropped
      return (
        <ListItem
          key={`${type}-${isDestroyed}`}
          isMobile={isMobile}
          type={type}
          count={count}
          totalSum={sum}
          singleton={singleton}
          isDestroyed={isDestroyed}
        />
      )
    })
  }

  return (
    <Root>
      <Header onClick={handleToggleCollapsed}>
        Items Dropped / Destroyed
        &nbsp;
        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Header>

      <SortHeader>
        <SortableColumn
          field='type'
          title='Item Type'
          onClick={handleSortBy}
          sortBy={sortBy}
        />
        <Digits>
          <SortableColumn
            as={Count}
            field='count'
            title='Quantity'
            onClick={handleSortBy}
            sortBy={sortBy}
          />
          <SortableColumn
            as={Sum}
            field='sum'
            title='Price (ISK)'
            onClick={handleSortBy}
            sortBy={sortBy}
          />
        </Digits>
      </SortHeader>

      {(sortBy && !collapsed)
        ? renderOrdered()
        : renderGrouped()
      }

      <ItemGroup>
        <ItemGroupTitle>
          <h4>Ship</h4>
        </ItemGroupTitle>
        <ListItem type={vict.ship} count={1} prices={prices} isDestroyed isMobile={isMobile} />
      </ItemGroup>
      {/*
        TODO: <h4>Fitted</h4>
        TODO: <h4>Cargo</h4>
      */}

      <TotalRow>
        <h4>Destroyed:</h4>
        <Sum style={colorRed}>
          {FormatUtils.formatRaw(items.destroyed + items.ship)}
        </Sum>
      </TotalRow>
      <TotalRow>
        <h4>Dropped:</h4>
        <Sum style={colorGreen}>
          {FormatUtils.formatRaw(items.dropped)}
        </Sum>
      </TotalRow>
      <TotalRow>
        <h4>Total:</h4>
        <Sum>{FormatUtils.formatRaw(items.total)}</Sum>
      </TotalRow>

      <div />
    </Root>
  )
}

export default ItemsList
