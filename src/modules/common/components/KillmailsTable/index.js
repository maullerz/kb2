import React, { useReducer, useEffect, useCallback } from 'react'
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
const devKillmails = null

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

  const handlePrevPageClick = useCallback(() => {
    setState({ page: page - 1 })
  }, [])

  const handleNextPageClick = useCallback(() => {
    setState({ page: page + 1 })
  }, [])

  const handleGoToPage = useCallback(selectedPage => {
    setState({ page: selectedPage })
  }, [])

  async function getKillmails() {
    // onSuccess(page, sortBy)
    try {
      if (IS_DEV) {
        setState({ items: devKillmails, isLoading: false, totalPages: 1, totalCount: items.length })
        console.log('devKillmails[6]:', devKillmails[6])
      } else {
        // const { systemID, constellationID, regionID } = props
        // const params = { systemID, constellationID, regionID }
        const params = props
        const { data } = await KillmailService.getKillmails(params)
        if (IS_DEV) {
          console.log('data[0]:', data[0])
        }
        setState({ items: data, isLoading: false, totalPages: 1, totalCount: items.length })
      }
    } catch (e) {
      console.error('getKillmails:', e.message || e)
      setState({ isLoading: false })
    }
  }

  useEffect(() => {
    getKillmails()
  }, [props])

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

  const pagination = useCallback(() => ({
    page,
    totalPages,
    itemsCount: items.length,
    totalCount,
  }), [page, totalPages, items, totalCount])

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
      onPrevPage={handlePrevPageClick}
      onNextPage={handleNextPageClick}
      onGoToPage={handleGoToPage}
    />
  )
}

export default KillmailsTable
