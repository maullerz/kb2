/* eslint no-unused-vars: off */
import React, { useEffect } from 'react'
import { useMediaQuery } from '@react-hook/media-query'

import { Container } from './styles'

const LIST_SLOT = '9463018630'

const SLOTS = {
  list: '9463018630',
  killmail: '9454445621',
  // alliance: '5131879624',
  // corp: '7797022673',
  // char: '4145745796',
  // ship: '2832664125',
  // preset: '9398072471',
  // group: '1938740075',
  // system: '2057610831',
  // region: '4013883850',
}

const isDev = process.env.NODE_ENV === 'development'
const inlineBlock = { display: 'inline-block' }

function getSlot(type) {
  return SLOTS[type] || LIST_SLOT
}

const AdsGoogle = ({ type }) => {
  const isMobile = useMediaQuery('(max-width: 500px)')

  const slot = getSlot(type)
  if (!slot) {
    console.error('undefined SLOT:', type)
  }

  useEffect(() => {
    if (!isDev) {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [])

  if (isDev) {
    return (
      <Container>
        <ins
          style={inlineBlock}
          className='background'
        />
      </Container>
    )
  }

  if (isMobile) {
    return (
      <Container>
        <ins
          style={inlineBlock}
          className='adsbygoogle'
          data-ad-client='ca-pub-3299420347078208'
          data-ad-slot={slot}
          data-ad-format='auto'
          data-full-width-responsive='true'
        />
      </Container>
    )
  }

  return (
    <Container>
      <ins
        style={inlineBlock}
        className='adsbygoogle'
        data-ad-client='ca-pub-3299420347078208'
        data-ad-slot={slot}
      />
    </Container>
  )
}

export default AdsGoogle
