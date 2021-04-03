import React from 'react'
import { getCharUrl } from 'utils/KillmailUtils'

import { CharIconContainer } from './styles'

const CharIcon = ({ id, mini, corp }) => {
  let icon
  if (!id && corp) {
    // TODO: NPC corps like Triglav etc...
    icon = (
      <img
        width='80'
        height='80'
        alt='charID-undefined-corp'
        src={`https://images.evetech.net/corporations/${corp}/logo?size=64`}
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
  return (
    <CharIconContainer mini={mini} corpBorder={!id && corp}>
      {icon}
    </CharIconContainer>
  )
}

export default React.memo(CharIcon)
