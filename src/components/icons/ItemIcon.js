import React from 'react'
// import useMediaQuery from 'react-hook-media-query'

import { getIconUrl, getUnknownItemUrl } from 'utils/KillmailUtils'
import { getTypeName, getGroupName } from 'utils/SdeUtils'

import { ItemIconContainer, Image } from './styles'

const ItemIcon = ({ id, mini, singleton, tooltip }) => {
  const isDesktop = true // useMediaQuery('(min-width: 728px)')

  const iconUrl = id
    ? getIconUrl(id, singleton)
    : getUnknownItemUrl()

  const tip = tooltip && id
    ? `${getTypeName(id)}<br />(${getGroupName(id)})`
    : undefined

  return (
    <ItemIconContainer mini={mini || !isDesktop} data-tip={tip}>
      <Image src={iconUrl} mini={mini || !isDesktop} />
    </ItemIconContainer>
  )
}

export default React.memo(ItemIcon)
