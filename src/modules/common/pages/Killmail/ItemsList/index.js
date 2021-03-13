import React, { Fragment, useState } from 'react'
import useMediaQuery from 'react-hook-media-query'
import isEmpty from 'lodash/isEmpty'
import numeral from 'numeral'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import * as SdeUtils from 'utils/SdeUtils'

// import Collapsible from './Collapsible'
import ListItem from './ListItem'
import { Digits, Count, Sum } from './ListItem/styles'
import { Root, Header, SortHeader, ItemGroup, ItemGroupTitle, TotalRow } from './styles'

// CHECK: https://zkillboard.com/kill/87028891/
const formatRaw = sum => numeral(sum).format('0,0')

const colorRed = { color: 'var(--colorRed)' }
const colorGreen = { color: 'var(--colorGreen)' }

const ItemsList = ({ kmData }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [order, setOrder] = useState('type')
  const { vict, prices } = kmData
  const { cnts = [] } = vict
  const isMobile = useMediaQuery('(max-width: 767px)')

  // if (cnts.length > 0) {
  //   console.log('cnts:', cnts.map(cont => cont.flag))
  // }

  // console.log('vict:', vict)

  const items = SdeUtils.parseKillmailItems(vict, prices)
  const { high, med, low, rig, sub, subHold, ...rest } = items
  const isCargoEmpty = !Object.keys(rest).map(slotKey => slotKey).includes('Cargo')
  const orderIcon = <ArrowDropDownIcon />

  function handleSortByType() {
    setOrder('type')
  }

  function handleSortByCount() {
    setOrder('count')
  }

  function handleSortBySum() {
    setOrder('sum')
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

  return (
    <Root>
      <Header onClick={handleToggleCollapsed}>
        Items Dropped / Destroyed
        &nbsp;
        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Header>

      <SortHeader>
        <div onClick={handleSortByType}>
          Item Type
          {order === 'type' && orderIcon}
        </div>
        <Digits>
          <Count onClick={handleSortByCount}>
            Quantity
            {order === 'count' && orderIcon}
          </Count>
          <Sum onClick={handleSortBySum}>
            Price
            {order === 'sum' && orderIcon}
          </Sum>
        </Digits>
      </SortHeader>

      {renderItemFlagGroup(high, 'High Slots')}
      {renderItemFlagGroup(med, 'Medium Slots')}
      {renderItemFlagGroup(low, 'Low Slots')}
      {renderItemFlagGroup(rig, 'Rig Slots')}
      {renderItemFlagGroup(sub, 'SubSystem Slots')}
      {renderItemFlagGroup(subHold, 'Subsystem Hold')}

      {Object.keys(rest).map(slotKey => {
        if (cnts.length > 0 && slotKey === 'Cargo') { // + fleet hangar, + ... ?
          return renderContainers(rest[slotKey], slotKey)
        }
        return renderItemFlagGroup(rest[slotKey], slotKey)
      })}
      {isCargoEmpty && renderContainers([], 'Cargo')}

      {/*
      <div>
        <div>Dropped: {formatRaw(items.dropped)}</div>
        <div>Destroyed: {formatRaw(items.destroyed)}</div>
        <div>Ship: {formatRaw(items.ship)}</div>
        <div>Total: {formatRaw(items.total)}</div>
      </div>
      */}

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
