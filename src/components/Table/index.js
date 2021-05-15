import React from 'react'
import { Link } from 'react-router-dom'

import * as DateUtils from 'utils/DateUtils'
import Spinner from 'components/Spinner'

import TableHeadCell from './TableHeadCell'
// import TableFooter from './TableFooter'
import { TableRoot, Head, Body, Row, Cell, DayRow } from './styles'

// TODO
// https://material-ui.com/components/pagination/

const Table = props => {
  const {
    columns, items, isLoading, sortBy,
    onRowClick, onSortBy, onNoContent, isDesktop,
    // onRenderControls,
    // pageSize, pagination, onPrevPage, onNextPage, onGoToPage,
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
      ...(col.padLeft && {
        paddingLeft: col.padLeft,
      }),
      ...(col.padRight && {
        paddingRight: col.padRight,
      }),
    }

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
        isDesktop={isDesktop}
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

    const days = DateUtils.getKillmailsByDay(items)

    return (
      <>
        <Body>
          {days.map(({ dayString, kms }) => {
            return (
              <>
                <DayRow>{dayString}</DayRow>
                {kms.map((km, ix) => renderRow(km, km.id || ix))}
              </>
            )
          })}
        </Body>

        {/* TODO: TableFooter */}
        {/* <TableFooter
          pageSize={pageSize}
          pagination={pagination}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onGoToPage={onGoToPage}
        /> */}
      </>
    )
  }

  return (
    <TableRoot>
      <Head isDesktop={isDesktop}>
        {columns.map(column => (
          <TableHeadCell
            key={column.key}
            column={column}
            sortBy={sortBy}
            onSortBy={onSortBy}
            noSort={column.noSort}
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
