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

const CalculatorOperations = ['+', '-', '*', '/']

const Calculator = () => {

  const [state, setState] = React.useState<State>({
    value: undefined,
    operator: undefined,
    ready: false
  })

  const [displayValue, _setDisplayValue] = React.useState('0')

  // Need to useRef to set/access state due to the eventListener binding for keyboard input
  const displayValueRef = React.useRef(displayValue)
  const setDisplayValue = (data: string) => {
    displayValueRef.current = data
    _setDisplayValue(data)
  }

  const { value, operator, ready } = state
  const { windowWidth } = useWindowSize()
  
  const clearAll = () => {
    setState({
      value: undefined,
      operator: undefined,
      ready: false
    })

    setDisplayValue('0')
  }

  const clearDisplay = () => {
    setDisplayValue('0')
  }
  
  const onBackSpacePress = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0')
  }
  
  const onPositiveToggle = () => {
    const newValue = parseFloat(displayValueRef.current) * -1
    
    setDisplayValue(String(newValue))
  }
  
  const onPercentPress = () => {
    const currentValue = parseFloat(displayValueRef.current)
    
    if (currentValue === 0)
      return
    
    const fixedDigits = displayValueRef.current.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValueRef.current) / 100
    
    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)))
  }
  
  const inputDot = () => {  
    if (!(/\./).test(displayValueRef.current)) {
      setState({
        ...state,
        ready: false
      })
      setDisplayValue(displayValueRef.current + '.',)
    }
  }
  
  const inputDigit = (input: number) => {
    if (ready) {
      setState({
        ...state,
        ready: false
      })
      setDisplayValue(String(input))
    } else {
      if (displayValueRef.current.length > 6) {
        return
      }
      setDisplayValue(displayValueRef.current === '0' ? String(input) : displayValueRef.current + input)
    }
  }
  
  const calculate = (nextOperator: string) => {    
    const inputValue = parseFloat(displayValueRef.current)
    
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
  }

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

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

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
