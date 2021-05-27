import React from 'react'
import { Link } from 'react-router-dom'

import { CharName as Name } from './styles'

const CharName = ({ id, name }) => {
  return (
    <Name>
      <Link to={`/character/${id}`}>
        {name}
      </Link>
    </Name>
  )
}

export default CharName
