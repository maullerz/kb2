import React, { useEffect } from 'react'
import cx from 'classnames'

import { Container } from './styles'

const inlineBlock = { display: 'inline-block' }

const isDev = process.env.NODE_ENV === 'development'

/*
<!-- Yandex.RTB R-A-6480542-1 -->
<div id="yandex_rtb_R-A-6480542-1"></div>
<script>
window.yaContextCb.push(()=>{
  Ya.Context.AdvManager.render({
    "blockId": "R-A-6480542-1",
    "renderTo": "yandex_rtb_R-A-6480542-1"
  })
})
</script>
*/

const Ads = () => {

  useEffect(() => {
    if (!isDev) {
      window.yaContextCb.push(() => {
        window.Ya.Context.AdvManager.render({
          "blockId": "R-A-6480542-1",
          "renderTo": "yandex_rtb_R-A-6480542-1"
        })
      })
    }
  }, [])

  if (isDev) {
    return (
      <Container>
        <ins
          style={inlineBlock}
          className={cx(styles.background, styles.responsiveIns)}
        />
      </Container>
    )
  }

  return (
    <Container>
      <div id="yandex_rtb_R-A-6480542-1"></div>
    </Container>
  )
}


export default Ads
