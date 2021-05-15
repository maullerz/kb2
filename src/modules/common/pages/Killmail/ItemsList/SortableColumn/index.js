import React from 'react'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { Column, Title } from './styles'

function SortableColumn({ as, field, title, sortBy, onClick }) {
  const RootComponent = as || Column
  const isTypeField = field === 'type'
  const isCountField = field === 'count'

  function handleClick() {
    if (onClick) {
      onClick(field)
    }
  }

  function renderIcon() {
    if (!sortBy || field !== sortBy.field) {
      return null // <NoIcon />
    }
    if (sortBy.order === 'ASC') {
      return isTypeField ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />
    }
    return isTypeField ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
  }

  return (
    <RootComponent onClick={handleClick}>
      {isCountField && renderIcon()}
      <Title>
        {title}
      </Title>
      {!isCountField && renderIcon()}
    </RootComponent>
  )
}

export default SortableColumn
