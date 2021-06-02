import React, { useReducer, useEffect, useCallback, useMemo } from 'react'
// import { useHistory } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from 'react-hook-media-query'
import ReactTooltip from 'react-tooltip'

import history from 'services/routerHistory'
import KillmailService from 'api/KillmailService'
import { Table, NoContent } from 'components'

import { columns, mobileColumns } from './columns'

const IS_DEV = false && process.env.NODE_ENV === 'development'

// const devKillmails = require('./killmails.json').slice(0, 50)
// const devKillmails = null

const reducerFunc = (prevState, newState) => ({
  ...prevState,
  ...newState,
})

function handleRowClick(km) {
  history.push(`/kill/${km._id}`)
}

function renderNoContent() {
  // const isSearchEmpty = (items.length === 0 && searchFilter)
  // const descr = isSearchEmpty
  //   ? 'Try to adjust your search to find what you are looking for.'
  //   : 'Once they are added, they will appear here.'
  const title = 'No results found.'
  const descr = 'Try to adjust your search to find what you are looking for.'
  return (
    <NoContent
      title={title}
      descr={descr}
    />
  )
}

const KillmailsTable = props => {
  const isDesktop = useMediaQuery('(min-width: 728px)')
  const [state, setState] = useReducer(reducerFunc, {
    items: [],
    isLoading: true,
    page: 1,
    totalPages: 0,
    totalCount: 0,
  })
  const { items, isLoading, page, totalPages, totalCount } = state

  // function handleSortBy(newSortBy) {
  //   dispatch(GlobalContactsActions.setContactsSortBy(newSortBy))
  // }

  // const handlePrevPageClick = useCallback(() => {
  //   setState({ page: page - 1 })
  // }, [])

  // const handleNextPageClick = useCallback(() => {
  //   setState({ page: page + 1 })
  // }, [])

  // Page in TablePagination = page + 1
  const handleGoToPage = useCallback((ev, selectedPage) => {
    setState({ page: selectedPage + 1 })
  }, [])

  async function getKillmails() {
    // onSuccess(page, sortBy)
    try {
      // const { systemID, constellationID, regionID } = props
      // const params = { systemID, constellationID, regionID }
      const params = {
        ...props,
        page,
      }
      setState({ isLoading: true })
      const { data } = await KillmailService.getKillmails(params)
      if (IS_DEV) {
        console.log('data[0]:', data[0])
      }
      setState({
        items: data.data,
        page: data.page,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
        isLoading: false,
      })
    } catch (e) {
      console.error('getKillmails:', e.message || e)
      setState({ isLoading: false })
    }
  }

  useEffect(() => {
    getKillmails()
  }, [props, page])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [items])
  // }, [page, searchFilter, contactPosition]) // , sortBy

  // useEffect(() => {
  //   setState({ page: 1 })
  // }, [searchFilter])

  // useEffect(() => {
  //   handleSortBy(null)
  // }, [contactPosition])

  const pagination = useMemo(() => ({
    page: page || 1,
    totalPages,
    itemsCount: items.length,
    totalCount,
  }), [items, page, totalPages, totalCount])

  return (
    <Table
      items={items}
      params={props}
      isDesktop={isDesktop}
      columns={isDesktop ? columns : mobileColumns}
      isLoading={isLoading}

      onRowClick={handleRowClick}
      onNoContent={renderNoContent}
      // onSortBy={handleSortBy}
      // sortBy={sortBy}

      pagination={pagination}
      onGoToPage={handleGoToPage}
      // onPrevPage={handlePrevPageClick}
      // onNextPage={handleNextPageClick}
    />
  )
}

export default KillmailsTable
