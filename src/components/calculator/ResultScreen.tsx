import React from 'react'

interface Props {
  result: string
}

const ResultScreen: React.FunctionComponent<Props> = ({ result }) => {
  let formattedRes = result

  if (result.split('.')[0].length > 8) {
    formattedRes = parseFloat(result).toExponential(4)
  } else {
    formattedRes = parseFloat(result).toLocaleString('en-US', {
      useGrouping: true,
      maximumFractionDigits: 6
    })
  }

  const match = result.match(/\.\d*?(0*)$/)
    
  if (match) {
    formattedRes += (/[1-9]/).test(match[0]) ? match[1] : match[0]
  }

  return (
    <div className={'container-result'}>
      <p className={'result-label'}>
          {formattedRes}
      </p>
    </div>
  )
}

export default ResultScreen 