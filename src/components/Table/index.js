import React from 'react'
import { Link } from 'react-router-dom'

import Spinner from 'components/Spinner'
import TableHeadCell from './TableHeadCell'
import TableFooter from './TableFooter'

import { TableRoot, Head, Body, Row, Cell } from './styles'

// TODO
// https://material-ui.com/components/pagination/

const Table = props => {
  const {
    columns, items, isLoading, sortBy, isSubtable,
    onRowClick, onSortBy, onNoContent,
    // onRenderControls,
    pageSize, pagination, onPrevPage, onNextPage, onGoToPage,
  } = props

  // What TO DO?

  // const fullWidth = columns.reduce((sum, col) => {
  //   return sum + Number(col.width.replace('%', ''))
  // }, 0)

  // if (fullWidth !== 100) {
  //   if (process.env.NODE_ENV === 'development') {
  //     console.warn('fullWidth !== 100:', fullWidth) // eslint-disable-line no-console
  //   }
  // }

  function renderCell(item, col) {
    const { key, highlighted } = col
    const value = item[key] || ''
    const cellStyle = {
      flexBasis: col.width,
      textAlign: col.align,
    }

    // const alignRight = col.align === 'right'
    // const controlsCellStyle = {
    //   ...cellStyle,
    //   minWidth: col.minWidth,
    //   ...(alignRight && {
    //     display: 'flex',
    //     justifyContent: 'flex-end',
    //   }),
    // }

    // if (key === 'controls' && onRenderControls) {
    //   return (
    //     <Cell
    //       key={key}
    //       style={controlsCellStyle}
    //       highlighted={highlighted}
    //     >
    //       {onRenderControls(item)}
    //     </Cell>
    //   )
    // }

    if (col.link) {
      const path = col.link.replace('{placeholder}', item[col.linkKey])
      return (
        <Link to={path} key={key}>
          <Cell style={cellStyle} highlighted={highlighted}>
            {col.render ? col.render(item) : value}
          </Cell>
        </Link>
      )
    }

    return (
      <Cell key={key} style={cellStyle} highlighted={highlighted}>
        {col.render ? col.render(item) : value}
      </Cell>
    )
  }

  function renderRow(item, id) {
    const handleRowClick = () => {
      if (onRowClick) {
        onRowClick(item)
      }
    }

    return (
      <Row
        key={id}
        onClick={handleRowClick}
      >
        {columns.map(col => renderCell(item, col))}
      </Row>
    )
  }

  function renderBody() {
    if (items.length === 0 && onNoContent) {
      return onNoContent()
    }

    return (
      <>
        <Body isSubtable={isSubtable}>
          {items.map((item, ix) => renderRow(item, item.id || ix))}
        </Body>
        {false && // TODO: TableFooter
          <TableFooter
            pageSize={pageSize}
            pagination={pagination}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onGoToPage={onGoToPage}
          />
        }
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
