import React from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'

import { Href } from 'components'
import * as SsoService from 'modules/market/api/SsoService'

import { Root } from './styles'

const url = 'https://login.eveonline.com/v2/oauth/authorize/'

const params = {
  response_type: 'code',
  scope: SsoService.SCOPE,
  redirect_uri: encodeURIComponent('http://localhost:3000/callback/'),
  client_id: 'be7969729e31432f8b9192b94db5ae2b',
  state: 'xyzABC123', // against CSRF
}

// http://localhost:3000/callback/?code=Q9GVRicphkaceP82b0ejyw&state=xyzABC123

const CCP_REDIRECT_URL = `${url}?${qs.stringify(params, { encode: false })}`

/*

ORDERS in Structure:
[
  {
    "duration": 90,
    "is_buy_order": false,
    "issued": "2021-02-26T13:29:17Z",
    "location_id": 1031787606461,
    "min_volume": 1,
    "order_id": 5936152578,
    "price": 48170000,
    "range": "region",
    "type_id": 17924,
    "volume_remain": 1,
    "volume_total": 1
  },

*/

function Orders() {
  const formRef = React.useRef(null)
  const [accessToken, setAccessToken] = React.useState(null)

  console.log('accessToken:', accessToken)

  // React.useEffect(() => {

  // })
  function submit() {
    formRef.current && formRef.current.submit()
  }

  async function refresh() {
    const res = await SsoService.refreshToken()
    console.log('res.data:', res.data)
    if (res?.data?.access_token) {
      localStorage.setItem('access_token', res.data.access_token)
      setAccessToken(res.data.access_token)
    }
  }

  return (
    <Root>
      Orders

      <button onClick={refresh}>
        refresh
      </button>

      <form
        action={CCP_REDIRECT_URL}
        method='post'
        ref={formRef}
        style={{ minHeight: 200 }}
      >
        <div>
          we should show some InProgress indication here
          because it is not instant, otherwise user will see weird empty form
        </div>
        {/* <Spinner isTransparent /> */}

        {Object.keys(params).map(key => (
          <input
            type='hidden'
            name={key}
            value={params[key]}
            key={key}
          />
        ))}
      </form>

      <button onClick={submit}>
        submit
      </button>
    </Root>
  )
}

export default Orders
