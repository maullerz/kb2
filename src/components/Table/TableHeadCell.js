import React from 'react'

// import Icon from 'components/Icon'

import { HeadCell } from './styles'

const TableHeadCell = ({ column, sortBy, onSortBy, noSort = true }) => {
  const { key, width, align, title, minWidth, highlighted } = column

  if (title === null) {
    return null
  }

  // function getSortedIcon(fieldName) {
  //   if (sortBy && sortBy.field === fieldName) {
  //     if (sortBy.direction === 'Ascending') {
  //       return 'arrowUp'
  //     }

  //     return 'arrowDown'
  //   }

  //   return 'arrowDouble'
  // }

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

  const style = {
    minWidth,
    flexBasis: width,
    textAlign: align,
    ...(align === 'right' && title !== 'Time' && { justifyContent: 'flex-end' }),
  }

  return (
    <HeadCell
      onClick={handleSort}
      style={style}
      highlighted={highlighted}
    >
      {title}
      {/*
        TODO:
        !noSort && <Icon icon={getSortedIcon(key)} noWrapper />
      */}
    </HeadCell>
  )
}

export default TableHeadCell
