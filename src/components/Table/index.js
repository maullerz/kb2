import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import * as DateUtils from 'utils/DateUtils'
import Spinner from 'components/Spinner'

import TableHeadCell from './TableHeadCell'
// import TableFooter from './TableFooter'
import { TableRoot, Head, Body, Row, Cell, DayRow } from './styles'

// TODO
// https://material-ui.com/components/pagination/

const checkForVictim = (data, params) => {
  if (params.charID && data.vict.char.id === params.charID) {
    return true
  }
  if (params.corpID && data.vict.corp.id === params.corpID) {
    return true
  }
  if (params.allyID && data.vict.ally.id === params.allyID) {
    return true
  }
  return false
}

const Table = props => {
  const {
    columns, items, isLoading, sortBy, params,
    onRowClick, onSortBy, onNoContent, isDesktop,
    // onRenderControls,
    // pageSize, pagination, onPrevPage, onNextPage, onGoToPage,
  } = props

  const isVictimCheck = params.charID || params.corpID || params.allyID

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

    const isVictim = isVictimCheck && checkForVictim(item, params)

    return (
      <Row
        key={id}
        isVictim={isVictim}
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
              <Fragment key={dayString}>
                <DayRow>{dayString}</DayRow>
                {kms.map((km, ix) => renderRow(km, km.id || ix))}
              </Fragment>
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
