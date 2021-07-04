import axios from 'axios'

const API_CALL_TIMEOUT = 180000

const axiosConfig = {
  baseURL: '/api/',
  timeout: API_CALL_TIMEOUT,
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json;charset=UTF-8',
    // 'Access-Control-Allow-Origin': '*',
  },
}

const API = axios.create(axiosConfig)

// normalization for axios http-errors
const castError = error => {
  const { response } = error
  const errorResult = response ? response.data : error
  if (process.env.NODE_ENV !== 'production') {
    console.error('API:', errorResult) // eslint-disable-line
  }
  return errorResult
}

// normalize POST data, trim spaces && remove empty strings and nulls
const normalizeData = data => {
  if (!data) {
    return data
  }
  return Object.keys(data).reduce((result, key) => {
    let value = data[key]
    if (typeof value === 'string') {
      value = value.trim()
    }
    if (value || value === 0 || typeof value === 'boolean') {
      result[key] = value
    }
    return result
  }, {})
}

class BaseAPI {
  call({ data, method, url, params, headers }) {
    const preparedData = normalizeData(data)
    const callParams = {
      method, url, params,
      headers: {
        ...API.defaults.headers,
        ...headers,
      },
      data: preparedData,
    }
    return API(callParams)
      .catch(error => Promise.reject(castError(error)))
  }
}

export default BaseAPI
