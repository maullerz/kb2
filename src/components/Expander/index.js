import React, { useState, useEffect } from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Header, Line } from './styles'

const getStoredValue = storageKey => {
  const result = localStorage.getItem(`collapsed-${storageKey}`)
  return Boolean(result)
}

const saveStoredValue = (storageKey, value) => {
  localStorage.setItem(`collapsed-${storageKey}`, Boolean(value))
}

function Expander({ title, storageKey, onChange }) {
  const [collapsed, setCollapsed] = useState(getStoredValue(storageKey))

  function handleToggleCollapsed() {
    const newValue = !collapsed
    saveStoredValue(storageKey, newValue)
    setCollapsed(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <Header onClick={handleToggleCollapsed} collapsed={collapsed}>
      {title}
      <Line />
      &nbsp;
      {collapsed
        ? <ExpandMoreIcon />
        : <ExpandLessIcon />
      }
    </Header>
  )
}

export default Expander
