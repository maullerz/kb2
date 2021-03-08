import React from 'react'
import { getCharUrl } from 'utils/KillmailUtils'

import { IconContainer } from './styles'

const CharIcon = ({ id, mini, corpID }) => {
  let icon
  if (!id && corpID) {
    // TODO: NPC corps like Triglav etc...
    icon = (
      <img
        width='70'
        height='70'
        alt='charID-undefined-corpID'
        src={`https://images.evetech.net/corporations/${corpID}/logo?size=64`}
      />
    )
  } else {
    const charID = id || 1
    icon = (
      <img
        width='70'
        height='70'
        alt={`charID-${charID}`}
        src={getCharUrl(charID)}
      />
    )
  }

  //  data-tip={tip}
  return (
    <IconContainer mini={mini}>
      {icon}
    </IconContainer>
  )
}

export default CharIcon
