import React from 'react'

interface Props {
  result: string
}

const ResultScreen: React.FunctionComponent<Props> = ({ result }) => {

  let formattedRes = parseFloat(result).toLocaleString('en-US', {
    useGrouping: true,
    maximumFractionDigits: 6
  })

  const match = result.match(/\.\d*?(0*)$/)
  
  if (match) {
    formattedRes += (/[1-9]/).test(match[0]) ? match[1] : match[0]
  }
  
  return (
    <div className={'container-result'}>
      <span className={'result-label'}>{formattedRes}</span>
    </div>
  )
}

export default ResultScreen 