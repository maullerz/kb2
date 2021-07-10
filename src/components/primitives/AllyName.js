import React from 'react'
import { Link } from 'react-router-dom'

import { AllyName as Name, CorpName } from './styles'

const AllyName = ({ id, name }) => {
  if (id === 'unaffiliated') {
    return (
      <CorpName>
        - (not in alliance)
      </CorpName>
    )
  }

  return (
    <Name>
      <Link to={`/alliance/${id}`}>
        {name}
      </Link>
    </Name>
  )
}

export default AllyName
