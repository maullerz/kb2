import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'

import { formatSum } from 'utils/FormatUtils'
import { getSystemDescr } from 'utils/SdeUtils'
import { Table, NoContent, Icon } from 'components'

// TODO
// import AllyIcon from 'components/icons/AllyIcon'
// import ItemIcon from 'components/icons/ItemIcon'

const killmails = require('./killmails.json').slice(0,5)

const columns = [
  {
    width: '10%', key: '_id', title: 'Time', align: 'right',
    render: km => {
      return (
        <div>
          <div>{format(km.time * 1000, 'HH:mm')}</div>
          <div>{formatSum(km.sumV)}</div>
        </div>
      )
    },
  },
  {
    width: '10%', key: 'vict.ship', title: 'Ship',
    render: km => <Icon icon='administration' id={km.vict.ship.id} />,
  },
  {
    width: '10%', key: 'sys', title: 'System',
    render: ({ sys }) => {
      const sysDescr = getSystemDescr(sys)
      return (
        <>
          <div>{sysDescr.system}</div>
          <div>{sysDescr.region}</div>
        </>
      )
    },
  },
  {
    width: '30%', key: 'vict.char.name', title: 'Victim',
  },
  {
    width: '30%', key: 'atts.char.name', title: 'Final Blow',
  },
]

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
      columns={columns}
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
