import React from 'react'
import useMediaQuery from 'react-hook-media-query'

import { getAllyUrl, getCorpUrl } from 'utils/KillmailUtils'

import { OrgIconContainer, Image } from './styles'

const emptyUrl = 'https://images.evetech.net/corporations/1/logo?size=64'

const isProd = process.env.NODE_ENV === 'production'

const OrgIcon = ({ ally, corp, mini, names }) => {
  const isDesktop = useMediaQuery('(min-width: 728px)')
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
    if (!names) {
      if (isProd) return undefined
      return ally
        ? `ally: ${ally}`
        : `corp: ${corp}`
    }
    if (isProd) {
      return ally
        ? `${names.allys[ally]}`
        : `corporation: ${names.corps[corp]}`
    }
    return ally
      ? `${ally}: ${names.allys[ally]}`
      : `corp-${corp}: ${names.corps[corp]}`
  }

  return (
    <OrgIconContainer mini={mini || !isDesktop} data-tip={getTooltipString()}>
      <Image src={iconUrl} mini={mini || !isDesktop} alt={alt} />
    </OrgIconContainer>
  )
}

export default OrgIcon

// const Img = ({ alt, iconUrl, mini }) => (
//   <img
//     alt={alt}
//     src={iconUrl}
//     width={mini ? 24 : 48}
//     className={styles.icon}
//   />
// )

// const emptyUrl = 'https://images.evetech.net/corporations/1/logo?size=64'

// const EmptyImg = ({ mini, empty }) => (
//   <div className={cn(styles.iconCont, mini && styles.mini, empty && styles.empty)}>
//     {!empty && <Img alt='no-logo' iconUrl={emptyUrl} mini={mini} />}
//   </div>
// )

// class AllyIcon extends PureComponent {
//   getTooltipContent() {
//     const { allyID, corpID, names } = this.props
//     if (!names) {
//       return allyID
//         ? `ally: ${allyID}`
//         : `corp: ${corpID}`
//     }
//     if (process.env.NODE_ENV === 'production') {
//       return allyID
//         ? `${names.allys[allyID]}`
//         : `corporation: ${names.corps[corpID]}`
//     }
//     return allyID
//       ? `${allyID}: ${names.allys[allyID]}`
//       : `corp-${corpID}: ${names.corps[corpID]}`
//   }

//   render() {
//     const { allyID, corpID, mini, empty } = this.props
//     if (!allyID && !corpID) return <EmptyImg mini={mini} empty={empty} />

//     const iconUrl = allyID ? getAllyUrl(allyID) : getCorpUrl(corpID)
//     const alt = allyID
//       ? `allyID-${allyID}`
//       : `corpID-${corpID}`

//     return (
//       <div className={cn(styles.iconCont, mini && styles.mini)} title={this.getTooltipContent()}>
//         <Img alt={alt} iconUrl={iconUrl} mini={mini} />
//       </div>
//     )
//   }
// }
