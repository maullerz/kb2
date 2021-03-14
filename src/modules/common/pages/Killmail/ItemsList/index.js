import React, { Fragment, useState } from 'react'
import useMediaQuery from 'react-hook-media-query'
import isEmpty from 'lodash/isEmpty'
import numeral from 'numeral'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import * as SdeUtils from 'utils/SdeUtils'

// import Collapsible from './Collapsible'
import SortableColumn from './SortableColumn'
import ListItem from './ListItem'
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
  const { cnts = [] } = vict
  const isMobile = useMediaQuery('(max-width: 767px)')

  const items = SdeUtils.parseKillmailItems(vict, prices)
  const { high, med, low, rig, sub, subHold, ...rest } = items
  const isCargoEmpty = !Object.keys(rest).map(slotKey => slotKey).includes('Cargo')

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

  function renderItemFlagGroup(flagItems, groupName, containers) {
    if (isEmpty(flagItems) && isEmpty(containers)) return null

    return (
      <ItemGroup key={groupName}>
        <ItemGroupTitle>
          <h4>{groupName}</h4>

          <div>Total: 60,234,345</div>
        </ItemGroupTitle>

        {!collapsed && flagItems.map(item => {
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

        {!collapsed && containers}
      </ItemGroup>
    )
  }

  function renderContainers(flagItems, groupName) {
    // http://localhost:3000/kill/86935694
    // prepare Containers for flag
    let flag
    if (flagItems.length > 0) {
      flag = flagItems[0].flag // eslint-disable-line
    } else {
      flag = groupName === 'Cargo' ? 5 : 1234 // todo: fleet hangar
    }

    const contData = cnts.filter(cont => cont.flag === flag)
    const flagContainers = contData.map((cont, ix) => {
      const count = cont.drop || cont.dstr // TODO: check that not both available
      return (
        <Fragment key={`${cont.type}-${ix}`}>
          <ListItem
            type={cont.type}
            count={count}
            prices={prices}
            isDestroyed={cont.dstr}
            isMobile={isMobile}
          />
          {cont.items.map(item => {
            const [, type, dropped, destroyed, singleton] = item
            return (
              <ListItem
                inContainer
                type={type}
                count={dropped || destroyed}
                prices={prices}
                isDestroyed={!!destroyed}
                key={type}
                singleton={singleton}
                isMobile={isMobile}
              />
            )
          })}
        </Fragment>
      )
    })

    return renderItemFlagGroup(flagItems, groupName, flagContainers)
  }

  function renderGrouped() {
    return (
      <>
        {renderItemFlagGroup(high, 'High Slots')}
        {renderItemFlagGroup(med, 'Medium Slots')}
        {renderItemFlagGroup(low, 'Low Slots')}
        {renderItemFlagGroup(rig, 'Rig Slots')}
        {renderItemFlagGroup(sub, 'SubSystem Slots')}
        {renderItemFlagGroup(subHold, 'Subsystem Hold')}

        {Object.keys(rest).map(slotKey => {
          if (!Array.isArray(rest[slotKey]) || slotKey === 'rawList') {
            return null
          }
          if (cnts.length > 0 && slotKey === 'Cargo') { // + fleet hangar, + ... ?
            return renderContainers(rest[slotKey], slotKey)
          }
          return renderItemFlagGroup(rest[slotKey], slotKey)
        })}
        {isCargoEmpty && renderContainers([], 'Cargo')}
      </>
    )
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
    const orderedItems = getSortedList(sortBy, rest.rawList)
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
        <Sum style={colorRed}>{formatRaw(items.destroyed)}</Sum>
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
