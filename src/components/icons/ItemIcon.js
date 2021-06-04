import React from 'react'
import { Link } from 'react-router-dom'
// import { useMediaQuery } from '@react-hook/media-query'

import { getIconUrl, getUnknownItemUrl } from 'utils/KillmailUtils'
import { getTypeName, getGroupName } from 'utils/SdeUtils'

import { ItemIconContainer, Image } from './styles'

const ItemIcon = ({ id, mini, singleton, tooltip, link, border }) => {
  const isDesktop = true // useMediaQuery('(min-width: 728px)')

  const iconUrl = id
    ? getIconUrl(id, singleton)
    : getUnknownItemUrl()

  const tip = tooltip && id
    ? `${getTypeName(id)}<br />(${getGroupName(id)})`
    : undefined

  const node = (
    <ItemIconContainer mini={mini || !isDesktop} data-tip={tip} border={border}>
      <Image src={iconUrl} mini={mini || !isDesktop} />
    </ItemIconContainer>
  )

  if (link && id) {
    const url = `/ship/${id}`
    return (
      <Link to={url}>
        {node}
      </Link>
    )
  }

  return node
}

export default React.memo(ItemIcon)
