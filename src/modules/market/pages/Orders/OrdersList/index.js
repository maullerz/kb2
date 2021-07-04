import React, { useState, useEffect } from 'react'

import MarketService from 'modules/market/api/MarketService'
import * as SdeUtils from 'utils/SdeUtils'
import * as FormatUtils from 'utils/FormatUtils'
import ItemIcon from 'components/icons/ItemIcon'
import { Spinner } from 'components'

import { Root } from './styles'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
/*

CHAR ORDERS:
"duration": 90,
"is_buy_order": false,
"issued": "2021-02-26T13:29:17Z",
"location_id": 1031787606461,
"min_volume": 1,
"order_id": 5936152578,
"price": 48170000,
"range": "region",
"type_id": 17924,
"volume_remain": 1,
"volume_total": 1

STRUCTURE ORDERS:
 duration: 90
 is_buy_order: false
 issued: "2021-05-22T17:52:55Z"
 location_id: 1031787606461
 min_volume: 1
 order_id: 6005621400
 price: 70000000
 range: "region"
 type_id: 24283
 volume_remain: 7
 volume_total: 14
*/

const alignRight = { textAlign: 'right' }
const greenStyle = { textAlign: 'right', color: 'green' }
const redStyle = { textAlign: 'right', color: 'red' }

const OrdersList = ({ onRefresh }) => {
  const [orders, setOrders] = useState(null)
  const [structureOrders, setStructureOrders] = useState(null)

  async function refreshStructureOrders() {
    try {
      let allOrders = []
      let page = 1

      const response = await MarketService.getStructureMarketOrders(page)
      let pageData = response.data
      allOrders = allOrders.concat(pageData.filter(item => !item.is_buy_order))
      while (pageData.length === 1000) {
        page += 1
        const { data } = await MarketService.getStructureMarketOrders(page)
        if (data) {
          allOrders = allOrders.concat(data.filter(item => !item.is_buy_order))
        }
        pageData = data
      }
      console.log('allOrders.length:', allOrders.length)

      let retry = 0
      while (!orders && retry < 5) {
        console.log('my order uninitialized... retry:', retry)
        await sleep(500)
        retry += 1
      }

      if (orders) {
        allOrders = allOrders.filter(item => {
          const matched = orders.find(order => order.order_id === item.order_id)
          return !matched
        })
        console.log('allOrders.length without mine:', allOrders.length)
      }
      setStructureOrders(allOrders)
    } catch (e) {
      console.error('refreshStructureOrders:', e)
    }
  }

  async function refreshCharOrders() {
    try {
      const { data } = await MarketService.getCharMarketOrders()
      const preparedData = data
        .filter(item => !item.is_buy_order)
        // .sort((a, b) => (b.type_id - a.type_id))
        // .sort((a, b) => (b.price - a.price))
        .sort((a, b) => {
          const nameA = SdeUtils.getTypeName(a.type_id)
          const nameB = SdeUtils.getTypeName(b.type_id)
          let result = nameA.localeCompare(nameB)
          // nameB.localeCompare(nameA)
          if (result === 0) {
            result = a.price - b.price
          }
          return result
        })
      setOrders(preparedData)
    } catch (e) {
      console.error('refreshCharOrders:', e)
    }
  }

  function getTypeOrders(typeID) {
    const typeOrders = structureOrders
      .filter(order => order.type_id === typeID)
      .sort((a, b) => (a.price - b.price))
    // console.log(' first:', typeOrders[0].price)
    // console.log('second:', typeOrders[typeOrders.length - 1].price)
    return typeOrders
  }

  async function refreshAll() {
    await onRefresh()
    await refreshCharOrders()
    await refreshStructureOrders()
  }

  useEffect(() => {
    refreshAll()
  }, [])

  if (!orders || !structureOrders) {
    return <Spinner />
  }

  let currTypeID = null

  return (
    <Root>
      <table>
        <thead>
          <tr>
            <th>Icon</th>
            <th style={alignRight}>Amount</th>
            <th>Name</th>
            <th style={alignRight}>Price</th>
            <th style={alignRight}>LowestPrice</th>
            <th style={alignRight}>Orders</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(item => {
            const typeOrders = getTypeOrders(item.type_id)
            const lowestPrice = typeOrders.length > 0 ? typeOrders[0].price : 0
            const isMyLowest = lowestPrice >= item.price || lowestPrice === 0

            let currStyle = { opacity: 0.2 } // undefined
            if (item.type_id !== currTypeID) {
              // currStyle = { background: 'rgb(34, 34, 34, 0.5)' }
              currStyle = undefined
            }
            currTypeID = item.type_id

            const myPriceStyle = currStyle
              ? alignRight
              : isMyLowest ? greenStyle : redStyle

            return (
              <tr key={item.order_id} style={currStyle}>
                <td>
                  <ItemIcon id={item.type_id} mini />
                </td>
                <td style={alignRight}>
                  {`${item.volume_remain} / ${item.volume_total}`}
                </td>
                <td>{SdeUtils.getTypeName(item.type_id)}</td>

                <td style={myPriceStyle}>
                  {FormatUtils.formatRaw(item.price)}
                </td>
                <td style={alignRight}>
                  {currStyle ? null : FormatUtils.formatRaw(lowestPrice)}
                </td>
                <td style={alignRight}>
                  {currStyle ? null : typeOrders.length}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </Root>
  )
}

export default OrdersList
