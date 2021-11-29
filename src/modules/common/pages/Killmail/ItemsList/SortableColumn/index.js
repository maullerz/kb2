import React from 'react'
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import ArrowUp from './ArrowUp'
import ArrowDown from './ArrowDown'
import ArrowDouble from './ArrowDouble'
import { Column, Title } from './styles'

function SortableColumn({ as, field, title, sortBy, onClick }) {
  const RootComponent = as || Column
  const isTypeField = field === 'type'

  function handleClick() {
    if (onClick) {
      onClick(field)
    }
  }

  function renderIcon() {
    if (!sortBy || field !== sortBy.field) {
      return <ArrowDouble /> // null // <NoIcon />
    }
    if (sortBy.order === 'ASC') {
      return isTypeField ? <ArrowDown /> : <ArrowUp />
    }
    return isTypeField ? <ArrowUp /> : <ArrowDown />
  }

  return (
    <RootComponent onClick={handleClick}>
      <Title>
        {title}
      </Title>
      {renderIcon()}
    </RootComponent>
  )
}

export default SortableColumn
