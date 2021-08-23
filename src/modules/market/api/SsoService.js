/* eslint no-unused-vars: off, no-nested-ternary: off */
import axios from 'axios'

// 'version': '0.8.1',
// 'author': 'maullerz@gmail.com',

// + /authorize/
// const eve_sso_v2_url = 'https://login.eveonline.com/v2/oauth'
// const eve_sso_url_v2_no_oauth = 'https://login.eveonline.com/v2'

// // Market Orders APP - EveTools
// const eve_sso_client_id = 'be7969729e31432f8b9192b94db5ae2b'
// // Secret Key: sBghn9EMRAeQBCUlYtEhyUbd0r0u0suuGjceeXU5
// // Callback URL: https://localhost/callback/

// const eve_esi_url = 'https://esi.evetech.net'
// const eve_default_data_source = 'tranquility'

// const SCOPES = [
//   {
//     name: 'publicData',
//     description: 'Allows access to public data.',
//   },
//   {
//     name: 'esi-markets.read_character_orders.v1',
//     description: 'Allows reading a character\'s market orders',
//   },
//   {
//     name: 'esi-markets.read_corporation_orders.v1',
//     description: 'Allows reading of a character\'s corporation\'s market orders, if the character has roles to do so.',
//   },
// ]

// https://login.eveonline.com/account/logon?ReturnUrl=/oauth/authorize/
// ?response_type=code
// &redirect_uri=https://zkillboard.com/ccpcallback/
// &client_id=01722d28181c438ebb01e2d92dca7508
// &scope=publicData+esi-killmails.read_killmails.v1+esi-fittings.write_fittings.v1+esi-killmails.read_corporation_killmails.v1
// &state=xiTGpD3y50bRkDockmS5ikApCGJWLe6FRsuWqC21iia5x9HEx4FDgz0iqy866sAZzWY8pCyv2tKAJ2ads2Bou3Md6Y7wwpgOBrMh4CPYGwdTFl7UdfiaG0k4eT6b37cG

// https://login.eveonline.com/account/logon?ReturnUrl=%2Foauth%2Fauthorize%2F
// %3Fresponse_type%3Dcode
// %26redirect_uri%3Dhttps%3A%2F%2Fzkillboard.com%2Fccpcallback%2F
// %26client_id%3D01722d28181c438ebb01e2d92dca7508
// %26scope%3DpublicData%2Besi-killmails.read_killmails.v1%2Besi-fittings.write_fittings.v1%2Besi-killmails.read_corporation_killmails.v1
// %26state%3D0iFD3XU0RrN5oOeJQeGMGKn4izFTVo28J1e5oNnJV3f7tk4Mi0Vq9aMbcu5Bi1pwgvakPyefjIW3uXRySCqNfHury4t5U7S6dggBybAWL7Q35Y4onohsFUFG1iBdRpQe

const API_CALL_TIMEOUT = 20000

const clientId = 'be7969729e31432f8b9192b94db5ae2b'
const secretKey = 'sBghn9EMRAeQBCUlYtEhyUbd0r0u0suuGjceeXU5'
const basicAuthKey = btoa(`${clientId}:${secretKey}`)
// const basicAuthKey = `${clientId}:${secretKey}`
const axiosConfig = {
  timeout: API_CALL_TIMEOUT,
  headers: {
    'Accept': 'application/json;charset=UTF-8',
    'Authorization': `Basic ${basicAuthKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Host': 'login.eveonline.com',
  },
}
const API = axios.create(axiosConfig)

// http://localhost:3000/callback/?code=Q9GVRicphkaceP82b0ejyw&state=xyzABC123

const AUTH_POST_URL = 'https://login.eveonline.com/v2/oauth/token'
const scopeStr = 'publicData esi-markets.read_character_orders.v1 esi-markets.read_corporation_orders.v1 esi-markets.structure_markets.v1'
export const SCOPE = encodeURIComponent(scopeStr)

export const getToken = async code => {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  return API.post(AUTH_POST_URL, params)
}

const INSMOTHER = 10000009
const MAULLERZ_ID = 247755210
const TARY_NIGHT_ID = 92316178

// {
//   "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkpXVC1TaWduYXR1cmUtS2V5IiwidHlwIjoiSldUIn0.eyJzY3AiOlsicHVibGljRGF0YSIsImVzaS1tYXJrZXRzLnJlYWRfY2hhcmFjdGVyX29yZGVycy52MSIsImVzaS1tYXJrZXRzLnJlYWRfY29ycG9yYXRpb25fb3JkZXJzLnYxIl0sImp0aSI6ImFhZTVhOTNhLWFjMjYtNDViYy04MzRmLTgwZTU3YjU4MGQyOSIsImtpZCI6IkpXVC1TaWduYXR1cmUtS2V5Iiwic3ViIjoiQ0hBUkFDVEVSOkVWRToyNDc3NTUyMTAiLCJhenAiOiJiZTc5Njk3MjllMzE0MzJmOGI5MTkyYjk0ZGI1YWUyYiIsInRlbmFudCI6InRyYW5xdWlsaXR5IiwidGllciI6ImxpdmUiLCJyZWdpb24iOiJ3b3JsZCIsIm5hbWUiOiJNYXVsbGVyWiIsIm93bmVyIjoiSjZ4MWcxT3JzNmFjOFdqSTk1eHRUbUpiNFV3PSIsImV4cCI6MTYxODgwMTI3MCwiaXNzIjoibG9naW4uZXZlb25saW5lLmNvbSJ9.JxL7FAijfQ_-L_JXDZxpURmTmlv00ixvokqNIe_sYpqd7vNF_ol4DduHVZCHiERlc7Hc_l67dUPCXuGrkf_Wd1CLQ1R5Z-3rUPouDEyk0Yrp5lxzXucL0el8ArLqQ7o8xOgrp6IS8qZiccYJ4HFoFRw0GY1olN-o3j403uQZjVfCDhaVhxgu5UzvM9TyPlxSqasJoYiV6J5TMBQJGUkkmRPkCgCRRMh9Ku6qTeWZMD2yTP5WMnKBuUHckEWVlbxs03lnnFXIRiYtGCacxIw_Lf0xr0GpFfOKmSSvBZ7-kCv9NoST_Upvj4iH6XabAncgawj1-RYt-vFE10rdziQnvw",
//   "expires_in": 1199,
//   "token_type": "Bearer",
//   "refresh_token": "PDAckWpVRUaDGmlasub0yw=="
// }

export const refreshToken = async () => {
  const REFRESH_TOKEN = localStorage.getItem('refresh_token')
  if (!REFRESH_TOKEN) {
    throw new Error('REFRESH_TOKEN unknown!')
  }
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', REFRESH_TOKEN)
  params.append('scope', scopeStr)
  return API.post(AUTH_POST_URL, params)
}
