import React, { useEffect } from 'react'

import { Container } from './styles'

const LIST_SLOT = '9463018630'

const SLOTS = {
  list: '9463018630',
  killmail: '9454445621',
  alliance: '5131879624',
  corp: '7797022673',
  char: '4145745796',
  ship: '2832664125',
  preset: '9398072471',
  group: '1938740075',
  system: '2057610831',
  region: '4013883850',
}

const responsiveStyle = { display: 'inline-block' }

function getSlot(type) {
  return SLOTS[type] || LIST_SLOT
  // switch (type) {
  //   case 'killmail':
  //     return KILLMAIL_SLOT
  //   case 'list':
  //   default:
  //     return LIST_SLOT
  // }
}

const Ads = ({ type }) => {
  const slot = getSlot(type)
  if (!slot) {
    console.error('undefined SLOT:', type)
  }

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
