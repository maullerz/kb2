import { useState } from 'react'

// Open || Enabled || etc.

export default function useBooleanToggle(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return [isOpen, handleToggle, handleOpen, handleClose]
}
