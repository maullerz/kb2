import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import TablePagination from '@material-ui/core/TablePagination'
// import Pagination from '@material-ui/lab/Pagination'
// import PaginationItem from '@material-ui/lab/PaginationItem'

import * as DateUtils from 'utils/DateUtils'
import Spinner from 'components/Spinner'

import TableHeadCell from './TableHeadCell'
import { TableRoot, TopPaginationWrapper, Head, Body, Row, Cell, DayRow } from './styles'

// https://material-ui.com/components/pagination/
// https://material-ui.com/api/table-pagination/
const PAGE_SIZE = 50
const emptyArr = []

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
  if (params.shipID && data.vict.ship.id === params.shipID) {
    return true
  }
  return false
}

const Table = props => {
  const {
    columns, items, isLoading, sortBy, params,
    onRowClick, onSortBy, onNoContent, isDesktop,
    pagination, onGoToPage,
  } = props

  const isVictimCheck = params.charID || params.corpID || params.allyID || params.shipID

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

    // <Link to={`/kill/${item._id}`} />
    // return (
    //   <RowWrapper key={id}>

    //     <Row
    //       // key={id}
    //       isVictim={isVictim}
    //       isDesktop={isDesktop}
    //       // onClick={handleRowClick}
    //     >
    //       <Link to={`/kill/${item._id}`} />
    //       {columns.map(col => renderCell(item, col))}
    //     </Row>
    //   </RowWrapper>
    // )
  }

  const paginationNode = pagination.totalCount > 0 ? (
    <TablePagination
      rowsPerPageOptions={emptyArr}
      component='div'
      count={pagination.totalCount}
      page={pagination.page - 1}
      rowsPerPage={PAGE_SIZE}
      onChangePage={onGoToPage}
      // TODO:
      // ActionsComponent={Pagination}
      // ActionsComponent={PaginationItem}
    />
  ) : null

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
        {false && paginationNode}

        {isLoading && <Spinner fullscreen />}
      </>
    )
  }

  return (
    <>
      <TableRoot>
        <Head isDesktop={isDesktop}>
          <TopPaginationWrapper>
            {paginationNode}
          </TopPaginationWrapper>
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
          ? <Spinner />
          : renderBody()
      }
      </TableRoot>
    </>
  )
}

export default Table
