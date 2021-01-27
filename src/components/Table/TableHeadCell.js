import React from 'react'

import Icon from 'components/Icon'

import { HeadCell } from './styles'

const TableHeadCell = ({ column, sortBy, onSortBy, noSort = true }) => {
  const { key, width, align, title, minWidth, highlighted } = column

  function getSortedIcon(fieldName) {
    if (sortBy && sortBy.field === fieldName) {
      if (sortBy.direction === 'Ascending') {
        return 'arrowUp'
      }

      return 'arrowDown'
    }

    return 'arrowDouble'
  }

  function handleSort() {
    if (noSort || !onSortBy) {
      return
    }
    let newSortBy = {
      ...sortBy,
    }

    if (!sortBy || sortBy.field !== key) {
      newSortBy.field = key
      newSortBy.direction = 'Ascending'
    } else if (sortBy.direction === 'Ascending') {
      newSortBy.direction = 'Descending'
    } else {
      // reset sorting
      newSortBy = null
    }
    onSortBy(newSortBy)
  }

  return (
    <HeadCell
      onClick={handleSort}
      style={{ flexBasis: width, textAlign: align, minWidth }}
      highlighted={highlighted}
    >
      {title}
      {!noSort &&
        <Icon icon={getSortedIcon(key)} noWrapper />
      }
    </HeadCell>
  )
}

export default TableHeadCell
