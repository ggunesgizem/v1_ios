import momentTimeZone from 'moment-timezone'

export const timeWaitToReload = 1 * 60 * 1000 // 1mins
export const timeToRelogin = 7 * 60 * 60 * 1000 // 7 hours

export const DateTimeFormat = global.Intl.DateTimeFormat

export const defaultTimeZone ="Africa/Accra"
export const userTimeZone = momentTimeZone.tz.guess() ? momentTimeZone.tz.guess() : "Europe/Istanbul"

momentTimeZone.tz.setDefault(defaultTimeZone)
