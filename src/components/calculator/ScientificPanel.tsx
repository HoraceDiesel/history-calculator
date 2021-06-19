import React from 'react'
import InputButton from 'src/components/calculator/InputButton'

const inputButtonData = [
  {
    node: <span>{'('}</span>,
    name: '(',
  },
  {
    node: <span>{')'}</span>,
    name: ')',
  },
  {
    node: <span>mc</span>,
    name: 'mc',
  },
  {
    node: <span>m+</span>,
    name: 'm+',
  },
  {
    node: <span>m-</span>,
    name: 'm-',
  },
  {
    node: <span>mr</span>,
    name: 'mr',
  },
  {
    node: <span>2<sup>nd</sup></span>,
    name: '2nd',
  },
  {
    node: <span>x<sup>2</sup></span>,
    name: 'x2',
  },
  {
    node: <span>x<sup>3</sup></span>,
    name: 'x3',
  },
  {
    node: <span>x<sup>y</sup></span>,
    name: 'xy',
  },
  {
    node: <span>e<sup>x</sup></span>,
    name: 'ex',
  },
  {
    node: <span>10<sup>x</sup></span>,
    name: '10x',
  },
  {
    node: <span>1/x</span>,
    name: '1/x',
  },
  {
    node: <span><sup>2</sup>√x</span>,
    name: 'sqrt2',
  },
  {
    node: <span><sup>3</sup>√x</span>,
    name: 'sqrt3',
  },
  {
    node: <span><sup>y</sup>√x</span>,
    name: 'sqrty',
  },
  {
    node: <span>ln</span>,
    name: 'ln',
  },
  {
    node: <span>log<sub>10</sub></span>,
    name: 'log10',
  },
  {
    node: <span>x!</span>,
    name: 'x!',
  },
  {
    node: <span>sin</span>,
    name: 'sin',
  },
  {
    node: <span>cos</span>,
    name: 'cos',
  },
  {
    node: <span>tan</span>,
    name: 'tan',
  },
  {
    node: <span>e</span>,
    name: 'e',
  },
  {
    node: <span>EE</span>,
    name: 'EE',
  },
  {
    node: <span>Rad</span>,
    name: 'Rad',
  },
  {
    node: <span>sinh</span>,
    name: 'sinh',
  },
  {
    node: <span>cosh</span>,
    name: 'cosh',
  },
  {
    node: <span>tanh</span>,
    name: 'tanh',
  },
  {
    node: <span>π</span>,
    name: 'π',
  },
  {
    node: <span>Rand</span>,
    name: 'Rand',
  },
]

const ScientificPanel = () => (
  <div className={'container-inner'}>
    {
      inputButtonData.map((inputData, key) => (
        <InputButton
          key={key}
          className={`key-${inputData.name}`}
          onPress={(e: React.MouseEvent) => e.preventDefault()}
        >
          {inputData.node}
        </InputButton>
      ))
    }
  </div>
)

export default ScientificPanel