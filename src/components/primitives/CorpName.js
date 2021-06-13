import React from 'react'
import { Link } from 'react-router-dom'

import { CorpName as Name } from './styles'

const CorpName = ({ id, name, isFaction }) => {
  // TODO: Faction page and filter
  if (isFaction) {
    return (
      <Name>
        {name}
      </Name>
    )
  }

  return (
    <Name>
      <Link to={`/corporation/${id}`}>
        {name}
      </Link>
    </Name>
  )
}

export default CorpName
