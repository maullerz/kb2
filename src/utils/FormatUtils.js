// import { format } from 'date-fns'

const numeral = require('numeral')

const oneBillion = 1000000000
const tenMillion = 10000000
const oneMillion = 1000000
const tenThousand = 10000
const oneThousand = 1000

export const formatRaw = sum => numeral(sum).format('0,0')

// only three significant digits
const numberFormat = sum => {
  if (sum >= 100 * oneBillion) {
    return '0a'
  }
  if (sum >= 10 * oneBillion) {
    return '0.0a'
  }
  if (sum >= oneBillion) {
    return '0.00a'
  }
  if (sum >= 100 * oneMillion) {
    return '0a'
  }
  if (sum >= tenMillion) {
    return '0a'
  }
  if (sum >= oneMillion) {
    return '0.0a'
  }
  if (sum >= 100 * oneThousand) {
    return '0a'
  }
  if (sum >= tenThousand) {
    return '0a'
  }
  if (sum >= oneThousand) {
    return '0.0a'
  }
  return '0a'
}

export const formatSum = sum => {
  if (sum === 0 || !sum) {
    return '0'
  }
  return numeral(sum).format(numberFormat(sum))
}

export const formatSumExt = sum => {
  return formatSum(sum)
}

export const formatConditionally = (sum, isMobile) => {
  return isMobile ? formatSum(sum) : formatRaw(sum)
}

export const formatDmg = dmg => {
  if (dmg === 0 || !dmg) {
    return '0'
  }
  return numeral(dmg).format(numberFormat(dmg))
}

export const dmgPercent = dmg => (
  dmg === 0 || !dmg
    ? ''
    : `${numeral(dmg).format('0,0.0%')}`
)

export const dmgPercentZero = dmg => (
  dmg === 0 || !dmg
    ? '(0%)'
    : `(${numeral(dmg).format('0,0.0%')})`
)

export const cntWhored = cnt => (
  cnt === 0 || !cnt ? '' : ` [${cnt}]`
)

export const cntWhoredZero = cnt => (
  cnt === 0 || !cnt ? '[0]' : ` [${cnt}]`
)

const getMinutes = minutes => {
  if (minutes < 10) return `0${minutes}`
  return minutes
}

export const getLocalTime = date => {
  let result = ''
  result += `${date.getHours()}`
  result += `:${getMinutes(date.getMinutes())}`
  return result
}

export const getUTCTime = (date, withSeconds = true) => {
  let result = ''
  result += `${date.getUTCHours()}`
  result += `:${getMinutes(date.getUTCMinutes())}`
  if (withSeconds) {
    result += `:${getMinutes(date.getUTCSeconds())}`
  }
  return result
}

export const getUTCDateTime = (date, withSeconds = true) => {
  let result = ''

  result += `${date.getUTCFullYear()}`
  // TODO: zero padding
  result += `-${date.getUTCMonth() + 1}`
  result += `-${date.getUTCDate()}`

  result += ` ${date.getUTCHours()}`
  result += `:${getMinutes(date.getUTCMinutes())}`
  if (withSeconds) {
    result += `:${getMinutes(date.getUTCSeconds())}`
  }
  return result
}

export const timestampToLocal = timestamp => {
  const date = new Date(timestamp)
  return getLocalTime(date)
}

export const timestampToUTC = (timestamp, withSeconds = true) => {
  const date = new Date(timestamp)
  return getUTCTime(date, withSeconds)
}

// const KM_DATE_TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

export const formatKmTime = kmTimeInSec => {
  // (new Date(rest.time * 1000)).toLocaleString()
  // return format(date, KM_DATE_TIME_FORMAT)
  // const date = new Date(kmTimeInSec * 1000)
  // return getUTCDateTime(date)
  const date = new Date(kmTimeInSec * 1000)
  const formattedDate = date.toISOString().replace('.000Z', '').replace('T', ' ')
  return formattedDate
}

export const formatZkillTimestamp = ts => {
  const date = new Date(ts * 1000)
  let dateStr = `${date.getUTCFullYear()}`
  const month = date.getUTCMonth() + 1
  dateStr += month > 9 ? month : `0${month}`
  const day = date.getUTCDate()
  dateStr += day > 9 ? day : `0${day}`
  const hour = date.getUTCHours()
  dateStr += hour > 9 ? hour : `0${hour}`
  dateStr += '00'
  return dateStr
}

export const parseZkillDatetime = dt => {
  if (dt.length !== 12) return null
  const year = dt.substring(0, 4)
  const month = dt.substring(4, 6) - 1
  const day = dt.substring(6, 8)
  const hour = dt.substring(8, 10)
  const min = dt.substring(10)
  if (min !== '00' && min !== '30') {
    console.error('parseZkillDatetime: invalid min:', min)
  }
  const timestamp = Date.UTC(year, month, day, hour, min)
  return new Date(timestamp)
}

// module.exports = {
//   formatSum,
//   formatSumExt,
//   formatDmg,
//   dmgPercent,
//   dmgPercentZero,
//   cntWhored,
//   cntWhoredZero,
//   getLocalTime,
//   getUTCTime,
//   timestampToLocal,
//   timestampToUTC,
//   formatZkillTimestamp,
//   parseZkillDatetime,
// }
