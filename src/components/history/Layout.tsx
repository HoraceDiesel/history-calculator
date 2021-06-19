import React from 'react'

import { SCIENTIFIC_PANEL_THRESHOLD } from 'src/components'
import * as storageService from 'src/services/storageService'
import { useWindowSize } from 'src/utils/helpers'
import { HistoryRecord } from 'src/models/History'

const Layout = () => {
  const { windowWidth } = useWindowSize()
  const [list, setList] = React.useState<HistoryRecord[]>([])

  React.useEffect(() => {
    const list = storageService.getAllRecords().filter(record => Object.entries(record).length === 3).reverse()
    setList(list)
  }, [])

  return (
    <div className={`container-history ${windowWidth < SCIENTIFIC_PANEL_THRESHOLD && 'slim'}`}>
      <h2>History</h2>
      {
        list.length > 0 ? (
          <ul className={'history-list'}>
            {
              list.map((item, key) => {
                return (
                  <li className={'container-record'} key={key}>
                    <p className={'operation-label'}>{item.operation}</p>
                    <h3 className={'result-label'}>{item.result}</h3>
                  </li>
                )
              })
            }
          </ul>
        ) : (
          <h3>
            There is no records.
          </h3>
        )
      }
    </div>
  )
}

export default Layout
