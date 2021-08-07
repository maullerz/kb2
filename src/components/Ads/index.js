import React, { useEffect } from 'react'

import { Container } from './styles'

const LIST_SLOT = '9463018630'
const KILLMAIL_SLOT = '9454445621'

const responsiveStyle = { display: 'inline-block' }

function getSlot(type) {
  switch (type) {
    case 'killmail':
      return KILLMAIL_SLOT
    case 'list':
    default:
      return LIST_SLOT
  }
}

const Ads = ({ type }) => {
  const slot = getSlot(type)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return (
      <Container>
        <ins
          style={responsiveStyle}
          className='background'
        />
      </Container>
    )
  }

  return (
    <Container>
      <ins
        style={responsiveStyle}
        className='adsbygoogle'
        data-ad-client='ca-pub-3299420347078208'
        data-ad-slot={slot}
      />
    </Container>
  )
}

export default Ads
