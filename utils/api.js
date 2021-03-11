import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from '../utils/_calendar'

export function submitEntry({key, entry}) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function removeEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            data[key] = undefined
            delete data[key]
            return AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}

export function fetchCalendarResults() {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(results => formatCalendarResults(results))
}