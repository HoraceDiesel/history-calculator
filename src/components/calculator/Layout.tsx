import React from 'react'

import ResultScreen from 'src/components/calculator/ResultScreen'
import ScientificPanel from 'src/components/calculator/ScientificPanel'
import InputButton from 'src/components/calculator/InputButton'
import { SCIENTIFIC_PANEL_THRESHOLD } from 'src/components'
import { addRecord as addRecordToStorage } from 'src/services/storageService'
import { useWindowSize } from 'src/utils/helpers'

interface State {
  value?: number,
  operator?: string,
  ready: boolean
}

const CalculatorOperations = ['+', '-', '*', '/', '=']

const Calculator: React.FunctionComponent = () => {

  const [state, setState] = React.useState<State>({
    value: undefined,
    operator: undefined,
    ready: false
  })

  const [displayValue, setDisplayValue] = React.useState('0')

  const { value, operator, ready } = state
  const { windowWidth } = useWindowSize()
  
  const clearAll = React.useCallback(() => {
    setState({
      value: undefined,
      operator: undefined,
      ready: false
    })

    setDisplayValue('0')
  }, [])

  const clearDisplay = React.useCallback(() => {
    setDisplayValue('0')
  }, [])
  
  const onBackSpacePress = React.useCallback(() => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0')
  }, [displayValue])
  
  const onPositiveToggle = () => {
    const newValue = parseFloat(displayValue) * -1
    
    setDisplayValue(String(newValue))
  }
  
  const onPercentPress = React.useCallback(() => {
    const currentValue = parseFloat(displayValue)
    
    if (currentValue === 0)
      return

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100

    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)))
  }, [displayValue])
  
  const inputDot = React.useCallback(() => {  
    if (!(/\./).test(displayValue)) {
      setState(state => ({
        ...state,
        ready: false
      }))
      setDisplayValue(displayValue + '.',)
    }
  }, [displayValue])
  
  const inputDigit = React.useCallback((input: number) => {
    if (ready) {
      setState((state) => ({
        ...state,
        ready: false
      }))
      setDisplayValue(String(input))
    } else {
      if (displayValue.length > 6) {
        return
      }
      setDisplayValue(displayValue === '0' ? String(input) : displayValue + input)
    }
  }, [ready, displayValue])
  
  const calculate = React.useCallback((nextOperator: string) => {
    const inputValue = parseFloat(displayValue)
    
    if (value == null) {
      setState({
        value: inputValue,
        ready: true,
        operator: nextOperator,
      })
    } else if (operator) {
      const baseValue = value || 0
      let result
      let operation

      switch(operator) {
        case '+':
          result = baseValue + inputValue
          operation = `${baseValue} + ${inputValue} =`
          break
        case '-':
          result = baseValue - inputValue
          operation = `${baseValue} - ${inputValue} =`
          break
        case '*':
          result = baseValue * inputValue
          operation = `${baseValue} * ${inputValue} =`
          break
        case '/':
          result = baseValue / inputValue
          operation = `${baseValue} / ${inputValue} =`
          break
        case '=':
          result = baseValue
          break
        default:
          result = inputValue
      }

      setState({
        value: result,
        ready: true,
        operator: nextOperator,
      })

      setDisplayValue(String(result))

      const storageItem = {
        operation: operation,
        result: result.toLocaleString('en-US', {
          useGrouping: true,
          maximumFractionDigits: 6
        }),
      }

      addRecordToStorage(storageItem)
    }
  }, [operator, value, displayValue])

  const onKeyDown = (event: KeyboardEvent): void => {
    let { key } = event
    if (key === 'Enter')
      key = '='
    
    if ((/\d/).test(key)) {
      event.preventDefault()
      inputDigit(parseInt(key, 10))
    } else if (CalculatorOperations.indexOf(key) > -1) {
      event.preventDefault()
      calculate(key)
    } else if (key === '.') {
      event.preventDefault()
      inputDot()
    } else if (key === '%') {
      event.preventDefault()
      onPercentPress()
    } else if (key === 'Backspace') {
      event.preventDefault()
      onBackSpacePress()
    } else if (key === 'Clear') {
      event.preventDefault()
      
      if (displayValue !== '0') {
        clearDisplay()
      } else {
        clearAll()
      }
    }
  }

  const callback = React.useCallback(onKeyDown, [calculate, clearAll, clearDisplay, displayValue, inputDigit, inputDot, onBackSpacePress, onPercentPress])

  React.useEffect(() => {
    document.addEventListener('keydown', callback)
    
    return () => document.removeEventListener('keydown', callback)
  }, [callback])

  const shouldClearCurrent = displayValue !== '0'
  const clearButtonLabel = shouldClearCurrent ? 'C' : 'AC'
  
  return (
    <div className="container-calculator">
      <ResultScreen result={displayValue}/>
      <div className="container-inputs">
        {
          windowWidth && windowWidth > SCIENTIFIC_PANEL_THRESHOLD && (
            <div className="scientific-keys">
              <ScientificPanel />
            </div>
          )
        }
        <div className="input-keys">
          <div className="function-keys">
            <InputButton className="key-clear" onPress={() => shouldClearCurrent ? clearDisplay() : clearAll()}>
              {clearButtonLabel}
            </InputButton>
            <InputButton onPress={onPositiveToggle}>±</InputButton>
            <InputButton onPress={onPercentPress}>%</InputButton>
          </div>
          <div className="digit-keys">
            <InputButton className="btn-input-0" onPress={() => inputDigit(0)}>0</InputButton>
            <InputButton className="btn-input-dot" onPress={() => inputDot()}>.</InputButton>
            <InputButton onPress={() => inputDigit(1)}>1</InputButton>
            <InputButton onPress={() => inputDigit(2)}>2</InputButton>
            <InputButton onPress={() => inputDigit(3)}>3</InputButton>
            <InputButton onPress={() => inputDigit(4)}>4</InputButton>
            <InputButton onPress={() => inputDigit(5)}>5</InputButton>
            <InputButton onPress={() => inputDigit(6)}>6</InputButton>
            <InputButton onPress={() => inputDigit(7)}>7</InputButton>
            <InputButton onPress={() => inputDigit(8)}>8</InputButton>
            <InputButton onPress={() => inputDigit(9)}>9</InputButton>
          </div>
        </div>
        <div className="operator-keys">
          <InputButton onPress={() => calculate('/')}>÷</InputButton>
          <InputButton onPress={() => calculate('*')}>×</InputButton>
          <InputButton onPress={() => calculate('-')}>−</InputButton>
          <InputButton onPress={() => calculate('+')}>+</InputButton>
          <InputButton onPress={() => calculate('=')}>=</InputButton>
        </div>
      </div>
    </div>
  )
}

export default Calculator
