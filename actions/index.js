export const RECIEVE_ENTERIES = 'RECIEVE_ENTERIES'
export const ADD_ENTRY = 'ADD_ENTRY'


export function receiveEntries(entries) {
    return {
        type: RECIEVE_ENTERIES,
        entries
    }
}

export function addEntry(entry) {
    return {
        type: ADD_ENTRY,
        entry
    }
}