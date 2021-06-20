import React from 'react'
import { Link } from 'react-router-dom'

import { CorpName as Name } from './styles'

const CorpName = ({ id, name, isFaction }) => {
  return (
    <Name>
      <Link to={`/${isFaction ? 'faction' : 'corporation'}/${id}`}>
        {name}
      </Link>
    </Name>
  )
}

export default CorpName
