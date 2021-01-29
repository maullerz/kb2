import React from 'react'
import useMediaQuery from 'react-hook-media-query'

import { getIconUrl, getUnknownItemUrl } from 'utils/KillmailUtils'
import { getTypeName } from 'utils/SdeUtils'

import { IconContainer, Image } from './styles'

const ItemIcon = ({ id, mini, singleton, tooltip }) => {
  const isDesktop = useMediaQuery('(min-width: 728px)')
  const iconUrl = id
    ? getIconUrl(id, singleton)
    : getUnknownItemUrl()
  const tip = tooltip
    ? getTypeName(id)
    : undefined

  return (
    <IconContainer mini={mini || !isDesktop} data-tip={tip}>
      <Image src={iconUrl} mini={mini || !isDesktop} />
    </IconContainer>
  )
}

// const ItemIcon = ({ id, mini, singleton, tooltip }) => {
//   let icon
//   if (!id) {
//     icon = (
//       <img
//         className={styles.itemIcon}
//         // alt='typeID-undefined-ship'
//         src={getUnknownItemUrl()}
//       />
//     )
//   } else {
//     icon = (
//       <img
//         className={styles.itemIcon}
//         src={getIconUrl(id, singleton)}
//         // alt={`typeID-${id}`}
//         // title={id}
//       />
//     )
//   }

//   const tip = tooltip ? getTypeName(id) : undefined

//   return (
//     <div className={cx(styles.itemIconCont, mini && styles.mini)} data-tip={tip}>
//       {icon}
//     </div>
//   )
// }

export default ItemIcon
