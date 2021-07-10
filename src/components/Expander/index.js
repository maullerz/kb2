import React, { useState } from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Header, Line } from './styles'

const getStoredValue = storageKey => {
  const result = localStorage.getItem(storageKey)
  return Boolean(result)
}

const saveStoredValue = (storageKey, value) => {
  localStorage.setItem(storageKey, Boolean(value))
}

function Expander({ title, storageKey, onChange, backgroundColor, marginBottom, lineColor }) {
  const [collapsed, setCollapsed] = useState(storageKey ? getStoredValue(storageKey) : false)

  function handleToggleCollapsed() {
    const newValue = !collapsed
    if (storageKey) {
      saveStoredValue(storageKey, newValue)
    }
    setCollapsed(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <Header
      onClick={handleToggleCollapsed}
      collapsed={collapsed}
      backgroundColor={backgroundColor}
      marginBottom={marginBottom}
    >
      {title}
      <Line lineColor={lineColor} />
      {collapsed
        ? <ExpandMoreIcon />
        : <ExpandLessIcon />
      }
    </Header>
  )
}

export default Expander
