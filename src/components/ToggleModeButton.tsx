import React from 'react'

interface Props {
  label: string
  onToggle: () => void
}

const ToggleModeButton = (props: Props) => {
  const { label, onToggle } = props

  return (
    <button className={'btn-toggle-mode'} onClick={onToggle}>
      {label}
    </button>
  )
}

export default ToggleModeButton