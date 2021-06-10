import React from 'react'

const useFocus = () => {
  const htmlElementRef = React.useRef(null)

  const setFocus = () => {
    htmlElementRef.current && htmlElementRef.current.focus()
  }

  return [htmlElementRef, setFocus]
}

export default useFocus
