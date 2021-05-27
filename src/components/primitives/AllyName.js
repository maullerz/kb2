import React from 'react'
import { Link } from 'react-router-dom'

import { AllyName as Name } from './styles'

const AllyName = ({ id, name }) => {
  return (
    <Name>
      <Link to={`/alliance/${id}`}>
        {name}
      </Link>
    </Name>
  )
}

export default AllyName
