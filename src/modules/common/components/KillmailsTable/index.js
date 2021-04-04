import React, { useReducer, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from 'react-hook-media-query'

import KillmailService from 'api/KillmailService'
import { Table, NoContent } from 'components'

import { columns, mobileColumns } from './columns'

// const killmails = require('./killmails.json').slice(0, 50)
const IS_DEV = process.env.NODE_ENV === 'development'

const reducerFunc = (prevState, newState) => ({
  ...prevState,
  ...newState,
})

const KillmailsTable = props => {
  // const {
  //   contactPosition, isCompanies, searchFilter, onRowClick,
  //   editContact, editCompany, deleteContact, deleteCompany, onSuccess,
  // } = props
  // const dispatch = useDispatch()
  // const contacts = useSelector(contactsList)
  // const companies = useSelector(companiesList)
  // const sortBy = useSelector(contactsSortBy)

  const isDesktop = useMediaQuery('(min-width: 728px)')
  const { onRowClick } = props
  const [state, setState] = useReducer(reducerFunc, {
    items: [],
    isLoading: true,
    page: 1,
    totalPages: 0,
    totalCount: 0,
  })
  const { items, isLoading, page, totalPages, totalCount } = state

  function handleRowClick(item) {
    if (onRowClick) {
      onRowClick(item)
    }
  }

  // function handleSortBy(newSortBy) {
  //   dispatch(GlobalContactsActions.setContactsSortBy(newSortBy))
  // }

  function handlePrevPageClick() {
    setState({ page: page - 1 })
  }

  function handleNextPageClick() {
    setState({ page: page + 1 })
  }

  function handleGoToPage(selectedPage) {
    setState({ page: selectedPage })
  }

  async function getKillmails() {
    // onSuccess(page, sortBy)
    try {
      const { data } = await KillmailService.getKillmails()
      if (IS_DEV) {
        console.log('data[0]:', data[0])
      }
      setState({ items: data, isLoading: false, totalPages: 1, totalCount: items.length })
    } catch (e) {
      console.error('getKillmails:', e.message || e)
      setState({ isLoading: false })
    }
  }

  useEffect(() => {
    getKillmails()
  }, [])
  // }, [page, searchFilter, contactPosition]) // , sortBy

  // useEffect(() => {
  //   setState({ page: 1 })
  // }, [searchFilter])

  // useEffect(() => {
  //   handleSortBy(null)
  // }, [contactPosition])

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

  return (
    <Table
      items={items}
      columns={isDesktop ? columns : mobileColumns}
      isLoading={isLoading}
      onRowClick={handleRowClick}
      onNoContent={renderNoContent}
      // onSortBy={handleSortBy}
      // sortBy={sortBy}

      pagination={{
        page,
        totalPages,
        itemsCount: items.length,
        totalCount,
      }}
      onPrevPage={handlePrevPageClick}
      onNextPage={handleNextPageClick}
      onGoToPage={handleGoToPage}
    />
  )
}

export default KillmailsTable
