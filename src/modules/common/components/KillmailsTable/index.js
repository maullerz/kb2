import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import ReactTooltip from 'react-tooltip'

import history from 'services/routerHistory'
import KillmailService from 'api/KillmailService'
import { Table, NoContent } from 'components'

import { columns, mobileColumns } from './columns'

// const IS_DEV = false && process.env.NODE_ENV === 'development'
// const devKillmails = require('./killmails.json').slice(0, 50)
// const devKillmails = null

const reducerFunc = (prevState, newState) => ({
  ...prevState,
  ...newState,
})

function handleRowClick(km) {
  ReactTooltip.hide()
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
  const [params, setParams] = useState({ ...props, page })

  // Page in TablePagination = page + 1
  const handleGoToPage = useCallback((ev, selectedPage) => {
    setState({ page: selectedPage + 1 })
    setParams({ ...params, page: selectedPage + 1 })
  }, [])

  async function getKillmails() {
    setState({ isLoading: true })
    try {
      const { data } = await KillmailService.getKillmails(params)
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
  }, [params])

  // only when items changed
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [items])

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
