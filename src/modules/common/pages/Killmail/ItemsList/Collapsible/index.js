import React, { useState } from 'react'

import styles from './styles.scss'

const Collapsible = ({ initialCollapsed, children, disabled }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed)

  if (disabled) return children

  function toggleCollapsed() {
    setCollapsed(!collapsed)
  }

  return (
    <div className={styles.root}>
      <div className={styles.header} onClick={toggleCollapsed}>
        Bla Bla bla
      </div>
      {collapsed ? null : children}
    </div>
  )
}

export default Collapsible
