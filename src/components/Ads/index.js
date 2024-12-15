import React from 'react'
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

import AdsGoogle from './AdsGoogle'
import AdsYandex from './AdsYandex'
import { Container } from './styles'

const isDev = process.env.NODE_ENV === 'development'
const inlineBlock = { display: 'inline-block' }
// const GEO_CODE = 'gcode'
// const GEO_TS = 'gts'
// const CACHE_TTL = 3 * 24 * 60 * 60 * 1000 // 3 days
// const YANDEX_CODES = ['BY', 'RU', 'CN']
const provider = 'yandex'

const Ads = ({ type }) => {
  // const [provider, setProvider] = useState('')

  // useEffect(async () => {
  //   async function getProvider() {
  //     try {
  //       let savedGeocode = localStorage.getItem(GEO_CODE)
  //       const savedTs = localStorage.getItem(GEO_TS)
  //       const timeSinceLastCheck = Date.now() - savedTs
  //       // console.log('timeSinceLastCheck:', timeSinceLastCheck, CACHE_TTL)
  //       if (timeSinceLastCheck > CACHE_TTL) {
  //         savedGeocode = undefined
  //       }

  //       if (savedGeocode) {
  //         const isYandex = YANDEX_CODES.includes(savedGeocode)
  //         setProvider(isYandex ? 'yandex' : 'google')
  //         return
  //       }

  //       // Broken:
  //       // const res = await axios.get('https://geolocation-db.com/json/')
  //       // {"country_code":"BY","country_name":"Belarus","city":null,"postal":null,"latitude":53,"longitude":28,"IPv4":"178.127.75.35","state":null}

  //       const res = await axios.get('https://api.country.is/')
  //       // {"ip":"178.127.120.40","country":"BY"}

  //       if (res?.data?.country) {
  //         const geocode = res?.data?.country
  //         localStorage.setItem(GEO_CODE, geocode)
  //         localStorage.setItem(GEO_TS, Date.now())
  //         if (YANDEX_CODES.includes(geocode)) {
  //           setProvider('yandex')
  //         }
  //       } else {
  //         setProvider('google')
  //       }
  //     } catch (e) {
  //       console.error('getProvider:', e)
  //     }
  //   }

  //   getProvider()
  // }, [])

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

  if (!provider) {
    return null
  }

  return provider === 'google' ? <AdsGoogle type={type} /> : <AdsYandex type={type} />
}

export default Ads
