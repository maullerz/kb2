import React from 'react'
import { Link } from 'react-router-dom'

import { getCharUrl, getCorpUrl } from 'utils/KillmailUtils'

import { CharIconContainer, miniSize } from './styles'

const CharIcon = ({ id, mini, corp, link }) => {
  let icon
  const size = mini ? miniSize : 80

  if (!id && corp) {
    // TODO: NPC corps like Triglav etc...
    // This is not only NPC - its also when structure involved
    // http://localhost:4001/kill/92989028 {char: 0, corp: 1346499997, ally: 0, fctn: 0, ship: 12235, …}
    // const corpNpc = 1
    icon = (
      <img
        width={size}
        height={size}
        alt='charID-undefined-corp'
        src={getCorpUrl(corp, 256)}
      />
    )
  } else {
    const charID = id || 1
    icon = (
      <img
        width={size}
        height={size}
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
