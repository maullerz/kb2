import React from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'

import { Href } from 'components'
import * as SsoService from 'modules/market/api/SsoService'

import OrdersList from './OrdersList'
import { Root } from './styles'

const url = 'https://login.eveonline.com/v2/oauth/authorize/'

const params = {
  response_type: 'code',
  scope: SsoService.SCOPE,
  redirect_uri: encodeURIComponent('http://localhost:3000/callback/'),
  client_id: 'be7969729e31432f8b9192b94db5ae2b',
  state: 'xyzABC123', // against CSRF
}

// http://localhost:4001/callback/?code=Q9GVRicphkaceP82b0ejyw&state=xyzABC123

// {
//   "access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IkpXVC1TaWduYXR1cmUtS2V5IiwidHlwIjoiSldUIn0.eyJzY3AiOlsicHVibGljRGF0YSIsImVzaS1tYXJrZXRzLnJlYWRfY2hhcmFjdGVyX29yZGVycy52MSIsImVzaS1tYXJrZXRzLnJlYWRfY29ycG9yYXRpb25fb3JkZXJzLnYxIiwiZXNpLW1hcmtldHMuc3RydWN0dXJlX21hcmtldHMudjEiXSwianRpIjoiNThkMWEwOGItMTc4Ni00MzM3LThiN2YtOGRkYjAzMTg2Mjk1Iiwia2lkIjoiSldULVNpZ25hdHVyZS1LZXkiLCJzdWIiOiJDSEFSQUNURVI6RVZFOjkyMzE2MTc4IiwiYXpwIjoiYmU3OTY5NzI5ZTMxNDMyZjhiOTE5MmI5NGRiNWFlMmIiLCJ0ZW5hbnQiOiJ0cmFucXVpbGl0eSIsInRpZXIiOiJsaXZlIiwicmVnaW9uIjoid29ybGQiLCJuYW1lIjoiVGFyeSBOaWdodCIsIm93bmVyIjoiOUVjZnZJTGRoQmZpYWRVeldtMkhnZ0dTNUFZPSIsImV4cCI6MTYyNTM0MTc3NSwiaXNzIjoibG9naW4uZXZlb25saW5lLmNvbSJ9.W-f132sirAJmUnxSuviqRHxA0XXso6r_3elliIWXSrSTyHcKBw9oTusU8TrLA9Ga0Vs1I3cDTfORR_roj_Fycq6444OgFJ2gIJAlAHQI2LgCOlX_kGP3LdoAb8kQojw1dZ8Qy0cVZQ7US46JXioiW8lkcNHpyV2QNa_Ii3b5hok4p5as3Rbyy-adDv97amuHFGz3_-XgYoOMoy4u2OCSNWNBapF2k0ipXawNLvNZzakwa40lu4uxD_N7flXt11hmCgHTyRn0JaR5i-6occKmJUG8cGhum1wGuVo6wAdnGlK0f32nIwImTkbDBRBgXGbzcCEcAlnG12HccJsL7LfJMg",
//   "expires_in":1199,"token_type":"Bearer","refresh_token":"LwY5LNBDy02PQZpBS0quHQ=="
// }

const CCP_REDIRECT_URL = `${url}?${qs.stringify(params, { encode: false })}`

function Orders() {
  const formRef = React.useRef(null)
  const [accessToken, setAccessToken] = React.useState(null)

  console.log('accessToken:', accessToken)

  // React.useEffect(() => {

  // })
  function submit() {
    formRef.current && formRef.current.submit()
  }

  async function refreshToken() {
    const res = await SsoService.refreshToken()
    console.log('res.data:', res.data)
    if (res?.data?.access_token) {
      const nowSec = Math.trunc(Date.now() / 1000)
      const expiresTS = nowSec + res.data.expires_in
      localStorage.setItem('access_token', res.data.access_token)
      localStorage.setItem('expires_in', expiresTS)
      localStorage.setItem('now', nowSec)
      setAccessToken(res.data.access_token)
    }
  }

  async function handleCheckToken() {
    const expiresTS = localStorage.getItem('expires_in')
    const nowSec = Math.trunc(Date.now() / 1000)
    if (nowSec > expiresTS) {
      await refreshToken()
    }
  }

  return (
    <>
      <Root>
        <button onClick={refreshToken}>
          refresh token
        </button>

        <form
          action={CCP_REDIRECT_URL}
          method='post'
          ref={formRef}
          style={{ minHeight: 50 }}
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
      <OrdersList onRefresh={handleCheckToken} />
    </>
  )
}

export default Orders
