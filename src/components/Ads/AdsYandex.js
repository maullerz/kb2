import React, { useEffect } from 'react'

import { Container } from './styles'

const isDev = process.env.NODE_ENV === 'development'

const Ads = () => {
  useEffect(() => {
    if (!isDev) {
      window.yaContextCb.push(() => {
        window.Ya.Context.AdvManager.render({
          blockId: 'R-A-6858234-1',
          renderTo: 'yandex_rtb_R-A-6858234-1',
        })
      })
    }
  }, [])

  return (
    <Container>
      <ins id='yandex_rtb_R-A-6858234-1' />
    </Container>
  )
}

export default Ads
