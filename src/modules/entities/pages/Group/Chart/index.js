import React, { useState } from 'react'
import { format } from 'date-fns'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

import * as SdeUtils from 'utils/SdeUtils'

import { Root } from './styles'
import rawData from './marauders7days.json'

const ships = {}

const data1 = rawData.map(({ _id: { ship, day }, total }) => {
  ships[ship] = ships[ship] || 1
  ships[ship] += 1
  return {
    day: format(day * 1000, 'yyyy-MM-dd'),
    name: 'TODO', // SdeUtils.getTypeName(ship),
    ship,
    total,
    // total,
  }
})

let data = {}
data1.forEach(it => {
  data[it.day] = data[it.day] || {}
  data[it.day][it.name] = it.total
})

data = Object.keys(data).map(day => {
  const result = {
    day,
    Golem: data[day].Golem || 0,
    Kronos: data[day].Kronos || 0,
    Paladin: data[day].Paladin || 0,
    Vargur: data[day].Vargur || 0,
  }
  result.total = result.Golem + result.Kronos + result.Paladin + result.Vargur
  return result
})
console.log('data:', data)

const Chart = () => {
  return (
    <Root>
      Lost Ships For last 7 days
      <LineChart width={1000} height={300} data={data}>
        <Line type='monotone' dataKey='Paladin' stroke='#8884d8' />
        <Line type='monotone' dataKey='Vargur' stroke='#82ca9d' />
        <Line type='monotone' dataKey='Golem' stroke='#F6DB81' />
        <Line type='monotone' dataKey='Kronos' stroke='#F87E7E' />
        <Line type='monotone' dataKey='total' stroke='#FFFFFF' />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='day' />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: 'var(--mainLayoutWorkspaceBackground)' }} />
        <Legend />
      </LineChart>
    </Root>
  )
}

export default Chart
