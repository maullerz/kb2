import React from 'react'
import { Link } from 'react-router-dom'

import { getCharUrl } from 'utils/KillmailUtils'

import { CharIconContainer } from './styles'

const CharIcon = ({ id, mini, corp, link }) => {
  let icon
  if (!id && corp) {
    // TODO: NPC corps like Triglav etc...
    const corpNpc = 1
    icon = (
      <img
        width='80'
        height='80'
        alt='charID-undefined-corp'
        src={`https://images.evetech.net/corporations/${corpNpc}/logo?size=64`}
      />
    )
  } else {
    const charID = id || 1
    icon = (
      <img
        width='80'
        height='80'
        alt={`charID-${charID}`}
        src={getCharUrl(charID)}
      />
    )
  }

  //  data-tip={tip}
  const node = (
    <CharIconContainer mini={mini}>
      {icon}
    </CharIconContainer>
  )

  if (link && id) {
    const url = `/character/${id}`
    return (
      <Link to={url}>
        {node}
      </Link>
    )
  }

  return node
}

export default React.memo(CharIcon)
