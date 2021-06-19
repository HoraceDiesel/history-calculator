import React from 'react'

interface Props {
  onPress: (e: React.MouseEvent) => void
  className?: string
}

const InputButton: React.FunctionComponent<Props> = ({ onPress, className = '', children }) => (
  <div className={`container-input ${className}`}>
    <button
      className={'btn-input'}
      onClick={onPress}
    >
      {children}
    </button>
  </div>
)

export default InputButton