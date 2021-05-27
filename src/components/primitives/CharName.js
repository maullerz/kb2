import React from 'react'
import { Link } from 'react-router-dom'

import { CharName as Name, CharShipName } from './styles'

const CharName = ({ id, name, ship }) => {
  const shipStr = ` (${ship})`
  return (
    <Name>
      <Link to={`/character/${id}`}>
        {name}
      </Link>
      {ship &&
        <CharShipName>{shipStr}</CharShipName>
      }
    </Name>
  )
}

export default CharName
