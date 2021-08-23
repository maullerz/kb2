import React from 'react'
// import qs from 'qs'
import { Link, useHistory, useLocation } from 'react-router-dom'

// import { Href } from 'components'
import * as SsoService from 'modules/market/api/SsoService'

import { Root } from './styles'

function CallbackRoute() {
  // const formRef = React.useRef(null)
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const code = query.get('code')
  const state = query.get('state')

  console.log('code:', code)
  console.log('state:', state)

  async function submit() {
    try {
      const res = await SsoService.getToken(code)
      console.log('res.data:', res.data)
      if (res?.data?.access_token) {
        localStorage.setItem('access_token', res.data.access_token)
      }
      if (res?.data?.refresh_token) {
        localStorage.setItem('refresh_token', res.data.refresh_token)
      }
    } catch (e) {
      console.error('SsoService.getToken:', e)
    } finally {
      // remove query string
      history.push('/callback')
    }
  }

  React.useEffect(() => {
    // TODO: is state === stateInProgress
    if (code) {
      submit()
    }
  }, [code])

  return (
    <Root>
      CallbackRoute
      <Link to='/orders'>
        goto Orders
      </Link>
    </Root>
  )
}

export default CallbackRoute
