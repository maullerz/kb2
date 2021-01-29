import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from 'react-hook-media-query'

import { Table, NoContent, Icon } from 'components'

import { columns, mobileColumns } from './columns'

const killmails = require('./killmails.json').slice(0, 50)

const KillmailsTable = props => {
  // const {
  //   contactPosition, isCompanies, searchFilter, onRowClick,
  //   editContact, editCompany, deleteContact, deleteCompany, onSuccess,
  // } = props
  // const dispatch = useDispatch()
  // const contacts = useSelector(contactsList)
  // const companies = useSelector(companiesList)
  // const sortBy = useSelector(contactsSortBy)

  const { onRowClick } = props
  const [page, setPage] = useState(1)
  const isDesktop = useMediaQuery('(min-width: 728px)')

  function handleRowClick(item) {
    if (onRowClick) {
      onRowClick(item)
    }
  }

  // function handleSortBy(newSortBy) {
  //   dispatch(GlobalContactsActions.setContactsSortBy(newSortBy))
  // }

  function handlePrevPageClick() {
    setPage(page - 1)
  }

  function handleNextPageClick() {
    setPage(page + 1)
  }

  function handleGoToPage(selectedPage) {
    setPage(selectedPage)
  }

  function getKillmails() {
    // onSuccess(page, sortBy)
  }

  // useEffect(() => {
  //   setPage(1)
  // }, [searchFilter])

  // useEffect(() => {
  //   getKillmails()
  // }, [page, searchFilter, contactPosition]) // , sortBy

  // useEffect(() => {
  //   handleSortBy(null)
  // }, [contactPosition])

  const { isLoading, items = [], totalPages, totalCount } = {
    isLoading: false,
    items: killmails || [],
    totalPages: 2,
    totalCount: 18,
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
