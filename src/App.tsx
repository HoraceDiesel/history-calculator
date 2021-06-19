import React from 'react'
import Calculator from 'src/components/calculator/Layout'
import History from 'src/components/history/Layout'
import ToggleModeButton from 'src/components/ToggleModeButton'
import 'src/styles/App.scss'

const App = () => {

  const [isCalculatorMode, setIsCalculatorMode] = React.useState(true)

  const onToggleMode = () => {
    setIsCalculatorMode(!isCalculatorMode)
  }

  return (
    <div className={'root-container'}>
      <div className={'app-container'}>
        <div>
        {
          isCalculatorMode ? (
            <Calculator />
          ) : (
            <History />
          )
        }
        </div>
        <ToggleModeButton onToggle={onToggleMode} label={isCalculatorMode ? 'History' : 'Calculator'} />
      </div>
    </div>
  )
}

export default App
