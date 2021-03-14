import React from 'react'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { Column, Title, NoIcon } from './styles'

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
      return <NoIcon />
    }
    if (sortBy.order === 'ASC') {
      return isTypeField ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />
    }
    return isTypeField ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
  }

  return (
    <RootComponent onClick={handleClick}>
      {!isTypeField && renderIcon()}
      <Title>
        {title}
      </Title>
      {isTypeField && renderIcon()}
    </RootComponent>
  )
}

export default SortableColumn
