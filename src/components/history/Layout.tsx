import React from 'react'

import { SCIENTIFIC_PANEL_THRESHOLD } from 'src/components'
import * as storageService from 'src/services/storageService'
import { useWindowSize } from 'src/utils/helpers'
import { HistoryRecord } from 'src/models/History'

const Layout = () => {
  const { windowWidth } = useWindowSize()
  const [list, setList] = React.useState<HistoryRecord[]>([])

  const mapResultToDisplay = (result: string) => {
    const display = (result.split('.')[0].length > 8 || (/e\+/).test(result)) ?
      parseFloat(result).toExponential(4) :
      parseFloat(result).toLocaleString('en-US', {
        useGrouping: true,
        maximumFractionDigits: 6
      })

    return display === 'NaN' ? '∞' : display
  }

  const onClearClick = () => {
    storageService.clear()
    setList([])
  }

  React.useEffect(() => {
    const list = storageService.getAllRecords().filter(record => Object.entries(record).length === 3).reverse()
    setList(list)
  }, [])

  return (
    <div className={`container-history ${windowWidth < SCIENTIFIC_PANEL_THRESHOLD && 'slim'}`}>
      <div className={'container-header'}>
        <h2>
          History
        </h2>
        {list.length > 0 && (
          <button
            onClick={onClearClick}
          >
            Clear
          </button>
        )}
      </div>
      {
        list.length > 0 ? (
          <ul className={'history-list'}>
            {
              list.map((item, key) => {
                return (
                  <li className={'container-record'} key={key}>
                    <p className={'operation-label'}>{item.operation}</p>
                    <h3 className={'result-label'}>{mapResultToDisplay(item.result)}</h3>
                  </li>
                )
              })
            }
          </ul>
        ) : (
          <p>
            There is no records.
          </p>
        )
      }
    </div>
  )
}

export default Layout
