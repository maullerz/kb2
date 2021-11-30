import React, { useState } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import * as SdeUtils from 'utils/SdeUtils'
import * as FormatUtils from 'utils/FormatUtils'

import ListItem from './ListItem'
import ItemFlagGroup from './ItemFlagGroup'
import SortableColumn from './SortableColumn'
import { Digits } from './ListItem/styles'
import { ItemGroup, ItemGroupTitle } from './ItemFlagGroup/styles'
import { Root, Header, Line, SortHeader, TotalRow, CountHead, SumHead } from './styles'

// CHECK: http://localhost:3000/kill/87028891/

// TODO: Save/Load "Collapsed" to localStorage

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

const DEBUG = false

const ItemsList = ({ kmData }) => {
  // TODO: useReducer
  const [collapsed, setCollapsed] = useState(false)
  const [sortBy, setSortBy] = useState(null)
  const [orderedItems, setOrderedItems] = useState(null)
  const { vict, prices } = kmData
  // const { cnts = [] } = vict
  const isMobile = useMediaQuery('(max-width: 767px)')

  // const items = SdeUtils.parseKillmailItems(vict, prices)
  const items = kmData.parsedItems

  if (DEBUG) {
    const { rawList, rawDict, ...rest } = items
    console.log('items:', JSON.stringify(rest, null, 2))
  }
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
    // console.log('orderedItems:', orderedItems.slice(0, 5))
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
          key={`${type}-${isDestroyed}-${!!singleton}`}
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
        <Line />
        &nbsp;
        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Header>

      {!collapsed &&
        <SortHeader>
          <SortableColumn
            field='type'
            title='Item Type'
            onClick={handleSortBy}
            sortBy={sortBy}
          />
          <Digits>
            <SortableColumn
              as={CountHead}
              field='count'
              title='Quantity'
              onClick={handleSortBy}
              sortBy={sortBy}
            />
            <SortableColumn
              as={SumHead}
              field='sum'
              title='Price (ISK)'
              onClick={handleSortBy}
              sortBy={sortBy}
            />
          </Digits>
        </SortHeader>
      }

      {(sortBy && !collapsed)
        ? renderOrdered()
        : renderGrouped()
      }

      <ItemGroup>
        <ItemGroupTitle isCollapsed={collapsed}>
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
        <SumHead style={colorRed}>
          {FormatUtils.formatRaw(items.destroyed + items.ship)}
        </SumHead>
      </TotalRow>
      <TotalRow>
        <h4>Dropped:</h4>
        <SumHead style={colorGreen}>
          {FormatUtils.formatRaw(items.dropped)}
        </SumHead>
      </TotalRow>
      <TotalRow>
        <h4>Total:</h4>
        <SumHead>{FormatUtils.formatRaw(items.total)}</SumHead>
      </TotalRow>

      <div />
    </Root>
  )
}

export default ItemsList
