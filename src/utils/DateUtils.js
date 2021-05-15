import {
  format,
  // isToday, isYesterday, getDayOfYear, differenceInCalendarDays,
  // parseISO, differenceInHours, formatDistanceToNowStrict, addMinutes, addHours,
} from 'date-fns'
// import { isString } from 'lodash'

const DAY_FORMAT = 'MMMM d, yyyy'

export const formatDay = ts => {
  if (!ts) return 'undefined'
  const date = new Date(ts)
  return format(date, DAY_FORMAT)
}

export const getKillmailsByDay = items => {
  const result = []
  const days = {}

  items.forEach(km => {
    const dayOfYear = formatDay(km.time * 1000)
    days[dayOfYear] = days[dayOfYear] || []
    days[dayOfYear].push(km)
  })

  Object.keys(days).forEach(dayString => {
    result.push({
      dayString,
      kms: days[dayString],
    })
  })

  return result
}
