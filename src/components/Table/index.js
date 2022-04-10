import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination'
// import Pagination from '@mui/lab/Pagination'
// import PaginationItem from '@mui/lab/PaginationItem'

import * as DateUtils from 'utils/DateUtils'
import * as SdeUtils from 'utils/SdeUtils'
import Spinner from 'components/Spinner'
import NoContent from 'components/NoContent'

import TableHeadCell from './TableHeadCell'
import { TableRoot, TopPaginationWrapper, Head, Body, Row, Cell, DayRow } from './styles'

// https://material-ui.com/components/pagination/
// https://material-ui.com/api/table-pagination/
const PAGE_SIZE = 50
const emptyArr = []

const checkForVictim = (data, params) => {
  if (params.charID && data.vict.char?.id === params.charID) {
    return true
  }
  if (params.corpID && data.vict.corp?.id === params.corpID) {
    return true
  }
  if (params.allyID && data.vict.ally?.id === params.allyID) {
    return true
  }
  if (params.shipID && data.vict.ship.id === params.shipID) {
    return true
  }
  if (params.factionID && data.vict.fctn?.id === params.factionID) {
    return true
  }
  if (params.groupID) {
    const victGroupID = SdeUtils.getGroupID(data.vict.ship.id)
    return victGroupID === params.groupID
  }
  return false
}

const Table = props => {
  const {
    columns, items, isLoading, sortBy, params,
    onRowClick, onSortBy, onNoContent, isDesktop,
    pagination, onGoToPage,
  } = props

  // console.log('pagination:', pagination)

  // What TO DO?

  // const fullWidth = columns.reduce((sum, col) => {
  //   return sum + Number(col.width.replace('%', ''))
  // }, 0)

  // if (fullWidth !== 100) {
  //   if (process.env.NODE_ENV === 'development') {
  //     console.warn('fullWidth !== 100:', fullWidth) // eslint-disable-line no-console
  //   }
  // }

  function renderCell(item, col, onClick) {
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
      ...(col.minWidth && {
        minWidth: col.minWidth,
      }),
    }

    if (col.link) {
      const path = col.link.replace('{placeholder}', item[col.linkKey])
      return (
        <Link style={cellStyle} to={path} key={key}>
          <Cell highlighted={highlighted}>
            {col.render ? col.render(item) : value}
          </Cell>
        </Link>
      )
    }

    return (
      <Cell key={key} style={cellStyle} highlighted={highlighted} onClick={onClick}>
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

    const isVictim = checkForVictim(item, params)

    return (
      <Row
        key={id}
        isVictim={isVictim}
        isDesktop={isDesktop}
        // onClick will be handled by Cells without "link" prop
        // onClick={handleRowClick}
      >
        {columns.map(col => renderCell(item, col, handleRowClick))}
      </Row>
    )

    // Cant place Link as wrapper because a inside a issue
    // Cant use Link as sibling bc all events are going to Row children
    // seems only way to mark all Row children with pointer-events: none;
    // but it will be too much to control
  }

  function renderPagination(isBottom = false) {
    const renderPaginationInfo = ({ from, to, count }) => {
      if (isDesktop || isBottom) {
        return `${from}-${to} of ${count}`
      }
      return null
      // return `${from}-${to}`
      // return `${pagination.page} page`
    }

    if (pagination.totalCount <= 0) {
      return null
    }

    return (
      <TablePagination
        rowsPerPageOptions={emptyArr}
        component='div'
        count={pagination.totalCount}
        page={pagination.page - 1}
        rowsPerPage={PAGE_SIZE}
        onPageChange={onGoToPage}
        labelDisplayedRows={renderPaginationInfo}
        // TODO:
        // ActionsComponent={Pagination}
        // ActionsComponent={PaginationItem}
      />
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
        {renderPagination(true)}

        {isLoading && <Spinner fullscreen />}
      </>
    )
  }

  return (
    <TableRoot>
      {!isDesktop &&
        <TopPaginationWrapper isDesktop={isDesktop}>
          {renderPagination()}
        </TopPaginationWrapper>
      }
      <Head isDesktop={isDesktop}>
        {isDesktop &&
          <TopPaginationWrapper isDesktop={isDesktop}>
            {renderPagination()}
          </TopPaginationWrapper>
        }
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
      {isLoading && items.length === 0
        ? <NoContent isLoading />
        : renderBody()
      }
    </TableRoot>
  )
}

export default Table
