import React from 'react'

import Spinner from 'components/Spinner'

import { Root, Title, Descr } from './styles'

const NoContent = ({ title, descr, className, isLoading }) => {
  return (
    <Root className={className}>
      {isLoading && <Spinner />}
      {!isLoading &&
        <>
          <Title>{title}</Title>
          <Descr>{descr}</Descr>
        </>
      }
    </Root>
  )
}

// import { useLocation } from 'react-router-dom'
// const NoContent = ({ title, descr, customIcon, className, iconSize, iconOpacity }) => {
//   const location = useLocation()
//   const tab = location.pathname.split('/').reverse()[0]
//   const icon = tab === 'projects' ? 'details' : tab

//   return (
//     <Root className={className}>
//       <StyledIcon icon={customIcon || icon} size={iconSize} opacity={iconOpacity} noWrapper custom={!!customIcon} />
//       <Title>{title}</Title>
//       <Descr>{descr}</Descr>
//     </Root>
//   )
// }

export default NoContent
