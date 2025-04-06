import React from 'react'
import { Link } from 'react-router-dom'

import { getIconUrl, getUnknownItemUrl } from 'utils/KillmailUtils'
import { getTypeName, getGroupName, isShipCategory, getMetaGroup } from 'utils/SdeUtils'

import { ItemIconContainer, Image, MarkTriangle, MarkCont, MarkLine, MarkFrac } from './styles'

const T2Mark = () => (
  <>
    <MarkTriangle type='t2' />
    <MarkCont>
      <MarkLine />
      <MarkLine style={{ left: 1 }} />
    </MarkCont>
  </>
)

const T3Mark = () => (
  <>
    <MarkTriangle type='t3' />
    <MarkCont>
      <MarkLine />
      <MarkLine style={{ left: 1 }} />
      <MarkLine style={{ left: 2 }} />
    </MarkCont>
  </>
)

const FactionMark = () => (
  <>
    <MarkTriangle type='frac' />
    <MarkFrac />
  </>
)

const ItemMark = ({ id }) => {
  if (!isShipCategory(id)) return null

  const metaGroup = getMetaGroup(id)

  switch (metaGroup) {
    case 2:
    // case 53: // Structure Tech II
      return <T2Mark />
    case 4:
      return <FactionMark />
    case 14:
      return <T3Mark />
    default:
      return null
  }
}

const ItemIcon = ({ id, mini, singleton, tooltip, link, border }) => {
  const isDesktop = true // useMediaQuery('(min-width: 768px)')

  const iconUrl = id
    ? getIconUrl(id, singleton)
    : getUnknownItemUrl()

  const tip = tooltip && id
    ? `${getTypeName(id)}<br />(${getGroupName(id)})`
    : undefined

  const node = (
    <ItemIconContainer mini={mini || !isDesktop} data-tip={tip} border={border}>
      <Image src={iconUrl} mini={mini || !isDesktop} />
      {id && <ItemMark id={id} />}
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
