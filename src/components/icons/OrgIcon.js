import React from 'react'
import { Link } from 'react-router-dom'

import { getAllyUrl, getCorpUrl } from 'utils/KillmailUtils'

import { OrgIconContainer, Image } from './styles'

const emptyUrl = 'https://images.evetech.net/corporations/1/logo?size=64'

const isProd = process.env.NODE_ENV === 'production'

const stopPropagation = event => {
  event.stopPropagation()
}

const OrgIcon = ({ ally, corp, mini, link, names, nameObj, showOrg }) => {
  const isDesktop = true // useMediaQuery('(min-width: 728px)')

  if (!ally && !corp) {
    return (
      <OrgIconContainer mini={mini || !isDesktop}>
        <Image org mini={mini || !isDesktop} empty src={emptyUrl} />
      </OrgIconContainer>
    )
  }

  const iconUrl = ally ? getAllyUrl(ally) : getCorpUrl(corp)
  const alt = ally
    ? `ally-${ally}`
    : `corp-${corp}`

  function getTooltipString() {
    if (nameObj && showOrg) {
      if (ally) return `alliance:<br/>${nameObj.name}`
      return `corporation:<br/>${nameObj.name}`
    }
    if (nameObj) {
      return nameObj.name
    }

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

  const node = (
    <OrgIconContainer mini={mini || !isDesktop} data-tip={getTooltipString()}>
      <Image org src={iconUrl} mini={mini || !isDesktop} alt={alt} />
    </OrgIconContainer>
  )

  if (link) {
    const url = ally ? `/alliance/${ally}` : `/corporation/${corp}`
    return (
      <Link to={url} onClick={stopPropagation}>
        {node}
      </Link>
    )
  }

  return node
}

export default React.memo(OrgIcon)
