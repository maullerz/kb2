import React from 'react'
// import useMediaQuery from 'react-hook-media-query'

import { getAllyUrl, getCorpUrl } from 'utils/KillmailUtils'

import { OrgIconContainer, Image } from './styles'

const emptyUrl = 'https://images.evetech.net/corporations/1/logo?size=64'

const isProd = process.env.NODE_ENV === 'production'

const OrgIcon = ({ ally, corp, mini, names, nameObj }) => {
  const isDesktop = true // useMediaQuery('(min-width: 728px)')

  if (!ally && !corp) {
    return (
      <OrgIconContainer mini={mini || !isDesktop}>
        <Image mini={mini || !isDesktop} empty src={emptyUrl} />
      </OrgIconContainer>
    )
  }

  const iconUrl = ally ? getAllyUrl(ally) : getCorpUrl(corp)
  const alt = ally
    ? `ally-${ally}`
    : `corp-${corp}`

  function getTooltipString() {
    if (nameObj) return nameObj.name

    if (!names) {
      if (isProd) return undefined
      return ally
        ? `ally: ${ally}`
        : `corp: ${corp}`
    }
    if (isProd) {
      return ally
        ? `${names.allys[ally]}`
        : `${names.corps[corp]}`
    }
    return ally
      ? `${names.allys[ally]}`
      : `${names.corps[corp]}`
    // return ally
    //   ? `${ally}: ${names.allys[ally]}`
    //   : `corp-${corp}: ${names.corps[corp]}`
  }

  return (
    <OrgIconContainer mini={mini || !isDesktop} data-tip={getTooltipString()}>
      <Image src={iconUrl} mini={mini || !isDesktop} alt={alt} />
    </OrgIconContainer>
  )
}

export default React.memo(OrgIcon)
