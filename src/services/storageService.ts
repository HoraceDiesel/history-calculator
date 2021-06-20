import moment from 'moment'

import { HistoryRecord } from 'src/models/History'

const STORAGE_KEY = 'react-calculator-history'

export const getAllRecords = () => {
  const res = localStorage.getItem(STORAGE_KEY)
  if (!res) {
    return []
  }
  const records: HistoryRecord[] = JSON.parse(res)
  const earliestDay = moment(new Date()).subtract('3', 'days')

  const newRecords = records.filter(record => {
    const timestamp = moment(record.timestamp)
    return timestamp.isAfter(earliestDay)
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords))

  return newRecords
}

export const addRecord = (value: any) => {
  const allRecords = getAllRecords()
  let timestamp = moment(new Date())

  const newRecords = [
    ...allRecords,
    {
      ...value,
      timestamp,
    },
  ]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords))
}

export const clear = () => {
  localStorage.removeItem(STORAGE_KEY)
}