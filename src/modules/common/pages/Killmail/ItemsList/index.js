import React, { useState } from 'react'
import useMediaQuery from 'react-hook-media-query'
import numeral from 'numeral'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import * as SdeUtils from 'utils/SdeUtils'

// import Collapsible from './Collapsible'
import ListItem from './ListItem'
import ItemFlagGroup from './ItemFlagGroup'
import SortableColumn from './SortableColumn'
import { Digits, Count, Sum } from './ListItem/styles'
import { Root, Header, SortHeader, ItemGroup, ItemGroupTitle, TotalRow } from './styles'

// CHECK: https://zkillboard.com/kill/87028891/

const formatRaw = sum => numeral(sum).format('0,0')

const colorRed = { color: 'var(--colorRed)' }
const colorGreen = { color: 'var(--colorGreen)' }

const ItemsList = ({ kmData }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [sortBy, setSortBy] = useState(null)
  const { vict, prices } = kmData
  // const { cnts = [] } = vict
  const isMobile = useMediaQuery('(max-width: 767px)')

  // console.log('vict:', JSON.stringify(vict, null, 2))

  // const items = SdeUtils.parseKillmailItems(vict, prices)
  const items = kmData.parsedItems
  // const { high, med, low, rig, sub, subHold, ...rest } = items
  // const isCargoEmpty = !Object.keys(rest).map(slotKey => slotKey).includes('Cargo')

  function handleSortBy(field) {
    if (sortBy && sortBy.field === field) {
      if (sortBy.order === 'ASC') {
        setSortBy(null)
      } else {
        setSortBy({ field, order: 'ASC' })
      }
    } else {
      setSortBy({ field, order: 'DESC' })
    }
  }

  function handleToggleCollapsed() {
    setCollapsed(!collapsed)
  }

  function renderGrouped() {
    items.conts.forEach(cont => {
      const { items: tmp, ...rest } = cont
      console.log('cont:', JSON.stringify({ ...rest, itemsCount: tmp.length }, null, 2))
    })
    return items.flagGroupsArray.map((group, ix) => {
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

  function renderOrdered() {
    const orderedItems = getSortedList(sortBy, items.rawList)
    // console.log('orderedItems:', orderedItems)
    return orderedItems.map(item => {
      const { flag, type, count, sum, singleton, isDestroyed } = item
      return (
        <ListItem
          key={`${type}-${flag}-${isDestroyed}`}
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
          title='ItemType'
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
            title='Price'
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

      <TotalRow>
        <h4>Destroyed:</h4>
        <Sum style={colorRed}>{formatRaw(items.destroyed + items.ship)}</Sum>
      </TotalRow>
      <TotalRow>
        <h4>Dropped:</h4>
        <Sum style={colorGreen}>{formatRaw(items.dropped)}</Sum>
      </TotalRow>
      <TotalRow>
        <h4>Total:</h4>
        <Sum>{formatRaw(items.total)}</Sum>
      </TotalRow>

      <div />
    </Root>
  )
}

export default ItemsList
