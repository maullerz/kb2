import React, { useState, useEffect } from 'react'

import Spinner from 'components/Spinner'
import TableHeadCell from './TableHeadCell'
import TableFooter from './TableFooter'

import { TableRoot, Head, Body, Row, Cell } from './styles'

// TODO
// https://material-ui.com/components/pagination/

const Table = props => {
  const {
    columns, items, isLoading, sortBy, checkable, draggable, checkedItems, isSubtable,
    onRowClick, onSortBy, onNoContent, onCheckItems, onRenderControls,
    pageSize, pagination, onPrevPage, onNextPage, onGoToPage, clearGlobalChecks,
  } = props

  const [globalChecked, setGlobalChecked] = useState(false)

  useEffect(() => {
    if (clearGlobalChecks) setGlobalChecked(false)
  }, [clearGlobalChecks])

  const fullWidth = columns.reduce((sum, col) => {
    return sum + Number(col.width.replace('%', ''))
  }, 0)

  if (fullWidth !== 100) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('fullWidth !== 100:', fullWidth) // eslint-disable-line no-console
    }
  }

  function handleGlobalCheck(event) {
    const { checked } = event.target

    setGlobalChecked(checked)

    if (checked) {
      onCheckItems(items)
    } else {
      onCheckItems([])
    }
  }

  function handleItemCheck(event) {
    const { checked, id } = event.target
    const changedItem = items.find(item => item.id === id)

    if (checked) {
      const mergedItems = [...checkedItems, changedItem]

      setGlobalChecked(mergedItems.length === items.length)
      onCheckItems(mergedItems)
    } else {
      const filteredItems = checkedItems.filter(item => item.id !== id)

      setGlobalChecked(filteredItems.length === items.length)
      onCheckItems(filteredItems)
    }
  }

  function renderCell(item, col) {
    const { key, highlighted } = col
    const value = item[key] || ''

    const alignRight = col.align === 'right'

    const cellStyle = {
      flexBasis: col.width,
      textAlign: col.align,
    }

    const controlsCellStyle = {
      ...cellStyle,
      minWidth: col.minWidth,
      ...(alignRight && {
        display: 'flex',
        justifyContent: 'flex-end',
      }),
    }

    if (key === 'controls' && onRenderControls) {
      return (
        <Cell
          key={key}
          style={controlsCellStyle}
          highlighted={highlighted}
        >
          {onRenderControls(item)}
        </Cell>
      )
    }

    return (
      <Cell
        key={key}
        style={cellStyle}
        highlighted={highlighted}
      >
        {col.render ? col.render(item) : value}
      </Cell>
    )
  }

  function renderRow(item, id, checked) {
    const handleRowClick = () => {
      if (onRowClick) {
        onRowClick(item)
      }
    }

    const handleDragStart = event => {
      event.dataTransfer.setData('file', `${item.id}:${item.name}`)
      event.dataTransfer.setDragImage(FILE_DRAG_IMG, 0, 0)
    }

    return (
      <Row
        key={id}
        checkable={checkable}
        draggable={draggable}
        onClick={handleRowClick}
        onDragStart={handleDragStart}
      >
        {columns.map(col => renderCell(item, col))}
      </Row>
    )
  }

  function renderBody() {
    if (items.length === 0 && onNoContent) {
      return onNoContent()
    }

    const checkedIds = checkedItems ? checkedItems.map(item => item.id) : []

    return (
      <>
        <Body
          isSubtable={isSubtable}
        >
          {items.map((item, ix) => renderRow(item, item.id || ix, checkedIds.includes(item.id)))}
        </Body>
        <TableFooter
          pageSize={pageSize}
          pagination={pagination}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onGoToPage={onGoToPage}
        />
      </>
    )
  }

  return (
    <TableRoot>
      <Head isSubtable={isSubtable}>
        {columns.map(column => (
          <TableHeadCell
            key={column.key}
            column={column}
            sortBy={sortBy}
            onSortBy={onSortBy}
            noSort={column.noSort}
            isSubtable={isSubtable}
          />
        ))}
      </Head>
      {isLoading
        ? <Spinner />
        : renderBody()
      }
    </TableRoot>
  )
}

export default Table
